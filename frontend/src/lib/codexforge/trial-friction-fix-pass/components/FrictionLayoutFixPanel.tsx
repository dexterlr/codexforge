"use client";
import type { FrictionFix } from "../trial-friction-fix-types";
import { copy, eyebrow, panel, title } from "./FrictionFixStyles";
export function FrictionLayoutFixPanel({ fix }: { fix: FrictionFix }) { return <section style={panel} data-codexforge-friction-layout="FrictionLayoutFixPanel renders layout fix one primary action advanced details collapsed"><span style={eyebrow}>Layout fix</span><h2 style={title}>{fix.title}</h2><p style={copy}>{fix.change}</p></section>; }
