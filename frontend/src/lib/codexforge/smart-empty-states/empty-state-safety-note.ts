import type { EmptyStateSafetyNote } from "./smart-empty-state-types";

export function buildEmptyStateSafetyNote(): EmptyStateSafetyNote {
  return { title: "Safety note", note: "Empty states can guide and explain. They do not apply changes, run checks, write files, or promote memory." };
}
