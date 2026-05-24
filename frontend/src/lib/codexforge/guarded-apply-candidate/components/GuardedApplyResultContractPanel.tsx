"use client";

import type { GuardedApplyResultContract } from "../guarded-apply-candidate-types";
import { GuardedApplyCandidateCard, GuardedApplyCandidateList } from "./GuardedApplyCandidateUi";

export function GuardedApplyResultContractPanel({ contract }: { contract: GuardedApplyResultContract }) {
  return (
    <GuardedApplyCandidateCard title="Result contract" badge="handoff" marker="GuardedApplyResultContractPanel renders result contract says no automatic commit no memory auto-promotion">
      <GuardedApplyCandidateList items={[...contract.summary, ...contract.requirements.map((item) => item.label)]} />
    </GuardedApplyCandidateCard>
  );
}
