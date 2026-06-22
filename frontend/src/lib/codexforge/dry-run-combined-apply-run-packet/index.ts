import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const DRY_RUN_COMBINED_APPLY_RUN_PACKET_LANGUAGE =
  "Dry-run combined apply run packet | Dry-run combined apply run packet does not write files or run commands | Dry-run combined apply run packet requires explicit operator approval | Combined packet previews apply then run ordering evidence chaining result capture queue state and recovery requirements | Denied dry-run combined apply run paths remain blocked | Dry-run combined apply run checklist | Go to Dry-Run Combined Apply Run Packet";

export { buildGuardedApplyRunDryRunStableKey as buildDryRunCombinedApplyRunPacketStableKey };

export function buildDryRunCombinedApplyRunPacketModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("dry-run-combined-apply-run-packet");
}

export function summarizeDryRunCombinedApplyRunPacket(
  model = buildDryRunCombinedApplyRunPacketModel()
): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
