"use client";

import type { ValidationResultRouter } from "../index";
import { vrCard, vrCopy, vrList, vrPill, vrTitle } from "./ValidationRunnerStyles";

export function ValidationResultRouterPanel({ router }: { router: ValidationResultRouter }) {
  return (
    <section style={vrCard} data-codexforge-validation-result-router-panel="ValidationResultRouterPanel renders Verification Ingestion Regression Triage Stabilization manual review no automatic routing side effects">
      <strong style={vrTitle}>Result Router</strong>
      <span style={vrPill}>{router.recommendation}</span>
      <ul style={vrList}>
        {router.routes.map((route) => <li key={route.id} style={vrCopy}>{route.command} - {route.target}: {route.reason}</li>)}
      </ul>
    </section>
  );
}
