import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_COMMAND_RUNNER_ADAPTER_MVP_DESIGN_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstCommandRunnerAdapterMvpDesignStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_COMMAND_RUNNER_ADAPTER_MVP_DESIGN_LANGUAGE, buildFirstCommandRunnerAdapterMvpDesignStableKey };

const FIRST_COMMAND_RUNNER_ADAPTER_MVP_DESIGN_SLUG = "first-command-runner-adapter-mvp-design";

export function buildFirstCommandRunnerAdapterMvpDesign(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_COMMAND_RUNNER_ADAPTER_MVP_DESIGN_SLUG, input);
}

export function buildFirstCommandRunnerAdapterMvpDesigns(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_COMMAND_RUNNER_ADAPTER_MVP_DESIGN_SLUG);
}

export function buildFirstCommandRunnerAdapterMvpDesignBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstCommandRunnerAdapterMvpDesign(model: { firstCommandRunnerAdapterMvpDesigns: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_COMMAND_RUNNER_ADAPTER_MVP_DESIGN_SLUG, model.firstCommandRunnerAdapterMvpDesigns);
}

export function buildFirstCommandRunnerAdapterMvpDesignModel() {
  const firstCommandRunnerAdapterMvpDesigns = buildFirstCommandRunnerAdapterMvpDesigns();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_COMMAND_RUNNER_ADAPTER_MVP_DESIGN_SLUG, firstCommandRunnerAdapterMvpDesigns);
  return { ...model, firstCommandRunnerAdapterMvpDesigns };
}
