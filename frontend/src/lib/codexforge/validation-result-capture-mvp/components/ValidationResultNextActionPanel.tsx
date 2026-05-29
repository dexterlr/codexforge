"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { ValidationResultNextAction } from "../validation-result-capture-types";
export function ValidationResultNextActionPanel({ action }: { action: ValidationResultNextAction }) { return <section style={panel} data-codexforge-validation-result-next="ValidationResultNextActionPanel renders one primary action Review validation output"><div style={eyebrow}>Next action</div><Link href={action.href} style={button}>{action.label}</Link></section>; }
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", borderRadius: 8, padding: 14, background: "rgba(8,47,73,0.32)", display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const button: CSSProperties = { background: "#5eead4", borderRadius: 8, color: "#042f2e", display: "inline-flex", fontSize: 13, fontWeight: 900, justifyContent: "center", padding: "9px 12px", textDecoration: "none" };
