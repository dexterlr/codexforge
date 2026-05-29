"use client";
import type { ManualTrialTroubleshooting } from "../live-manual-trial-types";
import { copy, eyebrow, list, panel, title } from "./ManualTrialComponentStyles";

export function ManualTrialTroubleshootingPanel({ troubleshooting }: { troubleshooting: ManualTrialTroubleshooting }) {
  return <section style={panel} data-codexforge-manual-trial-troubleshooting="ManualTrialTroubleshootingPanel renders blocked unclear next fix prompts"><span style={eyebrow}>Troubleshooting</span><h2 style={title}>If the trial gets stuck</h2><ul style={list}>{troubleshooting.nextFixPrompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul><p style={copy}>Failure routes: {troubleshooting.failureRoutes.join(", ")}</p></section>;
}
