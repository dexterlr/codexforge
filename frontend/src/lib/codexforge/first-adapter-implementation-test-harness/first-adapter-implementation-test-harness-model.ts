import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_ADAPTER_IMPLEMENTATION_TEST_HARNESS_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstAdapterImplementationTestHarnessStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_ADAPTER_IMPLEMENTATION_TEST_HARNESS_LANGUAGE, buildFirstAdapterImplementationTestHarnessStableKey };

const FIRST_ADAPTER_IMPLEMENTATION_TEST_HARNESS_SLUG = "first-adapter-implementation-test-harness";

export function buildFirstAdapterImplementationTestHarness(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_ADAPTER_IMPLEMENTATION_TEST_HARNESS_SLUG, input);
}

export function buildFirstAdapterImplementationTestHarnesses(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_ADAPTER_IMPLEMENTATION_TEST_HARNESS_SLUG);
}

export function buildFirstAdapterImplementationTestHarnessBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstAdapterImplementationTestHarness(model: { firstAdapterImplementationTestHarnesses: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_ADAPTER_IMPLEMENTATION_TEST_HARNESS_SLUG, model.firstAdapterImplementationTestHarnesses);
}

export function buildFirstAdapterImplementationTestHarnessModel() {
  const firstAdapterImplementationTestHarnesses = buildFirstAdapterImplementationTestHarnesses();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_ADAPTER_IMPLEMENTATION_TEST_HARNESS_SLUG, firstAdapterImplementationTestHarnesses);
  return { ...model, firstAdapterImplementationTestHarnesses };
}
