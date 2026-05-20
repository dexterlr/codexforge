"use client";

import type { CreativeExecutorResult } from "../guarded-creative-executor-types";
import { summarizeCreativeExecutorResult } from "../creative-executor-result";
import { ExecutorList, ExecutorMetric, panel, titleStyle } from "./shared";

export function CreativeExecutorResultPanel({ result }: { result: CreativeExecutorResult }) {
  return (
    <section style={panel} data-creative-executor-result-panel="CreativeExecutorResultPanel renders result does not fabricate execution success execution disabled">
      <h2 style={titleStyle}>Result</h2>
      <a href="/creative-sandbox" style={sandboxLink}>Simulate in Creative Execution Sandbox</a>
      <ExecutorMetric label="Status" value={result.status} />
      <ExecutorMetric label="Execution success claimed" value={String(result.executionSuccessClaimed)} />
      <ExecutorList title="Summary" items={summarizeCreativeExecutorResult(result)} />
    </section>
  );
}

const sandboxLink = { width: "fit-content", maxWidth: "100%", border: "1px solid rgba(94,234,212,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 900, textTransform: "uppercase" as const, textDecoration: "none", overflowWrap: "break-word" as const };
