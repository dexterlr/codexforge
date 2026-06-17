"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildRecoveryRetryBoundaryModel } from "@/lib/codexforge/recovery-retry-boundary";

const RECOVERY_RETRY_BOUNDARY_MARKERS = [
  "Recovery retry boundary",
  "Recovery/retry boundary does not trigger recovery or retry",
  "Recovery/retry actions require explicit operator approval",
  "Unsafe recovery shortcuts stay blocked",
  "Recovery groups",
  "Retry checklist",
] as const;

export function RecoveryRetryBoundaryPanel() {
  const model = buildRecoveryRetryBoundaryModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 627"
      title="Recovery retry boundary"
      subtitle="Recovery/retry boundary reviews retry and recovery options without triggering them. Recovery/retry actions require explicit operator approval, and unsafe recovery shortcuts stay blocked."
      primaryLabel="Review recovery boundary"
      anchor="recovery-retry-boundary"
      plainEnglishTitle="Plain-English recovery retry boundary"
      plainEnglishCopy="This page enables future retries, rollback, pause, escalation, and correction plans only after approved recovery boundaries exist. It does not retry, rollback, restart, rerun, apply fixes, execute workflows, or persist operator decisions from UI."
      language={model.language}
      markers={[...RECOVERY_RETRY_BOUNDARY_MARKERS]}
      links={[
        { href: "/packaging-export-boundary", label: "Packaging boundary" },
        { href: "/workflow-profile-registry", label: "Workflow profiles" },
        { href: "/universal-execution-boundary-inventory", label: "Universal inventory" },
      ]}
      packets={model.recoveryRetryBoundaries}
      advancedSummary="Advanced recovery/retry boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced recovery/retry boundary details collapsed/secondary. This route does not trigger recovery, retry, rollback, workflow execution, command reruns, file mutation, or provider/connector calls."
      dataScope="recovery-retry-boundary buildRecoveryRetryBoundaryStableKey RecoveryRetryBoundaryPanel"
    />
  );
}
