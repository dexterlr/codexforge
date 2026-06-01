"use client";
import type { CSSProperties } from "react";
import type { EnvKeyReadinessSummary } from "../safe-env-key-types";
export function EnvKeyReadinessSummaryPanel({ summary }: { summary: EnvKeyReadinessSummary }) { return <section style={notice}><strong>Env readiness summary</strong><span>{summary.summary}</span><span>{summary.nextAction}</span></section>; }
const notice: CSSProperties = { border: "1px solid rgba(45,212,191,0.16)", borderRadius: 8, padding: 12, background: "rgba(20,83,45,0.16)", color: "#dcfce7", display: "grid", gap: 4, fontSize: 13 };
