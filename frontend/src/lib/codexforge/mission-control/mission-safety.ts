import type { MissionSafetyBoundary } from "./mission-control-types";

export function buildMissionSafetyBoundary(): MissionSafetyBoundary {
  const rules = [
    "No silent desktop control.",
    "No camera without consent.",
    "No broker execution; broker execution blocked.",
    "No command execution from dashboard.",
    "No source mutation from dashboard.",
    "All real execution routes through future guarded approval.",
  ];

  return {
    id: "mission-safety-boundary",
    posture: "operator-safe-readonly",
    rules,
    blockedCapabilities: [
      "silent desktop control",
      "camera access without consent",
      "broker execution",
      "dashboard command execution",
      "dashboard source mutation",
    ],
    summary: summarizeMissionSafetyBoundary(rules),
  };
}

export function summarizeMissionSafetyBoundary(
  boundaryOrRules: MissionSafetyBoundary | string[]
): string[] {
  const rules = Array.isArray(boundaryOrRules)
    ? boundaryOrRules
    : boundaryOrRules.rules;

  return [
    `${rules.length} safety rules are active.`,
    "Mission Control is readonly, deterministic, local-first, and approval gated.",
  ];
}
