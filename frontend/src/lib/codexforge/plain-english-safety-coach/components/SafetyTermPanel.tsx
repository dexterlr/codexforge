"use client";
import { buildDefaultSafetyTerms } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function SafetyTermPanel() {
  return <article style={card}><h2>Terms in plain English</h2>{buildDefaultSafetyTerms().map((term) => <p key={term.term}><strong>{term.term}</strong><br /><span style={muted}>{term.plainEnglish} {term.example}</span></p>)}</article>;
}
