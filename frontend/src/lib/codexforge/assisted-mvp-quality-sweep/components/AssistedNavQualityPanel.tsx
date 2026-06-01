"use client";
import { buildAssistedNavQuality } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function AssistedNavQualityPanel() {
  const quality = buildAssistedNavQuality();
  return <article style={card}><h2>{quality.title}</h2><p style={muted}>{quality.routes.join(" | ")}</p></article>;
}
