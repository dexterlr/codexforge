"use client";
import type { ReleaseSmokeSuite } from "../release-smoke-pack-types";
import { eyebrow, list, panel, title } from "./ReleaseSmokeStyles";
export function ReleaseSmokeSuitePanel({ suite }: { suite: ReleaseSmokeSuite }) { return <section style={panel} data-codexforge-release-smoke-suite="ReleaseSmokeSuitePanel renders npm run build npm run smoke:codexforge:server git diff --check git status --short git diff --stat"><span style={eyebrow}>Suite</span><h2 style={title}>{suite.title}</h2><ul style={list}>{suite.commands.map((command) => <li key={command.id}>{command.command}</li>)}</ul></section>; }
