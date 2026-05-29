import type { FrictionFix } from "./trial-friction-fix-types";

export function buildFrictionSafetyCopyFix(): FrictionFix {
  return { id: "safety-copy-fix", title: "Shorten noisy safety warning", route: "/guarded-apply-mvp", change: "Keep no auto-apply, no auto-run, approval required, and latest-message authority visible.", safe: true };
}
