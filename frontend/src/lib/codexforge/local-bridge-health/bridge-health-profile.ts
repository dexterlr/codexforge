import type { BridgeHealthProfile, BridgeHealthTarget, BridgeHealthTargetId } from "./local-bridge-health-types";
import { buildDefaultBridgeHealthTargets } from "./bridge-health-target";

function defaultMissingForTarget(target: BridgeHealthTarget): string[] {
  if (target.targetKind === "local-http") return ["endpoint hint"];
  if (target.targetKind === "local-directory") return ["artifact output boundary"];
  if (target.targetKind === "manual") return ["manual confirmation"];
  if (target.id === "local-renderer") return ["future executor allowlist", "approval policy"];
  return ["path hint"];
}

export function buildBridgeHealthProfile(input: Partial<BridgeHealthProfile> & Pick<BridgeHealthProfile, "targetId" | "label">): BridgeHealthProfile {
  const configured = input.configured ?? Boolean(input.pathHint || input.endpointHint || input.environmentHint);
  const missingConfiguration = input.missingConfiguration ?? (configured ? [] : defaultMissingForTarget(buildDefaultBridgeHealthTargets().find((target) => target.id === input.targetId) ?? buildDefaultBridgeHealthTargets()[0]));
  return {
    id: input.id ?? `profile-${input.targetId}`,
    configured,
    secretStrategy: "metadata-only",
    privacyPosture: "local-metadata-only",
    readinessStatus: configured ? "configured" : "missing-config",
    missingConfiguration,
    safetyNote: "Metadata only: no secrets, no API keys, no process values printed in UI, and no browser secret storage.",
    ...input,
  };
}

export function buildDefaultBridgeHealthProfiles(targets: BridgeHealthTarget[] = buildDefaultBridgeHealthTargets()): BridgeHealthProfile[] {
  return targets.map((target) =>
    buildBridgeHealthProfile({
      targetId: target.id,
      label: `${target.label} profile`,
      configured: false,
      expectedVersionLabel: "operator supplied",
      environmentHint: target.targetKind === "local-http" ? "local endpoint only" : "local operator metadata only",
    })
  );
}

export function isBridgeHealthProfileConfigured(profile: BridgeHealthProfile): boolean {
  return profile.configured && profile.missingConfiguration.length === 0;
}

export function summarizeBridgeHealthProfile(profile: BridgeHealthProfile): string[] {
  return [
    `${profile.label}: ${profile.readinessStatus}.`,
    profile.configured ? "Configuration metadata supplied." : `Missing configuration: ${profile.missingConfiguration.join(", ")}.`,
    profile.safetyNote,
  ];
}

export function findBridgeHealthProfile(profiles: BridgeHealthProfile[], targetId: BridgeHealthTargetId): BridgeHealthProfile | undefined {
  return profiles.find((profile) => profile.targetId === targetId);
}
