"use client";

import type { GuardedApplyCandidateInput } from "../guarded-apply-candidate-types";
import { GuardedApplyCandidateCard, GuardedApplyCandidateList, muted } from "./GuardedApplyCandidateUi";

export function GuardedApplyCandidateInputPanel({ input }: { input: GuardedApplyCandidateInput }) {
  return (
    <GuardedApplyCandidateCard title="Candidate input" badge={input.targetMode} marker="GuardedApplyCandidateInputPanel renders">
      <p style={muted}>Candidate id: {input.candidateId}</p>
      <GuardedApplyCandidateList items={input.summary} />
    </GuardedApplyCandidateCard>
  );
}
