import { buildRealTrialFrictionPatchItem } from "./real-trial-friction-types";
import type { RealTrialFrictionPatchItem } from "./real-trial-friction-types";

export function buildRealTrialSafetyCopyPatch(): RealTrialFrictionPatchItem {
  return buildRealTrialFrictionPatchItem("real-trial-patch-handoff", "Patch real trial friction", "one obvious next action; clearer empty states; less jargon; compact safety badges; no auto-apply; no auto-run; approval required; preserve latest-message authority");
}
