import type { BridgeAuditItem, BridgeAuditTrail } from "./bridge-types";

export function buildBridgeAuditItem(
  id: string,
  label: string,
  detail: string,
  status: BridgeAuditItem["status"] = "recorded"
): BridgeAuditItem {
  return { id, label, detail, status };
}

export function buildBridgeAuditTrail(): BridgeAuditTrail {
  const items = [
    buildBridgeAuditItem("policy-checked", "Policy checked", "Bridge policy boundary reviewed."),
    buildBridgeAuditItem("consent-checked", "Consent checked", "Session consent requirements reviewed."),
    buildBridgeAuditItem(
      "adapter-readiness-checked",
      "Adapter readiness checked",
      "Adapter matrix evaluated from local manifests only."
    ),
    buildBridgeAuditItem(
      "run-handoff-prepared",
      "Run handoff prepared",
      "Operator Run Center handoff payload prepared as preview."
    ),
    buildBridgeAuditItem(
      "execution-blocked-preview-only",
      "Execution blocked/preview-only",
      "No external execution, persistent write, command, camera, or broker action was performed.",
      "blocked"
    ),
  ];

  return {
    mode: "preview-only",
    items,
    summary: summarizeBridgeAuditTrailFromItems(items),
  };
}

function summarizeBridgeAuditTrailFromItems(items: BridgeAuditItem[]): string[] {
  return [
    `${items.length} audit preview entries prepared.`,
    "No persistent writes.",
    "Execution blocked/preview-only.",
  ];
}

export function summarizeBridgeAuditTrail(
  trail: BridgeAuditTrail = buildBridgeAuditTrail()
): string[] {
  return [...trail.summary];
}
