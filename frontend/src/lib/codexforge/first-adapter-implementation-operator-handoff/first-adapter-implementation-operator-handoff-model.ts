import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_ADAPTER_IMPLEMENTATION_OPERATOR_HANDOFF_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstAdapterImplementationOperatorHandoffStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_ADAPTER_IMPLEMENTATION_OPERATOR_HANDOFF_LANGUAGE, buildFirstAdapterImplementationOperatorHandoffStableKey };

const FIRST_ADAPTER_IMPLEMENTATION_OPERATOR_HANDOFF_SLUG = "first-adapter-implementation-operator-handoff";

export function buildFirstAdapterImplementationOperatorHandoff(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_ADAPTER_IMPLEMENTATION_OPERATOR_HANDOFF_SLUG, input);
}

export function buildFirstAdapterImplementationOperatorHandoffs(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_ADAPTER_IMPLEMENTATION_OPERATOR_HANDOFF_SLUG);
}

export function buildFirstAdapterImplementationOperatorHandoffBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstAdapterImplementationOperatorHandoff(model: { firstAdapterImplementationOperatorHandoffs: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_ADAPTER_IMPLEMENTATION_OPERATOR_HANDOFF_SLUG, model.firstAdapterImplementationOperatorHandoffs);
}

export function buildFirstAdapterImplementationOperatorHandoffModel() {
  const firstAdapterImplementationOperatorHandoffs = buildFirstAdapterImplementationOperatorHandoffs();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_ADAPTER_IMPLEMENTATION_OPERATOR_HANDOFF_SLUG, firstAdapterImplementationOperatorHandoffs);
  return { ...model, firstAdapterImplementationOperatorHandoffs };
}
