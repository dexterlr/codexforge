import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildProviderModelAdapterContractReviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildProviderModelAdapterContractReviewStableKey };

export const PROVIDER_MODEL_ADAPTER_CONTRACT_REVIEW_LANGUAGE = [
  "Provider/model adapter contract review",
  "Provider/model adapter contract review does not call providers or models",
  "Provider/model adapters require explicit operator approval",
  "Adapter not executable from UI",
  "Prompt input contract",
  "Redaction",
  "Cost/rate-limit",
  "Output handling",
  "Result review",
  "Denied provider/model adapter actions",
] as const;

const PROVIDER_MODEL_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS = [
  "Provider/model adapter contract review identity",
  "Prompt input contract",
  "Redaction",
  "Cost/rate-limit",
  "Output handling",
  "Result review",
  "Denied provider/model adapter actions",
  "Unresolved provider/model adapter blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced provider/model adapter contract review details collapsed/secondary",
] as const;

export function buildProviderModelAdapterContractReview(input: ExecutionAdapterContractReviewPacketInput): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview("provider-model-adapter-contract-review", input);
}

export function buildProviderModelAdapterContractReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildProviderModelAdapterContractReview({
      idHint: "provider-model-adapter-contract-review",
      status: "blocked",
      identity: "Provider/model adapter contract review identity: Provider/model adapter contract review does not call providers or models. Provider/model adapters require explicit operator approval before any future prompt or model request.",
      sections: buildExecutionAdapterContractReviewSections(
        { label: "Prompt input contract", items: ["Prompt input contract: user intent, system policy, context scope, attachments, model candidate, temperature-style options, and approval reason must be visible before any prompt is sent."] },
        { label: "Redaction", items: ["Redaction: secrets, credentials, private connector data, local paths, personal data, and copyrighted source material need review before any future provider/model call."] },
        { label: "Cost/rate-limit", items: ["Cost/rate-limit: provider, model, token estimate, budget cap, rate limit, retry rule, and spend owner must be reviewed before approval."] },
        { label: "Output handling", items: ["Output handling: future responses require redaction, safety review, provenance note, no automatic memory promotion, and no automatic result storage or reuse."] },
        { label: "Result review", items: ["Result review: acceptance, rejection, correction, citation/evidence needs, follow-up request, and packaging decision require operator review."] },
        { label: "Denied provider/model adapter actions", items: ["Denied provider/model adapter actions: call providers, call models, send prompts, route traffic, spend tokens, call local models, store outputs, persist credentials, ingest memory, or connect tools from UI."] },
        { label: "Unresolved provider/model adapter blockers", items: ["Unresolved provider/model adapter blockers: missing credential boundary, model policy, redaction gate, budget guard, output review, audit route, and result storage policy keep calls blocked."] },
      ),
      routes: ["/execution-adapter-contract-inventory", "/result-store-adapter-contract-review", "/research-adapter-contract-review"],
      nextRecommendedAction: "Next recommended action: keep provider/model calls blocked while prompt, redaction, cost, output, and result review contracts are completed.",
      advancedDetails: buildExecutionAdapterContractReviewAdvancedDetails("provider/model adapter contract review", PROVIDER_MODEL_ADAPTER_CONTRACT_REVIEW_LANGUAGE, PROVIDER_MODEL_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildProviderModelAdapterContractReviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizeProviderModelAdapterContractReview(model: { providerModelAdapterContractReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeExecutionAdapterContractReview("Provider/model adapter contract review", model.providerModelAdapterContractReviews, "Provider/model adapters require explicit operator approval.");
}

export function buildProviderModelAdapterContractReviewModel() {
  const providerModelAdapterContractReviews = buildProviderModelAdapterContractReviews();
  const model = buildExecutionAdapterContractReviewModel({
    phase: "Phase 670",
    title: "Provider/model adapter contract review",
    summarySubject: "Provider/model adapter contract review",
    approvalCopy: "Provider/model adapters require explicit operator approval.",
    subtitle: "Review the provider/model adapter contract without calling providers or models.",
    primaryLabel: "Review provider/model adapter",
    anchor: "provider-model-adapter-contract-review",
    plainEnglishTitle: "Plain-English provider/model adapter contract review",
    plainEnglishCopy: "This page defines what a real provider/model adapter must show before it can ever send a prompt: input scope, redaction, cost/rate-limit, output handling, result review, and denied actions. It is not implemented yet.",
    language: PROVIDER_MODEL_ADAPTER_CONTRACT_REVIEW_LANGUAGE,
    advancedDetails: [...PROVIDER_MODEL_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/execution-adapter-contract-inventory", label: "Adapter inventory" },
      { href: "/result-store-adapter-contract-review", label: "Result store adapter" },
      { href: "/research-adapter-contract-review", label: "Research adapter" },
    ],
    packets: providerModelAdapterContractReviews,
    advancedCopy: "advanced provider/model adapter contract review details collapsed/secondary. This route does not call providers, call models, send prompts, route live traffic, spend tokens, call local models, store outputs, persist credentials, or ingest memory.",
    dataScope: "provider-model-adapter-contract-review buildProviderModelAdapterContractReviewStableKey ProviderModelAdapterContractReviewPanel",
  });
  return { ...model, providerModelAdapterContractReviews };
}
