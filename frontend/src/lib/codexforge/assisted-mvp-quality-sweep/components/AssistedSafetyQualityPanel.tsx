"use client";
import { buildAssistedSafetyQuality } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function AssistedSafetyQualityPanel() {
  const quality = buildAssistedSafetyQuality();
  return <article style={card}><h2>{quality.title}</h2><p style={muted}>{quality.preserved.join(" | ")}</p></article>;
}
