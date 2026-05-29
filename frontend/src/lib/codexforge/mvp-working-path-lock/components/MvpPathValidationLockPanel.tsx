"use client";
import type { MvpPathValidationLock } from "../mvp-working-path-types";
import { eyebrow, list, panel, title } from "./MvpPathStyles";
export function MvpPathValidationLockPanel({ validation }: { validation: MvpPathValidationLock }) { return <section style={panel} data-codexforge-mvp-validation-lock="MvpPathValidationLockPanel renders manual validation only approved runner boundary no auto-run"><span style={eyebrow}>Validation lock</span><h2 style={title}>Manual validation</h2><ul style={list}>{validation.commands.map((command) => <li key={command}>{command}</li>)}</ul></section>; }
