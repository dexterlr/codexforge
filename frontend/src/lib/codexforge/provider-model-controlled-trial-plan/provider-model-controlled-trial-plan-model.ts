import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildProviderModelControlledTrialPlanStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildProviderModelControlledTrialPlanStableKey };

export const PROVIDER_MODEL_CONTROLLED_TRIAL_PLAN_LANGUAGE = [
  "Provider/model controlled trial plan",
  "Provider/model controlled trial plan does not call providers or models",
  "Provider/model calls require explicit operator approval",
  "Prompt preview",
  "Redaction checklist",
  "Cost/rate limit",
  "Output handling",
] as const;

const PROVIDER_MODEL_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS = [
  "Provider/model controlled trial plan identity",
  "Prompt preview",
  "Redaction checklist",
  "Cost/rate limit",
  "Output handling",
  "Next recommended action",
  "advanced provider/model controlled trial plan details collapsed/secondary",
] as const;

export function buildProviderModelControlledTrialPlan(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("provider-model-controlled-trial-plan", input);
}

export function buildProviderModelControlledTrialPlans(): UniversalExecutionReviewPacket[] {
  return [
    buildProviderModelControlledTrialPlan({
      idHint: "provider-model-controlled-trial-plan",
      status: "blocked",
      identity: "Provider/model controlled trial plan identity: provider-model-controlled-trial-plan plans future provider or model calls without sending prompts, routing traffic, calling local models, spending tokens, or storing outputs.",
      sections: buildControlledBuilderReviewSections(
        { label: "Prompt preview", items: ["Prompt preview: exact prompt, system instructions, attached context, model target, expected output, and refusal/safety needs must be reviewed."] },
        { label: "Redaction checklist", items: ["Redaction checklist: remove secrets, personal data, private paths, connector data, endpoint values, credentials, copyrighted source material, and excessive logs."] },
        { label: "Cost/rate limit", items: ["Cost/rate limit: budget cap, token estimate, rate limit, timeout, retry limit, and provider fallback rules require explicit approval."] },
        { label: "Output handling", items: ["Output handling: outputs require review before reuse, no automatic storage, no memory promotion, no connector mutation, and no file write from UI."] },
      ),
      routes: ["/provider-model-call-approval-boundary", "/result-review-boundary", "/universal-builder-controlled-trial-candidate"],
      nextRecommendedAction: "Next recommended action: keep provider/model calls blocked until prompt preview, redaction, cost/rate limit, output handling, and explicit operator approval are complete.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("provider/model controlled trial plan", PROVIDER_MODEL_CONTROLLED_TRIAL_PLAN_LANGUAGE, PROVIDER_MODEL_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS),
    }),
  ];
}

export function buildProviderModelControlledTrialPlanBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizeProviderModelControlledTrialPlan(model: { providerModelControlledTrialPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("Provider/model controlled trial plan", model.providerModelControlledTrialPlans, "Provider/model calls require explicit operator approval.");
}

export function buildProviderModelControlledTrialPlanModel() {
  const providerModelControlledTrialPlans = buildProviderModelControlledTrialPlans();
  const summary = summarizeProviderModelControlledTrialPlan({ providerModelControlledTrialPlans });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 645",
    title: "Provider/model controlled trial plan",
    summary,
    subtitle: "Plan future provider/model calls without calling providers or models.",
    primaryLabel: "Review provider/model plan",
    anchor: "provider-model-controlled-trial-plan",
    plainEnglishTitle: "Plain-English provider/model controlled trial plan",
    plainEnglishCopy: "This page prepares the approval packet for a future model call. It cannot send prompts, spend tokens, call local models, or store outputs.",
    language: PROVIDER_MODEL_CONTROLLED_TRIAL_PLAN_LANGUAGE,
    markers: PROVIDER_MODEL_CONTROLLED_TRIAL_PLAN_LANGUAGE,
    links: [
      { href: "/provider-model-call-approval-boundary", label: "Provider/model boundary" },
      { href: "/result-review-boundary", label: "Result boundary" },
      { href: "/universal-builder-controlled-trial-candidate", label: "Builder candidate" },
    ],
    packets: providerModelControlledTrialPlans,
    advancedSummary: "Advanced provider/model controlled trial plan details",
    advancedDetails: [...PROVIDER_MODEL_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS],
    advancedCopy: "advanced provider/model controlled trial plan details collapsed/secondary. This route does not call providers, call models, send prompts, route traffic, spend tokens, store outputs, or persist credentials.",
    dataScope: "provider-model-controlled-trial-plan buildProviderModelControlledTrialPlanStableKey ProviderModelControlledTrialPlanPanel",
  });
  return { ...model, providerModelControlledTrialPlans };
}
