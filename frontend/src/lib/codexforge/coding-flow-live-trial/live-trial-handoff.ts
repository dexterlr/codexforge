import type { LiveTrialHandoff, LiveTrialHandoffSection } from "./coding-flow-live-trial-types";

export function buildLiveTrialHandoffSection(input: LiveTrialHandoffSection): LiveTrialHandoffSection {
  return { ...input };
}

function section(sectionId: string, title: string, prompt: string): LiveTrialHandoffSection {
  return buildLiveTrialHandoffSection({ sectionId, title, prompt, copyTemplate: `## ${title}\n${prompt}\n\n<operator notes>` });
}

export function buildLiveTrialHandoff(): LiveTrialHandoff {
  const sections = [
    section("trial-summary", "trial summary", "Outcome, status, duration, and operator."),
    section("selected-file", "selected file", "Safe category, selected path, and why it was safe."),
    section("requested-change", "requested change", "Exact request used for preview."),
    section("validation-result", "validation result", "Commands, status, and capped output."),
    section("what-worked", "what worked", "Screens and guidance that worked."),
    section("what-failed", "what failed", "Failures, blockers, or confusing UI."),
    section("next-action", "next action", "Run history handoff, closed-loop route, or finish."),
    section("recommended-product-fix", "recommended product fix if UX issue found", "Plain-English product fix recommendation."),
  ];
  const markdownTrialReport = ["# Coding Flow Live Trial Report", "", ...sections.map((item) => item.copyTemplate)].join("\n\n");
  return {
    handoffId: "coding-flow-live-trial-handoff",
    title: "Trial Handoff",
    sections,
    markdownTrialReport,
    issueDraft: "Issue draft: summarize trial status, selected file, expected screen gap, actual behavior, validation result, and recommended product fix.",
    runHistoryHandoff: "Run history handoff: trial run kind, selected file, change request, validation result, failure route, next action, no auto-persistence.",
    workflowResultHandoff: "Workflow result handoff: reviewed result, capped validation output, pass/fail status, next safe action, no Brain auto-mutation.",
  };
}

export function summarizeLiveTrialHandoff(handoff = buildLiveTrialHandoff()): string {
  return `${handoff.sections.length} handoff sections with markdown trial report, issue draft, run history handoff, and workflow result handoff.`;
}
