"use client";
import type { CSSProperties } from "react";
export function LocalDraftRenderEmptyState() { return <aside style={empty}>A local draft review checks what would happen before anything renders: prompt, storyboard, keyframes, workflow, short duration, draft resolution, local provider, approval, artifacts, and recovery.</aside>; }
const empty: CSSProperties = { border: "1px dashed rgba(125,211,252,0.3)", borderRadius: 8, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, padding: 12 };
