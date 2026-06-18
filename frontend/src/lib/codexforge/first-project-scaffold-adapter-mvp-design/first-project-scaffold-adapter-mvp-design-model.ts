import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_PROJECT_SCAFFOLD_ADAPTER_MVP_DESIGN_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstProjectScaffoldAdapterMvpDesignStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_PROJECT_SCAFFOLD_ADAPTER_MVP_DESIGN_LANGUAGE, buildFirstProjectScaffoldAdapterMvpDesignStableKey };

const FIRST_PROJECT_SCAFFOLD_ADAPTER_MVP_DESIGN_SLUG = "first-project-scaffold-adapter-mvp-design";

export function buildFirstProjectScaffoldAdapterMvpDesign(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_PROJECT_SCAFFOLD_ADAPTER_MVP_DESIGN_SLUG, input);
}

export function buildFirstProjectScaffoldAdapterMvpDesigns(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_PROJECT_SCAFFOLD_ADAPTER_MVP_DESIGN_SLUG);
}

export function buildFirstProjectScaffoldAdapterMvpDesignBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstProjectScaffoldAdapterMvpDesign(model: { firstProjectScaffoldAdapterMvpDesigns: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_PROJECT_SCAFFOLD_ADAPTER_MVP_DESIGN_SLUG, model.firstProjectScaffoldAdapterMvpDesigns);
}

export function buildFirstProjectScaffoldAdapterMvpDesignModel() {
  const firstProjectScaffoldAdapterMvpDesigns = buildFirstProjectScaffoldAdapterMvpDesigns();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_PROJECT_SCAFFOLD_ADAPTER_MVP_DESIGN_SLUG, firstProjectScaffoldAdapterMvpDesigns);
  return { ...model, firstProjectScaffoldAdapterMvpDesigns };
}
