"use client";

import type { ValidationRunRequest } from "../index";
import { vrCard, vrCopy, vrList, vrPill, vrTitle } from "./ValidationRunnerStyles";

export function ValidationRunRequestPanel({ request }: { request: ValidationRunRequest }) {
  return (
    <section style={vrCard} data-codexforge-validation-run-request-panel="ValidationRunRequestPanel renders approval required preserve latest-message authority no file writes">
      <strong style={vrTitle}>Run Request</strong>
      <span style={vrPill}>{request.requestId}</span>
      <p style={vrCopy}>{request.operatorIntent}</p>
      <ul style={vrList}>
        {request.summary.map((item) => <li key={item} style={vrCopy}>{item}</li>)}
        {request.validation.blockedReasons.map((item) => <li key={item} style={{ ...vrCopy, color: "#fecaca" }}>{item}</li>)}
      </ul>
    </section>
  );
}
