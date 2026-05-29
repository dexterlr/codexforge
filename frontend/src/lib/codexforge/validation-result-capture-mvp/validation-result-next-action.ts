import type { ValidationFailureRouting, ValidationResultNextAction } from "./validation-result-capture-types";

export function selectValidationResultNextAction(routing: ValidationFailureRouting): ValidationResultNextAction {
  return { label: routing.recommendedRoute === "/closed-loop" ? "Copy failure handoff" : "Copy result summary", href: routing.recommendedRoute, copyPayload: routing.reason };
}
