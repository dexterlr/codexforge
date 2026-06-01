"use client";
import { buildFirstTaskSafeFile } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function FirstTaskSafeFilePanel() {
  const file = buildFirstTaskSafeFile();
  return <article style={card}><h2>Pick one safe file</h2><p><strong>{file.path}</strong></p><p style={muted}>{file.whySafe}</p><p style={muted}>Avoid: {file.avoid.join(", ")}.</p></article>;
}
