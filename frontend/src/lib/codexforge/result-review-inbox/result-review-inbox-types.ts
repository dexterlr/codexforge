export type ReviewInboxItemKind = "apply-evidence" | "validation-result" | "workflow-result" | "run-history" | "recovery-needed" | "demo-note" | "release-readiness" | "unknown";
export type ReviewInboxStatus = "needs-review" | "ready" | "blocked" | "passed" | "failed" | "unknown";
export type ReviewInboxPriority = "now" | "soon" | "later";

export type ReviewInboxItem = { id: string; kind: ReviewInboxItemKind; title: string; status: ReviewInboxStatus; route: string; summary: string };
export type ReviewInboxFilter = { status: ReviewInboxStatus | "all"; label: string };
export type ReviewInboxPriorityResult = { priority: ReviewInboxPriority; reason: string };
export type ReviewInboxNextAction = { label: string; href: string; reason: string };
export type ReviewInboxSafetyNote = { title: string; notes: string[] };
export type ReviewInboxHandoff = { title: string; copyText: string };
export type ResultReviewInboxSummary = { title: string; subtitle: string; primaryAction: string; items: ReviewInboxItem[]; filter: ReviewInboxFilter; nextAction: ReviewInboxNextAction; safetyNote: ReviewInboxSafetyNote; handoff: ReviewInboxHandoff };
