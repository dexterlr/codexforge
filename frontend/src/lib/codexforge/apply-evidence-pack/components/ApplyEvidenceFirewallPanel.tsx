"use client";

import type { CSSProperties } from "react";
import { summarizeApplyEvidenceFirewall, type ApplyEvidenceFirewall } from "../index";

export function ApplyEvidenceFirewallPanel({ firewall }: { firewall: ApplyEvidenceFirewall }) {
  return (
    <section
      style={card}
      data-codexforge-apply-evidence-firewall="ApplyEvidenceFirewallPanel renders mutation firewall active no apply-diff no write-file no run-command no broker-execution"
    >
      <span style={eyebrow}>Mutation Firewall</span>
      <h3 style={title}>Mutation firewall active</h3>
      <ul style={list}>{summarizeApplyEvidenceFirewall(firewall).map((item) => <li key={item}>{item}</li>)}</ul>
      <div style={chips}>{firewall.blockedTools.map((tool) => <span key={tool} style={chip}>{tool}</span>)}</div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(248,113,113,0.24)", background: "rgba(127,29,29,0.16)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fee2e2", fontSize: 12, lineHeight: 1.45 };
const chips: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 };
const chip: CSSProperties = { border: "1px solid rgba(248,113,113,0.25)", background: "rgba(127,29,29,0.18)", borderRadius: 8, padding: "4px 6px", fontSize: 11, color: "#fecaca" };
