"use client";

import type { SingleFileApplyScope } from "../guarded-apply-candidate-types";
import { GuardedApplyCandidateCard, GuardedApplyCandidateList, muted } from "./GuardedApplyCandidateUi";

export function SingleFileApplyScopePanel({ scope }: { scope: SingleFileApplyScope }) {
  return (
    <GuardedApplyCandidateCard title="Single file scope" badge={scope.overallStatus} marker="SingleFileApplyScopePanel renders single file scope blocks multi-file diff blocks binary patch blocks package/lock/config/tool-policy/brain-runtime edit for first candidate">
      <p style={muted}>Selected file: {scope.selectedFilePath || "not selected"}</p>
      <GuardedApplyCandidateList items={scope.checks.map((check) => `${check.label}: ${check.status} - ${check.detail}`)} />
    </GuardedApplyCandidateCard>
  );
}
