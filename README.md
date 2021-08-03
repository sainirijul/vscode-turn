TGRL Language support for Collaborative Modelling using Visual Studio Code extensions
=====================
Provides language support via [TGRL Language Server](https://github.com/JUCMNAV/TURNEditor/tree/vscode-lsp).

# Demonstration Video
[![Demo]()](https://youtu.be/3fqXI3tiQjw)

# Quick Start (using VSIX file)
============
## Prerequisites
**Visual Studio Code**
1. Install the Visual Studio (VS) Code application on your system from [here](https://code.visualstudio.com/download).

2. Clone the repository
```
git clone https://github.com/Rijul5/vscode-turn.git
```
Open Terminal to create a project run directory (workspace) and launch VS code extension
```
mkdir workspace
cd workspace
code .
```    
3. Install the VSIX file of our proposed TGRL extension in VS Code

4. Install the VS Code Live Share extension using the "Search extensions in Marketplace" or using the below command after CTRL + P (VS Code Quick Open)
```
ext install MS-vsliveshare.vsliveshare-pack
```

5. Click on the "LiveShare" option in the bottom left corner of VS Code to start a collaboration session


# Launching Extension in the Extension Development Mode
============

1. Clone the repository
```
git clone https://github.com/Rijul5/vscode-turn.git
```
Open Terminal to create a project run directory (workspace) and launch VS code extension
```
mkdir workspace
cd workspace
code .
```

2. Inside VS Code, run the below command in the terminal
```
yarn
yarn build
```

3. Launch Extension Deveopment Mode" by pressing the key "CTRL + SHIFT + P"

4. Click on the "LiveShare" option in the bottom left corner of VS Code to start a collaboration session

5. To package the extension in a VSIX file, use the below command
```
vsce package
```





