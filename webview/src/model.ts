/********************************************************************************
 * Copyright (c) 2020 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { injectable } from 'inversify';
import {
    boundsFeature, fadeFeature, hoverFeedbackFeature, popupFeature, SCompartment, selectFeature, layoutContainerFeature,
    layoutableChildFeature, SLabel, SEdge, ManhattanEdgeRouter, EdgePlacement, SShapeElement, SParentElement, SModelElementSchema, SChildElement, SGraphFactory, expandFeature, Expandable, openFeature, RectangularNode, CircularNode, moveFeature
} from "sprotty"


@injectable()
export class TURNModelFactory extends SGraphFactory {

    protected initializeChild(child: SChildElement, schema: SModelElementSchema, parent?: SParentElement): SChildElement {
        super.initializeChild(child, schema, parent);
        if (child instanceof SEdge) {
            child.routerKind = ManhattanEdgeRouter.KIND;
            child.targetAnchorCorrection = Math.sqrt(5);
        } else if (child instanceof SLabel) {
            child.edgePlacement = <EdgePlacement> {
                rotate: true,
                position: 0.6
            };
        }
        return child;
    }
}

export class TURNNode extends RectangularNode {
    cssClass: string
    trace: string | undefined
    strokeWidth = 1

    hasFeature(feature: symbol): boolean {
        return feature === selectFeature || feature === boundsFeature
            || feature === layoutContainerFeature || feature === fadeFeature || feature === hoverFeedbackFeature
            || feature === popupFeature || (feature === openFeature && this.trace !== undefined)
    }
}

export class MAPStartNode extends CircularNode {
    cssClass: string
    trace: string | undefined
    strokeWidth = 1
    name: string = '';
    status?: string;
    kernelNr: number;

    hasFeature(feature: symbol): boolean {
        if (feature === moveFeature)
            return false;
        else
            return super.hasFeature(feature);
    }
}

export class ModuleNode extends TURNNode implements Expandable {
    title: string
    expanded = false

    hasFeature(feature: symbol): boolean {
        return feature === expandFeature || super.hasFeature(feature)
    }
}

export class MAPStartHeaderNode extends SCompartment {
}

export class TURNHeaderNode extends SCompartment {
}

export class MAPStartLabel extends SLabel {
    trace: string | undefined

    hasFeature(feature: symbol) {
        return super.hasFeature(feature) || feature === selectFeature || (feature === openFeature && this.trace !== undefined)
    }
}

export class TURNLabel extends SLabel {
    trace: string | undefined

    hasFeature(feature: symbol) {
        return super.hasFeature(feature) || feature === selectFeature || (feature === openFeature && this.trace !== undefined)
    }
}

export class Tag extends SShapeElement {
    size = {
        width: 24,
        height: 24
    }

    hasFeature(feature: symbol): boolean {
        return feature === boundsFeature || feature === layoutContainerFeature || feature === layoutableChildFeature || feature === fadeFeature
    }
}

