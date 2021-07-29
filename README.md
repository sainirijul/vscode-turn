# TURN VS Code Extension

This folder contains an example VS Code extension with an Xtext-based language server and a Sprotty diagram for TURN.

## Build

Language server
```
language-server/gradlew -p language-server unzipServer
```

Extension
```
yarn --cwd webview
yarn --cwd extension
```

