import type { DemoScript, DemoScreenMap } from "./operator-demo-types";

export function buildDemoScreenMap(script: DemoScript): DemoScreenMap {
  return { routes: script.steps.map((step) => step.route), advancedDetailsHidden: true };
}
