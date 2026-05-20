import type { UnrealAdapterSafetyPolicy } from "./unreal-adapter-types";

export function buildUnrealAdapterSafetyPolicy(): UnrealAdapterSafetyPolicy {
  const blockedReasons = [
    "Unreal execution blocked in Phase 65.",
    "Unreal Editor launch blocked in Phase 65.",
    "Unreal editor command execution blocked in Phase 65.",
    "Python/Blueprint automation blocked in Phase 65.",
    "Package/build blocked in Phase 65.",
    "Render/movie queue blocked in Phase 65.",
    "File writes blocked in Phase 65.",
    "External process launch blocked.",
  ];

  return {
    policyId: "unreal-adapter-safety-policy-phase-65",
    previewAllowed: true,
    executionAllowed: false,
    requestReady: true,
    blockedReasons,
    warnings: [
      "Command preview allowed for operator review only.",
      "Local bridge future executor required.",
      "Explicit approval required.",
      "Artifact capture plan required.",
      "Operator review required.",
    ],
    nextSafeAction:
      "Review Unreal command preview and future executor packet; do not execute until a guarded creative executor exists and approval is explicit.",
  };
}

export function isUnrealAdapterExecutionAllowed(
  policy: UnrealAdapterSafetyPolicy = buildUnrealAdapterSafetyPolicy()
): boolean {
  return policy.executionAllowed === true;
}

export function summarizeUnrealAdapterSafetyPolicy(policy: UnrealAdapterSafetyPolicy): string[] {
  return [
    policy.previewAllowed ? "Unreal command preview allowed." : "Unreal command preview blocked.",
    policy.executionAllowed
      ? "Execution allowed by policy."
      : "Unreal execution, Unreal Editor launch, package/build, render/movie queue, and file writes are blocked in Phase 65.",
    policy.nextSafeAction,
  ];
}
