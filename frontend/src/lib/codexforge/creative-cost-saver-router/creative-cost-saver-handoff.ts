import type { CreativeCostSaverHandoff } from "./creative-cost-saver-types";

export function buildCreativeCostSaverHandoff(input: Partial<CreativeCostSaverHandoff> = {}): CreativeCostSaverHandoff {
  return {
    id: input.id ?? "creative-cost-saver-handoff",
    copyLabel: input.copyLabel ?? "Copy cost-saving handoff allowed",
    nextStep: input.nextStep ?? "Choose the cheapest local planning route, then preview the GPU scheduler before any future job.",
    safetyNote:
      input.safetyNote ??
      "This handoff is copy-only. It does not send prompts, spend credits, call ComfyUI, or run creative jobs.",
  };
}
