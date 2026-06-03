import { PROVIDER_LIVE_TEST_GATE_SHARED_LANGUAGE } from "../provider-live-test-gate";
import type {
  ClaudeAnthropicLiveTestBoundary,
  ClaudeAnthropicLiveTestModel,
  ClaudeAnthropicLiveTestPlan,
} from "./claude-anthropic-live-test-types";
import { buildClaudeAnthropicLiveTestStableKey } from "./claude-anthropic-live-test-types";

export function buildClaudeAnthropicLiveTestPlan(
  input: Omit<ClaudeAnthropicLiveTestPlan, "id" | "gateRoute"> & { idHint: string }
): ClaudeAnthropicLiveTestPlan {
  const { idHint, ...plan } = input;
  return {
    id: buildClaudeAnthropicLiveTestStableKey("claude-anthropic-live-test", idHint, input.liveTestGateStatus),
    gateRoute: "/provider-live-test-gate",
    ...plan,
  };
}

export function buildClaudeAnthropicLiveTestPlans(): ClaudeAnthropicLiveTestPlan[] {
  return [
    buildClaudeAnthropicLiveTestPlan({
      idHint: "official-api-profile",
      providerProfile:
        "Provider profile: Claude/Anthropic API profile selected as metadata only, with no secret value shown or stored.",
      modelFamily:
        "Model family: Claude reasoning, writing, coding review, summarization, and long-context family selected by the operator.",
      credentialReadiness: "official-api-reference-missing",
      approvedTestPromptSummary:
        "Approved test prompt summary: one short reviewed prompt, no files, no memory payload, and no automatic send.",
      privacyReview:
        "Privacy review required: confirm no private code, files, secrets, account data, or sensitive memory are included.",
      spendTokenLimit:
        "Spend/token limit: tiny capped request with no automatic retry loop and no production workload.",
      expectedResponseShape:
        "Expected response shape: provider, model family, short response text, status, token/spend note, and blocked/error reason.",
      liveTestGateStatus: "blocked-until-approved",
      resultHandoff:
        "Result handoff: only a provided reviewed result can be displayed as evidence; this page does not claim success.",
      blockedReasons: [
        "Privacy review required",
        "Live-test gate status is not approved",
        "Do not call Anthropic APIs from arbitrary UI",
      ],
    }),
    buildClaudeAnthropicLiveTestPlan({
      idHint: "manual-claude-subscription",
      providerProfile:
        "Provider profile: manual Claude subscription remains browser handoff only with no login automation.",
      modelFamily:
        "Model family: Claude manual review and writing handoff chosen by the operator outside CodexForge.",
      credentialReadiness: "manual-browser-only",
      approvedTestPromptSummary:
        "Approved test prompt summary: manual copy prompt only, never auto-sent by CodexForge.",
      privacyReview:
        "Privacy review required: the operator reviews what they paste into a browser and brings back only safe output.",
      spendTokenLimit:
        "Spend/token limit: manual subscription usage still needs a prompt size note and result handoff boundary.",
      expectedResponseShape:
        "Expected response shape: pasted result summary, model label if known, and manual handoff notes.",
      liveTestGateStatus: "handoff-only",
      resultHandoff:
        "Result handoff: reviewed manual output can be pasted back without passwords, cookies, or account data.",
      blockedReasons: [
        "Manual browser handoff only",
        "No password or browser cookie storage",
        "No automatic provider send",
      ],
    }),
  ];
}

export function buildClaudeAnthropicLiveTestBoundary(): ClaudeAnthropicLiveTestBoundary {
  return {
    noAutomaticLiveTest: true,
    anthropicApiCallsAllowedFromUi: false,
    credentialDisplayAllowed: false,
    promptOrFileAutoSendAllowed: false,
    browserLoginAutomationAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    privacyReviewRequired: true,
  };
}

export function summarizeClaudeAnthropicLiveTest(
  model: Pick<ClaudeAnthropicLiveTestModel, "plans">
): string {
  return `Claude Anthropic live test prepares ${model.plans.length} readiness plan(s). Claude and Anthropic provider readiness follows the central live-test gate with privacy review required.`;
}

export function buildClaudeAnthropicLiveTestModel(): ClaudeAnthropicLiveTestModel {
  const plans = buildClaudeAnthropicLiveTestPlans();
  const model: ClaudeAnthropicLiveTestModel = {
    title: "Claude Anthropic live test",
    summary: "",
    plans,
    boundary: buildClaudeAnthropicLiveTestBoundary(),
    gateLanguage: [
      "Claude Anthropic live test",
      "Claude and Anthropic provider readiness",
      "Privacy review required",
      "Do not call Anthropic APIs from arbitrary UI",
      "Live-test gate status",
      "Result handoff",
      ...PROVIDER_LIVE_TEST_GATE_SHARED_LANGUAGE,
    ],
    advancedDetails: [
      "Claude Anthropic live test",
      "Claude and Anthropic provider readiness",
      "Privacy review required",
      "Do not call Anthropic APIs from arbitrary UI",
      "Live-test gate status",
      "Result handoff",
      "No live test runs automatically",
      "Secrets are never displayed",
      "No browser login automation",
      "No automatic provider send",
    ],
  };
  return { ...model, summary: summarizeClaudeAnthropicLiveTest(model) };
}
