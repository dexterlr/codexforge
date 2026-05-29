import type { DemoSuccessCriteria } from "./operator-demo-types";

export function buildDemoSuccessCriteria(): DemoSuccessCriteria {
  return { criteria: ["safe scenario only", "plain English copy", "advanced details hidden", "no execution buttons", "latest-message authority visible"], noFakeApplyClaim: true, noFakeValidationSuccess: true };
}
