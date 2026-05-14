import type {
  BridgeActionId,
  BridgePolicyBoundary,
  BridgePolicyRule,
  BridgeRiskLevel,
} from "./bridge-types";

export function classifyBridgeActionRisk(actionId: BridgeActionId): BridgeRiskLevel {
  if (actionId === "broker-execution") return "critical";
  if (
    actionId === "desktop-control" ||
    actionId === "camera-inspection" ||
    actionId === "creative-execution"
  ) {
    return "high";
  }
  if (actionId === "file-mutation" || actionId === "command-execution") return "medium";

  return "low";
}

export function buildBridgePolicyBoundary(): BridgePolicyBoundary {
  const rules: BridgePolicyRule[] = [
    {
      id: "no-silent-desktop-control",
      label: "No silent desktop control",
      risk: "high",
      enforced: true,
      detail: "No silent desktop control is allowed from the bridge.",
    },
    {
      id: "no-camera-without-consent",
      label: "No camera access without consent",
      risk: "high",
      enforced: true,
      detail: "No camera access without consent and visible active state.",
    },
    {
      id: "no-file-mutation-without-preview",
      label: "No file mutation without preview/approval",
      risk: "medium",
      enforced: true,
      detail: "File mutation requires Safe Patch Preview plus guarded approval.",
    },
    {
      id: "no-command-execution-from-bridge-ui",
      label: "No command execution from bridge UI",
      risk: "medium",
      enforced: true,
      detail: "The bridge UI prepares handoffs only; it does not run local commands.",
    },
    {
      id: "no-live-trading",
      label: "No live trading/broker execution",
      risk: "critical",
      enforced: true,
      detail: "Broker execution blocked for all preview sessions.",
    },
    {
      id: "creative-preview-only",
      label: "Creative tools preview-only",
      risk: "high",
      enforced: true,
      detail:
        "Creative tools are preview-only until guarded adapter approval exists for Blender, Unreal, and ComfyUI.",
    },
  ];

  return {
    mode: "preview-only",
    rules,
    blockedActions: [
      "desktop-control",
      "camera-inspection",
      "file-mutation",
      "command-execution",
      "creative-execution",
      "broker-execution",
    ],
    summary: summarizeBridgePolicyRules(rules),
  };
}

function summarizeBridgePolicyRules(rules: BridgePolicyRule[]): string[] {
  return [
    `${rules.length} bridge policy rules enforced.`,
    "No silent desktop control.",
    "No camera access without consent.",
    "No file mutation without preview/approval.",
    "No command execution from bridge UI.",
    "No live trading/broker execution.",
  ];
}

export function summarizeBridgePolicyBoundary(
  boundary: BridgePolicyBoundary = buildBridgePolicyBoundary()
): string[] {
  return [...boundary.summary];
}
