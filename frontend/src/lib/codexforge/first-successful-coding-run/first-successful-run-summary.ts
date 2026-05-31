import { buildFirstSuccessfulCodingRunItem } from "./first-successful-run-types";
import type { FirstSuccessfulCodingRunItem, FirstSuccessfulCodingRunSummary } from "./first-successful-run-types";

export function buildSuccessfulRunReleaseNote(): FirstSuccessfulCodingRunItem {
  return buildFirstSuccessfulCodingRunItem("first-successful-run-summary", "Record first successful coding run", "only record success if validation result is supplied and reviewed; no fake success; no auto-persistence; copyable run summary; link to release audit; link to demo mode; no auto-apply; no auto-run; approval required; preserve latest-message authority");
}

export function buildFirstSuccessfulRunSummary(): FirstSuccessfulCodingRunSummary {
  return {
    title: "Record first successful coding run",
    status: "review",
    primaryAction: "Prepare success record",
    nextRoute: "/code-flow/successful-run",
    items: [buildFirstSuccessfulCodingRunItem("summary-01", "Record first successful coding run", "only record success if validation result is supplied and reviewed; no fake success; no auto-persistence; copyable run summary; link to release audit; link to demo mode; no auto-apply; no auto-run; approval required; preserve latest-message authority")]
  };
}
