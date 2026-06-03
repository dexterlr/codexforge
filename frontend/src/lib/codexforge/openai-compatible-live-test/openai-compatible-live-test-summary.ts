import { PROVIDER_LIVE_TEST_GATE_SHARED_LANGUAGE } from "../provider-live-test-gate";
import type {
  OpenAiCompatibleLiveTestBoundary,
  OpenAiCompatibleLiveTestModel,
  OpenAiCompatibleLiveTestPlan,
} from "./openai-compatible-live-test-types";
import { buildOpenAiCompatibleLiveTestStableKey } from "./openai-compatible-live-test-types";

export function buildOpenAiCompatibleLiveTestPlan(
  input: Omit<OpenAiCompatibleLiveTestPlan, "id" | "gateRoute"> & { idHint: string }
): OpenAiCompatibleLiveTestPlan {
  const { idHint, ...plan } = input;
  return {
    id: buildOpenAiCompatibleLiveTestStableKey("openai-compatible-live-test", idHint, input.liveTestGateStatus),
    gateRoute: "/provider-live-test-gate",
    ...plan,
  };
}

export function buildOpenAiCompatibleLiveTestPlans(): OpenAiCompatibleLiveTestPlan[] {
  return [
    buildOpenAiCompatibleLiveTestPlan({
      idHint: "reviewed-openai-compatible-cloud",
      providerRuntimeIdentity:
        "Provider/runtime identity: reviewed OpenAI-compatible cloud profile with visible provider name and endpoint class.",
      endpointPolicy:
        "Endpoint policy: use only the reviewed endpoint class for this provider; custom endpoints need separate review.",
      modelSelection:
        "Model selection: operator-selected model label, with no live pricing or capability success claim from this page.",
      credentialReadiness: "env-reference-missing",
      approvedTestPromptSummary:
        "Approved test prompt summary: one short health prompt, no files, no hidden project context, no automatic provider send.",
      tokenSpendLimit:
        "Token and spend limit: tiny capped request approved before execution, with no automatic retries.",
      expectedResponseShape:
        "Expected response shape: provider, model, short response text, status, token/spend note, and error or blocked reason.",
      liveTestGateStatus: "blocked-until-approved",
      localVsCloudClassification: "cloud-provider",
      resultHandoff:
        "Result handoff: paste or review a provided result; do not claim success without a provided result.",
      blockedReasons: [
        "Live-test gate status is not approved",
        "Credential readiness is reference-only and secret values stay outside the UI",
        "No backend provider live-test boundary is connected",
      ],
    }),
    buildOpenAiCompatibleLiveTestPlan({
      idHint: "reviewed-local-compatible-runtime",
      providerRuntimeIdentity:
        "Provider/runtime identity: local OpenAI-compatible runtime such as LM Studio when the operator starts it deliberately.",
      endpointPolicy:
        "Endpoint policy: local loopback-compatible runtime only after approved local boundary review.",
      modelSelection:
        "Model selection: locally loaded model label confirmed by the operator, not discovered by arbitrary UI.",
      credentialReadiness: "local-runtime-manual",
      approvedTestPromptSummary:
        "Approved test prompt summary: tiny local prompt only, with no cloud fallback and no file attachment.",
      tokenSpendLimit:
        "Token and spend limit: context limit is reviewed even when spend is local compute rather than cloud billing.",
      expectedResponseShape:
        "Expected response shape: local runtime label, model label, short response, status, and handoff note.",
      liveTestGateStatus: "handoff-only",
      localVsCloudClassification: "local-compatible-runtime",
      resultHandoff:
        "Result handoff: local test output must be provided by the approved boundary before the UI can show it as evidence.",
      blockedReasons: [
        "Approved local live-test boundary required",
        "No local runtime calls from arbitrary UI",
        "No success claim without provided result",
      ],
    }),
  ];
}

export function buildOpenAiCompatibleLiveTestBoundary(): OpenAiCompatibleLiveTestBoundary {
  return {
    noAutomaticLiveTest: true,
    providerApiCallsAllowedFromUi: false,
    localRuntimeCallsAllowedFromUi: false,
    credentialDisplayAllowed: false,
    promptOrFileAutoSendAllowed: false,
    successClaimWithoutProvidedResultAllowed: false,
    localStorageApiKeyStorageAllowed: false,
  };
}

export function summarizeOpenAiCompatibleLiveTest(
  model: Pick<OpenAiCompatibleLiveTestModel, "plans">
): string {
  return `OpenAI-compatible live test prepares ${model.plans.length} readiness plan(s). OpenAI-compatible provider readiness goes through the central live-test gate. Do not claim success without a provided result.`;
}

export function buildOpenAiCompatibleLiveTestModel(): OpenAiCompatibleLiveTestModel {
  const plans = buildOpenAiCompatibleLiveTestPlans();
  const model: OpenAiCompatibleLiveTestModel = {
    title: "OpenAI-compatible live test",
    summary: "",
    plans,
    boundary: buildOpenAiCompatibleLiveTestBoundary(),
    gateLanguage: [
      "OpenAI-compatible live test",
      "OpenAI-compatible provider readiness",
      "Local-vs-cloud classification",
      "Do not claim success without a provided result",
      "Live-test gate status",
      "Token and spend limit",
      ...PROVIDER_LIVE_TEST_GATE_SHARED_LANGUAGE,
    ],
    advancedDetails: [
      "OpenAI-compatible live test",
      "OpenAI-compatible provider readiness",
      "Local-vs-cloud classification",
      "Do not claim success without a provided result",
      "Live-test gate status",
      "Token and spend limit",
      "No live test runs automatically",
      "Secrets are never displayed",
      "Prompts and files are not sent without approval",
      "No provider API calls from arbitrary UI",
      "No localStorage API key storage",
    ],
  };
  return { ...model, summary: summarizeOpenAiCompatibleLiveTest(model) };
}
