"use client";
import { buildAssistedQualityHandoff } from "../index";
import { card } from "../../assisted-coding-mode/components/ComponentStyles";

export function AssistedQualityHandoffPanel() {
  const handoff = buildAssistedQualityHandoff();
  return <article style={card}><h2>{handoff.title}</h2><p>{handoff.copyText}</p></article>;
}
