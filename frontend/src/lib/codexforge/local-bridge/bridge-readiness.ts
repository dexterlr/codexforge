import type {
  BridgeConsentBoundary,
  BridgePolicyBoundary,
  BridgeReadiness,
  BridgeReadinessDimension,
} from "./bridge-types";

export function buildBridgeReadiness(args: {
  consentBoundary?: BridgeConsentBoundary;
  policyBoundary?: BridgePolicyBoundary;
} = {}): BridgeReadiness {
  const dimensions: BridgeReadinessDimension[] = [
    {
      id: "consent-readiness",
      label: "Consent readiness",
      status: args.consentBoundary?.status === "blocked" ? "blocked" : "guarded",
      score: 72,
      detail: "Preview allowed; desktop and camera paths require explicit session consent.",
    },
    {
      id: "policy-readiness",
      label: "Policy readiness",
      status: args.policyBoundary?.rules.every((rule) => rule.enforced) === false ? "blocked" : "ready",
      score: 94,
      detail: "Bridge policy boundary is deterministic and enforced in preview.",
    },
    {
      id: "adapter-readiness",
      label: "Adapter readiness",
      status: "guarded",
      score: 68,
      detail: "Adapters are known by manifest but no external bridge connection is opened.",
    },
    {
      id: "run-center-readiness",
      label: "Run center readiness",
      status: "ready",
      score: 88,
      detail: "Operator Run Center handoff can be prepared as a preview payload.",
    },
    {
      id: "audit-readiness",
      label: "Audit readiness",
      status: "ready",
      score: 90,
      detail: "Audit trail is generated in memory for review without persistent writes.",
    },
    {
      id: "rollback-replay-readiness",
      label: "Rollback/replay readiness",
      status: "guarded",
      score: 74,
      detail: "Replay packets are previewed; future execution must include rollback evidence.",
    },
  ];

  const score = scoreBridgeReadiness(dimensions);

  return {
    dimensions,
    score,
    label: score >= 85 ? "ready" : "guarded",
    summary: summarizeBridgeReadinessFromDimensions(dimensions, score),
  };
}

export function scoreBridgeReadiness(dimensions: BridgeReadinessDimension[]): number {
  if (dimensions.length === 0) return 0;

  const total = dimensions.reduce((sum, item) => sum + item.score, 0);
  return Math.round(total / dimensions.length);
}

function summarizeBridgeReadinessFromDimensions(
  dimensions: BridgeReadinessDimension[],
  score: number
): string[] {
  return [
    `Readiness score: ${score}`,
    `${dimensions.filter((item) => item.status === "ready").length} dimensions ready.`,
    `${dimensions.filter((item) => item.status === "guarded").length} dimensions guarded.`,
    "No external probing performed.",
  ];
}

export function summarizeBridgeReadiness(
  readiness: BridgeReadiness = buildBridgeReadiness()
): string[] {
  return [...readiness.summary];
}
