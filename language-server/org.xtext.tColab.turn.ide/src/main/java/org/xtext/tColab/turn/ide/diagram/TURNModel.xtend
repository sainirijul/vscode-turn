package org.xtext.tColab.turn.ide.diagram

import org.eclipse.sprotty.Layouting
import org.eclipse.sprotty.SCompartment
import org.eclipse.sprotty.SLabel
import org.eclipse.sprotty.SNode

import org.eclipse.sprotty.SShapeElement
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class TURNNodeClassified extends SNode {
	String cssClass
	String trace
}

@Accessors
class TURNNode extends TURNNodeClassified {
	Boolean expanded
}

@Accessors
class MAPStartNode extends TURNNodeClassified {
	Boolean expanded
}

@Accessors
class TURNHeaderNode extends SCompartment {
	String cssClass
}

@Accessors
class MAPStartHeaderNode extends SCompartment {
	String cssClass
}

@Accessors
class TURNLabel extends SLabel {
	String trace
}

@Accessors
class MAPStartLabel extends SLabel {
	String trace
}

@Accessors 
class TURNTag extends SShapeElement implements Layouting {
	String layout
	
	new() {}
	new((TURNTag)=>void initializer) {
		initializer.apply(this)
	}
}


@Accessors 
class MAPStartTag extends SShapeElement implements Layouting {
	String layout
	
	new() {}
	new((MAPStartTag)=>void initializer) {
		initializer.apply(this)
	}
}
