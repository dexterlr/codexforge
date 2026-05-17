import {
  buildApplyEvidencePackStableKey,
  type ApplyEvidenceCurrentFileVerification,
  type ApplyEvidenceInput,
} from "./apply-evidence-pack-types";

export function verifyApplyEvidenceCurrentFile(input: ApplyEvidenceInput): ApplyEvidenceCurrentFileVerification {
  const missingItems = [
    input.currentFileVerificationState !== "review-state-current" ? "Current file verification required." : null,
    input.currentFileReviewNote.length === 0 ? "Current file review note required." : null,
    input.targetFiles.length === 0 ? "At least one target file required." : null,
  ].filter((item): item is string => item !== null);

  return {
    id: buildApplyEvidencePackStableKey("current-file-verification", input.id),
    inputId: input.id,
    state: input.currentFileVerificationState,
    required: true,
    representedAsReviewMetadata: true,
    targetFiles: [...input.targetFiles],
    reviewNote:
      input.currentFileReviewNote ||
      "No current file review metadata supplied. Human verification must happen before future guarded apply.",
    missingItems,
    summary: [
      `Current file verification state: ${input.currentFileVerificationState}.`,
      "Verification is represented as review-state metadata; this domain does not read files.",
      missingItems.length === 0
        ? "Current file verification requirement is satisfied."
        : `${missingItems.length} current file verification item(s) missing.`,
    ],
  };
}

export function summarizeApplyEvidenceCurrentFile(verification: ApplyEvidenceCurrentFileVerification): string[] {
  return [
    ...verification.summary,
    `Review metadata required: ${verification.required}.`,
  ];
}
