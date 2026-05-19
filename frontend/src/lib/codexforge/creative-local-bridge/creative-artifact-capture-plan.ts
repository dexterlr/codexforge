import type {
  CreativeArtifactCaptureItem,
  CreativeArtifactCapturePlan,
  CreativeArtifactCaptureType,
  CreativeJobRequest,
} from "./creative-local-bridge-types";
import { buildCreativeJobRequest } from "./creative-job-request";

export function buildCreativeArtifactCaptureItem(input: {
  type: CreativeArtifactCaptureType;
  sourceAdapter: string;
  index?: number;
  label?: string;
}): CreativeArtifactCaptureItem {
  const index = input.index ?? 0;
  return {
    expectedArtifactId: `capture-${input.sourceAdapter}-${input.type}-${index}`,
    type: input.type,
    label: input.label ?? `${input.type} artifact`,
    sourceAdapter: input.sourceAdapter,
    placeholderOutputPath: `{operator-selected-output}/${input.type}`,
    metadataToCapture: ["source adapter", "operator note", "review status", "placeholder path"],
    reviewAction: "Inspect artifact manually before promotion.",
    safetyNote: "Artifact capture plan is no-write and preview-only.",
    retentionStrategy: "Retain only after operator review in a future guarded artifact flow.",
    noWriteGuarantee: "No artifact files are written from the UI.",
  };
}

export function buildCreativeArtifactCapturePlan(
  request: CreativeJobRequest = buildCreativeJobRequest()
): CreativeArtifactCapturePlan {
  const types = Array.from(new Set<CreativeArtifactCaptureType>([
    ...request.expectedArtifacts,
    "image",
    "video",
    "blender-file",
  ]));
  const items = types.map((type, index) =>
    buildCreativeArtifactCaptureItem({ type, sourceAdapter: request.adapterId, index })
  );

  return {
    planId: `artifact-plan-${request.requestId}`,
    sourceJobRequestId: request.requestId,
    items,
    ready: items.length > 0,
    summary: summarizeCreativeArtifactCapturePlan({ planId: "", sourceJobRequestId: request.requestId, items, ready: true, summary: [] }),
  };
}

export function summarizeCreativeArtifactCapturePlan(plan: CreativeArtifactCapturePlan): string[] {
  return [
    `${plan.items.length} expected artifacts planned.`,
    "Artifact capture plan includes image, video, and blender-file placeholders when applicable.",
    "No-write guarantee: UI does not create artifact files.",
  ];
}
