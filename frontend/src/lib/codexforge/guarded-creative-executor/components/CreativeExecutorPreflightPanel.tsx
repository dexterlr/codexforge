"use client";

import type { CreativeExecutorPreflight } from "../guarded-creative-executor-types";
import { buildCreativeExecutorReactKey } from "../guarded-creative-executor-types";
import { summarizeCreativeExecutorPreflight } from "../creative-executor-preflight";
import { ExecutorList, codeStyle, panel, pill, titleStyle } from "./shared";

export function CreativeExecutorPreflightPanel({ preflight }: { preflight: CreativeExecutorPreflight }) {
  return (
    <section style={panel} data-creative-executor-preflight-panel="CreativeExecutorPreflightPanel renders preflight checks adapter allowlisted preflight checks artifact capture plan supplied">
      <h2 style={titleStyle}>Preflight</h2>
      <ExecutorList title="Summary" items={summarizeCreativeExecutorPreflight(preflight)} />
      <div style={{ display: "grid", gap: 8 }}>
        {preflight.checks.map((check, index) => (
          <div key={buildCreativeExecutorReactKey("preflight", check.checkId, index)} style={codeStyle}>
            <strong>{check.label}</strong>
            <span style={pill}>{check.status}</span>
            <span>{check.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
