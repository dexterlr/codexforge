"use client";

import type { GuardedApplyCandidatePolicy } from "../guarded-apply-candidate-types";
import { GuardedApplyCandidateCard, GuardedApplyCandidateList } from "./GuardedApplyCandidateUi";

export function GuardedApplyCandidatePolicyPanel({ policy }: { policy: GuardedApplyCandidatePolicy }) {
  const items = [...policy.summary, ...policy.blockedReasons, ...policy.warnings];
  return (
    <GuardedApplyCandidateCard title="Candidate policy" badge={policy.guardedApplyCandidateAllowed ? "allowed" : "blocked"} marker="GuardedApplyCandidatePolicyPanel renders policy requires preview diff requires explicit approval blocks direct UI write-file blocks direct UI apply-diff blocks direct UI run-command blocks combined apply+validate button">
      <GuardedApplyCandidateList items={items} />
    </GuardedApplyCandidateCard>
  );
}
