package org.xtext.tColab.turn.ide.launch

import org.eclipse.sprotty.xtext.launch.DiagramServerLauncher

class TurnServerLauncher extends DiagramServerLauncher {
	
	override createSetup() {
		new TurnLanguageServerSetup
	}

	def static void main(String[] args) {
		new TurnServerLauncher().run(args)
	}
}
