"use client";
import Link from "next/link";
import { buildResultReviewInboxSummary } from "../index";
import { buttonLike, card, muted } from "./ComponentStyles";

export function ReviewInboxItemPanel() {
  const { items } = buildResultReviewInboxSummary();
  return <section style={card}><strong>Items to review</strong>{items.map((item) => <p key={item.id} style={muted}>{item.title}: {item.summary}</p>)}<Link href={items[0]?.route ?? "/assist"} style={buttonLike}>Open top item</Link></section>;
}
