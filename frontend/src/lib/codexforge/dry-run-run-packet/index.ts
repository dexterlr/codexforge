import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  summarizeGuardedApplyRunDryRunRouteModel,
  type GuardedApplyRunDryRunRouteModel,
} from "../guarded-apply-run-dry-run";

export const DRY_RUN_RUN_PACKET_LANGUAGE =
  "Dry-run run packet | Dry-run run packet does not run commands | Dry-run run packet requires explicit operator approval | Run packet previews command allowlist arguments working directory environment names evidence result audit queue and recovery requirements | Denied dry-run run packet paths remain blocked | Dry-run run packet checklist | Go to Dry-Run Run Packet";

export { buildGuardedApplyRunDryRunStableKey as buildDryRunRunPacketStableKey };

export function buildDryRunRunPacketModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("dry-run-run-packet");
}

export function summarizeDryRunRunPacket(model = buildDryRunRunPacketModel()): string {
  return summarizeGuardedApplyRunDryRunRouteModel(model);
}
