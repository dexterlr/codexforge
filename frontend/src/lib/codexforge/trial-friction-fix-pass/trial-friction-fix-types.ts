export type FrictionCategory = "unclear next step" | "too many panels" | "wording too technical" | "validation unclear" | "apply blocked unclear" | "route handoff confusing" | "safety warning noisy" | "empty state unhelpful" | "result capture unclear" | "manual trial hard to follow";
export type FrictionPriority = "now" | "next" | "later";
export type FrictionFinding = { id: string; category: FrictionCategory; route: string; note: string; priority: FrictionPriority };
export type FrictionFix = { id: string; title: string; route: string; change: string; safe: true };
export type FrictionFixHandoff = { title: string; copyPlan: string; routes: string[]; noUnsafeExecution: true };
export type FrictionFixSummary = { title: string; nowCount: number; nextAction: string; safety: string };
