import type { RecoveryCase, RecoveryCaseId } from "./guided-recovery-flow-types";

export function buildRecoveryCase(id: RecoveryCaseId, title: string, detail: string, route: string): RecoveryCase {
  return { id, title, detail, route };
}

export function buildDefaultRecoveryCases(): RecoveryCase[] {
  return [
    buildRecoveryCase("validation-failed", "Validation failed", "Review output before retry.", "/validation-results"),
    buildRecoveryCase("build-failed", "Build failed", "Capture the build error and keep the fix small.", "/closed-loop"),
    buildRecoveryCase("smoke-failed", "Smoke failed", "Preserve the smoke marker and review the failed suite.", "/runbook"),
    buildRecoveryCase("apply-blocked", "Apply blocked", "Return to approval and boundary checks.", "/guarded-apply-mvp"),
    buildRecoveryCase("result-unknown", "Result unknown", "Classify the outcome before moving on.", "/review-inbox"),
    buildRecoveryCase("wrong-file", "Wrong file selected", "Stop and choose the correct file boundary.", "/files"),
    buildRecoveryCase("patch-preview-missing", "Patch preview missing", "Return to live run and preview first.", "/code-flow/live-run"),
    buildRecoveryCase("output-too-large", "Output too large", "Summarize the important failure lines.", "/validation-results"),
    buildRecoveryCase("page-confused-user", "Page confused user", "Use assisted mode to pick one next step.", "/assist"),
    buildRecoveryCase("demo-not-ready", "Demo not ready", "Review what remains manual before demo.", "/demo"),
  ];
}
