"use client";

import type { CSSProperties } from "react";
import type { ApprovedPatchApplyPolicy } from "../index";

export function ApplyPolicyPanel({ policy }: { policy: ApprovedPatchApplyPolicy }) {
  return (
    <section style={panel} data-codexforge-apply-policy-panel="ApplyPolicyPanel renders policy blocks missing preview diff policy blocks missing approval policy blocks direct UI apply-diff policy blocks direct UI write-file policy requires rollback plan">
      <h3 style={title}>Apply policy</h3>
      <div style={strip}>Allowed: {String(policy.allowed)} | Request ready: {String(policy.requestReady)}</div>
      <ul style={list}>
        {policy.summary.map((item) => <li key={item}>{item}</li>)}
        {policy.blockedReasons.map((item) => <li key={item}>Blocked: {item}</li>)}
      </ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.58)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 10 };
const title: CSSProperties = { fontSize: 13, margin: 0, overflowWrap: "anywhere" };
const strip: CSSProperties = { color: "#bfdbfe", fontSize: 12, fontWeight: 800, overflowWrap: "anywhere" };
const list: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, paddingLeft: 18 };
