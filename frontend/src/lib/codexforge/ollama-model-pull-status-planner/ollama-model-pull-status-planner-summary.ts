import type {
  OllamaModelPullStatusBoundary,
  OllamaModelPullStatusPlan,
  OllamaModelPullStatusPlannerModel,
} from "./ollama-model-pull-status-planner-types";
import { buildOllamaModelPlannerStableKey } from "./ollama-model-pull-status-planner-types";

export function buildOllamaModelPullStatusPlan(
  input: Omit<OllamaModelPullStatusPlan, "id" | "localRuntimeTarget" | "secretPosture"> & { idHint: string }
): OllamaModelPullStatusPlan {
  const { idHint, ...plan } = input;
  return {
    id: buildOllamaModelPlannerStableKey("ollama-plan", idHint, input.requestedModel),
    localRuntimeTarget: "Ollama local runtime",
    secretPosture: "no secrets",
    ...plan,
  };
}

export function buildOllamaModelPullStatusPlans(): OllamaModelPullStatusPlan[] {
  return [
    buildOllamaModelPullStatusPlan({
      idHint: "coding-draft",
      requestedModel: "Operator-selected coding or reasoning model",
      pullReadiness: "manual-ready",
      statusCheckReadiness: "approved-local-boundary-required",
      diskVramNote: "Check disk and VRAM manually before pulling; CodexForge does not inspect drives or GPUs from this UI.",
      networkDownloadApprovalNote: "Network/download approval note: model pulls are manual and require operator approval outside this page.",
      manualCommandHandoff: "Manual command handoff: copy the requested model name and run Ollama yourself from a trusted terminal.",
      localOnlyRuntimeNote: "Local-only runtime note: planning targets local Ollama, not a cloud provider.",
      cancelRetryGuidance: "Cancel/retry guidance: cancel from your terminal or Ollama runtime, then retry manually after disk and network approval.",
    }),
    buildOllamaModelPullStatusPlan({
      idHint: "creative-prompt",
      requestedModel: "Operator-selected creative prompt assistant model",
      pullReadiness: "manual-ready",
      statusCheckReadiness: "approved-local-boundary-required",
      diskVramNote: "Creative prompt work can often use smaller local models; exact fit remains manual until inventory is approved.",
      networkDownloadApprovalNote: "Do not download models from CodexForge. Future approved local daemon only may report readiness.",
      manualCommandHandoff: "Manual command handoff: keep the model name and any pull notes as copy-only operator guidance.",
      localOnlyRuntimeNote: "Local-only runtime note: local prompts stay local unless the operator later chooses a reviewed cloud route.",
      cancelRetryGuidance: "Cancel/retry guidance: stop the manual pull outside CodexForge, confirm partial files yourself, and retry only after approval.",
    }),
  ];
}

export function buildOllamaModelPullStatusBoundary(): OllamaModelPullStatusBoundary {
  return {
    localOnly: true,
    modelPullsManual: true,
    futureApprovedLocalDaemonOnly: true,
    livePullButtonAllowed: false,
    ollamaApiCallsAllowed: false,
    downloadsAllowed: false,
    shellCommandsAllowed: false,
    credentialsStored: false,
    liveStatusClaimAllowed: false,
  };
}

export function summarizeOllamaModelPullStatusPlanner(
  model: Pick<OllamaModelPullStatusPlannerModel, "plans">
): string {
  return `Ollama model pull and status planner prepares ${model.plans.length} manual local model plan(s). Model pulls are manual. Future approved local daemon only may report live status. No live pull button.`;
}

export function buildOllamaModelPullStatusPlannerModel(): OllamaModelPullStatusPlannerModel {
  const plans = buildOllamaModelPullStatusPlans();
  const model: OllamaModelPullStatusPlannerModel = {
    title: "Ollama model pull and status planner",
    summary: "",
    plans,
    boundary: buildOllamaModelPullStatusBoundary(),
    advancedDetails: [
      "Ollama model pull and status planner",
      "Model pulls are manual",
      "Future approved local daemon only",
      "Manual command handoff",
      "Do not download models",
      "No live pull button",
      "No Ollama APIs from arbitrary UI",
      "No shell command execution",
    ],
  };
  return { ...model, summary: summarizeOllamaModelPullStatusPlanner(model) };
}
