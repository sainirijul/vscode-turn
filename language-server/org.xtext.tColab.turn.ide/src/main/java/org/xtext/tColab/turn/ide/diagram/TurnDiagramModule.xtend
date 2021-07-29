package org.xtext.tColab.turn.ide.diagram

import org.eclipse.sprotty.xtext.DefaultDiagramModule
import org.eclipse.sprotty.xtext.IDiagramGenerator

class TurnDiagramModule extends DefaultDiagramModule {
	
	def Class<? extends IDiagramGenerator> bindIDiagramGenerator() {
		TurnDiagramGenerator
	} 
	
	override bindIDiagramServerFactory() {
		TurnDiagramServerFactory
	}
	
	override bindILayoutEngine() {
		TurnLayoutEngine
	}
	
	override bindIDiagramServer() {
		TurnDiagramServer
	}	
}
