"use client";
import type { CSSProperties } from "react";
import type { ProviderConnectionTestSummary } from "../provider-connection-test-types";
export function ProviderConnectionTestSummaryPanel({ summary }: { summary: ProviderConnectionTestSummary }) { return <section style={notice}><strong>Provider test summary</strong><span>{summary.summary}</span></section>; }
const notice: CSSProperties = { border: "1px solid rgba(45,212,191,0.16)", borderRadius: 8, padding: 12, background: "rgba(20,83,45,0.16)", color: "#dcfce7", display: "grid", gap: 4, fontSize: 13 };
