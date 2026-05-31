export type MvpExperienceLockStatus = "ready" | "review" | "review-required" | "trial-ready" | "runbook-ready" | "blocked" | "passed" | "failed" | "unknown" | "demo-ready" | "demo-ready-with-notes" | "not-ready";
export type MvpExperienceLockItem = { id: string; title: string; status: MvpExperienceLockStatus; detail: string; nextAction: string };
export type MvpExperienceLockSummary = { title: string; status: MvpExperienceLockStatus; primaryAction: string; nextRoute: string; items: MvpExperienceLockItem[] };
export function buildMvpExperienceLockStableKey(prefix: string, index: number): string { return prefix + "-" + index.toString().padStart(2, "0"); }
export function buildMvpExperienceLockItem(id: string, title: string, detail: string, nextAction = "Copy the reviewed handoff and continue manually."): MvpExperienceLockItem { return { id, title, status: "review", detail, nextAction }; }
