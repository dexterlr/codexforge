"use client";

import type { CSSProperties } from "react";
import type { AiRouteRecommendation } from "../ai-router-types";
import { summarizeAiRouteRecommendation } from "../ai-route-recommendation";

export function AiRouteRecommendationPanel({ route }: { route: AiRouteRecommendation }) {
  return (
    <section style={panel}>
      <span style={eyebrow}>Route recommendation</span>
      <h2 style={title}>{summarizeAiRouteRecommendation(route)}</h2>
      <div style={routeBox}>
        <div><span style={label}>Provider</span><strong>{route.provider?.label ?? "Blocked"}</strong></div>
        <div><span style={label}>Model</span><strong>{route.model?.label ?? "Blocked"}</strong></div>
        <div><span style={label}>Tier</span><strong>{route.tier?.label ?? "Manual review"}</strong></div>
        <div><span style={label}>Fallback route</span><strong>{route.fallbackRoute.length} option(s)</strong></div>
      </div>
      <p style={body}>{route.reason}</p>
      {route.compressionSuggestions.map((suggestion) => <p key={suggestion} style={suggestionStyle}>{suggestion}</p>)}
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 12 };
const routeBox: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 };
const label: CSSProperties = { display: "block", color: "#94a3b8", fontSize: 10, textTransform: "uppercase", fontWeight: 900 };
const body: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.75)", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
const suggestionStyle: CSSProperties = { margin: 0, color: "#ccfbf1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 20, margin: 0, letterSpacing: 0, overflowWrap: "anywhere" };
