import type { DemoSafeScenario } from "./operator-demo-types";

export function buildDemoSafeScenario(): DemoSafeScenario {
  return { title: "Safe wording-only demo", fileCategory: "UI copy or empty state component", change: "Change one harmless sentence so the workflow can be reviewed.", blockedClaims: ["do not claim code was applied unless evidence is supplied", "do not claim validation passed unless output is supplied", "do not use secrets or generated files"] };
}
