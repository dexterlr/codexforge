import type { LiveHealthProbeDecision, LiveHealthProbeHandoff } from "./comfyui-live-health-gate-types";

export function buildLiveHealthProbeHandoff(decision: LiveHealthProbeDecision): LiveHealthProbeHandoff {
  return {
    id: "comfyui-live-health-probe-handoff",
    copyLabel: "Copy health gate report allowed",
    nextStep:
      decision.status === "ready-for-future-approved-probe"
        ? "Review the ComfyUI metadata plan next. The actual live probe still needs a later approved local bridge."
        : "Keep this as a preview. Review the target, approval posture, and metadata-only boundary before any future live check.",
    safetyNote: "This handoff is copy-only. It does not call ComfyUI, submit workflows, mutate queues, write files, or send prompts.",
  };
}
