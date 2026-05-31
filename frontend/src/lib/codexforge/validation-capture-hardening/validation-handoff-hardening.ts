export function classifyValidationFailure(output: string): "passed" | "failed" | "unknown" {
  const normalized = output.toLowerCase();
  if (normalized.includes("failed") || normalized.includes("error")) return "failed";
  if (normalized.includes("passed") || normalized.includes("success")) return "passed";
  return "unknown";
}
