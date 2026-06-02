import type { GpuJobKind, GpuJobProfile, GpuJobResourcePosture } from "./local-gpu-scheduler-types";

const RESOURCE_BY_KIND: Record<GpuJobKind, GpuJobResourcePosture> = {
  "keyframe generation": "medium",
  "short video draft": "heavy",
  "upscale pass": "heavy",
  "interpolation pass": "heavy",
  "final render candidate": "very-heavy",
  "artifact review task": "light",
  "background batch": "medium",
  "urgent retry": "unknown",
};

const LABELS: Record<GpuJobKind, string> = {
  "keyframe generation": "Keyframe generation",
  "short video draft": "Short video draft",
  "upscale pass": "Upscale pass",
  "interpolation pass": "Interpolation pass",
  "final render candidate": "Final render candidate",
  "artifact review task": "Artifact review task",
  "background batch": "Background batch",
  "urgent retry": "Urgent retry",
};

function stableJobId(kind: GpuJobKind): string {
  return kind.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function buildGpuJobProfile(kind: GpuJobKind, input: Partial<GpuJobProfile> = {}): GpuJobProfile {
  return {
    id: input.id ?? `gpu-job-${stableJobId(kind)}`,
    kind,
    label: input.label ?? LABELS[kind],
    plainEnglish:
      input.plainEnglish ??
      "GPU jobs take time. A scheduler preview helps review the order before any future local work can run.",
    resourcePosture: input.resourcePosture ?? RESOURCE_BY_KIND[kind],
    estimatedTimePosture: input.estimatedTimePosture ?? "Approximate time only; no timer is started.",
    approvalRequired: input.approvalRequired ?? true,
  };
}

export function buildDefaultGpuJobProfiles(): GpuJobProfile[] {
  return (Object.keys(LABELS) as GpuJobKind[]).map((kind) => buildGpuJobProfile(kind));
}
