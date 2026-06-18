import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_RECOVERY_ADAPTER_MVP_DESIGN_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstRecoveryAdapterMvpDesignStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_RECOVERY_ADAPTER_MVP_DESIGN_LANGUAGE, buildFirstRecoveryAdapterMvpDesignStableKey };

const FIRST_RECOVERY_ADAPTER_MVP_DESIGN_SLUG = "first-recovery-adapter-mvp-design";

export function buildFirstRecoveryAdapterMvpDesign(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_RECOVERY_ADAPTER_MVP_DESIGN_SLUG, input);
}

export function buildFirstRecoveryAdapterMvpDesigns(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_RECOVERY_ADAPTER_MVP_DESIGN_SLUG);
}

export function buildFirstRecoveryAdapterMvpDesignBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstRecoveryAdapterMvpDesign(model: { firstRecoveryAdapterMvpDesigns: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_RECOVERY_ADAPTER_MVP_DESIGN_SLUG, model.firstRecoveryAdapterMvpDesigns);
}

export function buildFirstRecoveryAdapterMvpDesignModel() {
  const firstRecoveryAdapterMvpDesigns = buildFirstRecoveryAdapterMvpDesigns();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_RECOVERY_ADAPTER_MVP_DESIGN_SLUG, firstRecoveryAdapterMvpDesigns);
  return { ...model, firstRecoveryAdapterMvpDesigns };
}
