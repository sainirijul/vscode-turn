/*
 * Copyright (C) 2020 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import 'reflect-metadata';
import 'turn-sprotty/css/dark/diagram.css'
import 'sprotty-vscode-webview/css/sprotty-vscode.css';
import { Container } from 'inversify';
import { createTurnDiagramContainer } from 'turn-sprotty';
import { SprottyDiagramIdentifier, SprottyStarter } from 'sprotty-vscode-webview/lib';

export class TurnSprottyStarter extends SprottyStarter {
    createContainer(diagramIdentifier: SprottyDiagramIdentifier): Container {
        return createTurnDiagramContainer(diagramIdentifier.clientId + '_sprotty');
    }
}

export const starter = new TurnSprottyStarter();
