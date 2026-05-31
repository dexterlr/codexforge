export type RealTrialFrictionPatchItem = {
  id: string;
  title: string;
  status: "ready" | "review" | "blocked" | "passed" | "failed" | "unknown";
  detail: string;
  nextAction: string;
};

export type RealTrialFrictionPatchSummary = {
  title: string;
  status: "ready" | "review" | "blocked" | "passed" | "failed" | "unknown";
  primaryAction: string;
  nextRoute: string;
  items: RealTrialFrictionPatchItem[];
};

export function buildRealTrialFrictionStableKey(prefix: string, index: number): string {
  return prefix + "-" + index.toString().padStart(2, "0");
}

export function buildRealTrialFrictionPatchItem(id: string, title: string, detail: string, nextAction = "Copy the reviewed handoff and continue manually."): RealTrialFrictionPatchItem {
  return { id, title, status: "review", detail, nextAction };
}
