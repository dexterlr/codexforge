import { buildRealManualMvpTrialItem, buildManualMvpTrialStableKey } from "./real-manual-mvp-trial-types";
import type { RealManualMvpTrialItem } from "./real-manual-mvp-trial-types";

export function buildDefaultManualMvpTrialSteps(): RealManualMvpTrialItem[] {
  return [
    buildRealManualMvpTrialItem(buildManualMvpTrialStableKey("step", 1), "Open /start", "Start from the canonical MVP path."),
    buildRealManualMvpTrialItem(buildManualMvpTrialStableKey("step", 2), "Open /code-flow/live-run", "Use one safe file and one harmless wording change."),
    buildRealManualMvpTrialItem(buildManualMvpTrialStableKey("step", 3), "Review release evidence", "Copy trial checklist; Copy validation commands; Copy trial report; no auto-apply; no auto-run; approval required; preserve latest-message authority")
  ];
}
