export type ApplyTrialHardeningStatus = "ready" | "review" | "review-required" | "trial-ready" | "runbook-ready" | "blocked" | "passed" | "failed" | "unknown" | "demo-ready" | "demo-ready-with-notes" | "not-ready";
export type ApplyTrialHardeningItem = { id: string; title: string; status: ApplyTrialHardeningStatus; detail: string; nextAction: string };
export type ApplyTrialHardeningSummary = { title: string; status: ApplyTrialHardeningStatus; primaryAction: string; nextRoute: string; items: ApplyTrialHardeningItem[] };
export function buildApplyTrialHardeningStableKey(prefix: string, index: number): string { return prefix + "-" + index.toString().padStart(2, "0"); }
export function buildApplyTrialHardeningItem(id: string, title: string, detail: string, nextAction = "Copy the reviewed handoff and continue manually."): ApplyTrialHardeningItem { return { id, title, status: "review", detail, nextAction }; }
