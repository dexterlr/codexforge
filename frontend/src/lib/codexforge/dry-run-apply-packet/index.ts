import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const DRY_RUN_APPLY_PACKET_LANGUAGE =
  "Dry-run apply packet | Dry-run apply packet does not write files or apply diffs | Dry-run apply packet requires explicit operator approval | Apply packet previews path guard diff rollback evidence result audit queue and recovery requirements | Denied dry-run apply packet paths remain blocked | Dry-run apply packet checklist | Go to Dry-Run Apply Packet";

export { buildGuardedApplyRunDryRunStableKey as buildDryRunApplyPacketStableKey };

export function buildDryRunApplyPacketModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("dry-run-apply-packet");
}

export function summarizeDryRunApplyPacket(model = buildDryRunApplyPacketModel()): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
