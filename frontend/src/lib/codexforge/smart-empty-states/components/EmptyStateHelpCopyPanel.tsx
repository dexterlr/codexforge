"use client";
import { buildEmptyStateHelpCopy } from "../index";
import { card } from "../../assisted-coding-mode/components/ComponentStyles";

export function EmptyStateHelpCopyPanel() {
  const help = buildEmptyStateHelpCopy();
  return <article style={card}><h2>{help.title}</h2><p>{help.copy}</p></article>;
}
