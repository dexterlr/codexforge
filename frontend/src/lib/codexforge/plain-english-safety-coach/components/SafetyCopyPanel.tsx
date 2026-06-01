"use client";
import { buildSafetyCopy } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function SafetyCopyPanel() {
  const copy = buildSafetyCopy();
  return <article style={card}><h2>{copy.title}</h2><p>{copy.copyText}</p><p style={muted}>Copy-only guidance.</p></article>;
}
