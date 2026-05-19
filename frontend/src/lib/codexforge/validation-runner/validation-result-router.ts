import {
  buildValidationRunnerStableId,
  type ValidationOutputCapture,
  type ValidationOutputCaptureItem,
  type ValidationResultRoute,
  type ValidationResultRouter,
  type ValidationResultTarget,
} from "./validation-runner-types";

function targetForItem(item: ValidationOutputCaptureItem): ValidationResultTarget {
  const command = item.command.toLowerCase();
  if (item.status === "passed" && (command.includes("npm run build") || command.includes("smoke"))) return "Verification Ingestion";
  if (item.status === "failed" && (command.includes("npm run build") || command.includes("smoke"))) return "Regression Triage";
  if (item.status === "failed" && command.includes("git diff")) return "Patch Apply";
  if (item.status === "failed" && command.includes("smoke:codexforge:server")) return "Stabilization";
  if (item.status === "passed" && command.includes("git status")) return "Continuity Handoff";
  return "manual review";
}

export function buildValidationResultRoute(item: ValidationOutputCaptureItem): ValidationResultRoute {
  const target = targetForItem(item);
  return {
    id: buildValidationRunnerStableId("validation-result-route", item.commandId, item.status, target),
    commandId: item.commandId,
    command: item.command,
    target,
    reason:
      target === "Verification Ingestion"
        ? "passing build/smoke routes to Verification Ingestion"
        : target === "Regression Triage"
          ? "failed build/smoke routes to Regression Triage"
          : target === "Patch Apply"
            ? "git diff errors route to Patch Apply / Stabilization"
            : target === "Stabilization"
              ? "server smoke failure routes to Stabilization"
              : target === "Continuity Handoff"
                ? "clean validation can support Handoff / Product Readiness"
                : "unknown output routes to manual review",
    handoffPayload: `Review validation output for ${item.command} in ${target}; no automatic routing side effects.`,
    sideEffectFree: true,
  };
}

export function buildValidationResultRouter(args: {
  requestId: string;
  outputCapture: ValidationOutputCapture;
}): ValidationResultRouter {
  const routes = args.outputCapture.items.map(buildValidationResultRoute);
  const failed = routes.find((route) => route.target === "Regression Triage" || route.target === "Stabilization" || route.target === "Patch Apply");
  const recommendation = failed
    ? `Route next review to ${failed.target}.`
    : routes.length > 0 && args.outputCapture.failureCount === 0
      ? "Clean validation can support Handoff / Product Readiness."
      : "Manual review required until output is captured.";
  const router: ValidationResultRouter = {
    id: buildValidationRunnerStableId("validation-result-router", args.requestId, recommendation),
    requestId: args.requestId,
    routes,
    recommendation,
    summary: [],
  };
  return { ...router, summary: summarizeValidationResultRouter(router) };
}

export function summarizeValidationResultRouter(router: Pick<ValidationResultRouter, "routes" | "recommendation">): string[] {
  return [
    `${router.routes.length} validation route recommendation(s).`,
    router.recommendation,
    "Routing is recommendation and handoff payload only; no automatic side effects.",
  ];
}
