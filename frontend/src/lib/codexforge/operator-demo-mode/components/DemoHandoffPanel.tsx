"use client";
import type { DemoHandoff } from "../operator-demo-types";
import { copy, eyebrow, panel, title } from "./DemoStyles";
export function DemoHandoffPanel({ handoff }: { handoff: DemoHandoff }) { return <section style={panel} data-codexforge-demo-handoff="DemoHandoffPanel renders copy demo script no unsafe execution"><span style={eyebrow}>Handoff</span><h2 style={title}>{handoff.title}</h2><pre style={{ ...copy, whiteSpace: "pre-wrap" }}>{handoff.copyScript}</pre></section>; }
