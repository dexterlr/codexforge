import type { AssistedQualityHandoff } from "./assisted-quality-types";

export function buildAssistedQualityHandoff(): AssistedQualityHandoff {
  return { title: "Copy quality sweep", copyText: "Assisted MVP quality sweep: novice path has one primary action, plain-English safety, helpful empty states, separate apply and validation, no hidden mutation, and recovery if blocked." };
}
