import type { ValidationFailureRouting, ValidationPassFailSummary } from "./validation-result-capture-types";

export function buildValidationFailureRouting(summary: ValidationPassFailSummary, commands: string[] = []): ValidationFailureRouting {
  const joined = commands.join(" ").toLowerCase();
  if (summary.status === "fail" && joined.includes("git diff")) return { recommendedRoute: "/apply-validation", reason: "git diff check failure routes to /apply-validation or /files." };
  if (summary.status === "fail") return { recommendedRoute: "/closed-loop", reason: "failure routes to /closed-loop." };
  if (summary.status === "pass") return { recommendedRoute: "/workflow-results", reason: "passing routes to /workflow-results and /run-history." };
  return { recommendedRoute: "/validation-results", reason: "Unknown result stays in validation capture." };
}
