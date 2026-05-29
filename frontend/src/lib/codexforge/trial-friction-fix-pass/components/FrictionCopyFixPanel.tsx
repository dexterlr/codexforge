"use client";
import type { FrictionFix } from "../trial-friction-fix-types";
import { copy, eyebrow, panel, title } from "./FrictionFixStyles";
export function FrictionCopyFixPanel({ fix }: { fix: FrictionFix }) { return <section style={panel} data-codexforge-friction-copy="FrictionCopyFixPanel renders copy fix wording plain English"><span style={eyebrow}>Copy fix</span><h2 style={title}>{fix.title}</h2><p style={copy}>{fix.change}</p></section>; }
