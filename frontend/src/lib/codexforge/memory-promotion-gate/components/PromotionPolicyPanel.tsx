"use client";

import type { MemoryPromotionPolicy } from "../memory-promotion-gate-types";
import { Header, List, Metric, body, itemStyle, labelStyle, panel } from "./PromotionGateInputPanel";

export function PromotionPolicyPanel({ policy }: { policy: MemoryPromotionPolicy }) {
  return (
    <section style={panel} data-codexforge-promotion-policy-panel="PromotionPolicyPanel renders policy blocks missing approval unreviewed inbox card missing evidence snippets low confidence duplicate risk contradiction risk appendEvent is not called from UI no graph mutation evidence is context, not authority">
      <Header title="Policy" state={policy.allowed ? "ready" : "blocked"} />
      <Metric label="Event" value={policy.eventType} />
      <Metric label="UI graph mutation" value={policy.uiGraphMutationAllowed ? "allowed" : "blocked"} />
      <p style={body}>appendEvent is not called from UI. Graph mutation is blocked in Phase 45 unless a future guarded runtime executor exists.</p>
      <div style={{ display: "grid", gap: 6 }}>
        <span style={labelStyle}>Rules</span>
        {policy.rules.map((rule) => <span key={rule.id} style={itemStyle}>{rule.state}: {rule.label}</span>)}
      </div>
      {policy.blockedReasons.length > 0 ? <List title="Blocked" items={policy.blockedReasons} /> : null}
    </section>
  );
}
