"use client";
import type { ManualTrialSafeChange } from "../live-manual-trial-types";
import { copy, eyebrow, list, panel, title } from "./ManualTrialComponentStyles";

export function ManualTrialSafeChangePanel({ change }: { change: ManualTrialSafeChange }) {
  return <section style={panel} data-codexforge-manual-trial-safe-change="ManualTrialSafeChangePanel renders no package/config/tool-policy/runtime/brain files no secrets no broad diff no generated file"><span style={eyebrow}>Safe change</span><h2 style={title}>{change.filePattern}</h2><p style={copy}>{change.reason}</p><ul style={list}>{change.disallowed.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}
