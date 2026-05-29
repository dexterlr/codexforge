import type { FrictionFix } from "./trial-friction-fix-types";

export function buildFrictionCopyFix(): FrictionFix {
  return { id: "copy-fix-next-step", title: "Clarify next step", route: "/code-flow/manual-trial", change: "Use plain English and name the next route.", safe: true };
}
