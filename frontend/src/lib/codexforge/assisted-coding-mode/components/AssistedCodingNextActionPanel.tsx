"use client";
import Link from "next/link";
import { buildAssistedCodingModeSummary } from "../index";
import { buttonLike, card, muted } from "./ComponentStyles";

export function AssistedCodingNextActionPanel() {
  const { nextAction } = buildAssistedCodingModeSummary();
  return <section style={card}><strong>Recommended next step</strong><p style={muted}>{nextAction.reason}</p><p style={muted}>Safe because: {nextAction.safeBecause}</p><p style={muted}>Still manual: {nextAction.stillManual}</p><Link href={nextAction.href} style={buttonLike}>{nextAction.label}</Link></section>;
}
