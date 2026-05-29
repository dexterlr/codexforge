"use client";
import type { ReleaseSmokeCommand } from "../release-smoke-pack-types";
import { copy, eyebrow, list, panel, title } from "./ReleaseSmokeStyles";
export function ReleaseSmokeCommandPanel({ commands }: { commands: ReleaseSmokeCommand[] }) { return <section style={panel} data-codexforge-release-smoke-command="ReleaseSmokeCommandPanel renders copy commands only no shell execution"><span style={eyebrow}>Commands</span><h2 style={title}>Copy-only commands</h2><ul style={list}>{commands.map((command) => <li key={command.id}>{command.purpose}: <span style={copy}>{command.command}</span></li>)}</ul></section>; }
