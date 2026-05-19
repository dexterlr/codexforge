import type { Metadata } from "next";
import {
  buildCreativeAdapterCatalog,
  buildCreativeArtifactCapturePlan,
  buildCreativeBridgeHandoff,
  buildCreativeBridgeHealthReport,
  buildCreativeJobApprovalPacket,
  buildCreativeJobPolicy,
  buildCreativeJobRequest,
  buildCreativeLocalBridgeSummary,
  buildDefaultCreativeBridgeProfiles,
  type CreativeLocalBridgeModel,
} from "@/lib/codexforge/creative-local-bridge";
import CreativeBridgePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Creative Local Bridge",
  description:
    "CodexForge Creative Local Bridge v1 preview-only bridge profile, adapter readiness, job request, approval packet, artifact capture, and handoff control plane.",
};

function buildCreativeLocalBridgeModel(): CreativeLocalBridgeModel {
  const profiles = buildDefaultCreativeBridgeProfiles();
  const adapters = buildCreativeAdapterCatalog();
  const jobRequest = buildCreativeJobRequest();
  const approvalPacket = buildCreativeJobApprovalPacket(jobRequest);
  const selectedProfile =
    profiles.find((profile) => profile.id === jobRequest.bridgeProfileId) ?? profiles[0];
  const selectedAdapter =
    adapters.find((adapter) => adapter.id === jobRequest.adapterId) ?? adapters[0];
  const policy = buildCreativeJobPolicy({
    request: jobRequest,
    adapter: selectedAdapter,
    profile: selectedProfile,
    approval: approvalPacket,
  });
  const artifactPlan = buildCreativeArtifactCapturePlan(jobRequest);
  const health = buildCreativeBridgeHealthReport(profiles, adapters);
  const handoff = buildCreativeBridgeHandoff({
    profile: selectedProfile,
    adapter: selectedAdapter,
    request: jobRequest,
    artifactPlan,
    policy,
  });
  const summary = buildCreativeLocalBridgeSummary({ profiles, adapters, policy, artifactPlan });

  return {
    profiles,
    adapters,
    health,
    jobRequest,
    approvalPacket,
    policy,
    artifactPlan,
    handoff,
    summary,
  };
}

export default function CreativeBridgePage() {
  return <CreativeBridgePageClient initialData={buildCreativeLocalBridgeModel()} />;
}
