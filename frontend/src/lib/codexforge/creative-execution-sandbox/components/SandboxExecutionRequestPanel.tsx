"use client";

import type { SandboxExecutionRequest, SandboxValidation } from "../creative-execution-sandbox-types";
import { summarizeSandboxExecutionRequest } from "../sandbox-execution-request";
import { SandboxList, SandboxMetric, SandboxPanel, codeStyle, pill, titleStyle } from "./shared";

export function SandboxExecutionRequestPanel({
  request,
  validation,
}: {
  request: SandboxExecutionRequest;
  validation: SandboxValidation;
}) {
  return (
    <SandboxPanel marker="SandboxExecutionRequestPanel renders">
      <h2 style={titleStyle}>Execution Request</h2>
      <span style={pill}>{request.sandboxMode}</span>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 8 }}>
        <SandboxMetric label="Executor" value={request.executorKind} />
        <SandboxMetric label="Adapter" value={request.adapterId} />
        <SandboxMetric label="Approval" value={request.approvalPosture} />
        <SandboxMetric label="Bridge" value={request.localBridgeHealthPosture} />
      </div>
      <div style={codeStyle}>
        <span>requestId: {request.requestId}</span>
        <span>sourceExecutorRequestId: {request.sourceExecutorRequestId}</span>
        <span>sourceExecutionPacketId: {request.sourceExecutionPacketId}</span>
        <span>sourceRoute: {request.sourceRoute}</span>
      </div>
      <SandboxList title="Request summary" items={summarizeSandboxExecutionRequest(request)} />
      <SandboxList title="Validation" items={validation.valid ? ["Request structurally valid."] : validation.blockedReasons} />
      <SandboxList title="Warnings" items={validation.warnings.length ? validation.warnings : ["No request warnings."]} />
    </SandboxPanel>
  );
}
