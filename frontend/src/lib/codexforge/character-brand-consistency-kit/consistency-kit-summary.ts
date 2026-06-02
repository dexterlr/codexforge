import type { ConsistencyKitSummary } from "./consistency-kit-types";
import { buildConsistencyCheck } from "./consistency-check";
import { buildConsistencyHandoff } from "./consistency-handoff";
import { buildConsistencyIdentityCard } from "./consistency-identity-card";
import { buildConsistencyNegativeRules } from "./consistency-negative-rules";
import { buildDefaultConsistencySubjects } from "./consistency-subject";
import { buildConsistencyVisualRules } from "./consistency-visual-rules";

export function buildConsistencyKitSummary(): ConsistencyKitSummary {
  const subjects = buildDefaultConsistencySubjects();
  const identityCards = buildConsistencyIdentityCard(subjects);
  const visualRules = buildConsistencyVisualRules(subjects);
  const negativeRules = buildConsistencyNegativeRules(subjects);
  const checks = buildConsistencyCheck(subjects);
  const handoff = buildConsistencyHandoff(subjects);

  return {
    subjects,
    identityCards,
    visualRules,
    negativeRules,
    checks,
    handoff,
    summary: summarizeConsistencyKit({ subjects, identityCards, visualRules, negativeRules, checks, handoff, summary: "" }),
  };
}

export function summarizeConsistencyKit(summary: ConsistencyKitSummary): string {
  return `${summary.subjects.length} consistency subjects are ready for planning review; identity notes stay copy-only and notes-only.`;
}
