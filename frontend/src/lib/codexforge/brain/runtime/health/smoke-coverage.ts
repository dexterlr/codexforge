import type {
  CodexForgeRuntimeHealthBuildInput,
  CodexForgeRuntimeNextSafeAction,
  CodexForgeRuntimeSmokeCoverageItem,
  CodexForgeRuntimeSubsystemStatus,
} from "./health-types";

const KNOWN_SMOKE_AREAS: readonly { id: string; label: string }[] = [
  { id: "brain-runtime", label: "Brain runtime" },
  { id: "cognitive-memory", label: "Cognitive memory" },
  { id: "cognitive-memory-runtime-integration", label: "Cognitive memory runtime integration" },
  { id: "files-ux", label: "Files UX" },
  { id: "files-runtime", label: "Files runtime" },
  { id: "predictive-context", label: "Predictive context" },
  { id: "predictive-context-ux", label: "Predictive context UX" },
  { id: "agent-runtime", label: "Agent runtime" },
  { id: "agent-runtime-ux", label: "Agent runtime UX" },
  { id: "brain-command-center", label: "Brain command center" },
  { id: "brain-replay-lineage", label: "Brain replay lineage" },
  { id: "brain-semantic-topology", label: "Brain semantic topology" },
  { id: "brain-recommendations", label: "Brain recommendations" },
  { id: "tool-policy", label: "Tool policy" },
  { id: "web-research", label: "Web research" },
  { id: "model-router", label: "Model router" },
  { id: "brand-clean", label: "Brand cleanup" },
];

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function nextAction(id: string, present: boolean): CodexForgeRuntimeNextSafeAction {
  return {
    id: `${id}:smoke-coverage`,
    label: present ? "Review smoke evidence" : "Add smoke descriptor",
    detail: present
      ? "Inspect the smoke result before broadening runtime changes."
      : "Register a smoke descriptor for this subsystem before treating it as covered.",
    readOnly: true,
    approvalRequired: false,
  };
}

export function buildSmokeCoverageMap(
  descriptors: CodexForgeRuntimeHealthBuildInput["smokeCoverageDescriptors"] = []
): CodexForgeRuntimeSmokeCoverageItem[] {
  const byId = new Map(descriptors.map((item) => [item.id, item]));

  return KNOWN_SMOKE_AREAS.map((area) => {
    const descriptor = byId.get(area.id);
    const present = descriptor?.present ?? Boolean(descriptor);
    const status: CodexForgeRuntimeSubsystemStatus =
      descriptor?.status ?? (present ? "ready" : "partial");
    const coverageLevel = clamp01(descriptor?.coverageLevel ?? (present ? 1 : 0));

    return {
      id: area.id,
      label: descriptor?.label ?? area.label,
      status,
      coverageLevel,
      reason:
        descriptor?.reason ??
        (present
          ? "Smoke descriptor supplied by the caller; this helper does not execute scripts."
          : "Smoke descriptor is missing; runtime keeps this as read-only missing coverage."),
      evidence: descriptor?.evidence ?? [present ? "descriptor:present" : "descriptor:missing"],
      nextSafeAction: nextAction(area.id, present),
    };
  }).sort((a, b) => {
    const coverageDelta = a.coverageLevel - b.coverageLevel;
    if (coverageDelta !== 0) return coverageDelta;
    return a.id.localeCompare(b.id);
  });
}

export function scoreSmokeCoverage(
  coverage: readonly CodexForgeRuntimeSmokeCoverageItem[]
): number {
  if (coverage.length === 0) return 0;
  const total = coverage.reduce((sum, item) => sum + clamp01(item.coverageLevel), 0);
  return clamp01(total / coverage.length);
}

export function summarizeSmokeCoverage(
  coverage: readonly CodexForgeRuntimeSmokeCoverageItem[]
): string {
  const score = scoreSmokeCoverage(coverage);
  const missing = coverage.filter((item) => item.coverageLevel <= 0).length;
  const partial = coverage.filter((item) => item.coverageLevel > 0 && item.coverageLevel < 1).length;
  return `Smoke coverage score ${(score * 100).toFixed(0)} percent with ${missing} missing and ${partial} partial areas.`;
}
