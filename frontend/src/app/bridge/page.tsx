import type { Metadata } from "next";
import {
  buildBridgeAdapterMatrix,
  buildBridgeAuditTrail,
  buildBridgeConsentBoundary,
  buildBridgeHandshakePreview,
  buildBridgePolicyBoundary,
  buildBridgeReadiness,
  buildBridgeRunHandoff,
  buildBridgeSession,
  summarizeBridgeCenter,
  type BridgeCenterModel,
} from "@/lib/codexforge/local-bridge";
import BridgePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Jarvis Local Bridge",
  description:
    "CodexForge Jarvis Local Bridge for preview-only session consent, readiness, adapter handshake, policy boundary, audit trail, and Operator Run Center handoff.",
};

function buildBridgeCenterModel(): BridgeCenterModel {
  const session = buildBridgeSession();
  const consentBoundary = buildBridgeConsentBoundary();
  const policyBoundary = buildBridgePolicyBoundary();
  const readiness = buildBridgeReadiness({ consentBoundary, policyBoundary });
  const adapterMatrix = buildBridgeAdapterMatrix();
  const selectedAdapter =
    adapterMatrix.items.find((item) => item.family === "PC bridge") ?? adapterMatrix.items[0];
  const handshake = buildBridgeHandshakePreview(selectedAdapter.family);
  const auditTrail = buildBridgeAuditTrail();
  const runHandoff = buildBridgeRunHandoff({
    selectedAdapter,
    consentBoundary,
    policyBoundary,
  });
  const modelWithoutSummary = {
    session,
    consentBoundary,
    readiness,
    handshake,
    adapterMatrix,
    policyBoundary,
    auditTrail,
    runHandoff,
  };

  return {
    ...modelWithoutSummary,
    summary: summarizeBridgeCenter(modelWithoutSummary),
  };
}

export default function BridgePage() {
  const initialData = buildBridgeCenterModel();
  return <BridgePageClient initialData={initialData} />;
}
