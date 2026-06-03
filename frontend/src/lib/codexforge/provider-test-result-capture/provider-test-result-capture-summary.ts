import type {
  ProviderTestResultCaptureBoundary,
  ProviderTestResultCaptureModel,
  ProviderTestResultCaptureRecord,
} from "./provider-test-result-capture-types";
import { buildProviderTestResultCaptureStableKey } from "./provider-test-result-capture-types";

export const PROVIDER_TEST_RESULT_CAPTURE_LANGUAGE = [
  "Provider test result capture",
  "Do not claim success without reviewed result evidence",
  "Raw response details stay secondary",
  "No secrets are captured",
  "Reviewed prompt summary",
  "Result handoff copy",
  "No live test runs automatically",
  "No provider registry mutation",
  "No memory auto-promotion",
] as const;

export function buildProviderTestResultCaptureRecord(
  input: Omit<ProviderTestResultCaptureRecord, "id" | "liveTestGateReference"> & { idHint: string }
): ProviderTestResultCaptureRecord {
  const { idHint, ...record } = input;
  return {
    id: buildProviderTestResultCaptureStableKey("provider-test-result-capture", idHint, input.resultStatus),
    liveTestGateReference: "/provider-live-test-gate",
    ...record,
  };
}

export function buildProviderTestResultCaptureRecords(): ProviderTestResultCaptureRecord[] {
  return [
    buildProviderTestResultCaptureRecord({
      idHint: "reviewed-local-runtime",
      providerProfileSummary:
        "Provider profile summary: local compatible runtime profile, operator-reviewed metadata only, no credential value.",
      testScope:
        "Test scope: single health-style response review from an approved live-test boundary, not a production workflow.",
      reviewedPromptSummary:
        "Reviewed prompt summary: tiny operator-approved prompt with no files, no private project context, and no automatic provider send.",
      resultStatus: "needs review",
      responseSummary:
        "Response summary: waiting for reviewed evidence; the UI does not treat a planned test as success.",
      latencySummary:
        "Latency summary: operator-entered elapsed range can be recorded after review; no timing probe runs here.",
      tokenCostEstimateSummary:
        "Token and cost estimate summary: rough review note only, not billing truth and not a spend trigger.",
      privacyNotes:
        "Privacy notes: no secrets, file contents, private code, or memory payloads are captured by this surface.",
      nextRecommendedRoute: "/provider-cost-latency-comparison",
      handoffCopy:
        "Result handoff copy: provider, model, gate reference, prompt summary, reviewed status, response summary, latency note, estimate note, privacy note, and next route.",
      rawResponseDetails:
        "Raw response details stay secondary and should be pasted only as a short reviewed excerpt with secrets removed.",
    }),
    buildProviderTestResultCaptureRecord({
      idHint: "blocked-cloud-profile",
      providerProfileSummary:
        "Provider profile summary: cloud provider profile can be named for review, but credential values remain outside CodexForge UI.",
      testScope:
        "Test scope: blocked until the live-test gate records explicit network, prompt, and spend approval.",
      reviewedPromptSummary:
        "Reviewed prompt summary: no reviewed prompt has been approved, so the result cannot be marked passed.",
      resultStatus: "blocked",
      responseSummary:
        "Response summary: blocked means there is no provider response evidence to store or promote.",
      latencySummary:
        "Latency summary: unavailable until a reviewed result is supplied by the approved boundary.",
      tokenCostEstimateSummary:
        "Token and cost estimate summary: unavailable until scope and model are reviewed; estimates are advisory only.",
      privacyNotes:
        "Privacy notes: no raw credentials, API keys, prompts, files, or private context are stored in this capture.",
      nextRecommendedRoute: "/provider-failure-recovery",
      handoffCopy:
        "Result handoff copy: keep this blocked result as a review note and route recovery through the failure flow.",
      rawResponseDetails:
        "Raw response details stay secondary; for blocked tests there should be no raw response payload.",
    }),
  ];
}

export function buildProviderTestResultCaptureBoundary(): ProviderTestResultCaptureBoundary {
  return {
    secretsCapturedAllowed: false,
    apiKeysDisplayedAllowed: false,
    successClaimWithoutReviewedEvidenceAllowed: false,
    providerRegistryMutationAllowed: false,
    providerSendAllowedFromUi: false,
    automaticLiveTestAllowed: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
  };
}

export function summarizeProviderTestResultCapture(
  model: Pick<ProviderTestResultCaptureModel, "records">
): string {
  return `Provider test result capture prepares ${model.records.length} reviewed result record(s). Do not claim success without reviewed result evidence. No secrets are captured, and no memory is auto-promoted.`;
}

export function buildProviderTestResultCaptureModel(): ProviderTestResultCaptureModel {
  const records = buildProviderTestResultCaptureRecords();
  const model: ProviderTestResultCaptureModel = {
    title: "Provider test result capture",
    summary: "",
    records,
    boundary: buildProviderTestResultCaptureBoundary(),
    reviewLanguage: [...PROVIDER_TEST_RESULT_CAPTURE_LANGUAGE],
    advancedDetails: [
      "Provider test result capture",
      "Do not claim success without reviewed result evidence",
      "Raw response details stay secondary",
      "No secrets are captured",
      "Reviewed prompt summary",
      "Result handoff copy",
      "Result status options: passed, failed, blocked, needs review",
      "No automatic live test",
      "No automatic provider send",
      "No auto-routing",
      "Do not auto-spend tokens",
      "No provider registry mutation",
      "No Brain graph mutation from UI",
      "No memory auto-promotion",
    ],
  };
  return { ...model, summary: summarizeProviderTestResultCapture(model) };
}
