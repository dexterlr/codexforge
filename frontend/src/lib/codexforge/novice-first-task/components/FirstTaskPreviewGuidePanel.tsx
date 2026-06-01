"use client";
import { buildFirstTaskPreviewGuide } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function FirstTaskPreviewGuidePanel() {
  const guide = buildFirstTaskPreviewGuide();
  return <article style={card}><h2>{guide.title}</h2><p>{guide.meaning}</p><p style={muted}>{guide.checklist.join(" | ")}</p></article>;
}
