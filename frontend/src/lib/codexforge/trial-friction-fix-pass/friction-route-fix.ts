import type { FrictionFix } from "./trial-friction-fix-types";

export function buildFrictionRouteFix(): FrictionFix {
  return { id: "route-fix-handoff", title: "Make handoff route obvious", route: "/start", change: "Prefer locked coding path and manual trial links.", safe: true };
}
