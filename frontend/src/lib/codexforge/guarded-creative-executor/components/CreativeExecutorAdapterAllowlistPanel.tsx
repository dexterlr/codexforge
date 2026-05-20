"use client";

import type { CreativeExecutorAdapterAllowlist } from "../guarded-creative-executor-types";
import { buildCreativeExecutorReactKey } from "../guarded-creative-executor-types";
import { summarizeCreativeExecutorAdapterAllowlist } from "../creative-executor-adapter-allowlist";
import { ExecutorList, codeStyle, panel, pill, titleStyle } from "./shared";

export function CreativeExecutorAdapterAllowlistPanel({ allowlist }: { allowlist: CreativeExecutorAdapterAllowlist }) {
  return (
    <section style={panel} data-creative-executor-adapter-allowlist-panel="CreativeExecutorAdapterAllowlistPanel renders allowlist includes blender-render-job comfyui-workflow-run unreal-sequencer-render ffmpeg-render-preview">
      <h2 style={titleStyle}>Adapter Allowlist</h2>
      <ExecutorList title="Summary" items={summarizeCreativeExecutorAdapterAllowlist(allowlist)} />
      <div style={{ display: "grid", gap: 8 }}>
        {allowlist.items.map((item, index) => (
          <div key={buildCreativeExecutorReactKey("allowlist", item.adapterId, index)} style={codeStyle}>
            <strong>{item.label}</strong>
            <span style={pill}>{item.adapterId}</span>
            <span>{item.executorKind} / {item.allowedMode} / {item.enabled ? "enabled" : "disabled"}</span>
            <span>{item.blockedReasons.join("; ")}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
