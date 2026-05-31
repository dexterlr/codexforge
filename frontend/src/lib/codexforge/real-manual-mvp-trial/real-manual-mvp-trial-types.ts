export type RealManualMvpTrialItem = {
  id: string;
  title: string;
  status: "ready" | "review" | "blocked" | "passed" | "failed" | "unknown";
  detail: string;
  nextAction: string;
};

export type RealManualMvpTrialSummary = {
  title: string;
  status: "ready" | "review" | "blocked" | "passed" | "failed" | "unknown";
  primaryAction: string;
  nextRoute: string;
  items: RealManualMvpTrialItem[];
};

export function buildManualMvpTrialStableKey(prefix: string, index: number): string {
  return prefix + "-" + index.toString().padStart(2, "0");
}

export function buildRealManualMvpTrialItem(id: string, title: string, detail: string, nextAction = "Copy the reviewed handoff and continue manually."): RealManualMvpTrialItem {
  return { id, title, status: "review", detail, nextAction };
}
