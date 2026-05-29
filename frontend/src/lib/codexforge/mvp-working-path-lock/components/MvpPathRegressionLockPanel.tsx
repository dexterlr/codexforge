"use client";
import type { MvpPathRegressionLock } from "../mvp-working-path-types";
import { eyebrow, list, panel, title } from "./MvpPathStyles";
export function MvpPathRegressionLockPanel({ regression }: { regression: MvpPathRegressionLock }) { return <section style={panel} data-codexforge-mvp-regression-lock="MvpPathRegressionLockPanel renders smoke coverage regression lock"><span style={eyebrow}>Regression lock</span><h2 style={title}>Smoke coverage</h2><ul style={list}>{regression.smokeScripts.map((script) => <li key={script}>{script}</li>)}</ul></section>; }
