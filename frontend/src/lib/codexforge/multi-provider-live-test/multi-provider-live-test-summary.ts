import { PROVIDER_LIVE_TEST_GATE_SHARED_LANGUAGE } from "../provider-live-test-gate";
import type {
  MultiProviderLiveTestBoundary,
  MultiProviderLiveTestModel,
  MultiProviderLiveTestPlan,
} from "./multi-provider-live-test-types";
import { buildMultiProviderLiveTestStableKey } from "./multi-provider-live-test-types";

export function buildMultiProviderLiveTestPlan(
  input: Omit<MultiProviderLiveTestPlan, "id" | "gateRoute"> & { idHint: string }
): MultiProviderLiveTestPlan {
  const { idHint, ...plan } = input;
  return {
    id: buildMultiProviderLiveTestStableKey("multi-provider-live-test", idHint, input.selectedProvider),
    gateRoute: "/provider-live-test-gate",
    ...plan,
  };
}

export function buildMultiProviderLiveTestPlans(): MultiProviderLiveTestPlan[] {
  return [
    buildMultiProviderLiveTestPlan({
      idHint: "gemini-readiness",
      selectedProvider: "Gemini",
      modelRuntimeIdentity:
        "Model/runtime identity: Gemini model family selected by the operator for a reviewed cloud API profile.",
      credentialReadiness: "credential-reference-missing",
      endpointNetworkPolicy:
        "Endpoint and network policy: provider endpoint class must be reviewed before any live call.",
      approvedTestPromptSummary:
        "Approved test prompt summary: short text prompt only, no files, no private code, and no automatic send.",
      spendTokenLimit:
        "Spend/token limit: tiny request cap reviewed before execution, with no automatic retry loop.",
      privacyReview:
        "Privacy review: Gemini multimodal paths stay disabled unless the operator explicitly approves the payload type.",
      expectedResponseShape:
        "Expected response shape: selected provider, model label, short response, status, spend/token note, and blocked/error reason.",
      liveTestGateStatus: "blocked-until-approved",
      providerSpecificBlockedReasons: [
        "Multimodal payloads need separate privacy review",
        "Live-test gate status is not approved",
        "Do not call provider APIs from arbitrary UI",
      ],
      resultHandoff:
        "Result handoff: provided result must be reviewed before CodexForge records readiness evidence.",
    }),
    buildMultiProviderLiveTestPlan({
      idHint: "deepseek-readiness",
      selectedProvider: "DeepSeek",
      modelRuntimeIdentity:
        "Model/runtime identity: DeepSeek model or compatible endpoint selected with provider identity visible.",
      credentialReadiness: "credential-reference-missing",
      endpointNetworkPolicy:
        "Endpoint and network policy: direct provider and compatible endpoint routes must stay distinct in the approval packet.",
      approvedTestPromptSummary:
        "Approved test prompt summary: one small text prompt, no files, and no hidden routing fallback.",
      spendTokenLimit:
        "Spend/token limit: small cap reviewed before execution; no live pricing claim is made here.",
      privacyReview:
        "Privacy review: confirm the task is low-risk text only and does not include sensitive project context.",
      expectedResponseShape:
        "Expected response shape: selected provider, endpoint class, model label, short response, status, and blocked/error reason.",
      liveTestGateStatus: "provider-review-required",
      providerSpecificBlockedReasons: [
        "Provider identity and endpoint class must be reviewed",
        "No hidden fallback through a compatible route",
        "Do not call provider APIs from arbitrary UI",
      ],
      resultHandoff:
        "Result handoff: route evidence stays separate for direct provider versus compatible endpoint use.",
    }),
    buildMultiProviderLiveTestPlan({
      idHint: "openrouter-readiness",
      selectedProvider: "OpenRouter",
      modelRuntimeIdentity:
        "Model/runtime identity: OpenRouter aggregator route with downstream model identity visible before approval.",
      credentialReadiness: "aggregator-reference-required",
      endpointNetworkPolicy:
        "Endpoint and network policy: aggregator-cloud route must identify selected downstream provider and model.",
      approvedTestPromptSummary:
        "Approved test prompt summary: one tiny prompt with no files, no private context, and no automatic provider send.",
      spendTokenLimit:
        "Spend/token limit: tiny request cap, selected model noted, and no automatic fallback chain.",
      privacyReview:
        "Privacy review: aggregator-cloud posture means downstream provider visibility is required before approval.",
      expectedResponseShape:
        "Expected response shape: aggregator, downstream provider if known, model label, short response, status, and spend/token note.",
      liveTestGateStatus: "blocked-until-approved",
      providerSpecificBlockedReasons: [
        "Downstream model identity must be visible",
        "No silent provider fallback",
        "Do not call provider APIs from arbitrary UI",
      ],
      resultHandoff:
        "Result handoff: copy the provider/model route and reviewed response shape into the audit note without secrets.",
    }),
  ];
}

export function buildMultiProviderLiveTestBoundary(): MultiProviderLiveTestBoundary {
  return {
    noAutomaticLiveTest: true,
    providerApiCallsAllowedFromUi: false,
    credentialDisplayAllowed: false,
    promptOrFileAutoSendAllowed: false,
    providerSpecificShortcutAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    providerRegistryMutationAllowed: false,
  };
}

export function summarizeMultiProviderLiveTest(
  model: Pick<MultiProviderLiveTestModel, "plans">
): string {
  return `Gemini DeepSeek OpenRouter live test prepares ${model.plans.length} multi-provider readiness plan(s). Multi-provider readiness uses the same central live-test gate and no provider-specific unsafe shortcuts.`;
}

export function buildMultiProviderLiveTestModel(): MultiProviderLiveTestModel {
  const plans = buildMultiProviderLiveTestPlans();
  const model: MultiProviderLiveTestModel = {
    title: "Gemini DeepSeek OpenRouter live test",
    summary: "",
    plans,
    boundary: buildMultiProviderLiveTestBoundary(),
    gateLanguage: [
      "Gemini DeepSeek OpenRouter live test",
      "Multi-provider readiness",
      "Provider-specific blocked reasons",
      "Do not call provider APIs from arbitrary UI",
      "Endpoint and network policy",
      "Live-test gate status",
      ...PROVIDER_LIVE_TEST_GATE_SHARED_LANGUAGE,
    ],
    advancedDetails: [
      "Gemini DeepSeek OpenRouter live test",
      "Multi-provider readiness",
      "Provider-specific blocked reasons",
      "Do not call provider APIs from arbitrary UI",
      "Endpoint and network policy",
      "Live-test gate status",
      "No live test runs automatically",
      "Secrets are never displayed",
      "Prompts and files are not sent without approval",
      "No silent provider fallback",
      "No provider registry mutation",
    ],
  };
  return { ...model, summary: summarizeMultiProviderLiveTest(model) };
}
