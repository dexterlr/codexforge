import type { ProviderModelCallApprovalBoundary, ProviderModelCallApprovalBoundaryBoundary, ProviderModelCallApprovalBoundaryModel } from "./provider-model-call-approval-boundary-types";
import { buildProviderModelCallApprovalBoundaryStableKey } from "./provider-model-call-approval-boundary-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const PROVIDER_MODEL_CALL_APPROVAL_BOUNDARY_LANGUAGE = [
  "Provider model call approval boundary",
  "Provider/model call approval boundary does not call providers or models",
  "Provider/model calls require explicit operator approval",
  "Unsafe provider/model calls stay blocked",
  "Provider model groups",
  "Prompt preview checklist",
] as const;

export function buildProviderModelCallApprovalBoundary(input: Omit<ProviderModelCallApprovalBoundary, "id"> & { idHint: string }): ProviderModelCallApprovalBoundary {
  const { idHint, ...boundary } = input;
  return { id: buildProviderModelCallApprovalBoundaryStableKey("provider-model-call-approval-boundary", idHint, input.status), ...boundary };
}

export function buildProviderModelCallApprovalBoundaries(): ProviderModelCallApprovalBoundary[] {
  return [
    buildProviderModelCallApprovalBoundary({
      idHint: "provider-model-call-approval-boundary",
      status: "blocked",
      identity: "Provider/model boundary identity: provider-model-call-approval-boundary reviews prompts, provider choices, local model choices, redaction, cost, rate limit, and output handling without sending prompts.",
      sections: [
        { label: "Provider model groups", items: ["Provider model groups: cloud providers, local models, creative generators, coding models, research models, chatbot models, routing policies, and fallback plans remain review-only."] },
        { label: "Prompt preview checklist", items: ["Prompt preview checklist: prompt intent, user data, files, connector data, expected output, refusal policy, and approval status must be reviewed before any future provider/model call."] },
        { label: "Data redaction checklist", items: ["Data redaction checklist: secrets, credentials, private evidence, connector data, local paths, proprietary files, and protected content must be removed or explicitly approved."] },
        { label: "Cost/rate-limit checklist", items: ["Cost/rate-limit checklist: provider, model, budget, estimated cost, rate limit, fallback, timeout, and cancellation rules must be visible before execution."] },
        { label: "Output handling checklist", items: ["Output handling checklist: outputs are not stored automatically; result review, evidence capture, reuse, memory ingestion, export, and retention require explicit approval."] },
        { label: "Denied provider/model actions", items: ["Denied provider/model actions: send prompts, call providers, call local models, route live traffic, store outputs, persist credentials, store tokens, or auto-ingest provider/model output."] },
        { label: "Unresolved provider/model blockers", items: ["Unresolved provider/model blockers: missing approved provider implementation, missing redaction, missing budget owner, missing output handling, missing evidence route, and missing result review keep unsafe provider/model calls blocked."] },
      ],
      routes: ["/evidence-capture-boundary", "/result-review-boundary", "/universal-execution-boundary-inventory"],
      nextRecommendedAction: "Next recommended action: keep provider/model calls blocked, review redaction and output handling, then seek explicit operator approval only after implementation evidence exists.",
      advancedDetails: `Advanced provider/model call approval boundary details: Provider/model call approval boundary does not call providers or models. Provider/model calls require explicit operator approval. Unsafe provider/model calls stay blocked. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildProviderModelCallApprovalBoundaryBoundary(): ProviderModelCallApprovalBoundaryBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeProviderModelCallApprovalBoundary(model: Pick<ProviderModelCallApprovalBoundaryModel, "providerModelCallApprovalBoundaries">): string {
  return "Provider/model call approval boundary reviews " + model.providerModelCallApprovalBoundaries.length + " provider/model boundary packet without calling providers or models. Provider/model calls require explicit operator approval, and unsafe provider/model calls stay blocked.";
}

export function buildProviderModelCallApprovalBoundaryModel(): ProviderModelCallApprovalBoundaryModel {
  const providerModelCallApprovalBoundaries = buildProviderModelCallApprovalBoundaries();
  const model: ProviderModelCallApprovalBoundaryModel = {
    title: "Provider model call approval boundary",
    summary: "",
    reviewPackets: providerModelCallApprovalBoundaries,
    providerModelCallApprovalBoundaries,
    boundary: buildProviderModelCallApprovalBoundaryBoundary(),
    language: [...PROVIDER_MODEL_CALL_APPROVAL_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Provider/model boundary identity",
      "Provider model groups",
      "Prompt preview checklist",
      "Data redaction checklist",
      "Cost/rate-limit checklist",
      "Output handling checklist",
      "Denied provider/model actions",
      "Unresolved provider/model blockers",
      "Evidence boundary route",
      "Result review boundary route",
      "Next recommended action",
      "advanced provider/model call approval boundary details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeProviderModelCallApprovalBoundary(model) };
}
