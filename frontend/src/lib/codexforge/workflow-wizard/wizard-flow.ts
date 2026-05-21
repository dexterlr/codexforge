import type { WizardFlow, WizardFlowId, WizardIntent, WizardRoute } from "./workflow-wizard-types";
import { buildWizardStepsForFlow } from "./wizard-step";

export function buildWizardFlow(input: Omit<WizardFlow, "steps"> & { steps?: WizardFlow["steps"] }): WizardFlow {
  return { ...input, steps: input.steps ?? buildWizardStepsForFlow(input.id) };
}

function flow(id: WizardFlowId, title: string, description: string, primaryAction: string, finalHandoffRoute: WizardRoute, advancedRoutesHidden: WizardRoute[] = []): WizardFlow {
  const steps = buildWizardStepsForFlow(id);
  return buildWizardFlow({
    id,
    title,
    description,
    steps,
    primaryAction,
    estimatedStepCountLabel: `${steps.length} steps`,
    status: "ready",
    advancedRoutesHidden,
    safetySummary: "Review first, approval required where needed, no auto-run.",
    finalHandoffRoute,
  });
}

export function buildDefaultWizardFlows(): WizardFlow[] {
  return [
    flow("code-fix", "Code fix", "Inspect a file, preview the change, then validate.", "Start code fix", "/files", ["/readiness", "/consolidation"]),
    flow("file-inspection", "File inspection", "Read files safely before choosing a change.", "Inspect files", "/files"),
    flow("validation", "Validation", "Prepare checks and review results.", "Start validation", "/validation"),
    flow("failure-review", "Failure review", "Turn a failure into the next reviewed fix step.", "Review failure", "/closed-loop"),
    flow("creative-plan", "Creative plan", "Choose a creative path and review plans before tools.", "Start creative plan", "/creative", ["/health-probe"]),
    flow("artifact-review", "Artifact review", "Review artifacts, provenance, and handoff.", "Review artifacts", "/artifacts/review"),
    flow("local-setup", "Local setup", "Check local tool readiness without running tools.", "Check setup", "/local-bridge-health"),
    flow("creative-mvp-review", "Creative MVP review", "Review the recommended first safe candidate.", "Review MVP candidate", "/creative-mvp"),
    flow("memory-review", "Memory review", "Review memory without automatic promotion.", "Review memory", "/memory"),
    flow("product-audit", "Product audit", "Review readiness and consolidation.", "Audit product", "/readiness"),
  ];
}

export function selectWizardFlowForIntent(intent: WizardIntent | null, flows = buildDefaultWizardFlows()): WizardFlow | null {
  if (!intent) return null;
  return flows.find((flow) => flow.id === intent.recommendedFlowId) ?? null;
}

export function summarizeWizardFlow(flow: WizardFlow): string {
  return `${flow.title}: ${flow.description} ${flow.estimatedStepCountLabel}.`;
}
