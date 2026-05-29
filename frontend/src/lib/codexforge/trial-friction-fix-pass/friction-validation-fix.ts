import type { FrictionFix } from "./trial-friction-fix-types";

export function buildFrictionValidationFix(): FrictionFix {
  return { id: "validation-fix-copy-commands", title: "Separate copy commands from running", route: "/validation-results", change: "Say validation commands are copied and run manually outside the UI.", safe: true };
}
