import "server-only";
import type { Job } from "./domain";
import { readEstimateIntent, type EstimateOutcome } from "./higgsfield-estimate-intent";
import { beforeEstimateExecutionReport, unknownEstimateExecutionReport, type EstimateExecutionReport } from "./higgsfield-estimate-execution";

/** Derive recovery visibility from existing canonical fields/claim; never persist a second authority. */
export function savedEstimateExecutionReport(job: Job | null, claimed = false): EstimateExecutionReport {
  if (!job) return claimed ? unknownEstimateExecutionReport() : beforeEstimateExecutionReport();
  const intent = readEstimateIntent(job);
  if (intent.phase === "SUCCEEDED" || intent.phase === "FAILED" || intent.phase === "RESULT_UNKNOWN") {
    const before = intent.failure?.transmitted === false;
    return {
      externalExecution: before ? "NOT_ATTEMPTED" : "ATTEMPTED", transportPhase: before ? "BEFORE_TRANSPORT" : "TRANSPORT_ENTERED",
      outcome: intent.phase, persistence: "PERSISTED", reconciliationRequired: intent.phase === "RESULT_UNKNOWN", retryAllowed: false,
      response: before || (!intent.result && intent.failure?.httpStatus === null && intent.correlationId === null) ? null : { httpStatus: intent.result ? 200 : intent.failure?.httpStatus ?? null, correlationId: intent.correlationId, credits: intent.result?.credits ?? null, usd: intent.result?.usd ?? null },
    };
  }
  return job.attempt > 0 || job.dispatch !== null || claimed ? unknownEstimateExecutionReport() : beforeEstimateExecutionReport();
}
/** In-memory observation only. Retained by the HTTP owner across service/read/list/close failures. */
export class EstimateExecutionTracker {
  private report = beforeEstimateExecutionReport();
  private entered = false;
  get transportWasEntered(): boolean { return this.entered; }
  snapshot(): EstimateExecutionReport { return { ...this.report, response: this.report.response ? { ...this.report.response } : null }; }
  transportEntered(): void {
    this.entered = true;
    this.report = { ...this.report, externalExecution: "ATTEMPTED", transportPhase: "TRANSPORT_ENTERED", outcome: "RESULT_UNKNOWN", persistence: "PENDING", reconciliationRequired: true };
  }
  observed(outcome: EstimateOutcome, httpStatus: number | null): void {
    if (outcome.failure?.transmitted !== false) this.transportEntered();
    this.report = {
      ...this.report, outcome: outcome.phase, persistence: "PENDING", reconciliationRequired: this.entered || outcome.phase === "RESULT_UNKNOWN",
      response: this.entered && (httpStatus !== null || outcome.correlationId !== null || outcome.result) ? { httpStatus, correlationId: outcome.correlationId, credits: outcome.result?.credits ?? null, usd: outcome.result?.usd ?? null } : null,
    };
  }
  persisted(job: Job): void {
    const saved = savedEstimateExecutionReport(job);
    // A canonical before-send value may never erase this invocation's actual wire observation.
    if (this.entered && saved.externalExecution !== "ATTEMPTED") { this.localFailure(); return; }
    this.report = saved;
    if (saved.externalExecution === "ATTEMPTED") this.entered = true;
  }
  publicationCompleted(): void {
    this.report.persistence = "PERSISTED";
    this.report.reconciliationRequired = this.report.outcome === "RESULT_UNKNOWN";
  }
  replay(job: Job, claimed = false): void {
    const saved = savedEstimateExecutionReport(job, claimed);
    if (this.entered && saved.externalExecution !== "ATTEMPTED") { this.localFailure(); return; }
    this.report = saved;
    if (saved.externalExecution === "ATTEMPTED") this.entered = true;
  }
  localFailure(): void {
    if (this.report.persistence === "PENDING") this.report.persistence = "UNCONFIRMED";
    if (this.report.externalExecution !== "NOT_ATTEMPTED") this.report.reconciliationRequired = true;
  }
}
