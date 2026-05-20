import type { HealthProbeResult, HealthProbeResultItem, HealthProbeTarget } from "./future-health-probe-types";
import { buildDefaultHealthProbeTargets } from "./health-probe-target";

function capExcerpt(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return value.length > 180 ? `${value.slice(0, 180)}...` : value;
}

export function buildHealthProbeResultItem(input: Partial<HealthProbeResultItem> & { targetId: HealthProbeResultItem["targetId"] }): HealthProbeResultItem {
  return {
    targetId: input.targetId,
    status: input.status ?? "manual-only",
    resultSource: input.resultSource ?? "none",
    suppliedValueLabel: input.suppliedValueLabel,
    versionLabel: input.versionLabel,
    reachableStatus: input.reachableStatus ?? "manual-only",
    pathStatus: input.pathStatus ?? "manual-only",
    boundaryStatus: input.boundaryStatus ?? "manual-only",
    stdoutExcerpt: capExcerpt(input.stdoutExcerpt),
    stderrExcerpt: capExcerpt(input.stderrExcerpt),
    warningReasons: input.warningReasons ?? ["No exact version, path, reachability, or boundary status unless supplied."],
    blockerReasons: input.blockerReasons ?? [],
    confidence: input.confidence ?? "unknown",
    noJobExecutedConfirmation: input.noJobExecutedConfirmation ?? true,
  };
}

export function buildHealthProbeResult(targets: HealthProbeTarget[] = buildDefaultHealthProbeTargets(), suppliedItems: HealthProbeResultItem[] = []): HealthProbeResult {
  const items = targets.map((target) => {
    const supplied = suppliedItems.find((item) => item.targetId === target.id);
    return supplied ?? buildHealthProbeResultItem({
      targetId: target.id,
      status: target.defaultStatus === "blocked" ? "blocked" : "manual-only",
      resultSource: "metadata-default",
      blockerReasons: target.defaultStatus === "blocked" ? ["Default result is request-ready/manual-only/blocked, not fabricated success."] : [],
    });
  });
  const result: HealthProbeResult = { id: "future-guarded-health-probe-result", items, summary: [] };
  return { ...result, summary: summarizeHealthProbeResult(result) };
}

export function summarizeHealthProbeResult(result: HealthProbeResult): string[] {
  return [
    `${result.items.length} result rows; ${result.items.filter((item) => item.resultSource === "operator-supplied").length} supplied by operator.`,
    "Result does not fabricate readiness, exact versions, command output, reachability, or path presence.",
    "Only completed-supplied can reflect caller/user supplied result data.",
  ];
}
