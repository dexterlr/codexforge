"use client";

import type { HealthProbeAllowlist } from "../future-health-probe-types";
import { buildFutureHealthProbeReactKey } from "../future-health-probe-types";
import { ProbeList, ProbeMetric, ProbePanel, grid, pill } from "./shared";

export function HealthProbeAllowlistPanel({ allowlist }: { allowlist: HealthProbeAllowlist }) {
  return (
    <ProbePanel title="Allowlist" marker="HealthProbeAllowlistPanel renders allowlist has no wildcard adapter or command allowlist blocks arbitrary commands allowlist blocks arbitrary endpoints">
      <ProbeList title="Allowlist posture" items={allowlist.summary} />
      <div style={grid}>
        {allowlist.items.map((item) => (
          <div key={buildFutureHealthProbeReactKey("allowlist", item.targetId)} style={{ display: "grid", gap: 8, minWidth: 0 }}>
            <span style={pill}>{item.enabled ? "enabled" : "disabled"}</span>
            <ProbeMetric label={item.targetId} value={item.allowedMode} />
            <ProbeMetric label="Approval" value={String(item.requiredApproval)} />
            <p style={{ margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "break-word" }}>{item.safetyNote}</p>
          </div>
        ))}
      </div>
    </ProbePanel>
  );
}
