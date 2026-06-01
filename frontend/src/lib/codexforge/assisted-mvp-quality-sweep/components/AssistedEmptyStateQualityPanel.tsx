"use client";
import { buildAssistedEmptyStateQuality } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function AssistedEmptyStateQualityPanel() {
  const quality = buildAssistedEmptyStateQuality();
  return <article style={card}><h2>{quality.title}</h2><p style={muted}>{quality.covered.join(" | ")}</p></article>;
}
