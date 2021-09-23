TGRL Language support for Collaborative Modelling using Visual Studio Code extensions
=====================
Provides language support via [TGRL Language Server](https://github.com/JUCMNAV/TURNEditor/tree/vscode-lsp).

# Demonstration Video
[![Demo](https://github.com/Rijul5/vscode-turn/blob/main/Data/screenshot.png)](https://youtu.be/3fqXI3tiQjw)


During the hands-on sessions, participants have two options to use our tool - (1) Using VS Code desktop-based application (highly recommended) and (2) Using web-based VS Code views in browser. The second option provides limited support for the features of the TGRL extension. For example, the code highlighting feature and visualization of diagrams are currently not supported by the web-based VS Code views in a browser. However, participants will be still able to edit the textual TGRL models collaborate using the second option.

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

6. Modeller can then create TGRL Models (file with .turn extension) collaboratively. For quick start, we have provided a sample TGRL model "example.turn" in the "Examples" folder of this repository.


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

2. Inside VS Code, run the below commands in the terminal
```
yarn
yarn build
```

3. Launch Extension Development Mode" by pressing the key "F5"

4. Click on the "LiveShare" option in the bottom left corner of VS Code to start a collaboration session

5. To package the extension in a VSIX file, use the below command
```
vsce package
```





