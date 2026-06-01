"use client";
import { buildSmartEmptyStateSummary } from "../index";
import { card } from "../../assisted-coding-mode/components/ComponentStyles";

export function SmartEmptyStateSummaryPanel() {
  const summary = buildSmartEmptyStateSummary();
  return <article style={card}><h2>Readiness result</h2><p>{summary.definitions.length} empty states explain what is missing, why it matters, what to do next, where to go, and what is safe.</p></article>;
}
