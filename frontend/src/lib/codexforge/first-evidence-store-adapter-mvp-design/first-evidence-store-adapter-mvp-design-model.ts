import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_EVIDENCE_STORE_ADAPTER_MVP_DESIGN_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstEvidenceStoreAdapterMvpDesignStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_EVIDENCE_STORE_ADAPTER_MVP_DESIGN_LANGUAGE, buildFirstEvidenceStoreAdapterMvpDesignStableKey };

const FIRST_EVIDENCE_STORE_ADAPTER_MVP_DESIGN_SLUG = "first-evidence-store-adapter-mvp-design";

export function buildFirstEvidenceStoreAdapterMvpDesign(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_EVIDENCE_STORE_ADAPTER_MVP_DESIGN_SLUG, input);
}

export function buildFirstEvidenceStoreAdapterMvpDesigns(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_EVIDENCE_STORE_ADAPTER_MVP_DESIGN_SLUG);
}

export function buildFirstEvidenceStoreAdapterMvpDesignBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstEvidenceStoreAdapterMvpDesign(model: { firstEvidenceStoreAdapterMvpDesigns: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_EVIDENCE_STORE_ADAPTER_MVP_DESIGN_SLUG, model.firstEvidenceStoreAdapterMvpDesigns);
}

export function buildFirstEvidenceStoreAdapterMvpDesignModel() {
  const firstEvidenceStoreAdapterMvpDesigns = buildFirstEvidenceStoreAdapterMvpDesigns();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_EVIDENCE_STORE_ADAPTER_MVP_DESIGN_SLUG, firstEvidenceStoreAdapterMvpDesigns);
  return { ...model, firstEvidenceStoreAdapterMvpDesigns };
}
