import { buildRealManualMvpTrialItem } from "./real-manual-mvp-trial-types";
import type { RealManualMvpTrialItem } from "./real-manual-mvp-trial-types";

export function buildManualMvpTrialSafeScenario(): RealManualMvpTrialItem {
  return buildRealManualMvpTrialItem("manual-mvp-trial-validation", "Run the real coding MVP trial", "Copy trial checklist; Copy validation commands; Copy trial report; no auto-apply; no auto-run; approval required; preserve latest-message authority");
}
