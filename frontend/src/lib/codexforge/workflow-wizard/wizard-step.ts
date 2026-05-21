import type { WizardFlowId, WizardRoute, WizardStep, WizardStepStatus } from "./workflow-wizard-types";

export function buildWizardStep(input: WizardStep): WizardStep {
  return { ...input };
}

function step(flow: WizardFlowId, order: number, title: string, route: WizardRoute, routeLabel: string, instruction: string, status: WizardStepStatus = order === 1 ? "current" : "waiting"): WizardStep {
  return buildWizardStep({
    id: `${flow}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
    order,
    title,
    instruction,
    userActionLabel: title,
    route,
    routeLabel,
    expectedInput: "Your current task context.",
    expectedOutput: "A reviewed next step.",
    safetyNote: "Review first. No auto-run and no file writes from this wizard.",
    advancedDetailSummary: "Advanced policy, route details, and approval boundaries stay secondary.",
    status,
  });
}

export function buildWizardStepsForFlow(flowId: WizardFlowId): WizardStep[] {
  const map: Record<WizardFlowId, WizardStep[]> = {
    "code-fix": [
      step("code-fix", 1, "Pick a file", "/code-flow", "Code Flow", "Choose the file you want to inspect."),
      step("code-fix", 2, "Describe change", "/code-flow", "Code Flow", "Keep the requested change specific."),
      step("code-fix", 3, "Preview patch", "/code-flow", "Code Flow", "Prepare a preview before applying anything."),
      step("code-fix", 4, "Review apply", "/code-flow", "Code Flow", "Review the approval packet before apply."),
      step("code-fix", 5, "Run checks", "/validation", "Validation", "Prepare checks and run them outside the wizard or through the approved runner."),
      step("code-fix", 6, "Review result", "/code-flow", "Code Flow", "Paste or review output and choose the next safe fix step."),
    ],
    "file-inspection": [
      step("file-inspection", 1, "Choose a file", "/files", "Files", "Open the project reader."),
      step("file-inspection", 2, "Read context", "/files", "Files", "Review the selected file."),
      step("file-inspection", 3, "Decide next step", "/start", "Wizard", "Return to the wizard when you know what to do next."),
    ],
    validation: [
      step("validation", 1, "Choose checks", "/validation", "Validation", "Choose the checks you need."),
      step("validation", 2, "Review checklist", "/validation", "Validation", "Review the checklist before any run."),
      step("validation", 3, "Run manually or through approved runner", "/validation", "Validation", "Use the approved route only; this wizard does not run commands."),
      step("validation", 4, "Paste/review output", "/validation", "Validation", "Bring output back for review."),
      step("validation", 5, "Route failures", "/closed-loop", "Closed Loop", "Send failures to the fix loop."),
    ],
    "failure-review": [
      step("failure-review", 1, "Paste output", "/closed-loop", "Closed Loop", "Start from the failure text."),
      step("failure-review", 2, "Pick likely cause", "/closed-loop", "Closed Loop", "Review the smallest likely fix."),
      step("failure-review", 3, "Preview repair", "/files", "Files", "Return to preview before any apply boundary."),
    ],
    "creative-plan": [
      step("creative-plan", 1, "Choose creative path", "/creative", "Creative", "Choose the creative route."),
      step("creative-plan", 2, "Plan adapter preview", "/creative", "Creative", "Review adapter plans only."),
      step("creative-plan", 3, "Review artifacts", "/artifacts/review", "Artifacts", "Review provenance and quality."),
      step("creative-plan", 4, "Check local setup", "/local-bridge-health", "Setup", "Check readiness without running tools."),
      step("creative-plan", 5, "Review MVP candidate", "/creative-mvp", "Creative MVP", "Review the recommended candidate."),
    ],
    "artifact-review": [
      step("artifact-review", 1, "Open artifact review", "/artifacts/review", "Artifacts", "Review the artifact."),
      step("artifact-review", 2, "Check provenance", "/artifacts/review", "Artifacts", "Check source and metadata."),
      step("artifact-review", 3, "Prepare handoff", "/creative", "Creative", "Decide the next safe creative step."),
    ],
    "local-setup": [
      step("local-setup", 1, "Check setup", "/local-bridge-health", "Local setup", "Review setup status."),
      step("local-setup", 2, "Prepare health probe", "/health-probe", "Health Probe", "Prepare a metadata-only setup check."),
      step("local-setup", 3, "Review readiness", "/local-bridge-health", "Local setup", "Review what is ready or blocked."),
      step("local-setup", 4, "Decide next safe action", "/creative-mvp", "Creative MVP", "Choose the next design-only candidate."),
    ],
    "creative-mvp-review": [
      step("creative-mvp-review", 1, "Open MVP candidate", "/creative-mvp", "Creative MVP", "Review the recommended first candidate."),
      step("creative-mvp-review", 2, "Check setup", "/local-bridge-health", "Local setup", "Confirm readiness is understood."),
      step("creative-mvp-review", 3, "Plan next review", "/creative", "Creative", "Return to planning if anything is blocked."),
    ],
    "memory-review": [
      step("memory-review", 1, "Open memory", "/memory", "Memory", "Review memory candidates."),
      step("memory-review", 2, "Review evidence", "/memory", "Memory", "Keep evidence as context, not authority."),
      step("memory-review", 3, "Choose next task", "/start", "Wizard", "Return to the wizard."),
    ],
    "product-audit": [
      step("product-audit", 1, "Open readiness", "/readiness", "Readiness", "Review product readiness."),
      step("product-audit", 2, "Open consolidation", "/consolidation", "Consolidation", "Review consolidation recommendations."),
      step("product-audit", 3, "Choose next workflow", "/start", "Wizard", "Start the next real workflow."),
    ],
  };
  return map[flowId].map((item) => ({ ...item }));
}

export function summarizeWizardStep(step: WizardStep): string {
  return `${step.order}. ${step.title}: ${step.instruction}`;
}
