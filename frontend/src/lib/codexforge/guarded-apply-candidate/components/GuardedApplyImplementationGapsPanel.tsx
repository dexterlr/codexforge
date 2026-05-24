"use client";

import type { GuardedApplyImplementationGaps } from "../guarded-apply-candidate-types";
import { GuardedApplyCandidateCard, GuardedApplyCandidateCopyButton, GuardedApplyCandidateList } from "./GuardedApplyCandidateUi";

export function GuardedApplyImplementationGapsPanel({ gaps }: { gaps: GuardedApplyImplementationGaps }) {
  const copyValue = gaps.gaps.map((gap) => `${gap.priority}: ${gap.label} - ${gap.nextAction}`).join("\n");
  return (
    <GuardedApplyCandidateCard title="Implementation gaps" badge={`${gaps.blockerCount} blockers`} marker="GuardedApplyImplementationGapsPanel renders implementation gaps include approval not tied to exact diff apply evidence not captured advanced details are collapsed or visually secondary">
      <GuardedApplyCandidateList items={[...gaps.summary, ...gaps.gaps.map((gap) => `${gap.label}: ${gap.detail}`)]} />
      <GuardedApplyCandidateCopyButton label="Copy implementation gaps" value={copyValue} />
    </GuardedApplyCandidateCard>
  );
}
