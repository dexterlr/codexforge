"use client";
import { buildFirstTaskHandoff } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function FirstTaskHandoffPanel() {
  const handoff = buildFirstTaskHandoff();
  return <article style={card}><h2>{handoff.title}</h2><p>{handoff.copyText}</p><p style={muted}>Next: {handoff.nextRoute}</p></article>;
}
