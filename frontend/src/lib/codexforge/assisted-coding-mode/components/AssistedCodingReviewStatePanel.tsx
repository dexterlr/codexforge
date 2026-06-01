"use client";
import Link from "next/link";
import { buildAssistedCodingReviewState } from "../index";
import { buttonLike, card, muted } from "./ComponentStyles";

export function AssistedCodingReviewStatePanel() {
  const review = buildAssistedCodingReviewState(true);
  return <section style={card}><strong>Needs review</strong><p style={muted}>{review.label}</p><Link href={review.route} style={buttonLike}>Open review inbox</Link></section>;
}
