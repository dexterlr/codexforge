"use client";
import type { FrictionFix } from "../trial-friction-fix-types";
import { copy, eyebrow, panel, title } from "./FrictionFixStyles";
export function FrictionRouteFixPanel({ fix }: { fix: FrictionFix }) { return <section style={panel} data-codexforge-friction-route="FrictionRouteFixPanel renders route handoff fix"><span style={eyebrow}>Route fix</span><h2 style={title}>{fix.title}</h2><p style={copy}>{fix.change}</p></section>; }
