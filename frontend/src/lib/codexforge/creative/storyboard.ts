import type { CreativeBrief, Storyboard, StoryboardShot } from "./creative-types";

export function buildStoryboardShot(
  shotNumber: number,
  camera: string,
  movement: string,
  visualDescription: string,
  promptHint: string,
  durationEstimate: string,
  assetNeeds: string[],
  safetyNotes: string[]
): StoryboardShot {
  return {
    id: `storyboard-shot:${String(shotNumber).padStart(2, "0")}`,
    shotNumber,
    camera,
    movement,
    visualDescription,
    promptHint,
    durationEstimate,
    assetNeeds,
    safetyNotes,
  };
}

export function summarizeStoryboard(storyboard: Storyboard): string {
  return `${storyboard.title}: ${storyboard.shots.length} preview shot(s), prompt hints only, no render execution.`;
}

export function buildStoryboard(brief: CreativeBrief): Storyboard {
  const shots = [
    buildStoryboardShot(1, "Wide establishing camera", "slow push-in", "CodexForge operator opens a dark production board with creative systems staged as guarded lanes.", "premium cinematic control room, preview-only creative planning", "4s", ["studio backdrop placeholder", "capability lane labels"], ["No generated media is created."]),
    buildStoryboardShot(2, "Overhead planning camera", "locked board scan", "Storyboard cards connect to Blender, ComfyUI, and Unreal preview plans.", "storyboard to production plan, adapter previews, no execution", "5s", ["storyboard card placeholders", "adapter status badges"], ["Blender, ComfyUI, and Unreal remain preview-only."]),
    buildStoryboardShot(3, "Close production camera", "gentle rack focus", "Render queue preview shows local-safe simulated jobs and placeholder artifact paths.", "render queue preview, approval required before execution", "4s", ["render manifest placeholder", "artifact path placeholders"], ["No render execution."]),
    buildStoryboardShot(4, "Final approval camera", "slow tilt to boundary", "Safe Patch Preview handoff frames future artifacts behind an approval boundary.", "Safe Patch Preview handoff, approval boundary, artifact ledger preview", "5s", ["handoff prompt placeholder", "approval checklist"], ["No files are generated or mutated."]),
  ];

  const storyboard = {
    id: "storyboard:creative-studio:phase-7",
    title: `${brief.title} storyboard`,
    shots,
    summary: "",
  } satisfies Storyboard;

  return { ...storyboard, summary: summarizeStoryboard(storyboard) };
}
