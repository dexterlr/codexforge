import { buildOperatorRunbookSummary } from "../index";
import { card, muted } from "./ComponentStyles";
export function OperatorRunbookSummaryPanel() {
  const summary = buildOperatorRunbookSummary();
  return <article style={card}><strong>{summary.title}</strong><p style={muted}>{summary.primaryAction}</p><p style={muted}>Next route: {summary.nextRoute}</p></article>;
}
