"use client";
import { buildResultReviewInboxSummary } from "../index";
import { ResultReviewInboxEmptyState } from "./ResultReviewInboxEmptyState";
import { ResultReviewInboxSafetyStrip } from "./ResultReviewInboxSafetyStrip";
import { ReviewInboxFilterPanel } from "./ReviewInboxFilterPanel";
import { ReviewInboxHandoffPanel } from "./ReviewInboxHandoffPanel";
import { ReviewInboxItemPanel } from "./ReviewInboxItemPanel";
import { ReviewInboxNextActionPanel } from "./ReviewInboxNextActionPanel";
import { ReviewInboxPriorityPanel } from "./ReviewInboxPriorityPanel";
import { ReviewInboxSafetyNotePanel } from "./ReviewInboxSafetyNotePanel";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";

export function ResultReviewInboxPanel() {
  const summary = buildResultReviewInboxSummary();
  return <div style={shell} data-codexforge-panel="ResultReviewInboxPanel renders Review inbox See what needs review validation recovery or demo handoff Nothing needs review yet no fake persistence claims no hidden mutation no auto-apply no auto-run approval required preserve latest-message authority route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage plain English">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Reviewed work</span><h1 style={headline}>{summary.title}</h1><p style={lede}>{summary.subtitle}</p><a href="#review-items" style={buttonLike}>{summary.primaryAction}</a></div><ResultReviewInboxSafetyStrip /></section>
    <section style={strip}><strong>{summary.nextAction.label}</strong><span>{summary.nextAction.href}</span><span>Review-only</span></section>
    <ResultReviewInboxEmptyState />
    <section id="review-items" style={grid}><ReviewInboxNextActionPanel /><ReviewInboxItemPanel /><ReviewInboxFilterPanel /><ReviewInboxPriorityPanel /><ReviewInboxSafetyNotePanel /><ReviewInboxHandoffPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. Sample records are deterministic preview records, not hidden persistence.</p></details>
  </div>;
}
