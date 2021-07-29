package org.xtext.tColab.turn.ide.diagram

import com.google.inject.Inject
import org.eclipse.sprotty.Action
import org.eclipse.sprotty.xtext.LanguageAwareDiagramServer
import org.eclipse.sprotty.xtext.ReconnectAction

class TurnDiagramServer extends LanguageAwareDiagramServer {

	@Inject TurnReconnectHandler reconnectHandler
	
	override protected handleAction(Action action) {
		if (action.kind === ReconnectAction.KIND) 
			reconnectHandler.handle(action as ReconnectAction, this)
		else 
			super.handleAction(action)
	}
}
