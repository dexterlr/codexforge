"use client";
import type { CSSProperties } from "react";
export function StoryboardEmptyState() { return <aside style={empty}>A simple storyboard starts with four shots: opening shot, main action shot, detail shot, and closing shot.</aside>; }
const empty: CSSProperties = { border: "1px dashed rgba(125,211,252,0.3)", borderRadius: 8, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, padding: 12 };
