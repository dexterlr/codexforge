import type { DemoScript, DemoSummary } from "./operator-demo-types";

export function buildDemoSummary(script: DemoScript): DemoSummary {
  return { title: "Demo the coding MVP", stepCount: script.steps.length, nextAction: "Start demo", safety: "no execution, no fake apply claim, no fake validation success" };
}
