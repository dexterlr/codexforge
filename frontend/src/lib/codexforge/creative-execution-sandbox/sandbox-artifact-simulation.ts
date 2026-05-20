import type {
  SandboxArtifactSimulation,
  SandboxArtifactSimulationItem,
  SandboxArtifactType,
  SandboxExecutionRequest,
  SandboxRunStepId,
} from "./creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxStableId } from "./creative-execution-sandbox-types";
import { buildSandboxExecutionRequest } from "./sandbox-execution-request";

const DEFAULT_ARTIFACTS: ReadonlyArray<{
  type: SandboxArtifactType;
  label: string;
  sourceSandboxStep: SandboxRunStepId;
  fakePathLabel: string;
  fakeMetadata: string[];
}> = [
  {
    type: "image-placeholder",
    label: "Simulated image placeholder",
    sourceSandboxStep: "artifact-capture-simulated",
    fakePathLabel: "sandbox://fake/artifacts/preview-image-placeholder.png",
    fakeMetadata: ["simulated=true", "kind=image-placeholder", "no-file-written"],
  },
  {
    type: "video-placeholder",
    label: "Simulated video placeholder",
    sourceSandboxStep: "artifact-capture-simulated",
    fakePathLabel: "sandbox://fake/artifacts/preview-video-placeholder.mp4",
    fakeMetadata: ["simulated=true", "kind=video-placeholder", "no-file-written"],
  },
  {
    type: "frame-placeholder",
    label: "Simulated frame placeholder",
    sourceSandboxStep: "progress-simulated",
    fakePathLabel: "sandbox://fake/artifacts/frame-0001-placeholder.png",
    fakeMetadata: ["simulated=true", "kind=frame-placeholder", "no-file-written"],
  },
  {
    type: "render-log-placeholder",
    label: "Simulated render log placeholder",
    sourceSandboxStep: "verification-simulated",
    fakePathLabel: "sandbox://fake/logs/render-log-placeholder.txt",
    fakeMetadata: ["simulated=true", "kind=render-log-placeholder", "capped-log"],
  },
  {
    type: "workflow-json-placeholder",
    label: "Simulated workflow JSON placeholder",
    sourceSandboxStep: "inputs-validated",
    fakePathLabel: "sandbox://fake/workflows/workflow-placeholder.json",
    fakeMetadata: ["simulated=true", "kind=workflow-json-placeholder", "not-a-real-workflow-output"],
  },
  {
    type: "command-preview-placeholder",
    label: "Simulated command preview placeholder",
    sourceSandboxStep: "policy-reviewed",
    fakePathLabel: "sandbox://fake/commands/command-preview-placeholder.txt",
    fakeMetadata: ["simulated=true", "kind=command-preview-placeholder", "not-executable"],
  },
  {
    type: "metadata-placeholder",
    label: "Simulated metadata placeholder",
    sourceSandboxStep: "review-handoff-ready",
    fakePathLabel: "sandbox://fake/metadata/sandbox-review-placeholder.json",
    fakeMetadata: ["simulated=true", "kind=metadata-placeholder", "review-only"],
  },
] as const;

export function buildSandboxArtifactSimulationItem(
  input: Partial<SandboxArtifactSimulationItem> & Pick<SandboxArtifactSimulationItem, "type" | "label" | "sourceExecutorKind" | "sourceSandboxStep">
): SandboxArtifactSimulationItem {
  const fakePathLabel =
    input.fakePathLabel ??
    `sandbox://fake/artifacts/${input.type}-${input.sourceExecutorKind}-placeholder`;

  return {
    artifactId:
      input.artifactId ??
      buildCreativeExecutionSandboxStableId("sandbox-artifact", [
        input.sourceExecutorKind,
        input.type,
        input.sourceSandboxStep,
      ]),
    fakePathLabel,
    fakeMetadata: input.fakeMetadata ?? ["simulated=true", `type=${input.type}`, "no-file-written"],
    previewStatus: input.previewStatus ?? "placeholder-visible",
    reviewStatus: input.reviewStatus ?? "ready-for-review",
    provenanceNote:
      input.provenanceNote ??
      "Simulated/fake/sandbox placeholder only; do not treat as real output.",
    captureRoute: input.captureRoute ?? "/artifacts/review",
    noFileWrittenGuarantee:
      input.noFileWrittenGuarantee ??
      "no-file-written guarantee: this is a fake sandbox label only; no file, blob, image, video, workflow, log, or metadata artifact was written.",
    ...input,
  };
}

export function buildSandboxArtifactSimulation(
  request: SandboxExecutionRequest = buildSandboxExecutionRequest()
): SandboxArtifactSimulation {
  const items = DEFAULT_ARTIFACTS.map((artifact, index) =>
    buildSandboxArtifactSimulationItem({
      ...artifact,
      sourceExecutorKind: request.executorKind,
      artifactId: buildCreativeExecutionSandboxStableId("sandbox-artifact", [
        request.requestId,
        artifact.type,
        index + 1,
      ]),
    })
  );
  const simulation: SandboxArtifactSimulation = {
    simulationId: buildCreativeExecutionSandboxStableId("sandbox-artifact-simulation", [request.requestId]),
    requestId: request.requestId,
    items,
    noFileWritesGuarantee:
      "Sandbox artifact simulation writes no files, creates no blobs, generates no images, renders no video, and fabricates no real output.",
    summary: [],
  };

  return { ...simulation, summary: summarizeSandboxArtifactSimulation(simulation) };
}

export function summarizeSandboxArtifactSimulation(simulation: Pick<SandboxArtifactSimulation, "items" | "noFileWritesGuarantee">): string[] {
  return [
    `${simulation.items.length} fake sandbox artifact placeholder(s) are listed.`,
    `${simulation.items.filter((item) => item.noFileWrittenGuarantee.includes("no-file-written")).length} item(s) carry no-file-written labels.`,
    simulation.noFileWritesGuarantee,
  ];
}
