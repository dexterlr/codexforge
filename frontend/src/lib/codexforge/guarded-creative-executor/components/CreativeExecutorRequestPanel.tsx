"use client";

import type { CreativeExecutorRequest, CreativeExecutorValidation } from "../guarded-creative-executor-types";
import { summarizeCreativeExecutorRequest } from "../creative-executor-request";
import { ExecutorList, ExecutorMetric, panel, titleStyle } from "./shared";

export function CreativeExecutorRequestPanel({
  request,
  validation,
}: {
  request: CreativeExecutorRequest;
  validation: CreativeExecutorValidation;
}) {
  return (
    <section style={panel} data-creative-executor-request-panel="CreativeExecutorRequestPanel renders deterministic request id stable id helper">
      <h2 style={titleStyle}>Executor Request</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8 }}>
        <ExecutorMetric label="Request" value={request.requestId} />
        <ExecutorMetric label="Adapter" value={request.adapterId} />
        <ExecutorMetric label="Mode" value={request.requestedMode} />
        <ExecutorMetric label="Policy" value={request.policyPosture} />
      </div>
      <ExecutorList title="Summary" items={summarizeCreativeExecutorRequest(request)} />
      <ExecutorList title="Validation" items={[validation.valid ? "valid" : "blocked", ...validation.blockedReasons, ...validation.warnings]} />
    </section>
  );
}
