import type { WizardFlow, WizardNextAction, WizardState } from "./workflow-wizard-types";
import { buildWizardRouteHandoff } from "./wizard-route-handoff";

export function buildWizardNextAction(input: WizardNextAction): WizardNextAction {
  return { ...input };
}

export function selectWizardNextAction(flow: WizardFlow | null, state: WizardState): WizardNextAction {
  if (!state.selectedIntentId) {
    return buildWizardNextAction({ label: "Choose what you want to do", description: "Pick one plain-English task to start.", route: "/start", routeLabel: "Wizard", blocked: false, advancedActions: [] });
  }
  if (!flow) {
    return buildWizardNextAction({ label: "Select recommended flow", description: "Use the recommended path for this task.", route: "/start", routeLabel: "Wizard", blocked: false, advancedActions: [] });
  }
  const step = flow.steps.find((item) => item.id === state.currentStepId) ?? flow.steps[0];
  if (step && state.blockedStepIds.includes(step.id)) {
    return buildWizardNextAction({ label: "Review blocker", description: step.safetyNote, route: step.route, routeLabel: step.routeLabel, blocked: true, advancedActions: ["Open advanced details"] });
  }
  if (state.completedStepIds.length >= flow.steps.length) {
    return buildWizardNextAction({ label: "Start next workflow", description: "Review validation or product readiness next.", route: "/validation", routeLabel: "Validation", blocked: false, advancedActions: ["Open readiness"] });
  }
  const handoff = buildWizardRouteHandoff(step.route);
  return buildWizardNextAction({ label: `Open ${handoff.routeLabel}`, description: handoff.whatToDoThere, route: handoff.destinationRoute, routeLabel: handoff.routeLabel, blocked: false, advancedActions: flow.advancedRoutesHidden.map((route) => `Advanced: ${route}`) });
}

export function summarizeWizardNextAction(action: WizardNextAction): string {
  return `${action.label}: ${action.description}`;
}
