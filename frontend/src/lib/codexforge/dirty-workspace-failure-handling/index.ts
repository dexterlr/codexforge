import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  summarizeRealTrialHardeningRouteModel,
  type RealTrialHardeningRouteModel,
} from "../real-trial-hardening";

export const DIRTY_WORKSPACE_FAILURE_HANDLING_LANGUAGE =
  "Dirty workspace failure handling | Dirty workspace failure handling does not run git commands from the UI | Dirty workspace failure handling requires explicit operator approval | Dirty workspace failure handling previews uncommitted change risk stale diff risk conflicting file risk and manual review requirements | Dirty workspace recovery remains blocked | Dirty workspace failure checklist | Go to Dirty Workspace Failure Handling";

export { buildRealTrialHardeningStableKey as buildDirtyWorkspaceFailureHandlingStableKey };

export function buildDirtyWorkspaceFailureHandlingModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("dirty-workspace-failure-handling");
}

export function summarizeDirtyWorkspaceFailureHandling(
  model = buildDirtyWorkspaceFailureHandlingModel()
): string {
  return summarizeRealTrialHardeningRouteModel(model);
}
