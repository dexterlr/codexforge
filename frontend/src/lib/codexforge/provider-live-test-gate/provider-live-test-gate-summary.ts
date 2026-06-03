import type {
  ProviderLiveTestGateBoundary,
  ProviderLiveTestGateChecklist,
  ProviderLiveTestGateModel,
} from "./provider-live-test-gate-types";
import { buildProviderLiveTestGateStableKey } from "./provider-live-test-gate-types";

export const PROVIDER_LIVE_TEST_GATE_SHARED_LANGUAGE = [
  "No live test runs automatically",
  "Secrets are never displayed",
  "Explicit approval required before network call",
  "Spend and token limit",
  "Prompts and files are not sent without approval",
  "Execution remains behind the approved provider live-test boundary",
] as const;

export function buildProviderLiveTestGateChecklist(
  input: Omit<ProviderLiveTestGateChecklist, "id"> & { idHint: string }
): ProviderLiveTestGateChecklist {
  const { idHint, ...checklist } = input;
  return {
    id: buildProviderLiveTestGateStableKey("provider-live-test-gate", idHint, input.gateStatus),
    ...checklist,
  };
}

export function buildProviderLiveTestGateChecklists(): ProviderLiveTestGateChecklist[] {
  return [
    buildProviderLiveTestGateChecklist({
      idHint: "reviewed-cloud-provider",
      providerProfileSummary:
        "Provider profile summary: a named cloud provider profile is selected, but CodexForge stores metadata only.",
      credentialReadiness: "credential-reference-missing",
      testScope:
        "Test scope: one reviewed connectivity and response-shape check, never a production workflow or hidden prompt send.",
      approvedTestPromptSummary:
        "Approved test prompt summary: a short operator-reviewed prompt only, with no files and no private project context.",
      spendTokenLimit:
        "Spend and token limit: cap the request to a tiny test budget before approval; no unlimited retry loop.",
      networkCallApproval:
        "Explicit approval required before network call, including provider, endpoint class, model, prompt summary, and limit.",
      privacyReview:
        "Privacy review: confirm no files, secrets, private code, or sensitive memory are included in the test.",
      expectedResponseShape:
        "Expected response shape: status, provider name, model name, short text result, token/spend note, and blocked/error reason if any.",
      auditHandoffSummary:
        "Audit/handoff summary: capture who approved, what was sent, expected response shape, and result evidence without displaying secrets.",
      blockedReasons: [
        "No credential reference has been reviewed",
        "No explicit network approval recorded",
        "No approved provider live-test boundary is connected",
      ],
      gateStatus: "blocked",
      executionBoundary:
        "Execution remains behind the approved provider live-test boundary; this UI does not call cloud providers.",
    }),
    buildProviderLiveTestGateChecklist({
      idHint: "reviewed-local-compatible-runtime",
      providerProfileSummary:
        "Provider profile summary: a local OpenAI-compatible runtime can be named for planning, but live status is not claimed here.",
      credentialReadiness: "manual-only",
      testScope:
        "Test scope: local loopback-only readiness handoff after the operator starts the runtime deliberately.",
      approvedTestPromptSummary:
        "Approved test prompt summary: a tiny local test prompt with no files and no automatic cloud fallback.",
      spendTokenLimit:
        "Spend and token limit: local tests still need a context/token limit so the operator knows what will run.",
      networkCallApproval:
        "Explicit approval required before network call, even for a local runtime, because prompts are still payloads.",
      privacyReview:
        "Privacy review: confirm the runtime is local, the model is operator-selected, and no files are attached.",
      expectedResponseShape:
        "Expected response shape: local runtime name, model label, short response, elapsed/status note, and handoff result.",
      auditHandoffSummary:
        "Audit/handoff summary: record local runtime identity, prompt summary, token limit, and returned status without secrets.",
      blockedReasons: [
        "Approved local live-test boundary required",
        "Local runtime status is not probed by arbitrary UI",
      ],
      gateStatus: "handoff-only",
      executionBoundary:
        "Execution remains behind the approved provider live-test boundary; this surface prepares the handoff only.",
    }),
  ];
}

export function buildProviderLiveTestGateBoundary(): ProviderLiveTestGateBoundary {
  return {
    noAutomaticLiveTest: true,
    secretsDisplayedAllowed: false,
    promptOrFileAutoSendAllowed: false,
    networkCallRequiresExplicitApproval: true,
    providerRegistryMutationAllowed: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    arbitraryCloudCallsAllowed: false,
    backendBoundaryRequired: true,
  };
}

export function summarizeProviderLiveTestGate(
  model: Pick<ProviderLiveTestGateModel, "checklists">
): string {
  return `AI provider live test gate prepares ${model.checklists.length} reviewed live-test handoff path(s). No live test runs automatically. Secrets are never displayed. Prompts and files are not sent without approval.`;
}

export function buildProviderLiveTestGateModel(): ProviderLiveTestGateModel {
  const checklists = buildProviderLiveTestGateChecklists();
  const model: ProviderLiveTestGateModel = {
    title: "AI provider live test gate",
    summary: "",
    checklists,
    boundary: buildProviderLiveTestGateBoundary(),
    sharedGateLanguage: [...PROVIDER_LIVE_TEST_GATE_SHARED_LANGUAGE],
    advancedDetails: [
      "AI provider live test gate",
      "No live test runs automatically",
      "Secrets are never displayed",
      "Explicit approval required before network call",
      "Spend and token limit",
      "Prompts and files are not sent without approval",
      "Expected response shape is reviewed before execution",
      "Audit/handoff summary records result evidence without secrets",
      "No provider registry mutation",
      "No Brain graph mutation from UI",
      "No memory auto-promotion",
    ],
  };
  return { ...model, summary: summarizeProviderLiveTestGate(model) };
}
