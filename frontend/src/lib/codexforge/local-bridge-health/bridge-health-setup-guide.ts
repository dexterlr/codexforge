import type { BridgeHealthSetupGuide, BridgeHealthSetupStep, BridgeHealthTargetId } from "./local-bridge-health-types";

export function buildBridgeHealthSetupStep(input: BridgeHealthSetupStep): BridgeHealthSetupStep {
  return input;
}

function step(targetId: BridgeHealthTargetId, label: string, detail: string, priority: number): BridgeHealthSetupStep {
  return buildBridgeHealthSetupStep({
    id: `setup-${targetId}-${priority}`,
    targetId,
    label,
    detail,
    priority,
    blockedUntil: "Future guarded health probe remains blocked until operator approval and explicit allowlist.",
  });
}

export function buildBridgeHealthSetupGuide(): BridgeHealthSetupGuide {
  const steps: BridgeHealthSetupStep[] = [
    step("blender-local", "Blender setup", "Blender: install Blender, configure executable path hint, keep Python execution blocked.", 10),
    step("comfyui-local", "ComfyUI setup", "ComfyUI: configure local endpoint hint, keep HTTP calls blocked until future guarded probe.", 20),
    step("unreal-local", "Unreal setup", "Unreal: configure project/editor path hint, keep editor launch blocked.", 30),
    step("ffmpeg-local", "ffmpeg setup", "ffmpeg: configure executable path hint, keep version command blocked until future guarded probe.", 40),
    step("artifact-output-root", "Artifact output boundary", "Artifact root: configure output boundary, no UI writes.", 50),
    step("local-renderer", "Review adapter allowlist", "Review adapter allowlist before any future local renderer is considered.", 60),
    step("local-renderer", "Review guarded executor policy", "Review guarded executor policy; keep execution blocked until validated.", 70),
    step("custom-local-service", "Future health probe", "Run future health probe only after approval and explicit allowlist.", 80),
    step("manual-export", "Keep execution blocked", "Keep execution blocked until validated by setup guide and operator review.", 90),
  ];
  return { id: "local-bridge-health-setup-guide", steps, summary: summarizeBridgeHealthSetupGuide({ id: "local-bridge-health-setup-guide", steps, summary: [] }) };
}

export function summarizeBridgeHealthSetupGuide(guide: BridgeHealthSetupGuide): string[] {
  return [
    `${guide.steps.length} setup steps cover Blender, ComfyUI, Unreal, ffmpeg, artifact output boundary, allowlist, policy, and future guarded health probe.`,
    "Setup guide is manual-only and copy-only.",
  ];
}
