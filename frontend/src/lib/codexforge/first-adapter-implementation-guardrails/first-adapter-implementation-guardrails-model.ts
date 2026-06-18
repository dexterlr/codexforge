import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_ADAPTER_IMPLEMENTATION_GUARDRAILS_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstAdapterImplementationGuardrailsStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_ADAPTER_IMPLEMENTATION_GUARDRAILS_LANGUAGE, buildFirstAdapterImplementationGuardrailsStableKey };

const FIRST_ADAPTER_IMPLEMENTATION_GUARDRAILS_SLUG = "first-adapter-implementation-guardrails";

export function buildFirstAdapterImplementationGuardrails(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_ADAPTER_IMPLEMENTATION_GUARDRAILS_SLUG, input);
}

export function buildFirstAdapterImplementationGuardrailsItems(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_ADAPTER_IMPLEMENTATION_GUARDRAILS_SLUG);
}

export function buildFirstAdapterImplementationGuardrailsBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstAdapterImplementationGuardrails(model: { firstAdapterImplementationGuardrailItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_ADAPTER_IMPLEMENTATION_GUARDRAILS_SLUG, model.firstAdapterImplementationGuardrailItems);
}

export function buildFirstAdapterImplementationGuardrailsModel() {
  const firstAdapterImplementationGuardrailItems = buildFirstAdapterImplementationGuardrailsItems();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_ADAPTER_IMPLEMENTATION_GUARDRAILS_SLUG, firstAdapterImplementationGuardrailItems);
  return { ...model, firstAdapterImplementationGuardrailItems };
}
