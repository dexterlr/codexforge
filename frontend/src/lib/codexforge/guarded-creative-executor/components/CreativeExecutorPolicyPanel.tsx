"use client";

import type { CreativeExecutorPolicy } from "../guarded-creative-executor-types";
import { summarizeCreativeExecutorPolicy } from "../creative-executor-policy";
import { ExecutorList, ExecutorMetric, panel, titleStyle } from "./shared";

export function CreativeExecutorPolicyPanel({ policy }: { policy: CreativeExecutorPolicy }) {
  return (
    <section style={panel} data-creative-executor-policy-panel="CreativeExecutorPolicyPanel renders policy blocks real execution by default in Phase 67 blocks Blender execution by default blocks ComfyUI execution by default blocks Unreal execution by default blocks ffmpeg execution by default blocks artifact writes from UI policy requires kill-switch plan">
      <h2 style={titleStyle}>Policy</h2>
      <ExecutorMetric label="Dry-run allowed" value={String(policy.dryRunAllowed)} />
      <ExecutorMetric label="Execution allowed" value={String(policy.executionAllowed)} />
      <ExecutorMetric label="Request ready" value={String(policy.requestReady)} />
      <ExecutorList title="Summary" items={summarizeCreativeExecutorPolicy(policy)} />
      <ExecutorList title="Blocked reasons" items={policy.blockedReasons} />
    </section>
  );
}
