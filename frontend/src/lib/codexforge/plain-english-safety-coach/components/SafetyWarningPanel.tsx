"use client";
import { buildSafetyWarning } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function SafetyWarningPanel() {
  const warning = buildSafetyWarning();
  return <article style={card}><h2>{warning.title}</h2><p style={muted}>{warning.warnings.join(" | ")}</p></article>;
}
