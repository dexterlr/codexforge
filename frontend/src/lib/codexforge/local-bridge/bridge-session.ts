import { buildBridgeConsentBoundary } from "./bridge-consent";
import type { BridgeSession } from "./bridge-types";

export function buildBridgeSession(stableInput = "codexforge-local-bridge-phase-9"): BridgeSession {
  const slug = stableInput.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const consentBoundary = buildBridgeConsentBoundary();

  return {
    id: `bridge-session:${slug || "default"}`,
    mode: "preview-only",
    operatorPresence: {
      status: "operator-present",
      label: "Operator present",
      detail: "Bridge previews require the operator to stay in the loop before any future handoff.",
    },
    consentStatus: consentBoundary.status,
    allowedCapabilityFamilies: ["self-inspection", "web research", "render-job", "trading research"],
    blockedCapabilityFamilies: [
      "PC bridge",
      "camera",
      "file mutation",
      "command execution",
      "creative tool execution",
      "broker execution",
    ],
    timeoutLabel: "Static policy: preview session expires when the operator leaves this page.",
    safeNextAction: selectBridgeSessionNextAction(consentBoundary.status),
  };
}

export function summarizeBridgeSession(session: BridgeSession = buildBridgeSession()): string[] {
  return [
    `Session ${session.id}`,
    `Mode: ${session.mode}`,
    `Operator presence: ${session.operatorPresence.label}`,
    `Allowed families: ${session.allowedCapabilityFamilies.join(", ")}`,
    `Blocked families: ${session.blockedCapabilityFamilies.join(", ")}`,
    session.timeoutLabel,
    session.safeNextAction,
  ];
}

export function selectBridgeSessionNextAction(
  consentStatus: BridgeSession["consentStatus"] = "future-session-consent-required"
): string {
  if (consentStatus === "blocked") return "Stay in blocked preview and revise the adapter target.";
  if (consentStatus === "approval-required") return "Prepare an Operator Run Center handoff preview.";
  if (consentStatus === "future-session-consent-required") {
    return "Review consent boundaries before selecting any future local-control adapter.";
  }

  return "Continue preview readiness review.";
}

export function buildBridgeSessionReactKey(prefix: string, value: string): string {
  const normalized = `${prefix}-${value}`.toLowerCase().replace(/[^a-z0-9._:-]+/g, "-");
  return normalized.replace(/^-|-$/g, "");
}
