import type { CodexForgeToolDefinition } from "./contracts";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

export const renderJobTool: CodexForgeToolDefinition = {
  name: "render-job",
  label: "Render job",
  description:
    "Accepts an approval-gated local-safe render request without launching Blender or external render side effects.",
  availability: "ready",
  inputSchema: {
    type: "object",
    additionalProperties: true,
    properties: {
      scene: {
        type: "string",
        description: "Scene, shot, or render target description.",
      },
      frames: {
        type: "number",
        description: "Requested frame count for the render job.",
      },
      quality: {
        type: "string",
        description: "Requested render quality tier.",
      },
    },
  },
  handler: async (request) => {
    const input = asRecord(request.input);
    const scene = asString(input.scene, "Untitled render job");
    const frames = asNumber(input.frames, 1);
    const quality = asString(input.quality, "preview");

    return {
      ok: true,
      toolName: "render-job",
      summary:
        "Render job accepted by local-safe CodexForge adapter; no Blender process or external renderer was launched.",
      data: {
        accepted: true,
        sideEffect: "none",
        executionMode: "local-safe-simulated",
        scene,
        frames,
        quality,
        nextAction:
          "Wire this adapter to a real Blender worker only after explicit operator approval and sandbox checks.",
      },
      metadata: {
        domain: "blender",
        adapter: "local-safe-render-job",
        approvalRequired: true,
      },
    };
  },
};
