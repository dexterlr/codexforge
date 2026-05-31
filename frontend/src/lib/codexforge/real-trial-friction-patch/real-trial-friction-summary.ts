import { buildRealTrialFrictionPatchItem } from "./real-trial-friction-types";
import type { RealTrialFrictionPatchItem, RealTrialFrictionPatchSummary } from "./real-trial-friction-types";

export function buildRealTrialPatchHandoff(): RealTrialFrictionPatchItem {
  return buildRealTrialFrictionPatchItem("real-trial-friction-summary", "Patch real trial friction", "one obvious next action; clearer empty states; less jargon; compact safety badges; no auto-apply; no auto-run; approval required; preserve latest-message authority");
}

export function buildRealTrialFrictionSummary(): RealTrialFrictionPatchSummary {
  return {
    title: "Patch real trial friction",
    status: "review",
    primaryAction: "Review friction fixes",
    nextRoute: "/code-flow/real-trial-fixes",
    items: [buildRealTrialFrictionPatchItem("summary-01", "Patch real trial friction", "one obvious next action; clearer empty states; less jargon; compact safety badges; no auto-apply; no auto-run; approval required; preserve latest-message authority")]
  };
}
