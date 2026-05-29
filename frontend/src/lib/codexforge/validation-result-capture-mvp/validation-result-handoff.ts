import type { ValidationFailureRouting, ValidationResultHandoff } from "./validation-result-capture-types";

export function buildValidationResultHandoff(routing: ValidationFailureRouting): ValidationResultHandoff {
  return { targetRoute: routing.recommendedRoute, summary: `Validation handoff to ${routing.recommendedRoute}: ${routing.reason}`, copyAllowed: true };
}
