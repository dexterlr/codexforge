import type { WizardFlowId, WizardIntent, WizardIntentId, WizardRoute, WizardSafetyBadge } from "./workflow-wizard-types";

export function buildWizardIntent(input: WizardIntent): WizardIntent {
  return { ...input };
}

function intent(
  id: WizardIntentId,
  label: string,
  description: string,
  outcome: string,
  recommendedFlowId: WizardFlowId,
  primaryRoute: WizardRoute,
  secondaryRoute: WizardRoute,
  iconLabel: string,
  safetyBadge: WizardSafetyBadge,
  nextAction: string
): WizardIntent {
  return buildWizardIntent({ id, label, description, outcome, recommendedFlowId, primaryRoute, secondaryRoute, iconLabel, safetyBadge, nextAction });
}

export function buildDefaultWizardIntents(): WizardIntent[] {
  return [
    intent("fix-code", "Fix code", "Start with the file, then preview and validate.", "A reviewed code fix path.", "code-fix", "/code-flow", "/validation", "Fix", "Review first", "Open code flow"),
    intent("try-coding-flow", "Try coding flow", "Run a guided live trial before doing real fix work.", "A safe operator trial from file choice to handoff.", "coding-trial", "/code-flow/trial", "/code-flow", "Trial", "Review first", "Open Coding Trial"),
    intent("inspect-file", "Inspect files", "Read project files without changing them.", "Clear file context.", "file-inspection", "/files", "/ai", "Files", "No file writes", "Open files"),
    intent("run-checks", "Run checks", "Prepare checks and review output safely.", "A validation plan.", "validation", "/validation", "/closed-loop", "Checks", "No auto-run", "Choose checks"),
    intent("review-failure", "Review a failure", "Route pasted output into the next fix step.", "A clear failure review.", "failure-review", "/closed-loop", "/validation", "Fail", "Review first", "Paste output"),
    intent("plan-creative", "Plan creative work", "Choose a creative path and review plans.", "A safe creative plan.", "creative-plan", "/creative", "/artifacts/review", "Create", "Preview only", "Choose path"),
    intent("review-artifact", "Review artifacts", "Check artifact quality and provenance.", "A reviewed artifact handoff.", "artifact-review", "/artifacts/review", "/creative", "Review", "Review first", "Open review"),
    intent("setup-local-tools", "Set up local tools", "Review local readiness without running tools.", "A setup readiness path.", "local-setup", "/local-bridge-health", "/health-probe", "Setup", "No auto-run", "Check setup"),
    intent("review-creative-mvp", "Review creative MVP", "Review the recommended first safe candidate.", "A design-only MVP review.", "creative-mvp-review", "/creative-mvp", "/creative", "MVP", "Design only", "Review candidate"),
    intent("manage-memory", "Manage memory", "Review memory without automatic promotion.", "A memory review path.", "memory-review", "/memory", "/ai", "Memory", "Review first", "Review candidates"),
    intent("audit-product", "Audit product", "Review product readiness and consolidation.", "A readiness audit path.", "product-audit", "/readiness", "/consolidation", "Audit", "Review first", "Open audit"),
  ];
}

export function selectWizardIntent(id: WizardIntentId | null | undefined, intents = buildDefaultWizardIntents()): WizardIntent | null {
  return intents.find((intent) => intent.id === id) ?? null;
}

export function summarizeWizardIntent(intent: WizardIntent): string {
  return `${intent.label}: ${intent.outcome} Next: ${intent.nextAction}.`;
}
