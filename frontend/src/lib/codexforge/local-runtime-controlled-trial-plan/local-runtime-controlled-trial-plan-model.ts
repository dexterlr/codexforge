import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildLocalRuntimeControlledTrialPlanStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildLocalRuntimeControlledTrialPlanStableKey };

export const LOCAL_RUNTIME_CONTROLLED_TRIAL_PLAN_LANGUAGE = [
  "Local runtime controlled trial plan",
  "Local runtime controlled trial plan does not start local runtimes",
  "Runtime startup requires explicit operator approval",
  "Port checklist",
  "Network checklist",
  "Process lifecycle checklist",
  "Stop checklist",
  "Logging checklist",
] as const;

const LOCAL_RUNTIME_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS = [
  "Local runtime controlled trial plan identity",
  "Port checklist",
  "Network checklist",
  "Process lifecycle checklist",
  "Stop checklist",
  "Logging checklist",
  "Next recommended action",
  "advanced local runtime controlled trial plan details collapsed/secondary",
] as const;

export function buildLocalRuntimeControlledTrialPlan(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("local-runtime-controlled-trial-plan", input);
}

export function buildLocalRuntimeControlledTrialPlans(): UniversalExecutionReviewPacket[] {
  return [
    buildLocalRuntimeControlledTrialPlan({
      idHint: "local-runtime-controlled-trial-plan",
      status: "blocked",
      identity: "Local runtime controlled trial plan identity: local-runtime-controlled-trial-plan plans future runtime startup without starting, stopping, probing, launching, or monitoring local runtimes.",
      sections: buildControlledBuilderReviewSections(
        { label: "Port checklist", items: ["Port checklist: proposed port, conflict handling, local-only posture, no public exposure, and stop plan must be reviewed."] },
        { label: "Network checklist", items: ["Network checklist: localhost scope, no connector traffic, no provider traffic, no public tunnel, and no arbitrary endpoint storage."] },
        { label: "Process lifecycle checklist", items: ["Process lifecycle checklist: startup command, owner, expected process, health signal, termination condition, and no server launch without approval."] },
        { label: "Stop checklist", items: ["Stop checklist: manual stop path, failure stop path, timeout stop path, cleanup notes, and escalation owner remain approval required."] },
        { label: "Logging checklist", items: ["Logging checklist: runtime logs, redaction, truncation, process IDs, ports, and reuse require operator review."] },
      ),
      routes: ["/local-runtime-approval-boundary", "/local-runtime-controlled-trial-review", "/command-execution-controlled-trial-plan"],
      nextRecommendedAction: "Next recommended action: keep runtime startup blocked until port, network, lifecycle, stop, logging, and explicit operator approval are complete.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("local runtime controlled trial plan", LOCAL_RUNTIME_CONTROLLED_TRIAL_PLAN_LANGUAGE, LOCAL_RUNTIME_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS),
    }),
  ];
}

export function buildLocalRuntimeControlledTrialPlanBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizeLocalRuntimeControlledTrialPlan(model: { localRuntimeControlledTrialPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("Local runtime controlled trial plan", model.localRuntimeControlledTrialPlans, "Runtime startup requires explicit operator approval.");
}

export function buildLocalRuntimeControlledTrialPlanModel() {
  const localRuntimeControlledTrialPlans = buildLocalRuntimeControlledTrialPlans();
  const summary = summarizeLocalRuntimeControlledTrialPlan({ localRuntimeControlledTrialPlans });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 643",
    title: "Local runtime controlled trial plan",
    summary,
    subtitle: "Plan future local runtime startup without starting local runtimes.",
    primaryLabel: "Review runtime plan",
    anchor: "local-runtime-controlled-trial-plan",
    plainEnglishTitle: "Plain-English local runtime controlled trial plan",
    plainEnglishCopy: "This page shows what a future local runtime startup must prove before approval. It cannot start a server or control a process.",
    language: LOCAL_RUNTIME_CONTROLLED_TRIAL_PLAN_LANGUAGE,
    markers: LOCAL_RUNTIME_CONTROLLED_TRIAL_PLAN_LANGUAGE,
    links: [
      { href: "/local-runtime-approval-boundary", label: "Runtime boundary" },
      { href: "/local-runtime-controlled-trial-review", label: "Runtime review" },
      { href: "/command-execution-controlled-trial-plan", label: "Command plan" },
    ],
    packets: localRuntimeControlledTrialPlans,
    advancedSummary: "Advanced local runtime controlled trial plan details",
    advancedDetails: [...LOCAL_RUNTIME_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS],
    advancedCopy: "advanced local runtime controlled trial plan details collapsed/secondary. This route does not start runtimes, stop runtimes, launch servers, open ports, call bridge endpoints, probe health, or monitor processes.",
    dataScope: "local-runtime-controlled-trial-plan buildLocalRuntimeControlledTrialPlanStableKey LocalRuntimeControlledTrialPlanPanel",
  });
  return { ...model, localRuntimeControlledTrialPlans };
}
