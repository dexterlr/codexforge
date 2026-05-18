import type {
  OperatorHomeSessionSummary,
  OperatorHomeStatusInput,
  OperatorHomeSummary,
} from "./operator-home-types";
import { buildOperatorHomeHealth } from "./operator-home-health";
import { buildOperatorHomeLauncher } from "./operator-home-launcher";
import { buildOperatorHomeNextActionPlan } from "./operator-home-next-action";
import { buildOperatorHomeRoutes } from "./operator-home-routes";
import { buildOperatorHomeSurface } from "./operator-home-surface";

export function buildOperatorHomeSummary(
  input: OperatorHomeStatusInput = {}
): OperatorHomeSummary {
  const surface = buildOperatorHomeSurface();
  const routes = buildOperatorHomeRoutes(input.routeAvailability ?? undefined);
  const health = buildOperatorHomeHealth(input);
  const nextActionPlan = buildOperatorHomeNextActionPlan(input);
  const launcher = buildOperatorHomeLauncher(routes);
  const sessionSummary = summarizeOperatorHomeSession({
    routeCount: routes.routes.length,
    readyCount: health.readyCount,
    warningCount: health.warningCount,
    blockedCount: health.blockedCount,
    primaryNextAction: nextActionPlan.selected.title,
    safetyPosture:
      "local-first, operator-safe, read-only, no auto-fix, no command execution without approval, no file writes without approval",
    validationRecommendation: nextActionPlan.validationCommands[0] ?? "Copy validation checklist.",
  });

  return {
    id: "operator-home-summary",
    surface,
    routes,
    health,
    nextActionPlan,
    launcher,
    sessionSummary,
  };
}

export function summarizeOperatorHomeSession(
  summary: Omit<OperatorHomeSessionSummary, "id" | "summary">
): OperatorHomeSessionSummary {
  return {
    id: "operator-home-session-summary",
    ...summary,
    summary: [
      `${summary.routeCount} launch routes are available.`,
      `${summary.readyCount} health dimensions are ready, ${summary.warningCount} warning, and ${summary.blockedCount} blocked.`,
      `Primary next action: ${summary.primaryNextAction}.`,
      `Safety posture: ${summary.safetyPosture}.`,
      `Validation recommendation: ${summary.validationRecommendation}.`,
    ],
  };
}
