"use client";

import type { GuardedApplyValidationContract } from "../guarded-apply-candidate-types";
import { GuardedApplyCandidateCard, GuardedApplyCandidateList } from "./GuardedApplyCandidateUi";

export function GuardedApplyValidationContractPanel({ contract }: { contract: GuardedApplyValidationContract }) {
  return (
    <GuardedApplyCandidateCard title="Validation contract" badge="separate" marker="GuardedApplyValidationContractPanel renders validation contract includes npm run build targeted smoke git diff --check no auto-run">
      <GuardedApplyCandidateList items={[...contract.summary, ...contract.commands]} />
    </GuardedApplyCandidateCard>
  );
}
