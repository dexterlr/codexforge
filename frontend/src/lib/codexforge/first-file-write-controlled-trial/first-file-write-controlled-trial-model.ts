import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFirstFileWriteControlledTrialStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildFirstFileWriteControlledTrialStableKey };

export const FIRST_FILE_WRITE_CONTROLLED_TRIAL_LANGUAGE = [
  "First file write controlled trial",
  "First file write controlled trial does not write files",
  "Controlled file writes require explicit operator approval",
  "Path allowlist",
  "Path denylist",
  "Diff preview",
  "Rollback",
  "Evidence",
  "Result review",
] as const;

const FIRST_FILE_WRITE_CONTROLLED_TRIAL_ADVANCED_DETAILS = [
  "First file write controlled trial identity",
  "Path allowlist",
  "Path denylist",
  "Diff preview",
  "Rollback",
  "Evidence",
  "Result review",
  "Next recommended action",
  "advanced first file write controlled trial details collapsed/secondary",
] as const;

export function buildFirstFileWriteControlledTrial(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("first-file-write-controlled-trial", input);
}

export function buildFirstFileWriteControlledTrials(): UniversalExecutionReviewPacket[] {
  return [
    buildFirstFileWriteControlledTrial({
      idHint: "first-file-write-controlled-trial",
      status: "blocked",
      identity: "First file write controlled trial identity: First file write controlled trial does not write files. It previews a future write request, diff, rollback, and review packet without mutating the workspace.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "Path allowlist", items: ["Path allowlist: exact workspace root, permitted relative paths, file types, maximum scope, and operator-owned target intent must be approved before any future writer exists."] },
        { label: "Path denylist", items: ["Path denylist: secrets, credentials, environment files, package manifests unless explicitly reviewed, generated artifacts, external repos, arbitrary paths, and protected system paths remain blocked."] },
        { label: "Diff preview", items: ["Diff preview: proposed before/after text, affected line count, validation plan, dependency impact, and rollback note stay visible before approval."] },
        { label: "Rollback", items: ["Rollback: operator reviews restore source, partial failure behavior, cleanup notes, retry gate, escalation owner, and confirms rollback is not triggered from this UI."] },
        { label: "Evidence", items: ["Evidence: path evidence, diff evidence, approval evidence, validation evidence, and redacted result notes require manual review; nothing is captured or ingested automatically."] },
        { label: "Result review", items: ["Result review: no file write output can be accepted, reused, packaged, promoted to memory, or passed to automation without operator review."] },
      ),
      routes: ["/first-file-write-trial-review", "/first-command-execution-controlled-trial", "/universal-builder-result-review"],
      nextRecommendedAction: "Next recommended action: keep file mutation blocked, review path allowlists and diff preview, and require explicit operator approval before any future file write.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("first file write controlled trial", FIRST_FILE_WRITE_CONTROLLED_TRIAL_LANGUAGE, FIRST_FILE_WRITE_CONTROLLED_TRIAL_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFirstFileWriteControlledTrialBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeFirstFileWriteControlledTrial(model: { firstFileWriteControlledTrials: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("First file write controlled trial", model.firstFileWriteControlledTrials, "Controlled file writes require explicit operator approval.");
}

export function buildFirstFileWriteControlledTrialModel() {
  const firstFileWriteControlledTrials = buildFirstFileWriteControlledTrials();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 652",
    title: "First file write controlled trial",
    summarySubject: "First file write controlled trial",
    approvalCopy: "Controlled file writes require explicit operator approval.",
    subtitle: "Preview the first controlled file write trial without writing files.",
    primaryLabel: "Review file write trial",
    anchor: "first-file-write-controlled-trial",
    plainEnglishTitle: "Plain-English first file write controlled trial",
    plainEnglishCopy: "This page shows the approval packet a real file write would need: path rules, diff preview, rollback, evidence, and result review. It cannot write files.",
    language: FIRST_FILE_WRITE_CONTROLLED_TRIAL_LANGUAGE,
    advancedDetails: [...FIRST_FILE_WRITE_CONTROLLED_TRIAL_ADVANCED_DETAILS],
    links: [
      { href: "/first-file-write-trial-review", label: "File write review" },
      { href: "/first-command-execution-controlled-trial", label: "Command trial" },
      { href: "/universal-builder-result-review", label: "Builder result review" },
    ],
    packets: firstFileWriteControlledTrials,
    advancedCopy: "advanced first file write controlled trial details collapsed/secondary. This route does not write files, delete files, apply patches, mutate files, browse arbitrary paths, scan arbitrary projects, store outputs, trigger rollback, run validation commands, or persist approval decisions.",
    dataScope: "first-file-write-controlled-trial buildFirstFileWriteControlledTrialStableKey FirstFileWriteControlledTrialPanel",
  });
  return { ...model, firstFileWriteControlledTrials };
}
