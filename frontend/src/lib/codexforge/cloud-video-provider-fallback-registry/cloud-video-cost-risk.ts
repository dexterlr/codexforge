import type { CloudVideoCostRisk, CloudVideoCostRiskId } from "./cloud-video-provider-types";

const RISK_LABELS: Record<CloudVideoCostRiskId, string> = {
  unknown: "Unknown cost",
  low: "Low cost risk",
  medium: "Medium cost risk",
  high: "High cost risk",
  "credit-based": "Credit based",
  "subscription-limited": "Subscription limited",
  "manual-only": "Manual only",
};

export function buildCloudVideoCostRisk(
  risk: CloudVideoCostRiskId = "unknown",
  input: Partial<CloudVideoCostRisk> = {}
): CloudVideoCostRisk {
  const label = input.label ?? RISK_LABELS[risk];
  return {
    id: input.id ?? `cloud-video-cost-risk-${risk}`,
    risk: input.risk ?? risk,
    label,
    plainEnglish:
      input.plainEnglish ??
      "Cloud providers can cost money or credits, so CodexForge treats this as a review item before any manual handoff.",
    budgetNote:
      input.budgetNote ??
      "No credits are spent here. Confirm budget, account limits, and expected retries before a future manual cloud step.",
  };
}
