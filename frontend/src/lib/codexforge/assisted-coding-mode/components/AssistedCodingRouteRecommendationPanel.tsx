"use client";
import Link from "next/link";
import { buildAssistedCodingModeSummary } from "../index";
import { buttonLike, card, muted } from "./ComponentStyles";

export function AssistedCodingRouteRecommendationPanel() {
  const { routeRecommendation } = buildAssistedCodingModeSummary();
  return <section style={card}><strong>Route recommendation</strong><p style={muted}>{routeRecommendation.reason}</p><Link href={routeRecommendation.href} style={buttonLike}>{routeRecommendation.label}</Link></section>;
}
