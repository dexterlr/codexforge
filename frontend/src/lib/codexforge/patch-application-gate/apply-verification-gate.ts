import {
  buildPatchApplicationGateStableKey,
  uniquePatchApplicationGateStrings,
  type ApplyGateInput,
  type ApplyVerificationCheck,
  type ApplyVerificationGate,
} from "./patch-application-gate-types";

export function buildApplyVerificationCheck(label: string, commandOrReview: string, required = true): ApplyVerificationCheck {
  return {
    id: `apply-verification:${buildPatchApplicationGateStableKey(label, commandOrReview)}`,
    label,
    commandOrReview,
    required,
    runHere: false,
  };
}

export function buildApplyVerificationGate(input?: ApplyGateInput | null): ApplyVerificationGate {
  const supplied = uniquePatchApplicationGateStrings(input?.verificationChecks ?? []);
  const checks = [
    buildApplyVerificationCheck("Build", "npm run build"),
    buildApplyVerificationCheck("Diff whitespace", "git diff --check"),
    buildApplyVerificationCheck("Patch Preview smoke", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-patch-preview.ps1"),
    buildApplyVerificationCheck("Preview Diff Composer smoke", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-preview-diff-composer.ps1"),
    buildApplyVerificationCheck("Patch Preview Queue smoke", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-patch-preview-queue.ps1"),
    buildApplyVerificationCheck("Grounded Fix smoke", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-grounded-fix-recommendation.ps1"),
    ...supplied.map((check) => buildApplyVerificationCheck("Affected-area smoke scripts", check)),
    buildApplyVerificationCheck("Manual target file review", `Manual review of target files: ${(input?.targetFiles ?? []).join(", ") || "none selected"}`),
  ];

  return {
    id: "apply-verification-gate",
    checks,
    noChecksRunHere: true,
    summary: summarizeApplyVerificationGate(checks),
  };
}

export function summarizeApplyVerificationGate(gateOrChecks: ApplyVerificationGate | readonly ApplyVerificationCheck[]): string[] {
  const checks = "checks" in gateOrChecks ? gateOrChecks.checks : gateOrChecks;
  return [
    `${checks.length} verification check(s) are suggested.`,
    "No checks are run here.",
    "Required checks include npm run build and git diff --check.",
  ];
}
