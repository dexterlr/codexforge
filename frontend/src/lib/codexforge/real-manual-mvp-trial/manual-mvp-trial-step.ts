import type { RealManualMvpTrialItem } from "./real-manual-mvp-trial-types";

export function validateManualMvpTrialInput(input: Partial<RealManualMvpTrialItem>): string[] {
  const issues: string[] = [];
  if (!input.title) issues.push("Add a clear title before this is ready.");
  if (!input.detail) issues.push("Add reviewed evidence before recording success.");
  return issues;
}
