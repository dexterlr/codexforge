import type { LocalVideoReadiness } from "./local-machine-capability-types";

export function buildLocalVideoReadiness(input: Partial<LocalVideoReadiness> = {}): LocalVideoReadiness {
  return {
    id: input.id ?? "local-video-readiness",
    status: input.status ?? "draft-capable",
    localDraftPotential:
      input.localDraftPotential ??
      "Strong candidate for local video draft workflows once the approved creative executor and local tool adapters exist.",
    upscalePotential:
      input.upscalePotential ??
      "Strong candidate for local upscale and enhancement queues, with output review before publishing.",
    cautions:
      input.cautions ??
      [
        "This page does not run ComfyUI, video tools, or GPU checks.",
        "Long video generation still needs queue limits, disk planning, and explicit operator approval.",
      ],
  };
}
