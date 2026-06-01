import type { SafetyCoachSummary } from "./safety-coach-types";
import { buildSafetyCopy } from "./safety-copy";
import { buildSafetyNextStep } from "./safety-next-step";
import { buildSafetyPromise } from "./safety-promise";
import { buildDefaultSafetyTerms } from "./safety-term";
import { buildSafetyWarning } from "./safety-warning";

export function buildSafetyCoachSummary(): SafetyCoachSummary {
  return { title: "Safety coach", subtitle: "Short plain-English explanations for the safe coding path.", primaryAction: "Start with safety", terms: buildDefaultSafetyTerms(), promise: buildSafetyPromise(), warning: buildSafetyWarning(), nextStep: buildSafetyNextStep(), copy: buildSafetyCopy() };
}

export function summarizeSafetyCoachSession(summary = buildSafetyCoachSummary()): string {
  return `${summary.terms.length} safety terms, approval required, no auto-apply, no auto-run, validation separate.`;
}
