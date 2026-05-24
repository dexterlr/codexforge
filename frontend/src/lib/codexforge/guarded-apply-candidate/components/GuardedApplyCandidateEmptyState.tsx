"use client";

import { GuardedApplyCandidateCard, muted } from "./GuardedApplyCandidateUi";

export function GuardedApplyCandidateEmptyState() {
  return (
    <GuardedApplyCandidateCard title="No candidate selected" badge="blocked" marker="GuardedApplyCandidateEmptyState renders">
      <p style={muted}>Pick one low-risk file and one preview diff before planning a guarded apply candidate.</p>
    </GuardedApplyCandidateCard>
  );
}
