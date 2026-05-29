"use client";
import type { ReleaseSmokeResultCapture } from "../release-smoke-pack-types";
import { eyebrow, list, panel, title } from "./ReleaseSmokeStyles";
export function ReleaseSmokeResultCapturePanel({ capture }: { capture: ReleaseSmokeResultCapture }) { return <section style={panel} data-codexforge-release-smoke-result="ReleaseSmokeResultCapturePanel renders output capture manual no fabricated output no fake validation success"><span style={eyebrow}>Result capture</span><h2 style={title}>Manual output capture</h2><ul style={list}>{capture.fields.map((field) => <li key={field}>{field}</li>)}</ul></section>; }
