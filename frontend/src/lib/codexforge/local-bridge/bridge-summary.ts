import { summarizeBridgeAdapterMatrix } from "./bridge-adapters";
import { summarizeBridgeAuditTrail } from "./bridge-audit";
import { summarizeBridgeConsentBoundary } from "./bridge-consent";
import { summarizeBridgeHandshakePreview } from "./bridge-handshake";
import { summarizeBridgePolicyBoundary } from "./bridge-policy";
import { summarizeBridgeReadiness } from "./bridge-readiness";
import { summarizeBridgeRunHandoff } from "./bridge-run-handoff";
import { summarizeBridgeSession } from "./bridge-session";
import type { BridgeCenterModel, BridgeSummary } from "./bridge-types";

export function summarizeBridgeCenter(model: Omit<BridgeCenterModel, "summary">): BridgeSummary {
  return {
    session: summarizeBridgeSession(model.session),
    consent: summarizeBridgeConsentBoundary(model.consentBoundary),
    readiness: summarizeBridgeReadiness(model.readiness),
    handshake: summarizeBridgeHandshakePreview(model.handshake),
    adapters: summarizeBridgeAdapterMatrix(model.adapterMatrix),
    policy: summarizeBridgePolicyBoundary(model.policyBoundary),
    audit: summarizeBridgeAuditTrail(model.auditTrail),
    handoff: summarizeBridgeRunHandoff(model.runHandoff),
  };
}
