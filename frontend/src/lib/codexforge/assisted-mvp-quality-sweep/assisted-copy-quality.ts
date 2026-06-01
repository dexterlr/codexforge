import type { AssistedCopyQuality } from "./assisted-quality-types";

export function buildAssistedCopyQuality(): AssistedCopyQuality {
  return { title: "Copy quality", rule: "Main copy avoids phase labels, keeps jargon out of the novice path, and explains one next action at a time." };
}
