/** Non-secret observation, not an authorization or retry capability. No transport/store imports. */
export interface EstimateExecutionReport {
  externalExecution: "NOT_ATTEMPTED" | "ATTEMPTED" | "UNKNOWN";
  transportPhase: "BEFORE_TRANSPORT" | "TRANSPORT_ENTERED" | "UNKNOWN";
  outcome: "NOT_STARTED" | "RESULT_UNKNOWN" | "SUCCEEDED" | "FAILED";
  persistence: "NOT_STARTED" | "PENDING" | "PERSISTED" | "UNCONFIRMED";
  reconciliationRequired: boolean;
  retryAllowed: false;
  response: { httpStatus: number | null; correlationId: string | null; credits: string | null; usd: string | null } | null;
}
export function beforeEstimateExecutionReport(): EstimateExecutionReport {
  return { externalExecution: "NOT_ATTEMPTED", transportPhase: "BEFORE_TRANSPORT", outcome: "NOT_STARTED", persistence: "NOT_STARTED", reconciliationRequired: false, retryAllowed: false, response: null };
}
export function unknownEstimateExecutionReport(): EstimateExecutionReport {
  return { externalExecution: "UNKNOWN", transportPhase: "UNKNOWN", outcome: "RESULT_UNKNOWN", persistence: "UNCONFIRMED", reconciliationRequired: true, retryAllowed: false, response: null };
}
function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}
/** Reject inconsistent or unbounded responses rather than infer dispatch safety from status/text. */
export function parseEstimateExecutionReport(input: unknown): EstimateExecutionReport | null {
  const value = record(input);
  if (!value || Object.keys(value).sort().join() !== "externalExecution,outcome,persistence,reconciliationRequired,response,retryAllowed,transportPhase" ||
      [value.externalExecution, value.transportPhase, value.outcome, value.persistence].some(field => typeof field !== "string") ||
      !["NOT_ATTEMPTED", "ATTEMPTED", "UNKNOWN"].includes(String(value.externalExecution)) ||
      !["BEFORE_TRANSPORT", "TRANSPORT_ENTERED", "UNKNOWN"].includes(String(value.transportPhase)) ||
      !["NOT_STARTED", "RESULT_UNKNOWN", "SUCCEEDED", "FAILED"].includes(String(value.outcome)) ||
      !["NOT_STARTED", "PENDING", "PERSISTED", "UNCONFIRMED"].includes(String(value.persistence)) ||
      typeof value.reconciliationRequired !== "boolean" || value.retryAllowed !== false) return null;
  const phases = { NOT_ATTEMPTED: "BEFORE_TRANSPORT", ATTEMPTED: "TRANSPORT_ENTERED", UNKNOWN: "UNKNOWN" };
  if (phases[value.externalExecution as keyof typeof phases] !== value.transportPhase ||
      (value.externalExecution === "UNKNOWN" && (!value.reconciliationRequired || value.outcome !== "RESULT_UNKNOWN")) ||
      (value.outcome === "RESULT_UNKNOWN" && !value.reconciliationRequired) ||
      (value.externalExecution === "NOT_ATTEMPTED" && !["NOT_STARTED", "FAILED"].includes(String(value.outcome))) ||
      (value.externalExecution !== "NOT_ATTEMPTED" && value.outcome === "NOT_STARTED") ||
      (value.externalExecution !== "NOT_ATTEMPTED" && value.persistence === "NOT_STARTED") ||
      (value.outcome === "NOT_STARTED" && value.persistence !== "NOT_STARTED") ||
      (value.outcome !== "NOT_STARTED" && value.persistence === "NOT_STARTED") ||
      (value.externalExecution === "UNKNOWN" && (value.persistence !== "UNCONFIRMED" || value.response !== null)) ||
      (value.externalExecution !== "NOT_ATTEMPTED" && value.persistence !== "PERSISTED" && !value.reconciliationRequired)) return null;
  let response: EstimateExecutionReport["response"] = null;
  if (value.response !== null) {
    const item = record(value.response);
    if (!item || Object.keys(item).sort().join() !== "correlationId,credits,httpStatus,usd" ||
        (item.httpStatus !== null && (!Number.isInteger(item.httpStatus) || Number(item.httpStatus) < 100 || Number(item.httpStatus) > 599)) ||
        (item.correlationId !== null && (typeof item.correlationId !== "string" || /[\r\n]/u.test(item.correlationId) || !/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/u.test(item.correlationId))) ||
        [item.credits, item.usd].some(amount => amount !== null && (typeof amount !== "string" || /[\r\n]/u.test(amount) || !/^(?:0|[1-9][0-9]{0,8})(?:\.[0-9]{1,6})?$/u.test(amount))) ||
        ((item.credits === null) !== (item.usd === null)) ||
        (item.httpStatus === null && item.correlationId === null && item.credits === null) ||
        value.externalExecution !== "ATTEMPTED") return null;
    response = { httpStatus: item.httpStatus as number | null, correlationId: item.correlationId as string | null, credits: item.credits as string | null, usd: item.usd as string | null };
  }
  if (value.outcome === "SUCCEEDED" && (!response || response.httpStatus !== 200 || response.credits === null || response.usd === null)) return null;
  if (value.outcome === "FAILED" && value.externalExecution === "ATTEMPTED" &&
      (!response || response.httpStatus === null ||
       !([301, 302, 303, 307, 308].includes(response.httpStatus) || (response.httpStatus >= 400 && response.httpStatus <= 599)) || response.credits !== null)) return null;
  if (value.outcome !== "SUCCEEDED" && response?.credits != null) return null;
  return { externalExecution: value.externalExecution as EstimateExecutionReport["externalExecution"], transportPhase: value.transportPhase as EstimateExecutionReport["transportPhase"], outcome: value.outcome as EstimateExecutionReport["outcome"], persistence: value.persistence as EstimateExecutionReport["persistence"], reconciliationRequired: value.reconciliationRequired, retryAllowed: false, response };
}
export function estimateExecutionOperatorMessage(report: EstimateExecutionReport): { heading: string; message: string } {
  if (report.externalExecution === "NOT_ATTEMPTED") return {
    heading: "Stopped before provider transport",
    message: "This execution did not enter provider transport. Saved claims and attempt limits remain authoritative; this message does not grant permission to retry. Generation remains locked.",
  };
  if (report.reconciliationRequired) return {
    heading: "Provider attempt may have occurred — do not retry",
    message: report.response
      ? "A provider response was observed, but local completion needs reconciliation. Preserve the saved attempt and claim. Do not estimate again. Generation remains locked."
      : "Provider execution cannot be ruled out. The saved attempt and claim must not be reset. Reconcile the saved state; no automatic retry is allowed. Generation remains locked.",
  };
  return report.outcome === "SUCCEEDED"
    ? { heading: "Estimate response saved", message: "The estimate response and its single consumed attempt are saved. This grants no generation authority. Generation remains locked." }
    : { heading: "Provider failure saved — do not retry", message: "Provider execution was attempted and its failure is saved. The single attempt remains consumed. Generation remains locked." };
}
