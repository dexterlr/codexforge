import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const RECOVERY_REVIEW_PACKET_LANGUAGE =
  "Recovery review packet | Recovery review packet does not execute rollback retry or recovery | Recovery review packet requires explicit operator approval | Recovery review packet previews rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery options | Recovery execution remains blocked | Recovery review checklist | Go to Recovery Review Packet";

export { buildRealTrialHardeningStableKey as buildRecoveryReviewPacketStableKey };

export function buildRecoveryReviewPacketModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("recovery-review-packet");
}

export function summarizeRecoveryReviewPacket(
  model = buildRecoveryReviewPacketModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
