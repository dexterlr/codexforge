export type ManualProductTrialStatus = "ready" | "review" | "review-required" | "trial-ready" | "runbook-ready" | "blocked" | "passed" | "failed" | "unknown" | "demo-ready" | "demo-ready-with-notes" | "not-ready";
export type ManualProductTrialItem = { id: string; title: string; status: ManualProductTrialStatus; detail: string; nextAction: string };
export type ManualProductTrialSummary = { title: string; status: ManualProductTrialStatus; primaryAction: string; nextRoute: string; items: ManualProductTrialItem[] };
export function buildManualProductTrialStableKey(prefix: string, index: number): string { return prefix + "-" + index.toString().padStart(2, "0"); }
export function buildManualProductTrialItem(id: string, title: string, detail: string, nextAction = "Copy the reviewed handoff and continue manually."): ManualProductTrialItem { return { id, title, status: "review", detail, nextAction }; }
