"use client";
import type { FrictionFix } from "../trial-friction-fix-types";
import { copy, eyebrow, panel, title } from "./FrictionFixStyles";
export function FrictionValidationFixPanel({ fix }: { fix: FrictionFix }) { return <section style={panel} data-codexforge-friction-validation="FrictionValidationFixPanel renders validation unclear fix no auto-run"><span style={eyebrow}>Validation fix</span><h2 style={title}>{fix.title}</h2><p style={copy}>{fix.change}</p></section>; }
