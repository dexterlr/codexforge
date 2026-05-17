import {
  buildApplyEvidencePackStableKey,
  uniqueApplyEvidenceStrings,
  type ApplyEvidenceInput,
  type ApplyEvidenceSmokeCheck,
  type ApplyEvidenceTestPlan,
} from "./apply-evidence-pack-types";

function buildCheck(inputId: string, label: string, index: number): ApplyEvidenceSmokeCheck {
  return {
    id: buildApplyEvidencePackStableKey("apply-evidence-check", inputId, index, label),
    label,
    status: "not-run",
    runHere: false,
  };
}

export function buildApplyEvidenceTestPlan(input: ApplyEvidenceInput): ApplyEvidenceTestPlan {
  const checks = uniqueApplyEvidenceStrings([
    ...input.testPlan,
    ...input.smokeChecks,
  ]).map((label, index) => buildCheck(input.id, label, index + 1));
  const missingItems = checks.length === 0 ? ["Test plan required."] : [];

  return {
    id: buildApplyEvidencePackStableKey("apply-evidence-test-plan", input.id),
    inputId: input.id,
    required: true,
    checks,
    smokeResultPlaceholders: checks,
    missingItems,
    summary: [
      `${checks.length} test or smoke check placeholder(s).`,
      "Checks are placeholders for human or approved runner results; this domain does not run commands.",
      missingItems.length === 0 ? "Test plan requirement is satisfied." : "Test plan required.",
    ],
  };
}

export function summarizeApplyEvidenceTestPlan(plan: ApplyEvidenceTestPlan): string[] {
  return [
    ...plan.summary,
    "No smoke or command execution happens inside Apply Evidence Pack.",
  ];
}
