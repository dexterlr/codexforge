import type { BlenderAdapterSafetyPolicy } from "./blender-adapter-types";

export function buildBlenderAdapterSafetyPolicy(): BlenderAdapterSafetyPolicy {
  const blockedReasons = [
    "Blender execution blocked in Phase 62.",
    "Render execution blocked in Phase 62.",
    "File writes blocked in Phase 62.",
    "Save .blend blocked in Phase 62.",
    "External process launch blocked.",
  ];

  return {
    policyId: "blender-adapter-safety-policy-phase-62",
    previewAllowed: true,
    executionAllowed: false,
    requestReady: true,
    blockedReasons,
    warnings: [
      "Python preview allowed for operator review only.",
      "Local bridge future executor required.",
      "Explicit approval required.",
      "Artifact capture plan required.",
      "Operator review required.",
    ],
    nextSafeAction:
      "Review Blender script preview and future executor packet; do not execute until a guarded executor exists and approval is explicit.",
  };
}

export function isBlenderAdapterExecutionAllowed(
  policy: BlenderAdapterSafetyPolicy = buildBlenderAdapterSafetyPolicy()
): boolean {
  return policy.executionAllowed === true;
}

export function summarizeBlenderAdapterSafetyPolicy(policy: BlenderAdapterSafetyPolicy): string[] {
  return [
    policy.previewAllowed ? "Python preview allowed." : "Python preview blocked.",
    policy.executionAllowed
      ? "Execution allowed by policy."
      : "Blender execution, render execution, and file writes are blocked in Phase 62.",
    policy.nextSafeAction,
  ];
}
