import type { ValidationCaptureInput, ValidationCaptureInputSource, ValidationCaptureValidation } from "./validation-result-capture-types";

export function buildValidationResultStableKey(...parts: Array<string | null | undefined>): string {
  return (parts.filter(Boolean).join(":").toLowerCase().replace(/[^a-z0-9/_:.-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 96)) || "validation-result";
}

export function buildValidationCaptureInput(source: ValidationCaptureInputSource = {}): ValidationCaptureInput {
  return {
    commands: source.commands && source.commands.length > 0 ? source.commands : ["npm run build", "targeted smoke", "git diff --check"],
    output: source.output?.slice(0, 4000) || "",
    exitCode: source.exitCode ?? null,
    validationKind: source.validationKind?.trim() || "manual validation result",
    manualPasteRequired: true,
    noAutoRunGuarantee: true,
  };
}

export function validateValidationCaptureInput(input: ValidationCaptureInput): ValidationCaptureValidation {
  const blockedReasons: string[] = [];
  if (!input.output.trim()) blockedReasons.push("Paste validation output to review the result.");
  return { ok: blockedReasons.length === 0, blockedReasons, warnings: ["no command execution", "no auto-run", "no fabricated output", "cap output"] };
}
