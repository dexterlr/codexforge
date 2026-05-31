import { buildApplyTrialHardeningSummary } from "../index";
import { card, muted } from "./ComponentStyles";
export function ApplyTrialHardeningSummaryPanel() {
  const summary = buildApplyTrialHardeningSummary();
  return <article style={card}><strong>{summary.title}</strong><p style={muted}>{summary.primaryAction}</p><p style={muted}>Next route: {summary.nextRoute}</p></article>;
}
