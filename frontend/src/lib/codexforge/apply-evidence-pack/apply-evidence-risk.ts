import {
  buildApplyEvidencePackStableKey,
  clampApplyEvidenceScore,
  type ApplyEvidenceCurrentFileVerification,
  type ApplyEvidenceInput,
  type ApplyEvidenceRisk,
  type ApplyEvidenceRiskLevel,
} from "./apply-evidence-pack-types";

const RISK_SCORE: Record<ApplyEvidenceRiskLevel, number> = {
  low: 25,
  medium: 50,
  high: 78,
  critical: 95,
};

export function buildApplyEvidenceRisk(
  input: ApplyEvidenceInput,
  currentFileVerification: ApplyEvidenceCurrentFileVerification
): ApplyEvidenceRisk {
  const targetFileCountRisk = input.targetFiles.length > 4 ? 10 : 0;
  const staleRisk = currentFileVerification.state === "review-state-current" ? 0 : 12;
  const score = clampApplyEvidenceScore(RISK_SCORE[input.riskLevel] + targetFileCountRisk + staleRisk);
  const highRisk = input.riskLevel === "high" || input.riskLevel === "critical";
  const blockers = [
    input.riskLevel === "critical" && !input.highRiskAcknowledged
      ? "Critical risk requires explicit high-risk acknowledgement."
      : null,
  ].filter((item): item is string => item !== null);
  const warnings = [
    currentFileVerification.state !== "review-state-current"
      ? "Current file state is not verified current."
      : null,
    input.targetFiles.length > 4 ? "Broad target file list increases apply risk." : null,
    highRisk && input.highRiskAcknowledged ? "High-risk acknowledgement is present." : null,
  ].filter((item): item is string => item !== null);

  return {
    id: buildApplyEvidencePackStableKey("apply-evidence-risk", input.id, input.riskLevel),
    inputId: input.id,
    level: input.riskLevel,
    score,
    targetFileCount: input.targetFiles.length,
    highRiskAcknowledged: input.highRiskAcknowledged,
    blockers,
    warnings,
    summary: [
      `Risk level ${input.riskLevel}; score ${score}.`,
      `${input.targetFiles.length} target file(s) included.`,
      blockers.length === 0 ? "No risk blockers in the evidence pack." : `${blockers.length} risk blocker(s).`,
    ],
  };
}

export function summarizeApplyEvidenceRisk(risk: ApplyEvidenceRisk): string[] {
  return [
    ...risk.summary,
    `${risk.warnings.length} risk warning(s).`,
  ];
}
