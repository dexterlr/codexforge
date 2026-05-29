"use client";
import type { FrictionFinding } from "../trial-friction-fix-types";
import { copy, eyebrow, panel, title } from "./FrictionFixStyles";
export function FrictionPriorityPanel({ findings }: { findings: FrictionFinding[] }) { return <section style={panel} data-codexforge-friction-priority="FrictionPriorityPanel renders fix now items first prefer small copy/layout/handoff fixes"><span style={eyebrow}>Priority</span><h2 style={title}>Fix now items first</h2><p style={copy}>{findings.filter((finding) => finding.priority === "now").length} now items, then next, then later.</p></section>; }
