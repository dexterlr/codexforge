import type { CSSProperties } from "react";
export function TaskModelRouterEmptyState() { return <section style={panel}><h2 style={title}> router empty state</h2><p style={copy}>Best for novice, cheap/local first, and escalate if needed. No real provider calls and no secret handling.</p></section>; }
const panel: CSSProperties={border:"1px solid rgba(125,211,252,0.18)",borderRadius:8,padding:14}; const title: CSSProperties={fontSize:18,letterSpacing:0,margin:0}; const copy: CSSProperties={color:"#cbd5e1",fontSize:13,lineHeight:1.45,margin:"6px 0 0"};
