import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_ALLOWLIST_POLICY_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildCommandAllowlistPolicyStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { COMMAND_ALLOWLIST_POLICY_LANGUAGE, buildCommandAllowlistPolicyStableKey };

const COMMAND_ALLOWLIST_POLICY_SLUG = "command-allowlist-policy";

export function buildCommandAllowlistPolicy(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(COMMAND_ALLOWLIST_POLICY_SLUG, input);
}

export function buildCommandAllowlistPolicyItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(COMMAND_ALLOWLIST_POLICY_SLUG);
}

export function buildCommandAllowlistPolicyBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeCommandAllowlistPolicy(model: { commandAllowlistPolicyItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(COMMAND_ALLOWLIST_POLICY_SLUG, model.commandAllowlistPolicyItems);
}

export function buildCommandAllowlistPolicyModel() {
  const commandAllowlistPolicyItems = buildCommandAllowlistPolicyItems();
  const commandAllowlistPolicyModel = buildBuildPlanBundleReviewModelForSlug(COMMAND_ALLOWLIST_POLICY_SLUG, commandAllowlistPolicyItems);
  return { ...commandAllowlistPolicyModel, commandAllowlistPolicyItems };
}
