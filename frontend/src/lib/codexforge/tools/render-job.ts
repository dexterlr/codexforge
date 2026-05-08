import type {
  CodexForgeToolDefinition,
  CodexForgeToolExecutionContext,
  CodexForgeToolResult,
} from "./contracts";
import {
  buildCompletedToolJob,
  buildStartedAt,
  finishToolSuccess,
} from "./shared";

const TOOL_NAME = "render-job";

function asNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

export const renderJobTool: CodexForgeToolDefinition = {
  name: TOOL_NAME,
  label: "Render job",
  description:
    "Accepts an approval-gated local-safe render request without launching Blender or external render side effects.",
  availability: "ready",
  domain: "video",
  safety: "guarded",
  capabilities: ["execute", "workflow", "video"],
  tags: ["blender", "render", "local-safe", "approval-gated"],
  parameters: [
    {
      name: "scene",
      type: "string",
      description: "Scene, shot, or render target description.",
      required: false,
    },
    {
      name: "frames",
      type: "number",
      description: "Requested frame count for the render job.",
      required: false,
      defaultValue: 1,
    },
    {
      name: "quality",
      type: "string",
      description: "Requested render quality tier.",
      required: false,
      defaultValue: "preview",
    },
  ],
  examples: [
    {
      title: "Accept a local-safe render job",
      input: {
        scene: "approval retry smoke",
        frames: 1,
        quality: "preview",
      },
    },
  ],
  metadata: {
    provider: "local",
    version: "codexforge-local-safe-render-job-v1",
    requiresRuntime: "server",
    supportedPlatforms: ["windows", "linux", "darwin"],
    tags: ["blender", "render", "local-safe", "approval-gated"],
  },
  handler: async (
    input: Record<string, unknown>,
    context: CodexForgeToolExecutionContext
  ): Promise<CodexForgeToolResult> => {
    const startedAt = buildStartedAt();
    const scene = asString(input.scene, "Untitled render job");
    const frames = asNumber(input.frames, 1);
    const quality = asString(input.quality, "preview");
    const jobId =
      typeof context.requestId === "string" && context.requestId.trim().length > 0
        ? context.requestId.trim()
        : `${TOOL_NAME}-${startedAt}`;

    const summary =
      "Render job accepted by local-safe CodexForge adapter; no Blender process or external renderer was launched.";

    return finishToolSuccess({
      toolName: TOOL_NAME,
      summary,
      startedAt,
      content: {
        type: "json",
        json: {
          accepted: true,
          sideEffect: "none",
          executionMode: "local-safe-simulated",
          scene,
          frames,
          quality,
          nextAction:
            "Wire this adapter to a real Blender worker only after explicit operator approval and sandbox checks.",
        },
      },
      raw: {
        accepted: true,
        scene,
        frames,
        quality,
      },
      job: buildCompletedToolJob({
        id: jobId,
        startedAt,
        stage: "accepted",
        message: "Local-safe render job accepted.",
        metadata: {
          domain: "blender",
          adapter: "local-safe-render-job",
          sideEffect: "none",
        },
      }),
      metadata: {
        domain: "blender",
        adapter: "local-safe-render-job",
        approvalRequired: true,
        sideEffect: "none",
      },
    });
  },
};
