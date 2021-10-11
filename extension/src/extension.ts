/*
 * Copyright (C) 2017-2020 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as path from 'path';
import * as os from 'os';
import { workspace, commands, Uri, ExtensionContext } from 'vscode';
import {
    LanguageClient, LanguageClientOptions, ServerOptions, Position as LSPosition, Location as LSLocation
} from 'vscode-languageclient';
import { SprottyDiagramIdentifier, SprottyWebview } from 'sprotty-vscode';
import { SprottyLspVscodeExtension, SprottyLspWebview } from 'sprotty-vscode/lib/lsp';
import * as vscode from 'vscode';
let actor_name: string | undefined;

let extension: SprottyLspVscodeExtension | undefined;

export function activate(context: ExtensionContext) {
    extension = new TurnLanguageExtension(context);
}

export function deactivate(): Thenable<void> {
    if (!extension) {
        return Promise.resolve();
    }
    const result = extension.deactivateLanguageClient();
    extension = undefined;
    return result;
}




export class TurnLanguageExtension extends SprottyLspVscodeExtension {

    constructor(context: ExtensionContext) {
        super('turn', context);
    }

    protected async getDiagramType(): Promise<string> {
        let editor_selection = vscode.window.activeTextEditor?.selection
        let selected_text = vscode.window.activeTextEditor?.document.getText(editor_selection)
        if (selected_text === '') {
            if (actor_name === undefined) {
                actor_name = await vscode.window.showInputBox({ prompt: 'Provide Actor Name', ignoreFocusOut: true });
                let sal = vscode.window.activeTextEditor?.selection
                let val = vscode.window.activeTextEditor?.document.getText(sal)
                console.log(sal)
                console.log(val)
            }
        } else {
            actor_name = selected_text
        }
        return 'turn-diagram';
    }

    createWebView(identifier: SprottyDiagramIdentifier): SprottyWebview {
        identifier.clientId = String(actor_name)
        const sprottyView = new SprottyLspWebview({
            extension: this,
            identifier,
            localResourceRoots: ['webview/pack'],
            scriptPath: 'webview/pack/bundle.js'
        });
        return sprottyView;
    }

    protected activateLanguageClient(context: ExtensionContext): LanguageClient {
        const executable = os.platform() === 'win32' ? 'turn-language-server.bat' : 'turn-language-server';
        const serverModule = context.asAbsolutePath(path.join('server', 'bin', executable));

        // If the extension is launched in debug mode then the debug server options are used
        // Otherwise the run options are used
        const serverOptions: ServerOptions = {
            run: {
                command: serverModule,
                args: ['-trace']
            },
            debug: {
                command: serverModule,
                args: ['-Xdebug', '-Xrunjdwp:server=y,transport=dt_socket,address=8000,suspend=n,quiet=y', '-Xmx256m']
            }
        }

        // Options to control the language client
        const clientOptions: LanguageClientOptions = {
            // Register the server for plain text documents
            documentSelector: ['turn'],
            synchronize: {
                // Synchronize the setting section 'turnLanguageServer' to the server
                configurationSection: 'turnLanguageServer',
                // Notify the server about file changes to '.turn files contain in the workspace
                fileEvents: workspace.createFileSystemWatcher('**/*.turn')
            }
        }

        // Create the language client and start the client.
        const languageClient = new LanguageClient('turnLanguageServer', 'Turn Language Server', serverOptions, clientOptions);
        const disposable = languageClient.start()

        commands.registerCommand('turn.show.references', (uri: string, position: LSPosition, locations: LSLocation[]) => {
            commands.executeCommand('editor.action.showReferences',
                Uri.parse(uri),
                languageClient.protocol2CodeConverter.asPosition(position),
                locations.map(languageClient.protocol2CodeConverter.asLocation));
        })

        commands.registerCommand('turn.apply.workspaceEdit', (obj: any) => {
            const edit = languageClient.protocol2CodeConverter.asWorkspaceEdit(obj);
            if (edit) {
                workspace.applyEdit(edit);
            }
        });

        // Push the disposable to the context's subscriptions so that the
        // client can be deactivated on extension deactivation.
        context.subscriptions.push(disposable);

        return languageClient;
    }
}
