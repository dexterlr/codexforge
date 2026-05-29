import type { ManualTrialSafeChange } from "./live-manual-trial-types";

export function buildManualTrialSafeChange(input: Partial<ManualTrialSafeChange> = {}): ManualTrialSafeChange {
  return { id: input.id ?? "copy-only-safe-change", filePattern: input.filePattern ?? "src/app/**/page-client.tsx or src/lib/**/components/*.tsx", allowed: input.allowed ?? true, reason: input.reason ?? "Copy-only UI wording is reviewable and low risk.", disallowed: input.disallowed ?? ["package/config/tool-policy/runtime/brain files", "secret-like content", "generated files", "large multi-file diffs"] };
}

export function buildDefaultManualTrialSafeChanges(): ManualTrialSafeChange[] {
  return [buildManualTrialSafeChange()];
}
