import type { FrictionFinding } from "./trial-friction-fix-types";

const rank = { now: 0, next: 1, later: 2 } as const;

export function prioritizeFrictionFindings(findings: FrictionFinding[]): FrictionFinding[] {
  return [...findings].sort((a, b) => rank[a.priority] - rank[b.priority] || a.id.localeCompare(b.id));
}
