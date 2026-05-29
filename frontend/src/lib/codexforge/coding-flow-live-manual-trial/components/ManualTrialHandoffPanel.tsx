"use client";
import type { ManualTrialHandoff } from "../live-manual-trial-types";
import { copy, eyebrow, list, panel, title } from "./ManualTrialComponentStyles";

export function ManualTrialHandoffPanel({ handoff }: { handoff: ManualTrialHandoff }) {
  return <section style={panel} data-codexforge-manual-trial-handoff="ManualTrialHandoffPanel renders Copy trial report no unsafe execution"><span style={eyebrow}>Handoff</span><h2 style={title}>{handoff.title}</h2><p style={copy}>{handoff.copyReport}</p><ul style={list}>{handoff.hrefs.map((href) => <li key={href}>{href}</li>)}</ul></section>;
}
