export type OperatorRunbookStatus = "ready" | "review" | "review-required" | "trial-ready" | "runbook-ready" | "blocked" | "passed" | "failed" | "unknown" | "demo-ready" | "demo-ready-with-notes" | "not-ready";
export type OperatorRunbookItem = { id: string; title: string; status: OperatorRunbookStatus; detail: string; nextAction: string };
export type OperatorRunbookSummary = { title: string; status: OperatorRunbookStatus; primaryAction: string; nextRoute: string; items: OperatorRunbookItem[] };
export function buildOperatorRunbookStableKey(prefix: string, index: number): string { return prefix + "-" + index.toString().padStart(2, "0"); }
export function buildOperatorRunbookItem(id: string, title: string, detail: string, nextAction = "Copy the reviewed handoff and continue manually."): OperatorRunbookItem { return { id, title, status: "review", detail, nextAction }; }
