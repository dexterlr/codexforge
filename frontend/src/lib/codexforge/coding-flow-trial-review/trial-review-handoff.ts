import { buildTrialReviewStableKey, type TrialReviewHandoff, type TrialReviewHandoffSection } from "./coding-flow-trial-review-types";
import { buildTrialGoNoGoDecision, summarizeTrialGoNoGoDecision } from "./trial-go-no-go-decision";
import { buildTrialUxFixPlan, summarizeTrialUxFixPlan } from "./trial-ux-fix-plan";

export function buildTrialReviewHandoffSection(title: string, body: string): TrialReviewHandoffSection {
  return { sectionId: buildTrialReviewStableKey("handoff-section", title), title, body };
}

export function buildTrialReviewHandoff(sections: TrialReviewHandoffSection[] = DEFAULT_SECTIONS): TrialReviewHandoff {
  const decision = buildTrialGoNoGoDecision();
  const fixPlan = buildTrialUxFixPlan();
  const markdownTrialReview = sections.map((section) => `## ${section.title}\n${section.body}`).join("\n\n");
  return {
    handoffId: "trial-review-handoff",
    title: "Trial review handoff",
    sections: sections.map((section) => ({ ...section })),
    markdownTrialReview,
    productIssueDraft: "Product issue draft: capture coding trial friction, affected route, evidence, severity, and proposed small UX fix.",
    uxFixPrompt: `UX fix prompt: ${summarizeTrialUxFixPlan(fixPlan)} Keep changes small, user-facing, and smoke-backed.`,
    releaseReadinessNote: `Release readiness note: ${summarizeTrialGoNoGoDecision(decision)} Copy only; no file writes.`,
  };
}

export function summarizeTrialReviewHandoff(handoff = buildTrialReviewHandoff()): string {
  return `${handoff.title}: ${handoff.sections.length} sections, supports UX fix prompt and release readiness note.`;
}

const DEFAULT_SECTIONS = [
  buildTrialReviewHandoffSection("trial summary", "Manual coding trial notes, final status, selected file, and screens visited."),
  buildTrialReviewHandoffSection("pass/fail checklist", "Pass, fail, partial, blocked, and not-tested checks from the trial."),
  buildTrialReviewHandoffSection("friction summary", "Top confusing moments, route handoff issues, and missing next actions."),
  buildTrialReviewHandoffSection("validation summary", "Manual commands reviewed, output captured, and pass/fail clarity."),
  buildTrialReviewHandoffSection("safety summary", "No auto-apply, no auto-run, approval required, and latest-message authority."),
  buildTrialReviewHandoffSection("go/no-go decision", "go, go-with-fixes, no-go, blocked, or unknown decision."),
  buildTrialReviewHandoffSection("top UX fixes", "Small copy, layout, navigation, validation, result-capture, and safety-copy fixes."),
  buildTrialReviewHandoffSection("recommended next phase", "Top UX fixes first, then Real Apply Guard Review if the trial passes."),
];
