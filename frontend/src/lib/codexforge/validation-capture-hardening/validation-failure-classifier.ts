export function summarizeValidationOutputSafely(output: string): string {
  const trimmed = output.trim();
  if (!trimmed) return "Paste validation output to review it.";
  return trimmed.length > 900 ? trimmed.slice(0, 900) + "... output capped for review" : trimmed;
}
