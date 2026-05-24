"use client";

import type { GuardedApplyRollbackContract } from "../guarded-apply-candidate-types";
import { GuardedApplyCandidateCard, GuardedApplyCandidateList } from "./GuardedApplyCandidateUi";

export function GuardedApplyRollbackContractPanel({ contract }: { contract: GuardedApplyRollbackContract }) {
  return (
    <GuardedApplyCandidateCard title="Rollback contract" badge={contract.ready ? "ready" : "blocked"} marker="GuardedApplyRollbackContractPanel renders rollback contract mentions git restore git revert">
      <GuardedApplyCandidateList items={[...contract.summary, ...contract.guidance]} />
    </GuardedApplyCandidateCard>
  );
}
