"use client";
import type { FrictionFix } from "../trial-friction-fix-types";
import { copy, eyebrow, panel, title } from "./FrictionFixStyles";
export function FrictionSafetyCopyFixPanel({ fix }: { fix: FrictionFix }) { return <section style={panel} data-codexforge-friction-safety-copy="FrictionSafetyCopyFixPanel renders safety warning noisy fix approval required"><span style={eyebrow}>Safety copy fix</span><h2 style={title}>{fix.title}</h2><p style={copy}>{fix.change}</p></section>; }
