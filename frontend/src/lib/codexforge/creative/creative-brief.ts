import type { CreativeBrief, CreativeBriefInput, CreativeIntent, CreativeMedium } from "./creative-types";

const defaultPrompt =
  "Create a premium CodexForge creative production preview for a short cinematic sequence that can later hand off to Blender, ComfyUI, Unreal, and Safe Patch Preview.";

function normalizeText(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function includesAny(text: string, needles: readonly string[]): boolean {
  return needles.some((needle) => text.includes(needle));
}

export function classifyCreativeIntent(input: string | CreativeBriefInput): CreativeIntent {
  const source = typeof input === "string" ? input : `${input.mediumHint ?? ""} ${input.prompt ?? ""} ${input.title ?? ""}`;
  const text = source.toLowerCase();
  const hasBlender = includesAny(text, ["blender", "geometry node", "3d scene", "cycles", "eevee"]);
  const hasComfy = includesAny(text, ["comfy", "workflow", "checkpoint", "sampler", "stable diffusion"]);
  const hasUnreal = includesAny(text, ["unreal", "level", "sequencer", "blueprint", "cinematic"]);
  const hasVideo = includesAny(text, ["video", "film", "shot", "storyboard", "render"]);
  const hasImage = includesAny(text, ["image", "poster", "still", "concept art"]);

  const creativeSystems = [hasBlender, hasComfy, hasUnreal].filter(Boolean).length;
  if (creativeSystems > 1 || (hasVideo && hasImage && creativeSystems > 0)) return "mixed-production";
  if (hasUnreal) return "unreal-level-cinematic";
  if (hasComfy) return "comfyui-workflow";
  if (hasBlender) return "blender-scene";
  if (hasVideo) return "video";
  if (hasImage) return "image";
  return "mixed-production";
}

function mediumFromIntent(intent: CreativeIntent, hint?: CreativeMedium): CreativeMedium {
  if (hint) return hint;
  if (intent === "blender-scene") return "blender-scene";
  if (intent === "comfyui-workflow") return "comfyui-workflow";
  if (intent === "unreal-level-cinematic") return "unreal-cinematic";
  if (intent === "video") return "video";
  if (intent === "image") return "image";
  return "mixed-production";
}

export function summarizeCreativeBrief(brief: CreativeBrief): string {
  return `${brief.title}: ${brief.intent} for ${brief.audience}, preview-only with ${brief.constraints.length} constraint(s) and Safe Patch Preview as the future handoff boundary.`;
}

export function buildCreativeBrief(input: CreativeBriefInput = {}): CreativeBrief {
  const prompt = normalizeText(input.prompt, defaultPrompt);
  const title = normalizeText(input.title, "CodexForge Creative Production Studio");
  const intent = classifyCreativeIntent({ ...input, prompt, title });
  const brief = {
    id: "creative-brief:phase-7",
    title,
    prompt,
    intent,
    medium: mediumFromIntent(intent, input.mediumHint),
    audience: normalizeText(input.audience, "operator reviewing preview-only production plans"),
    style: normalizeText(input.style, "premium dark cinematic production board"),
    constraints: input.constraints && input.constraints.length > 0 ? input.constraints : [
      "No creative application execution.",
      "No render execution.",
      "No generated file creation.",
      "All future mutations route through Safe Patch Preview.",
    ],
    references: input.references && input.references.length > 0 ? input.references : [
      "Brain runtime context",
      "Capability cockpit adapter registry",
      "Safe Patch Preview approval boundary",
    ],
  } satisfies Omit<CreativeBrief, "summary">;

  return { ...brief, summary: summarizeCreativeBrief(brief as CreativeBrief) };
}
