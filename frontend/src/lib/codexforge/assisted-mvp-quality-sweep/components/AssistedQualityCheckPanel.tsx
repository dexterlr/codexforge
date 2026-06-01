"use client";
import { buildAssistedMvpQualitySummary } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function AssistedQualityCheckPanel() {
  const summary = buildAssistedMvpQualitySummary();
  return <article style={card}><h2>Readiness result</h2><p><strong>{summary.readiness}</strong></p>{summary.checks.map((check) => <p key={check.id}><strong>{check.title}</strong><br /><span style={muted}>{check.result}: {check.note}</span></p>)}</article>;
}
