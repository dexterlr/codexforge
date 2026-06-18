import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_FILE_WRITE_ADAPTER_MVP_DESIGN_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstFileWriteAdapterMvpDesignStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_FILE_WRITE_ADAPTER_MVP_DESIGN_LANGUAGE, buildFirstFileWriteAdapterMvpDesignStableKey };

const FIRST_FILE_WRITE_ADAPTER_MVP_DESIGN_SLUG = "first-file-write-adapter-mvp-design";

export function buildFirstFileWriteAdapterMvpDesign(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_FILE_WRITE_ADAPTER_MVP_DESIGN_SLUG, input);
}

export function buildFirstFileWriteAdapterMvpDesigns(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_FILE_WRITE_ADAPTER_MVP_DESIGN_SLUG);
}

export function buildFirstFileWriteAdapterMvpDesignBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstFileWriteAdapterMvpDesign(model: { firstFileWriteAdapterMvpDesigns: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_FILE_WRITE_ADAPTER_MVP_DESIGN_SLUG, model.firstFileWriteAdapterMvpDesigns);
}

export function buildFirstFileWriteAdapterMvpDesignModel() {
  const firstFileWriteAdapterMvpDesigns = buildFirstFileWriteAdapterMvpDesigns();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_FILE_WRITE_ADAPTER_MVP_DESIGN_SLUG, firstFileWriteAdapterMvpDesigns);
  return { ...model, firstFileWriteAdapterMvpDesigns };
}
