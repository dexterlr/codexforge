"use client";
import type { MvpPathSafetyLock } from "../mvp-working-path-types";
import { copy, eyebrow, panel, title } from "./MvpPathStyles";
export function MvpPathSafetyLockPanel({ safety }: { safety: MvpPathSafetyLock }) { return <section style={panel} data-codexforge-mvp-safety-lock="MvpPathSafetyLockPanel renders no auto-apply no auto-run approval required manual validation only command/write/apply separation"><span style={eyebrow}>Safety lock</span><h2 style={title}>Approval-first path</h2><p style={copy}>no auto-apply: {String(safety.noAutoApply)}. no auto-run: {String(safety.noAutoRun)}. approval required: {String(safety.approvalRequired)}.</p></section>; }
