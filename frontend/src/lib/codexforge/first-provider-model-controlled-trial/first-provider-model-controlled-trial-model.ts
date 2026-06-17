import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFirstProviderModelControlledTrialStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildFirstProviderModelControlledTrialStableKey };

export const FIRST_PROVIDER_MODEL_CONTROLLED_TRIAL_LANGUAGE = [
  "First provider/model controlled trial",
  "First provider/model controlled trial does not call providers or models",
  "Provider/model calls require explicit operator approval",
  "Prompt preview",
  "Redaction",
  "Cost/rate-limit",
  "Output handling",
  "Result review",
] as const;

const FIRST_PROVIDER_MODEL_CONTROLLED_TRIAL_ADVANCED_DETAILS = [
  "First provider/model controlled trial identity",
  "Prompt preview",
  "Redaction",
  "Cost/rate-limit",
  "Output handling",
  "Result review",
  "Next recommended action",
  "advanced first provider/model controlled trial details collapsed/secondary",
] as const;

export function buildFirstProviderModelControlledTrial(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("first-provider-model-controlled-trial", input);
}

export function buildFirstProviderModelControlledTrials(): UniversalExecutionReviewPacket[] {
  return [
    buildFirstProviderModelControlledTrial({
      idHint: "first-provider-model-controlled-trial",
      status: "blocked",
      identity: "First provider/model controlled trial identity: First provider/model controlled trial does not call providers or models. It previews a prompt and output handling packet without sending prompts, routing traffic, or storing outputs.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "Prompt preview", items: ["Prompt preview: exact prompt, system instructions, context sources, model target, expected output, refusal needs, and safety constraints require operator review."] },
        { label: "Redaction", items: ["Redaction: remove secrets, private paths, personal data, connector data, endpoint values, credentials, copyrighted source material, and excessive logs before approval."] },
        { label: "Cost/rate-limit", items: ["Cost/rate-limit: token estimate, budget cap, rate limit, timeout, retry limit, fallback rule, and stop condition must be explicit."] },
        { label: "Output handling", items: ["Output handling: no automatic storage, no memory promotion, no connector mutation, no file write, and no reuse without operator review."] },
        { label: "Result review", items: ["Result review: accepted, rejected, needs redaction, needs retry, or blocked status must be chosen before any output can feed another workflow."] },
      ),
      routes: ["/universal-builder-result-review", "/first-connector-controlled-trial", "/first-automation-controlled-trial"],
      nextRecommendedAction: "Next recommended action: keep provider/model calls blocked until prompt preview, redaction, cost/rate-limit, output handling, result review, and explicit operator approval are complete.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("first provider/model controlled trial", FIRST_PROVIDER_MODEL_CONTROLLED_TRIAL_LANGUAGE, FIRST_PROVIDER_MODEL_CONTROLLED_TRIAL_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFirstProviderModelControlledTrialBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeFirstProviderModelControlledTrial(model: { firstProviderModelControlledTrials: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("First provider/model controlled trial", model.firstProviderModelControlledTrials, "Provider/model calls require explicit operator approval.");
}

export function buildFirstProviderModelControlledTrialModel() {
  const firstProviderModelControlledTrials = buildFirstProviderModelControlledTrials();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 658",
    title: "First provider/model controlled trial",
    summarySubject: "First provider/model controlled trial",
    approvalCopy: "Provider/model calls require explicit operator approval.",
    subtitle: "Preview provider/model call controls without calling providers or models.",
    primaryLabel: "Review provider/model trial",
    anchor: "first-provider-model-controlled-trial",
    plainEnglishTitle: "Plain-English first provider/model controlled trial",
    plainEnglishCopy: "This page shows the first provider/model trial approval packet: prompt preview, redaction, cost/rate-limit, output handling, and result review. It cannot call providers or models.",
    language: FIRST_PROVIDER_MODEL_CONTROLLED_TRIAL_LANGUAGE,
    advancedDetails: [...FIRST_PROVIDER_MODEL_CONTROLLED_TRIAL_ADVANCED_DETAILS],
    links: [
      { href: "/universal-builder-result-review", label: "Builder result review" },
      { href: "/first-connector-controlled-trial", label: "Connector trial" },
      { href: "/first-automation-controlled-trial", label: "Automation trial" },
    ],
    packets: firstProviderModelControlledTrials,
    advancedCopy: "advanced first provider/model controlled trial details collapsed/secondary. This route does not call providers, call models, send prompts, route traffic, spend tokens, call local models, store outputs, promote memory, write files, mutate connectors, or persist credentials.",
    dataScope: "first-provider-model-controlled-trial buildFirstProviderModelControlledTrialStableKey FirstProviderModelControlledTrialPanel",
  });
  return { ...model, firstProviderModelControlledTrials };
}
