"use client";
import { buildEmptyStateNextAction } from "../index";
import { card, buttonLike, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function EmptyStateNextActionPanel() {
  const action = buildEmptyStateNextAction();
  return <article style={card}><h2>Next action</h2><a href={action.href} style={buttonLike}>{action.label}</a><p style={muted}>{action.copy}</p></article>;
}
