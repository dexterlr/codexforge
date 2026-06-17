import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFirstLocalRuntimeControlledTrialStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildFirstLocalRuntimeControlledTrialStableKey };

export const FIRST_LOCAL_RUNTIME_CONTROLLED_TRIAL_LANGUAGE = [
  "First local runtime controlled trial",
  "First local runtime controlled trial does not start local runtimes",
  "Local runtime startup requires explicit operator approval",
  "Port checklist",
  "Network checklist",
  "Process lifecycle checklist",
  "Stop checklist",
  "Logging checklist",
  "Recovery checklist",
] as const;

const FIRST_LOCAL_RUNTIME_CONTROLLED_TRIAL_ADVANCED_DETAILS = [
  "First local runtime controlled trial identity",
  "Port checklist",
  "Network checklist",
  "Process lifecycle checklist",
  "Stop checklist",
  "Logging checklist",
  "Recovery checklist",
  "Next recommended action",
  "advanced first local runtime controlled trial details collapsed/secondary",
] as const;

export function buildFirstLocalRuntimeControlledTrial(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("first-local-runtime-controlled-trial", input);
}

export function buildFirstLocalRuntimeControlledTrials(): UniversalExecutionReviewPacket[] {
  return [
    buildFirstLocalRuntimeControlledTrial({
      idHint: "first-local-runtime-controlled-trial",
      status: "blocked",
      identity: "First local runtime controlled trial identity: First local runtime controlled trial does not start local runtimes. It previews runtime startup approval without launching, stopping, probing, or monitoring processes.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "Port checklist", items: ["Port checklist: proposed port, conflict policy, localhost-only expectation, no public tunnel, no endpoint storage, and explicit stop plan."] },
        { label: "Network checklist", items: ["Network checklist: local network posture, no connector traffic, no provider traffic, no arbitrary endpoint calls, and no bridge calls from UI."] },
        { label: "Process lifecycle checklist", items: ["Process lifecycle checklist: startup command preview, process owner, health signal, timeout, stop condition, and no server launch without approval."] },
        { label: "Stop checklist", items: ["Stop checklist: manual stop path, failed startup stop path, timeout stop path, cleanup owner, and escalation remain approval required."] },
        { label: "Logging checklist", items: ["Logging checklist: log source, redaction, truncation, port/process identifiers, stdout/stderr, and reuse limits require operator review."] },
        { label: "Recovery checklist", items: ["Recovery checklist: rollback, cleanup, retry gate, stale process handling, port conflict handling, and no automatic recovery trigger."] },
      ),
      routes: ["/first-local-runtime-trial-review", "/first-provider-model-controlled-trial", "/universal-builder-evidence-review"],
      nextRecommendedAction: "Next recommended action: keep runtime startup blocked until port, network, process lifecycle, stop, logging, recovery, and explicit operator approval are complete.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("first local runtime controlled trial", FIRST_LOCAL_RUNTIME_CONTROLLED_TRIAL_LANGUAGE, FIRST_LOCAL_RUNTIME_CONTROLLED_TRIAL_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFirstLocalRuntimeControlledTrialBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeFirstLocalRuntimeControlledTrial(model: { firstLocalRuntimeControlledTrials: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("First local runtime controlled trial", model.firstLocalRuntimeControlledTrials, "Local runtime startup requires explicit operator approval.");
}

export function buildFirstLocalRuntimeControlledTrialModel() {
  const firstLocalRuntimeControlledTrials = buildFirstLocalRuntimeControlledTrials();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 656",
    title: "First local runtime controlled trial",
    summarySubject: "First local runtime controlled trial",
    approvalCopy: "Local runtime startup requires explicit operator approval.",
    subtitle: "Preview local runtime startup controls without starting local runtimes.",
    primaryLabel: "Review runtime trial",
    anchor: "first-local-runtime-controlled-trial",
    plainEnglishTitle: "Plain-English first local runtime controlled trial",
    plainEnglishCopy: "This page shows what a real local runtime startup would need before approval: port, network, process lifecycle, stop, logging, and recovery. It cannot start or stop runtimes.",
    language: FIRST_LOCAL_RUNTIME_CONTROLLED_TRIAL_LANGUAGE,
    advancedDetails: [...FIRST_LOCAL_RUNTIME_CONTROLLED_TRIAL_ADVANCED_DETAILS],
    links: [
      { href: "/first-local-runtime-trial-review", label: "Runtime review" },
      { href: "/first-provider-model-controlled-trial", label: "Provider/model trial" },
      { href: "/universal-builder-evidence-review", label: "Builder evidence review" },
    ],
    packets: firstLocalRuntimeControlledTrials,
    advancedCopy: "advanced first local runtime controlled trial details collapsed/secondary. This route does not start local runtimes, stop runtimes, launch servers, open ports, call bridge endpoints, probe health, monitor processes, store logs, trigger recovery, or persist approval decisions.",
    dataScope: "first-local-runtime-controlled-trial buildFirstLocalRuntimeControlledTrialStableKey FirstLocalRuntimeControlledTrialPanel",
  });
  return { ...model, firstLocalRuntimeControlledTrials };
}
