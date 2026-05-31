import type { FirstSuccessfulCodingRunItem } from "./first-successful-run-types";

export function validateSuccessfulRunRecord(input: Partial<FirstSuccessfulCodingRunItem>): string[] {
  const issues: string[] = [];
  if (!input.title) issues.push("Add a clear title before this is ready.");
  if (!input.detail) issues.push("Add reviewed evidence before recording success.");
  return issues;
}
