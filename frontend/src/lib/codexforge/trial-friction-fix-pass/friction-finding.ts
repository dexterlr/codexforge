import type { FrictionFinding } from "./trial-friction-fix-types";

export function buildFrictionFixStableKey(...parts: Array<string | null | undefined>): string {
  return parts.filter(Boolean).join(":").toLowerCase().replace(/[^a-z0-9/_:.-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 96) || "friction-fix";
}

export function buildFrictionFinding(input: Partial<FrictionFinding> = {}): FrictionFinding {
  const category = input.category ?? "unclear next step";
  return { id: input.id ?? buildFrictionFixStableKey(category, input.route ?? "/code-flow/manual-trial"), category, route: input.route ?? "/code-flow/manual-trial", note: input.note ?? "Operator cannot tell the next safe step quickly.", priority: input.priority ?? "now" };
}

export function buildDefaultFrictionFindings(): FrictionFinding[] {
  return [
    buildFrictionFinding(),
    buildFrictionFinding({ category: "validation unclear", route: "/validation-results", note: "Validation output capture needs plainer copy.", priority: "now" }),
    buildFrictionFinding({ category: "route handoff confusing", route: "/code-flow/live-run", note: "Manual trial handoff should be visible.", priority: "next" }),
    buildFrictionFinding({ category: "empty state unhelpful", route: "/run-history", note: "Mention manual trial records when no run is selected.", priority: "later" }),
  ];
}
