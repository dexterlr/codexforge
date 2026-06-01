import type { ComfyUiHealthPlan, ComfyUiHealthTarget } from "./comfyui-health-types";

export function buildComfyUiHealthPlan(target: ComfyUiHealthTarget): ComfyUiHealthPlan {
  return {
    id: `${target.id}-plan`,
    checks: ["confirm expected base URL is local", "confirm no workflow run is requested", "confirm metadata-only health boundary", "confirm future approved live check remains separate"],
    verifies: ["ComfyUI appears to be the intended local tool", "the operator understands setup is manual", "no prompt is sent", "no image or video generation happens"],
    liveChecking: "planned-approved-boundary-only",
    workflowRunAllowed: false,
  };
}
