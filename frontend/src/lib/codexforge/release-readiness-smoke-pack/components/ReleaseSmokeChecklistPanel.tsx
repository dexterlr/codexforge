"use client";
import type { ReleaseSmokeChecklist } from "../release-smoke-pack-types";
import { eyebrow, list, panel, title } from "./ReleaseSmokeStyles";
export function ReleaseSmokeChecklistPanel({ checklist }: { checklist: ReleaseSmokeChecklist }) { return <section style={panel} data-codexforge-release-smoke-checklist="ReleaseSmokeChecklistPanel renders Copy smoke checklist manual checklist"><span style={eyebrow}>Checklist</span><h2 style={title}>Copy smoke checklist</h2><ul style={list}>{checklist.items.map((item) => <li key={item}>{item}</li>)}</ul></section>; }
