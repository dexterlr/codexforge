import type { DemoScript } from "./operator-demo-types";
import { buildDemoStep } from "./demo-step";

export function buildDemoScript(): DemoScript {
  return { title: "Demo the coding MVP", noExecution: true, steps: [
    buildDemoStep({ order: 1, title: "Start at Start", route: "/start", talkingPoint: "Choose coding flow from the normal operator entry." }),
    buildDemoStep({ order: 2, title: "Choose coding flow", route: "/code-flow/live-run", talkingPoint: "One guided path is visible." }),
    buildDemoStep({ order: 3, title: "Pick safe file", route: "/files", talkingPoint: "Safe file review stays read-only." }),
    buildDemoStep({ order: 4, title: "Preview change", route: "/files", talkingPoint: "Patch preview happens before apply review." }),
    buildDemoStep({ order: 5, title: "Review guarded apply request", route: "/guarded-apply-mvp", talkingPoint: "Approval is required before the apply boundary." }),
    buildDemoStep({ order: 6, title: "Capture apply evidence", route: "/apply-evidence", talkingPoint: "Evidence is captured manually." }),
    buildDemoStep({ order: 7, title: "Capture validation result", route: "/validation-results", talkingPoint: "Validation output is supplied by the operator." }),
    buildDemoStep({ order: 8, title: "Review workflow results", route: "/workflow-results", talkingPoint: "Result handoff is reviewable." }),
    buildDemoStep({ order: 9, title: "See run history", route: "/run-history", talkingPoint: "Recent work is visible without auto-promotion." }),
    buildDemoStep({ order: 10, title: "Show release audit", route: "/code-flow/release-audit", talkingPoint: "Release readiness is a final manual call." }),
  ] };
}
