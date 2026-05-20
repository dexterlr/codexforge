"use client";

import type { CreativeExecutorDryRun } from "../guarded-creative-executor-types";
import { buildCreativeExecutorReactKey } from "../guarded-creative-executor-types";
import { summarizeCreativeExecutorDryRun } from "../creative-executor-dry-run";
import { ExecutorList, codeStyle, panel, pill, titleStyle } from "./shared";

export function CreativeExecutorDryRunPanel({ dryRun }: { dryRun: CreativeExecutorDryRun }) {
  return (
    <section style={panel} data-creative-executor-dry-run-panel="CreativeExecutorDryRunPanel renders dry-run says no real execution dry-run says no file writes dry-run says no endpoint calls">
      <h2 style={titleStyle}>Dry Run</h2>
      <a href="/creative-sandbox" style={sandboxLink}>Open Creative Execution Sandbox</a>
      <ExecutorList title="Summary" items={summarizeCreativeExecutorDryRun(dryRun)} />
      <div style={{ display: "grid", gap: 8 }}>
        {dryRun.items.map((item, index) => (
          <div key={buildCreativeExecutorReactKey("dry-run", item.itemId, index)} style={codeStyle}>
            <strong>{item.order}. {item.label}</strong>
            <span style={pill}>{item.riskLevel}</span>
            <span>{item.wouldDoSummary}</span>
            <span>{item.sideEffectSummary}</span>
            <span>Expected artifact: {item.expectedArtifact}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const sandboxLink = { width: "fit-content", maxWidth: "100%", border: "1px solid rgba(94,234,212,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 900, textTransform: "uppercase" as const, textDecoration: "none", overflowWrap: "break-word" as const };
