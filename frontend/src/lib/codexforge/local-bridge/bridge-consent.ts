import type {
  BridgeActionId,
  BridgeConsentBoundary,
  BridgeConsentRule,
  BridgeConsentStatus,
} from "./bridge-types";

export function buildBridgeConsentBoundary(): BridgeConsentBoundary {
  const rules: BridgeConsentRule[] = [
    {
      id: "preview-readiness",
      label: "Preview and readiness",
      status: "preview-allowed",
      allowedInPreview: true,
      reason: "Readiness planning is deterministic and performs no external probing.",
      futureRequirement: "Keep the surface preview-only until a guarded adapter is selected.",
    },
    {
      id: "desktop-control",
      label: "Desktop control",
      status: "future-session-consent-required",
      allowedInPreview: false,
      reason: "No silent desktop control is allowed.",
      futureRequirement: "Explicit future session consent required before any desktop control.",
    },
    {
      id: "camera-inspection",
      label: "Camera inspection",
      status: "future-session-consent-required",
      allowedInPreview: false,
      reason: "No camera access without consent.",
      futureRequirement: "Visible active capture state and explicit session consent required.",
    },
    {
      id: "file-mutation",
      label: "File mutation",
      status: "approval-required",
      allowedInPreview: false,
      reason: "No file mutation without preview/approval.",
      futureRequirement: "Safe Patch Preview plus guarded approval required.",
    },
    {
      id: "command-execution",
      label: "Command execution",
      status: "approval-required",
      allowedInPreview: false,
      reason: "No command execution from bridge UI.",
      futureRequirement: "Operator Run Center handoff and explicit approval required.",
    },
    {
      id: "creative-execution",
      label: "Creative tool execution",
      status: "approval-required",
      allowedInPreview: false,
      reason: "Blender, Unreal, and ComfyUI remain preview-only in this bridge.",
      futureRequirement: "Operator Run Center approval and guarded adapter approval required.",
    },
    {
      id: "broker-execution",
      label: "Broker execution",
      status: "blocked",
      allowedInPreview: false,
      reason: "Broker execution blocked.",
      futureRequirement: "Separate risk controls are required before any future broker path.",
    },
  ];

  return {
    mode: "preview-only",
    status: "future-session-consent-required",
    rules,
    summary: summarizeBridgeConsentBoundaryFromRules(rules),
  };
}

function summarizeBridgeConsentBoundaryFromRules(rules: BridgeConsentRule[]): string[] {
  const blocked = rules.filter((rule) => rule.status === "blocked").length;
  const approval = rules.filter((rule) => rule.status === "approval-required").length;
  const sessionConsent = rules.filter(
    (rule) => rule.status === "future-session-consent-required"
  ).length;

  return [
    "Preview/readiness is allowed.",
    `${sessionConsent} action families require explicit future session consent.`,
    `${approval} action families require guarded approval.`,
    `${blocked} action family is blocked.`,
  ];
}

export function summarizeBridgeConsentBoundary(
  boundary: BridgeConsentBoundary = buildBridgeConsentBoundary()
): string[] {
  return [...boundary.summary];
}

export function isBridgeActionConsentBlocked(
  actionId: BridgeActionId,
  boundary: BridgeConsentBoundary = buildBridgeConsentBoundary()
): boolean {
  const rule = boundary.rules.find((item) => item.id === actionId);
  if (!rule) return true;

  return !rule.allowedInPreview || rule.status === "blocked";
}

export function getBridgeConsentStatusForAction(
  actionId: BridgeActionId,
  boundary: BridgeConsentBoundary = buildBridgeConsentBoundary()
): BridgeConsentStatus {
  return boundary.rules.find((item) => item.id === actionId)?.status ?? "blocked";
}
