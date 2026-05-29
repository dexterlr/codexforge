import type { ManualTrialHandoff, ManualTrialResultRecord } from "./live-manual-trial-types";

export function buildManualTrialHandoff(record: ManualTrialResultRecord): ManualTrialHandoff {
  return { title: "Manual coding trial report", hrefs: ["/code-flow/friction-fixes", "/workflow-results", "/run-history", "/code-flow/release-audit"], copyReport: `Manual trial report: scenario ${record.scenarioId}; status ${record.status}; evidence supplied ${record.evidenceSupplied ? "yes" : "no"}; validation captured ${record.validationOutput.trim() ? "yes" : "no"}.`, noUnsafeExecution: true };
}
