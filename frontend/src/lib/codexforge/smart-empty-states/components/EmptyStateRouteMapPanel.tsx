"use client";
import { buildEmptyStateRouteMap } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function EmptyStateRouteMapPanel() {
  const map = buildEmptyStateRouteMap();
  return <article style={card}><h2>{map.title}</h2><p style={muted}>{map.routes.join(" | ")}</p></article>;
}
