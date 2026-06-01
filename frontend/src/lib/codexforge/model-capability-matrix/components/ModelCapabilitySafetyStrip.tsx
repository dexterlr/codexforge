import type { CSSProperties } from "react";
export function ModelCapabilitySafetyStrip() { return <section style={panel}><h2 style={title}>Safety safety</h2><p style={copy}>Approximate/manual labels only. No fake exact pricing, no provider API calls, and no secret display.</p></section>; }
const panel: CSSProperties = { border:"1px solid rgba(125,211,252,0.18)", borderRadius:8, padding:14 }; const title: CSSProperties = { fontSize:18, letterSpacing:0, margin:0 }; const copy: CSSProperties = { color:"#cbd5e1", fontSize:13, lineHeight:1.45, margin:"6px 0 0" };
