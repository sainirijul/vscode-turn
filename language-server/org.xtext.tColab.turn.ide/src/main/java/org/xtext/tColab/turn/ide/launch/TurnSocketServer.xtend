package org.xtext.tColab.turn.ide.launch

import org.eclipse.sprotty.xtext.launch.DiagramServerSocketLauncher

class TurnSocketServer extends DiagramServerSocketLauncher {

	override createSetup() {
		new TurnLanguageServerSetup
	}

	def static void main(String... args) {
		new TurnSocketServer().run(args)
	}
}
