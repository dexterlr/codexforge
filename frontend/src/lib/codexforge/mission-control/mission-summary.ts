import type { MissionControlSummary } from "./mission-control-types";
import { buildMissionActivityTimeline } from "./mission-activity";
import { buildMissionHealthReport } from "./mission-health";
import { buildMissionNextActions, selectPrimaryMissionAction } from "./mission-next-actions";
import { buildMissionReadiness } from "./mission-readiness";
import { buildMissionSafetyBoundary } from "./mission-safety";
import { buildMissionSurfaceRegistry } from "./mission-surface-registry";
import { buildMissionSystemMap } from "./mission-system-map";

export function buildMissionControlSummary(): MissionControlSummary {
  const registry = buildMissionSurfaceRegistry();
  const health = buildMissionHealthReport();
  const systemMap = buildMissionSystemMap();
  const nextActions = buildMissionNextActions();
  const readiness = buildMissionReadiness();
  const activity = buildMissionActivityTimeline();
  const safety = buildMissionSafetyBoundary();

  return {
    id: "mission-control-summary",
    registry,
    health,
    systemMap,
    nextActions,
    primaryAction: selectPrimaryMissionAction(nextActions),
    readiness,
    activity,
    safety,
  };
}
