"use client";

import type { GuardedApplyExecutionPlan } from "../guarded-apply-candidate-types";
import { GuardedApplyCandidateCard, GuardedApplyCandidateList } from "./GuardedApplyCandidateUi";

export function GuardedApplyExecutionPlanPanel({ plan }: { plan: GuardedApplyExecutionPlan }) {
  return (
    <GuardedApplyCandidateCard title="Execution plan" badge="design-only" marker="GuardedApplyExecutionPlanPanel renders execution plan says design-only in Phase 83 execution plan says use existing guarded apply boundary only if present">
      <GuardedApplyCandidateList items={[...plan.summary, ...plan.steps.map((step) => `${step.label}: ${step.detail}`)]} />
    </GuardedApplyCandidateCard>
  );
}
