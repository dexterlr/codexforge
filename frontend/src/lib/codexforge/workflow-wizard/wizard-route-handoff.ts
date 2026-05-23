import type { WizardRoute, WizardRouteHandoff, WizardStep } from "./workflow-wizard-types";

const ROUTE_LABELS: Record<WizardRoute, string> = {
  "/": "Home",
  "/start": "Wizard",
  "/code-flow": "Code Flow",
  "/code-flow/trial": "Coding Trial",
  "/code-flow/trial-review": "Trial Review",
  "/apply-validation": "Apply safely and validate",
  "/workflow-results": "Workflow Results",
  "/run-history": "Run History",
  "/ai": "AI",
  "/files": "Files",
  "/validation": "Validation",
  "/closed-loop": "Closed Loop",
  "/creative": "Creative",
  "/artifacts/review": "Artifacts",
  "/local-bridge-health": "Health",
  "/health-probe": "Health Probe",
  "/creative-mvp": "Creative MVP",
  "/memory": "Memory",
  "/readiness": "Readiness",
  "/consolidation": "Consolidation",
};

const WHAT_TO_DO: Record<WizardRoute, string> = {
  "/files": "Select a file and inspect it.",
  "/code-flow": "Pick a file, describe the change, preview the patch, review apply, run checks, and review the result.",
  "/code-flow/trial": "Follow the Coding Flow Live Trial checklist from safe file choice to result handoff.",
  "/code-flow/trial-review": "Review trial run notes, friction, pass/fail checklist, validation, safety, UX fixes, and go/no-go.",
  "/apply-validation": "Review the diff, apply policy, rollback plan, validation commands, output, and result route.",
  "/workflow-results": "Review workflow results, capture capped validation output, and prepare a clean handoff.",
  "/run-history": "Review run history, copy a handoff, and decide the next safe action.",
  "/validation": "Prepare checks and review output.",
  "/creative": "Choose the creative path.",
  "/creative-mvp": "Review the recommended first safe creative execution candidate.",
  "/local-bridge-health": "Review local setup readiness.",
  "/health-probe": "Prepare a metadata-only setup check.",
  "/artifacts/review": "Review artifact quality and provenance.",
  "/closed-loop": "Route failures to the next fix step.",
  "/memory": "Review memory candidates.",
  "/readiness": "Review product readiness.",
  "/consolidation": "Review consolidation recommendations.",
  "/ai": "Ask for planning help.",
  "/start": "Choose the next workflow.",
  "/": "Open the product home.",
};

export function buildWizardRouteHandoff(routeOrStep: WizardRoute | WizardStep): WizardRouteHandoff {
  const route = typeof routeOrStep === "string" ? routeOrStep : routeOrStep.route;
  return {
    destinationRoute: route,
    routeLabel: ROUTE_LABELS[route],
    whatToDoThere: WHAT_TO_DO[route],
    whatToBring: route === "/validation" || route === "/closed-loop" ? "Bring pasted output or the check list." : "Bring the task you selected here.",
    whatToExpect: "You stay in a reviewed, user-driven flow.",
    safetyNote: "No auto-run, no file writes, and approval remains required where relevant.",
    backRoute: "/start",
  };
}

export function buildWizardRouteHandoffAction(handoff: WizardRouteHandoff): string {
  return `Open ${handoff.routeLabel}`;
}

export function summarizeWizardRouteHandoff(handoff: WizardRouteHandoff): string {
  return `${handoff.routeLabel}: ${handoff.whatToDoThere}`;
}
