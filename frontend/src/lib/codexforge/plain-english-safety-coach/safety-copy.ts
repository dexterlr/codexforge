import type { SafetyCopy } from "./safety-coach-types";

export function buildSafetyCopy(): SafetyCopy {
  return { title: "Copy safety note", copyText: "Preview means nothing changed. Apply may change a file and needs approval. Validation is run separately. Evidence records what happened. Recovery and rollback are available if anything fails." };
}
