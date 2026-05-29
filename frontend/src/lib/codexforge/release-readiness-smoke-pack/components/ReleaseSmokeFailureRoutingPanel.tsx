"use client";
import type { ReleaseSmokeFailureRouting } from "../release-smoke-pack-types";
import { copy, eyebrow, panel, title } from "./ReleaseSmokeStyles";
export function ReleaseSmokeFailureRoutingPanel({ routing }: { routing: ReleaseSmokeFailureRouting }) { return <section style={panel} data-codexforge-release-smoke-failure="ReleaseSmokeFailureRoutingPanel renders failure routing to /closed-loop or /validation-results"><span style={eyebrow}>Failure routing</span><h2 style={title}>Route failures</h2><p style={copy}>Build: {routing.failedBuild}. Validation: {routing.failedValidation}. Diff: {routing.failedDiff}.</p></section>; }
