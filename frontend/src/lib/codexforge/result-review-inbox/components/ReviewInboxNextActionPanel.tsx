"use client";
import Link from "next/link";
import { buildResultReviewInboxSummary } from "../index";
import { buttonLike, card, muted } from "./ComponentStyles";

export function ReviewInboxNextActionPanel() {
  const { nextAction } = buildResultReviewInboxSummary();
  return <section style={card}><strong>Next review action</strong><p style={muted}>{nextAction.reason}</p><Link href={nextAction.href} style={buttonLike}>{nextAction.label}</Link></section>;
}
