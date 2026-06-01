"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { ProviderTestNextAction } from "../provider-connection-test-types";
export function ProviderTestNextActionPanel({ actions }: { actions: ProviderTestNextAction[] }) { return <article style={card}><span style={tag}>Next actions</span><h2 style={title}>What to review next</h2>{actions.map((action) => <Link key={action.id} href={action.route} style={link}>{action.label}: {action.reason}</Link>)}</article>; }
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.68)", padding: 14, display: "grid", gap: 8 };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const link: CSSProperties = { color: "#5eead4", fontSize: 13, lineHeight: 1.45, textDecoration: "none" };
