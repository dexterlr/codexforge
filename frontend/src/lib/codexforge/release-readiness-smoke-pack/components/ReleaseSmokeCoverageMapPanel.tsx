"use client";
import type { ReleaseSmokeCoverageMap } from "../release-smoke-pack-types";
import { eyebrow, list, panel, title } from "./ReleaseSmokeStyles";
export function ReleaseSmokeCoverageMapPanel({ coverage }: { coverage: ReleaseSmokeCoverageMap }) { return <section style={panel} data-codexforge-release-smoke-coverage="ReleaseSmokeCoverageMapPanel renders MVP coding path coverage"><span style={eyebrow}>Coverage</span><h2 style={title}>Covered phases</h2><ul style={list}>{coverage.coveredPhases.map((phase) => <li key={phase}>{phase}</li>)}</ul></section>; }
