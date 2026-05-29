"use client";

import type { CSSProperties } from "react";
import type { GuardedApplyMvpPolicy } from "../guarded-apply-mvp-types";

export function GuardedApplyMvpPolicyPanel({ policy }: { policy: GuardedApplyMvpPolicy }) {
  return (
    <section style={panel} data-codexforge-guarded-apply-mvp-policy="GuardedApplyMvpPolicyPanel renders no direct UI apply-diff no direct UI write-file no direct UI run-command no combined apply+validate button">
      <div style={eyebrow}>Policy</div>
      <h2 style={title}>{policy.allowed ? "Policy allowed" : "Policy blocked"}</h2>
      <p style={copy}>{policy.blockedReasons[0] ?? "One file, one diff, preview diff required, exact approval required."}</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.72)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 19, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
