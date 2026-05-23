"use client";

import type { RunHistoryMemoryCandidate } from "../run-history-types";
import { summarizeRunHistoryMemoryCandidate } from "../run-history-memory-candidate";
import { rhButton, rhCopy, rhPanel, rhTitle } from "./RunHistoryStyles";

export function RunHistoryMemoryCandidatePanel({ candidate, onCopy }: { candidate: RunHistoryMemoryCandidate; onCopy?: (label: string, value: string) => void }) {
  const payload = `${candidate.title}\n\nSummary: ${candidate.summary}\nReusable lesson: ${candidate.reusableLesson}\nNo-auto-promotion: ${candidate.noAutoPromotionGuarantee}\nReview required: ${candidate.reviewRequired}`;
  return (
    <section style={rhPanel} data-codexforge-run-history-memory-candidate-panel="RunHistoryMemoryCandidatePanel renders run history candidate Memory Review Operator Memory Inbox no-auto-promotion no Brain mutation reviewed only no secrets no huge logs handoff only">
      <h2 style={rhTitle}>Memory candidate</h2>
      {summarizeRunHistoryMemoryCandidate(candidate).map((line) => <p key={`run-history-memory-candidate-${line.slice(0, 30)}`} style={rhCopy}>{line}</p>)}
      <button type="button" style={rhButton} onClick={() => onCopy?.("run memory candidate", payload)}>Copy memory candidate</button>
    </section>
  );
}
