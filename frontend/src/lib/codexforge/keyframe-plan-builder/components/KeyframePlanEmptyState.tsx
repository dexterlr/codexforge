"use client";
import type { CSSProperties } from "react";
export function KeyframePlanEmptyState() { return <aside style={empty}>Keyframes are still-frame plans only. They help a future local draft stay consistent, but no image is generated on this page.</aside>; }
const empty: CSSProperties = { border: "1px dashed rgba(125,211,252,0.3)", borderRadius: 8, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, padding: 12 };
