import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildCreativeAdapterContractReviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildCreativeAdapterContractReviewStableKey };

export const CREATIVE_ADAPTER_CONTRACT_REVIEW_LANGUAGE = [
  "Creative adapter contract review",
  "Creative adapter contract review does not generate images, video, or 3D assets",
  "Creative adapters require explicit operator approval",
  "Adapter not executable from UI",
  "Storyboard",
  "Prompt",
  "Provider/model",
  "Local tool/runtime",
  "Output review",
  "Packaging/export",
  "Denied creative adapter actions",
] as const;

const CREATIVE_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS = [
  "Creative adapter contract review identity",
  "Storyboard",
  "Prompt",
  "Provider/model",
  "Local tool/runtime",
  "Output review",
  "Packaging/export",
  "Denied creative adapter actions",
  "Unresolved creative adapter blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced creative adapter contract review details collapsed/secondary",
] as const;

export function buildCreativeAdapterContractReview(input: ExecutionAdapterContractReviewPacketInput): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview("creative-adapter-contract-review", input);
}

export function buildCreativeAdapterContractReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildCreativeAdapterContractReview({
      idHint: "creative-adapter-contract-review",
      status: "blocked",
      identity: "Creative adapter contract review identity: Creative adapter contract review does not generate images, video, or 3D assets. Creative adapters require explicit operator approval before any future storyboard, prompt, provider/model, local tool, runtime, or export action.",
      sections: buildExecutionAdapterContractReviewSections(
        { label: "Storyboard", items: ["Storyboard: concept, shots, scenes, duration, asset list, safety notes, and approval state must be visible before any generation path exists."] },
        { label: "Prompt", items: ["Prompt: prompt text, negative prompt, style constraints, reference rights, copyrighted material check, redaction, and model scope require review."] },
        { label: "Provider/model", items: ["Provider/model: provider, model, cost, rate limit, output license, safety policy, and no prompt sending without approval must be declared."] },
        { label: "Local tool/runtime", items: ["Local tool/runtime: tool name, runtime need, command boundary, port/process rule, model files, and no local runtime start from UI must be reviewed."] },
        { label: "Output review", items: ["Output review: image, video, audio, and 3D outputs need acceptance, rejection, redaction, provenance, evidence, and no automatic storage."] },
        { label: "Packaging/export", items: ["Packaging/export: package target, file list, license/provenance, destination, handoff, and no automatic export are part of the contract."] },
        { label: "Denied creative adapter actions", items: ["Denied creative adapter actions: generate images, generate video, generate 3D assets, call providers, start local tools, run commands, store outputs, package exports, or copy protected assets from UI."] },
      ),
      routes: ["/execution-adapter-contract-inventory", "/provider-model-adapter-contract-review", "/packaging-adapter-contract-review"],
      nextRecommendedAction: "Next recommended action: keep creative generation blocked while storyboard, prompt, provider/model, local tool/runtime, output review, and packaging/export contracts are reviewed.",
      advancedDetails: buildExecutionAdapterContractReviewAdvancedDetails("creative adapter contract review", CREATIVE_ADAPTER_CONTRACT_REVIEW_LANGUAGE, CREATIVE_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildCreativeAdapterContractReviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizeCreativeAdapterContractReview(model: { creativeAdapterContractReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeExecutionAdapterContractReview("Creative adapter contract review", model.creativeAdapterContractReviews, "Creative adapters require explicit operator approval.");
}

export function buildCreativeAdapterContractReviewModel() {
  const creativeAdapterContractReviews = buildCreativeAdapterContractReviews();
  const model = buildExecutionAdapterContractReviewModel({
    phase: "Phase 677",
    title: "Creative adapter contract review",
    summarySubject: "Creative adapter contract review",
    approvalCopy: "Creative adapters require explicit operator approval.",
    subtitle: "Review the creative adapter contract without generating images, video, or 3D assets.",
    primaryLabel: "Review creative adapter",
    anchor: "creative-adapter-contract-review",
    plainEnglishTitle: "Plain-English creative adapter contract review",
    plainEnglishCopy: "This page defines what a real creative adapter must show before it can ever generate media: storyboard, prompt, provider/model, local runtime, output review, packaging/export, and denied actions. It is not implemented yet.",
    language: CREATIVE_ADAPTER_CONTRACT_REVIEW_LANGUAGE,
    advancedDetails: [...CREATIVE_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/execution-adapter-contract-inventory", label: "Adapter inventory" },
      { href: "/provider-model-adapter-contract-review", label: "Provider/model adapter" },
      { href: "/packaging-adapter-contract-review", label: "Packaging adapter" },
    ],
    packets: creativeAdapterContractReviews,
    advancedCopy: "advanced creative adapter contract review details collapsed/secondary. This route does not generate images, video, or 3D assets; it does not call providers, send prompts, start local tools, run commands, store outputs, package exports, or copy protected assets.",
    dataScope: "creative-adapter-contract-review buildCreativeAdapterContractReviewStableKey CreativeAdapterContractReviewPanel",
  });
  return { ...model, creativeAdapterContractReviews };
}
