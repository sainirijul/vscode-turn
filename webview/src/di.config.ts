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

import '../css/diagram.css';
import 'sprotty/css/sprotty.css';

import { Container, ContainerModule } from 'inversify';
import {
    configureCommand, CreateElementCommand, configureModelElement, ConsoleLogger, HtmlRoot, ExpandButtonHandler, SButton, ExpandButtonView, SCompartmentView, SCompartment,  
    HtmlRootView, LogLevel,  overrideViewerOptions, PreRenderedElement, ManhattanEdgeRouter,
    PreRenderedView, SEdge, SGraphView, SLabelView, TYPES, loadDefaultModules, SGraph, SLabel, editLabelFeature, hoverFeedbackFeature, popupFeature, labelEditUiModule
} from 'sprotty';
import { CustomRouter } from './custom-edge-router';
import { TURNLabel, TURNNode, TURNModelFactory } from './model';
import {
    ResourceNodeView, GoalNodeView, SoftgoalNodeView, BeliefNodeView, TaskNodeView, IndicatorNodeView, HeaderCompartmentView, ModuleNodeView, SoftgoalNodeViewTry,
    ContributeEdgeView, CorrelationEdgeView, DecompositionEdgeView, DependencyEdgeView
} from "./views";

const turnDiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope()
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.warn)
    rebind(TYPES.IModelFactory).to(TURNModelFactory).inSingletonScope()

    unbind(ManhattanEdgeRouter);
    bind(ManhattanEdgeRouter).to(CustomRouter).inSingletonScope();

    const context = { bind, unbind, isBound, rebind };
    configureModelElement(context, 'graph', SGraph, SGraphView, {
        enable: [hoverFeedbackFeature, popupFeature]
    });
    configureModelElement(context, 'turnnode:goal', TURNNode, GoalNodeView)
    configureModelElement(context, 'turnnode:softgoal', TURNNode, SoftgoalNodeView)
    configureModelElement(context, 'turnnode:softgoaltry', TURNNode, SoftgoalNodeViewTry)
    configureModelElement(context, 'turnnode:belief', TURNNode, BeliefNodeView)
    configureModelElement(context, 'turnnode:actor', TURNNode, ModuleNodeView)
    configureModelElement(context, 'turnnode:task', TURNNode, TaskNodeView)
    configureModelElement(context, 'turnnode:indicator', TURNNode, IndicatorNodeView)
    configureModelElement(context, 'turnnode:resource', TURNNode, ResourceNodeView)
    configureModelElement(context, 'label:heading', SLabel, SLabelView, {
        enable: [editLabelFeature]
    });
    configureModelElement(context, 'label:text', SLabel, SLabelView, {
        enable: [editLabelFeature]
    });
    configureModelElement(context, 'turnlabel:text', TURNLabel, SLabelView, {
        enable: [editLabelFeature]
    });
    configureModelElement(context, 'label:classHeader', SLabel, SLabelView)
    configureModelElement(context, 'comp:comp', SCompartment, SCompartmentView)
    configureModelElement(context, 'comp:classHeader', SCompartment, HeaderCompartmentView)
    configureModelElement(context, 'edge:dependency', SEdge, DependencyEdgeView)
    configureModelElement(context, 'edge:decomposition', SEdge, DecompositionEdgeView)
    configureModelElement(context, 'edge:contribute', SEdge, ContributeEdgeView)
    configureModelElement(context, 'edge:correlated', SEdge, CorrelationEdgeView)
    configureModelElement(context, 'html', HtmlRoot, HtmlRootView)
    configureModelElement(context, 'pre-rendered', PreRenderedElement, PreRenderedView)
    configureModelElement(context, ExpandButtonHandler.TYPE, SButton, ExpandButtonView)

    configureCommand(context, CreateElementCommand);
});

export function createTURNDiagramContainer(widgetId: string): Container {
    const container = new Container();
    loadDefaultModules(container, { exclude: [labelEditUiModule] });
    container.load(turnDiagramModule);
    overrideViewerOptions(container, {
        needsClientLayout: true,
        needsServerLayout: true,
        baseDiv: widgetId,
        hiddenDiv: widgetId + '_hidden'
    });
    return container;
}
