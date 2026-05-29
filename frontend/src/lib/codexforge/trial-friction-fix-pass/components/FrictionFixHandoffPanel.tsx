"use client";
import type { FrictionFixHandoff } from "../trial-friction-fix-types";
import { copy, eyebrow, list, panel, title } from "./FrictionFixStyles";
export function FrictionFixHandoffPanel({ handoff }: { handoff: FrictionFixHandoff }) { return <section style={panel} data-codexforge-friction-handoff="FrictionFixHandoffPanel renders Copy friction fix plan no unsafe execution"><span style={eyebrow}>Handoff</span><h2 style={title}>{handoff.title}</h2><p style={copy}>{handoff.copyPlan}</p><ul style={list}>{handoff.routes.map((route) => <li key={route}>{route}</li>)}</ul></section>; }
