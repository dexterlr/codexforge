import type { FrictionFix } from "./trial-friction-fix-types";

export function buildFrictionLayoutFix(): FrictionFix {
  return { id: "layout-fix-primary-first", title: "Keep one primary action first", route: "/code-flow/live-run", change: "Keep advanced details collapsed and secondary.", safe: true };
}
