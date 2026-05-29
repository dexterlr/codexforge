"use client";
import type { ReleaseSmokeHandoff } from "../release-smoke-pack-types";
import { copy, eyebrow, panel, title } from "./ReleaseSmokeStyles";
export function ReleaseSmokeHandoffPanel({ handoff }: { handoff: ReleaseSmokeHandoff }) { return <section style={panel} data-codexforge-release-smoke-handoff="ReleaseSmokeHandoffPanel renders Copy smoke checklist no unsafe execution"><span style={eyebrow}>Handoff</span><h2 style={title}>{handoff.title}</h2><pre style={{ ...copy, whiteSpace: "pre-wrap" }}>{handoff.copyChecklist}</pre></section>; }
