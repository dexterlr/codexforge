import type { FirstTaskSafeFile } from "./novice-first-task-types";

export function buildFirstTaskSafeFile(input: Partial<FirstTaskSafeFile> = {}): FirstTaskSafeFile {
  return {
    path: input.path ?? "src/app/demo/page-client.tsx",
    whySafe: input.whySafe ?? "It is a UI route with visible wording. The first task only changes a harmless sentence.",
    avoid: input.avoid ?? ["package files", "config files", "lock files", "tool-policy files", "Brain files", "runtime files"],
  };
}
