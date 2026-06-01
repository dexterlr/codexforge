"use client";

import type { CSSProperties } from "react";

export function VideoPromptBuilderEmptyState() {
  return <aside style={empty}>Start with one sentence. The builder turns it into subject, scene, style, camera movement, lighting, mood, duration target, motion notes, things to avoid, local draft suitability, and next step.</aside>;
}

const empty: CSSProperties = { border: "1px dashed rgba(125,211,252,0.3)", borderRadius: 8, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, padding: 12 };
