"use client";
import type { MvpPathHandoff } from "../mvp-working-path-types";
import { copy, eyebrow, panel, title } from "./MvpPathStyles";
export function MvpPathHandoffPanel({ handoff }: { handoff: MvpPathHandoff }) { return <section style={panel} data-codexforge-mvp-handoff="MvpPathHandoffPanel renders copy locked route map no unsafe execution"><span style={eyebrow}>Handoff</span><h2 style={title}>{handoff.title}</h2><pre style={{ ...copy, whiteSpace: "pre-wrap" }}>{handoff.copyMap}</pre></section>; }
