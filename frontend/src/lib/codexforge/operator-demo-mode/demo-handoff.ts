import type { DemoHandoff, DemoScript } from "./operator-demo-types";

export function buildDemoHandoff(script: DemoScript): DemoHandoff {
  return { title: "Operator demo script", copyScript: script.steps.map((step) => `${step.order}. ${step.route}: ${step.talkingPoint}`).join("\n"), hrefs: script.steps.map((step) => step.route), noUnsafeExecution: true };
}
