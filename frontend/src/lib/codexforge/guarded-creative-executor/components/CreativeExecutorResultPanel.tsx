"use client";

import type { CreativeExecutorResult } from "../guarded-creative-executor-types";
import { summarizeCreativeExecutorResult } from "../creative-executor-result";
import { ExecutorList, ExecutorMetric, panel, titleStyle } from "./shared";

export function CreativeExecutorResultPanel({ result }: { result: CreativeExecutorResult }) {
  return (
    <section style={panel} data-creative-executor-result-panel="CreativeExecutorResultPanel renders result does not fabricate execution success execution disabled">
      <h2 style={titleStyle}>Result</h2>
      <ExecutorMetric label="Status" value={result.status} />
      <ExecutorMetric label="Execution success claimed" value={String(result.executionSuccessClaimed)} />
      <ExecutorList title="Summary" items={summarizeCreativeExecutorResult(result)} />
    </section>
  );
}
