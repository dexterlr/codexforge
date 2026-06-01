"use client";
import type { CSSProperties } from "react";
import type { StoryboardCameraPlan } from "../storyboard-planner-types";
export function StoryboardCameraPlanPanel({ cameraPlans }: { cameraPlans: StoryboardCameraPlan[] }) { return <article style={card}><h2 style={title}>Camera plan</h2>{cameraPlans.map((plan) => <p key={plan.id} style={copy}>{plan.shotId}: {plan.cameraMovement}. {plan.framing}. {plan.reviewNote}</p>)}</article>; }
const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 }; const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 }; const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
