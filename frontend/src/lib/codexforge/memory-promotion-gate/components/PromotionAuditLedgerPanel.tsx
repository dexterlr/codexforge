"use client";

import type { MemoryPromotionAuditLedger } from "../memory-promotion-gate-types";
import { Header, Metric, itemStyle, labelStyle, panel } from "./PromotionGateInputPanel";

export function PromotionAuditLedgerPanel({ ledger }: { ledger: MemoryPromotionAuditLedger }) {
  return (
    <section style={panel} data-codexforge-promotion-audit-ledger-panel="PromotionAuditLedgerPanel renders audit ledger event-preview-built bridge-blocked request-ready needs-dedupe-review needs-contradiction-review">
      <Header title="Audit ledger" state={`${ledger.items.length} items`} />
      <Metric label="Gate" value={ledger.promotionGateId} />
      <div style={{ display: "grid", gap: 6 }}>
        <span style={labelStyle}>States</span>
        {ledger.items.map((item) => <span key={item.id} style={itemStyle}>{item.state}: {item.detail}</span>)}
      </div>
    </section>
  );
}
