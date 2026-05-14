import type { CreativeApprovalBoundary, CreativeSideEffectRisk } from "./creative-types";

export function classifyCreativeSideEffectRisk(adapterOrAction: string): CreativeSideEffectRisk {
  const text = adapterOrAction.toLowerCase();
  if (text.includes("render-job") || text.includes("preview-only")) return "none";
  if (text.includes("patch") || text.includes("artifact") || text.includes("ledger")) return "local-file-write-preview";
  if (text.includes("blender") || text.includes("unreal") || text.includes("comfyui")) return "local-app-control";
  return "mixed-approval-required";
}

export function summarizeCreativeSafety(boundary: CreativeApprovalBoundary): string {
  return `Creative safety: ${boundary.rules.length} rule(s), risk ${boundary.risk}, all creative execution requires approval.`;
}

export function buildCreativeApprovalBoundary(): CreativeApprovalBoundary {
  const boundary = {
    id: "creative-approval-boundary:phase-7",
    required: true,
    risk: "mixed-approval-required",
    rules: [
      "all creative execution requires approval",
      "render-job stays local-safe simulated",
      "Blender is preview-only here",
      "Unreal is preview-only here",
      "ComfyUI is preview-only here",
      "generated assets are placeholders only",
      "Safe Patch Preview is the future mutation handoff boundary",
    ],
    allowedNow: [
      "Read deterministic plans.",
      "Review storyboard and adapter previews.",
      "Copy preview prompts for a future Safe Patch Preview flow.",
    ],
    blockedUntilApproval: [
      "Blender execution",
      "Unreal execution",
      "ComfyUI execution",
      "render execution",
      "file creation or artifact materialization",
    ],
    summary: "",
  } satisfies CreativeApprovalBoundary;

  return { ...boundary, summary: summarizeCreativeSafety(boundary) };
}
