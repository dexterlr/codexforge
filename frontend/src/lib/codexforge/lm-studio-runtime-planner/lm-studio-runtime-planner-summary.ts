import type {
  LmStudioRuntimePlan,
  LmStudioRuntimePlannerBoundary,
  LmStudioRuntimePlannerModel,
} from "./lm-studio-runtime-planner-types";
import { buildLmStudioRuntimePlannerStableKey } from "./lm-studio-runtime-planner-types";

export function buildLmStudioRuntimePlan(
  input: Omit<LmStudioRuntimePlan, "id"> & { idHint: string }
): LmStudioRuntimePlan {
  const { idHint, ...plan } = input;
  return {
    id: buildLmStudioRuntimePlannerStableKey("lm-studio-plan", idHint, input.nextRoute),
    ...plan,
  };
}

export function buildLmStudioRuntimePlans(): LmStudioRuntimePlan[] {
  return [
    buildLmStudioRuntimePlan({
      idHint: "openai-compatible-local",
      runtimeEndpointPolicy: "Runtime endpoint policy: use loopback localhost only, operator-entered outside CodexForge, and never stored as a secret.",
      modelSelectionReadiness: "manual-ready",
      localServerReadiness: "approved-boundary-required",
      openAiCompatibleAdapterFit: "Local OpenAI-compatible runtime fits provider adapter planning when the operator starts LM Studio deliberately.",
      contextTokenNote: "Context/token note: choose context size in LM Studio; CodexForge records the planning note without probing the server.",
      privacyNote: "Privacy note: local prompts stay on the workstation only if the operator keeps the runtime local and no cloud fallback is selected.",
      manualSetupGuidance: "Manual setup guidance: load a model, enable the local server yourself, and return to CodexForge for planning status.",
      localOnlyTestingNote: "Local-only testing note: Approved local live-test boundary required before any live test claim.",
      blockedReasons: [
        "No LM Studio API calls from arbitrary UI",
        "No endpoint secrets stored",
        "No cloud provider APIs",
      ],
      nextRoute: "/provider-adapters",
    }),
    buildLmStudioRuntimePlan({
      idHint: "creative-prompt-runtime",
      runtimeEndpointPolicy: "Runtime endpoint policy: creative prompt assistance remains planning-only unless an approved local boundary exists.",
      modelSelectionReadiness: "manual-ready",
      localServerReadiness: "approved-boundary-required",
      openAiCompatibleAdapterFit: "Fits local prompt assistant handoff and task router private prepass routes.",
      contextTokenNote: "Context/token note: longer prompts need a model and context window that the operator confirms manually.",
      privacyNote: "Privacy note: no cloud provider APIs are called and prompts are not sent automatically.",
      manualSetupGuidance: "Manual setup guidance: pick a loaded model in LM Studio, then use local-only readiness notes before any live test.",
      localOnlyTestingNote: "Local-only testing note: no live chat/test is claimed from this UI.",
      blockedReasons: [
        "Approved local live-test boundary required",
        "No cloud fallback from this planner",
        "No process.env value display",
      ],
      nextRoute: "/local-model-manager",
    }),
  ];
}

export function buildLmStudioRuntimePlannerBoundary(): LmStudioRuntimePlannerBoundary {
  return {
    localOnly: true,
    approvedLocalLiveTestBoundaryRequired: true,
    lmStudioApiCallsAllowed: false,
    endpointSecretStorageAllowed: false,
    cloudProviderApiCallsAllowed: false,
    liveChatTestAllowed: false,
    envValueDisplayAllowed: false,
  };
}

export function summarizeLmStudioRuntimePlanner(
  model: Pick<LmStudioRuntimePlannerModel, "plans">
): string {
  return `LM Studio runtime planner prepares ${model.plans.length} Local OpenAI-compatible runtime plan(s). Manual setup guidance stays visible, and Approved local live-test boundary required before live status or chat tests.`;
}

export function buildLmStudioRuntimePlannerModel(): LmStudioRuntimePlannerModel {
  const plans = buildLmStudioRuntimePlans();
  const model: LmStudioRuntimePlannerModel = {
    title: "LM Studio runtime planner",
    summary: "",
    plans,
    boundary: buildLmStudioRuntimePlannerBoundary(),
    advancedDetails: [
      "LM Studio runtime planner",
      "Local OpenAI-compatible runtime",
      "Manual setup guidance",
      "Local-only testing note",
      "No cloud provider APIs",
      "Approved local live-test boundary required",
      "No endpoint secrets stored",
      "No live chat/test claim",
    ],
  };
  return { ...model, summary: summarizeLmStudioRuntimePlanner(model) };
}
