import { buildRealTrialFrictionPatchItem, buildRealTrialFrictionStableKey } from "./real-trial-friction-types";
import type { RealTrialFrictionPatchItem } from "./real-trial-friction-types";

export function buildDefaultRealTrialFrictionFindings(): RealTrialFrictionPatchItem[] {
  return [
    buildRealTrialFrictionPatchItem(buildRealTrialFrictionStableKey("step", 1), "Open /start", "Start from the canonical MVP path."),
    buildRealTrialFrictionPatchItem(buildRealTrialFrictionStableKey("step", 2), "Open /code-flow/live-run", "Use one safe file and one harmless wording change."),
    buildRealTrialFrictionPatchItem(buildRealTrialFrictionStableKey("step", 3), "Review release evidence", "one obvious next action; clearer empty states; less jargon; compact safety badges; no auto-apply; no auto-run; approval required; preserve latest-message authority")
  ];
}
