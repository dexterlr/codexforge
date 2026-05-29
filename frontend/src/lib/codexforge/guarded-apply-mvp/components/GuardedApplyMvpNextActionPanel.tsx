"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { GuardedApplyMvpNextAction } from "../guarded-apply-mvp-types";

export function GuardedApplyMvpNextActionPanel({ action }: { action: GuardedApplyMvpNextAction }) {
  return (
    <section style={panel} data-codexforge-guarded-apply-mvp-next="GuardedApplyMvpNextActionPanel renders one primary action Review apply request Copy evidence pack">
      <div style={eyebrow}>Next action</div>
      <Link href={action.href} style={button}>{action.label}</Link>
      <p style={copy}>{action.reason}</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", borderRadius: 8, padding: 14, background: "rgba(8,47,73,0.32)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const button: CSSProperties = { background: "#5eead4", borderRadius: 8, color: "#042f2e", display: "inline-flex", fontSize: 13, fontWeight: 900, justifyContent: "center", padding: "9px 12px", textDecoration: "none" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
