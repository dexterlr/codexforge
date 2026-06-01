import type { SafetyPromise } from "./safety-coach-types";

export function buildSafetyPromise(): SafetyPromise {
  return { title: "What CodexForge promises here", promises: ["Preview before changes", "Approval required before apply", "Validation stays separate", "Recovery is available if anything fails"] };
}
