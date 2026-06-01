"use client";
import { buildDefaultEmptyStateDefinitions } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function EmptyStateDefinitionPanel() {
  return <article style={card}><h2>Empty states to patch</h2>{buildDefaultEmptyStateDefinitions().map((state) => <p key={state.id}><strong>{state.title}</strong><br /><span style={muted}>{state.missing} {state.whyItMatters} Next: {state.safeNextStep} Go to {state.href}.</span></p>)}</article>;
}
