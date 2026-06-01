"use client";
import { buildAssistedCopyQuality } from "../index";
import { card } from "../../assisted-coding-mode/components/ComponentStyles";

export function AssistedCopyQualityPanel() {
  const quality = buildAssistedCopyQuality();
  return <article style={card}><h2>{quality.title}</h2><p>{quality.rule}</p></article>;
}
