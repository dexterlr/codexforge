import { buildRealManualMvpTrialItem } from "./real-manual-mvp-trial-types";
import type { RealManualMvpTrialItem, RealManualMvpTrialSummary } from "./real-manual-mvp-trial-types";

export function selectManualMvpTrialNextAction(input?: Partial<RealManualMvpTrialItem>): string {
  if (input?.status === "failed") return "/closed-loop";
  if (input?.status === "passed") return "/workflow-results";
  return "Copy the handoff and continue manually.";
}

export function buildManualMvpTrialHandoff(): import("./real-manual-mvp-trial-types").RealManualMvpTrialItem {
  return buildRealManualMvpTrialItem("buildManualMvpTrialHandoff", "Run the real coding MVP trial", "Copy trial checklist; Copy validation commands; Copy trial report; no auto-apply; no auto-run; approval required; preserve latest-message authority");
}

export function buildRealManualMvpTrialSummary(): RealManualMvpTrialSummary {
  return {
    title: "Run the real coding MVP trial",
    status: "review",
    primaryAction: "Start real trial",
    nextRoute: "/code-flow/real-trial",
    items: [buildRealManualMvpTrialItem("summary-01", "Run the real coding MVP trial", "Copy trial checklist; Copy validation commands; Copy trial report; no auto-apply; no auto-run; approval required; preserve latest-message authority")]
  };
}
