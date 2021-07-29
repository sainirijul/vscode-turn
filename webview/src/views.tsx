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

/** @jsx svg */
import { svg } from 'snabbdom-jsx';

import { VNode } from "snabbdom/vnode";
import { injectable } from 'inversify';



import {
    RenderingContext,
    SEdge,
    SCompartment,
    PolylineEdgeView,
    Point,
    toDegrees, IView, setAttr
} from "sprotty"

import { TURNNode, ModuleNode, MAPStartNode, Tag } from "./model"

@injectable()
export class ClassNodeView implements IView {
    render(node: TURNNode, context: RenderingContext): VNode {
        const vnode = <g class-sprotty-node={true}>
            <rect class-selected={node.selected} class-mouseover={node.hoverFeedback}
                x={0} y={0}
                width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)}></rect>
            {context.renderChildren(node)}
        </g>
        setAttr(vnode, 'class', 'goal')
        return vnode
    }
}

@injectable()
export class ResourceNodeView implements IView {
    render(node: TURNNode, context: RenderingContext): VNode {
        const vnode = <g class-sprotty-node={true}>
            <rect class-selected={node.selected} class-mouseover={node.hoverFeedback}
                x={0} y={0}
                width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)} />
            {context.renderChildren(node)}
        </g>
        return vnode
    }
}

@injectable()
export class HeaderCompartmentView implements IView {
    render(model: SCompartment, context: RenderingContext): VNode {
        const translate = `translate(${model.bounds.x}, ${model.bounds.y})`
        const parentSize = (model.parent as any).size
        const width = Math.max(0, parentSize.width)
        const height = Math.max(0, model.size.height)
        const vnode = <g transform={translate} class-comp="{true}">
            <rect class-classHeader={true} x={0} y={0} width={width} height={height}></rect>
            {context.renderChildren(model)}
        </g>
        return vnode
    }
}

@injectable()
export class TagView implements IView {
    render(element: Tag, context: RenderingContext): VNode {
        const radius = 0.5 * element.size.width
        return <g>
            <circle class-tag={true} r={radius} cx={radius} cy={radius}></circle>
            {context.renderChildren(element)}
        </g>
    }
}

@injectable()
export class ClassNodeView2 implements IView {
    render(node: TURNNode, context: RenderingContext): VNode {
        const vnode = <g class-sprotty-node={true}>
            <rect class-selected={node.selected} class-mouseover={node.hoverFeedback}
                width={20} height={5} fill="#ffffff"></rect>
            {context.renderChildren(node)}
        </g>
        setAttr(vnode, 'class', 'goal')
        return vnode
    }
}

@injectable()
export class ModuleNodeView implements IView {
    render(node: ModuleNode, context: RenderingContext): VNode {
        return <g class-sprotty-node={true} class-module={true} class-mouseover={node.hoverFeedback}>
            <rect class-body={true} class-selected={node.selected}
                x={0} y={0} rx="5" ry="5"
                width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)} />
            {context.renderChildren(node)}
        </g>
    }
}

@injectable()
export class TaskNodeView implements IView {
    render(model: TURNNode, context: RenderingContext): VNode {
        const width = Math.max(0, model.size.width * 0.5)
        const height = Math.max(0, model.size.height * 0.5)
        const rhombStr = "M 0," + height + " l " + width + "," + height + " l " + width + ",-" + height + " l -" + width + ",-" + height + "z"

        return <g class-sprotty-node="{true}" class-choice={true}>
            <path d={rhombStr} class-choice={true}></path>
            {context.renderChildren(model)}
        </g>
    }
}

@injectable()
export class IndicatorNodeView implements IView {
    render(node: TURNNode, context: RenderingContext): VNode {
        const radius = node.size.width
        const rhombStr = "m 30 30, h 75 l 20 20 l -20 20 h -40 l -20 -20 l 17 -20 z"
        return <g class-sprotty-node={true} class-module={true} class-mouseover={node.hoverFeedback}>
            <path d={rhombStr} class-selected={node.selected} r={radius} ></path>
            {context.renderChildren(node)}
        </g>
    }
}

@injectable()
export class SoftgoalNodeView implements IView {
    render(node: TURNNode, context: RenderingContext): VNode {
        const vnode = <g class-sprotty-node="{true}">
            <rect class-body={true} class-selected={node.selected}
                x={0} y={0}
                width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)}
                rx={Math.max(node.size.width * 0.5, 0)} ry={10} />
            {context.renderChildren(node)}
        </g>
        setAttr(vnode, 'class', node.cssClass)
        return vnode
    }
}

@injectable()
export class SoftgoalNodeViewTry implements IView {
    render(example: TURNNode, context: RenderingContext): VNode {
        const vnode = <g class-sprotty-example="{true}">
            <rect class-example={true} class-selected={example.selected} class-example-label={true}
                x={0} y={0}
                width={Math.max(0, example.bounds.width)} height={Math.max(0, example.bounds.height)}
                rx={Math.max(example.size.width * 0.5, 0)} ry={10} />
            {context.renderChildren(example)}
        </g>
        setAttr(vnode, 'class', example.cssClass)
        return vnode
    }
}

@injectable()
export class GoalNodeView extends SoftgoalNodeView {
    render(node: TURNNode, context: RenderingContext): VNode {
        const vnode = <g class-sprotty-node={true}>
            <rect class-body={true} class-selected={node.selected}
                x={0} y={0}
                width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)}
                rx={Math.max(node.size.height * 0.5, 0)} ry={Math.max(node.size.height * 0.5, 0)} />
            {context.renderChildren(node)}
        </g>
        setAttr(vnode, 'class', node.cssClass)
        return vnode
    }
}

@injectable()
export class BeliefNodeView implements IView {
    render(node: TURNNode, context: RenderingContext): VNode {
        const vnode = <g class-sprotty-node="{true}">
            <rect class-body={true} class-selected={node.selected} stroke-dasharray={true}
                x={0} y={0}
                width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)}
                rx={Math.max(node.size.width * 1, 0)} ry={40} />
            {context.renderChildren(node)}
        </g>
        setAttr(vnode, 'class', node.cssClass)
        return vnode
    }
}

@injectable()
export class ModuleNodeView2 implements IView {
    render(node: MAPStartNode, context: RenderingContext): VNode {
        const radius = this.getRadius(node);
        return <g>
            <circle class-sprotty-node={true}
                fill="#ffffff"
                class-task={true} class-mouseover={node.hoverFeedback} class-selected={node.selected}
                class-running={node.status === 'running'}
                class-finished={node.status === 'finished'}
                r={radius} cx={radius} cy={radius}></circle>
            <text x={radius} y={radius + 5} class-text={true}>{node.name}</text>
        </g>;
    }
    protected getRadius(node: TURNNode) {
        return 4;
    }
}

@injectable()
export class ChoiceNodeView implements IView {
    render(model: TURNNode, context: RenderingContext): VNode {
        const width = Math.max(0, model.size.width * 0.5)
        const height = Math.max(0, model.size.height * 0.5)
        const rhombStr = "M 0," + height + " l " + width + "," + height + " l " + width + ",-" + height + " l -" + width + ",-" + height + "z"

        return <g class-sprotty-node="{true}" class-choice={true}>
            <path d={rhombStr} class-choice={true}></path>
            {context.renderChildren(model)}
        </g>
    }
}

@injectable()
export class ActorNodeView implements IView {
    render(node: TURNNode, context: RenderingContext): VNode {
        const vnode = <g id='layer1' fill='none' stroke='#000'>
            <path id='path1884' d='M 627.96063 486.81354 A 192.0369 175.71376 0 1 1 243.88684,486.81354 A 192.0369 175.71376 0 1 1 627.96063 486.81354 z'
                transform='matrix(.6624 0 0 .72394 -139.126 -214.818)' strokeWidth='3' />
            <path d='M 149.63121,265.30877 C 149.63121,434.30124 149.63121,433.82115 149.63121,433.82115 L 149,583.60992'
                id='path3657' fillRule='evenodd' strokeWidth='3' />
            <path d='M 276.81568,368.27664 L 21.18432,367.64528 L 276.81568,368.27664 z'
                id='path4548' fillRule='evenodd' strokeWidth='3.369' />
            <path d='M 19,717.46096 L 148,580.46096 L 278,718.46096 L 148,583.46096 L 19,717.46096 z'
                id='path6322' fillRule='evenodd' strokeWidth='3' fill="#ffffff" />
        </g>
        setAttr(vnode, 'class', node.cssClass)
        return vnode
    }
}

@injectable()
export class CaseNodeView implements IView {
    render(node: TURNNode, context: RenderingContext): VNode {
        const vnode = <g class-sprotty-node="{true}">
            <rect class-body={true} class-selected={node.selected}
                x={0} y={0}
                width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)}
                rx={Math.max(node.size.width * 0.5, 0)} ry={10} />
            {context.renderChildren(node)}
        </g>
        setAttr(vnode, 'class', 'case')
        return vnode
    }
}

@injectable()
export class UsesNodeView extends CaseNodeView {
    render(node: TURNNode, context: RenderingContext): VNode {
        const vnode = <g class-sprotty-node={true}>
            <rect class-body={true} class-selected={node.selected}
                x={0} y={0}
                width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)}
                rx={Math.max(node.size.height * 0.5, 0)} ry={Math.max(node.size.height * 0.5, 0)} />
            {context.renderChildren(node)}
        </g>
        setAttr(vnode, 'class', node.cssClass)
        return vnode
    }
}

@injectable()
export class NoteView implements IView {
    render(node: TURNNode, context: RenderingContext): VNode {
        return <g class-note={true} class-mouseover={node.hoverFeedback}>
            <path class-front={true} d="M 0,0 l 15,0 l 0,10 l 10,0 l 0,25 l -25,0 Z" fill="#FFEB8A" />
            <path class-noteEdge={true} d="M 15,0 l 0,10 l 10,0 Z" fill="#FFCC40" />
        </g>
    }
}

@injectable()
export class CompositionEdgeView extends PolylineEdgeView {
    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[] {
        const p1 = segments[0]
        const p2 = segments[1]
        const r = 6
        const rhombStr = "M 0,0 l" + r + "," + (r / 2) + " l" + r + ",-" + (r / 2) + " l-" + r + ",-" + (r / 2) + " l-" + r + "," + (r / 2) + " Z"
        return [
            <path class-sprotty-edge={true} class-composition={true} d={rhombStr}
                transform={`rotate(${angle(p1, p2)} ${p1.x} ${p1.y}) translate(${p1.x} ${p1.y})`} />
        ]
    }

    static readonly SOURCE_CORRECTION = Math.sqrt(1 * 1 + 2 * 2)

    protected getSourceAnchorCorrection(edge: SEdge): number {
        return CompositionEdgeView.SOURCE_CORRECTION
    }
}

@injectable()
export class DependencyEdgeView extends PolylineEdgeView {
    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[] {
        const p1 = segments[0]
        const p2 = segments[1]
        const rhombStr = "m 0, 10 m 15 -28 h 10 a10,10 0 0,1 10,10 v 10 a10,10 0 0,1 -10,10 h -10 v -30 z"
        return [
            <path class-sprotty-edge={true} class-composition={true} d={rhombStr} fill="#FFEB8A"
                transform={`rotate(${angle(p1, p2)} ${p1.x} ${p1.y}) translate(${p1.x} ${p1.y})`} />
        ]
    }

    static readonly SOURCE_CORRECTION = Math.sqrt(1 * 1 + 2 * 2)

    protected getSourceAnchorCorrection(edge: SEdge): number {
        return DependencyEdgeView.SOURCE_CORRECTION
    }
}

@injectable()
export class DecompositionEdgeView extends PolylineEdgeView {
    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[] {
        const p1 = segments[0]
        const p2 = segments[1]
        const r = 6
        const rhombStr = "M 0,0 l" + r + "," + (r / 2) + " l" + r + ",-" + (r / 2) + " l-" + r + ",-" + (r / 2) + " l-" + r + "," + (r / 2) + " Z"
        return [
            <path class-sprotty-edge={true} class-composition={true} d={rhombStr}
                transform={`rotate(${angle(p1, p2)} ${p1.x} ${p1.y}) translate(${p1.x} ${p1.y})`} />
        ]
    }

    static readonly SOURCE_CORRECTION = Math.sqrt(1 * 1 + 2 * 2)

    protected getSourceAnchorCorrection(edge: SEdge): number {
        return DecompositionEdgeView.SOURCE_CORRECTION
    }
}

@injectable()
export class DashedEdgeView extends PolylineEdgeView {
    protected renderLine(edge: SEdge, segments: Point[], context: RenderingContext): VNode {
        const firstPoint = segments[0]
        let path = `M ${firstPoint.x},${firstPoint.y}`
        for (let i = 1; i < segments.length; i++) {
            const p = segments[i]
            path += `L ${p.x},${p.y}`
        }
        return <path class-sprotty-edge={true} class-dashed={true} d={path} />
    }
}

@injectable()
export class CorrelationEdgeView extends DashedEdgeView {
    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[] {
        const p1 = segments[0]
        const p2 = segments[1]
        return [
            <path class-sprotty-edge={true} d="M 10,-4 L 0,0 L 10,4"
                transform={`rotate(${angle(p1, p2)} ${p1.x} ${p1.y}) translate(${p1.x} ${p1.y})`} />
        ]
    }

    static readonly SOURCE_CORRECTION = Math.sqrt(1 * 1 + 2.5 * 2.5)

    protected getSourceAnchorCorrection(edge: SEdge): number {
        return CompositionEdgeView.SOURCE_CORRECTION
    }
}

@injectable()
export class ContributeEdgeView extends PolylineEdgeView {
    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[] {
        const p1 = segments[0]
        const p2 = segments[1]
        return [
            <path class-sprotty-edge={true} d="M 10,-4 L 0,0 L 10,4"
                transform={`rotate(${angle(p1, p2)} ${p1.x} ${p1.y}) translate(${p1.x} ${p1.y})`} />
        ]
    }

    static readonly SOURCE_CORRECTION = Math.sqrt(1 * 1 + 2.5 * 2.5)

    protected getSourceAnchorCorrection(edge: SEdge): number {
        return CompositionEdgeView.SOURCE_CORRECTION
    }
}

@injectable()
export class ArrowEdgeView extends PolylineEdgeView {
    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[] {
        const p1 = segments[segments.length - 2]
        const p2 = segments[segments.length - 1]
        return [
            <path class-sprotty-edge={true} d="M 10,-4 L 0,0 L 10,4"
                transform={`rotate(${angle(p2, p1)} ${p2.x} ${p2.y}) translate(${2 * (p2.x)} ${2 * (p2.y)})`} />
        ]
    }

    static readonly TARGET_CORRECTION = Math.sqrt(1 * 1 + 2.5 * 2.5)

    protected getTargetAnchorCorrection(edge: SEdge): number {
        return ArrowEdgeView.TARGET_CORRECTION
    }
}

@injectable()
export class DashedArrowEdgeView extends DashedEdgeView {
    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[] {
        const p1 = segments[segments.length - 2]
        const p2 = segments[segments.length - 1]
        return [
            <path class-sprotty-edge={true} d="M 10,-4 L 0,0 L 10,4"
                transform={`rotate(${angle(p2, p1)} ${p2.x} ${p2.y}) translate(${p2.x} ${p2.y})`} />
        ]
    }

    static readonly TARGET_CORRECTION = Math.sqrt(1 * 1 + 2.5 * 2.5)

    protected getTargetAnchorCorrection(edge: SEdge): number {
        return DashedArrowEdgeView.TARGET_CORRECTION
    }
}


export function angle(x0: Point, x1: Point): number {
    return toDegrees(Math.atan2(x1.y - x0.y, x1.x - x0.x))
}

@injectable()
export class CircleNodeView implements IView {
    render(node: TURNNode, context: RenderingContext): VNode {
        const radius = this.getRadius(node);
        return <g>
            <circle class-sprotty-node={true} class-selected={node.selected} r={radius} cx={radius} cy={radius}></circle>
            <text x={radius} y={radius + 7} class-sprotty-text={true}>{node.id.substr(4)}</text>
        </g>;
    }

    protected getRadius(node: TURNNode) {
        return 40;
    }
}

