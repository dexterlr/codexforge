export type GuardedApplyMvpHardeningItem = {
  id: string;
  title: string;
  status: "ready" | "review" | "blocked" | "passed" | "failed" | "unknown";
  detail: string;
  nextAction: string;
};

export type GuardedApplyMvpHardeningSummary = {
  title: string;
  status: "ready" | "review" | "blocked" | "passed" | "failed" | "unknown";
  primaryAction: string;
  nextRoute: string;
  items: GuardedApplyMvpHardeningItem[];
};

export function buildGuardedApplyHardeningStableKey(prefix: string, index: number): string {
  return prefix + "-" + index.toString().padStart(2, "0");
}

export function buildGuardedApplyMvpHardeningItem(id: string, title: string, detail: string, nextAction = "Copy the reviewed handoff and continue manually."): GuardedApplyMvpHardeningItem {
  return { id, title, status: "review", detail, nextAction };
}
