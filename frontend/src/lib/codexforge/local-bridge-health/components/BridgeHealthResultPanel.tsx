"use client";

import type { BridgeHealthResult } from "../local-bridge-health-types";
import { buildLocalBridgeHealthReactKey } from "../local-bridge-health-types";
import { HealthList, HealthPanel, grid, pill, titleStyle } from "./shared";

export function BridgeHealthResultPanel({ result }: { result: BridgeHealthResult }) {
  return (
    <HealthPanel marker="BridgeHealthResultPanel renders result does not fabricate reachability">
      <h2 style={titleStyle}>Health Result</h2>
      <HealthList title="Result summary" items={result.summary} />
      <div style={grid}>
        {result.items.map((item, index) => (
          <article key={buildLocalBridgeHealthReactKey("result", item.targetId, index)} style={{ display: "grid", gap: 7, minWidth: 0 }}>
            <span style={pill}>{item.status}</span>
            <strong>{item.targetId}</strong>
            <span>Configured: {String(item.configured)}</span>
            <span>Reachable: {item.reachableStatus}</span>
            <span style={{ color: "#cbd5e1", overflowWrap: "break-word" }}>Missing: {item.missingConfig.join(", ") || "none"}</span>
          </article>
        ))}
      </div>
    </HealthPanel>
  );
}
