"use client";

import type { GuardedApplyApprovalContract } from "../guarded-apply-candidate-types";
import { GuardedApplyCandidateCard, GuardedApplyCandidateList } from "./GuardedApplyCandidateUi";

export function GuardedApplyApprovalContractPanel({ contract }: { contract: GuardedApplyApprovalContract }) {
  return (
    <GuardedApplyCandidateCard title="Approval contract" badge={contract.ready ? "ready" : "needs approval"} marker="GuardedApplyApprovalContractPanel renders approval contract invalidates if diff/file/request changes">
      <GuardedApplyCandidateList items={[...contract.summary, ...contract.requirements.map((item) => `${item.label}: ${item.satisfied ? "satisfied" : "required"}`)]} />
    </GuardedApplyCandidateCard>
  );
}
