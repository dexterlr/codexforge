import type { ValidationCommandCapture, ValidationCaptureInput } from "./validation-result-capture-types";

export function buildValidationCommandCapture(input: ValidationCaptureInput): ValidationCommandCapture {
  return { commands: input.commands, capturedManually: true, noCommandExecution: true };
}
