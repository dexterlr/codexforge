"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import {
  buildEvidenceCitationModel,
  buildEvidenceChatSelection,
  buildEvidenceGroundedChatPrompt,
  buildEvidenceGroundedReplySections,
  buildEvidenceGroundingContext,
  buildEvidenceGroundingSummary,
  buildEvidenceTrustPolicy,
  summarizeEvidenceTrustPolicy,
  type EvidenceChatSelectionInput,
} from "../index";
import { EvidenceCitationPanel } from "./EvidenceCitationPanel";
import { EvidenceGroundingCard } from "./EvidenceGroundingCard";
import { EvidenceGroundingSafetyNotice } from "./EvidenceGroundingSafetyNotice";
import { EvidencePromptPreviewPanel } from "./EvidencePromptPreviewPanel";
import { EvidenceReplyGroundingPanel } from "./EvidenceReplyGroundingPanel";
import { EvidenceSelectionPanel } from "./EvidenceSelectionPanel";
import { EvidenceTrustPolicyPanel } from "./EvidenceTrustPolicyPanel";

type EvidenceGroundedChatPanelProps = {
  input?: EvidenceChatSelectionInput;
  onCopyPrompt?: (prompt: string) => void;
  onUsePrompt?: (prompt: string) => void;
  compact?: boolean;
};

const demoInput: EvidenceChatSelectionInput = {
  defaultSelected: true,
  evidence: [
    {
      id: "phase-28-visible-evidence",
      label: "Evidence-grounded chat requires visible selected evidence",
      snippet: "Reviewed read-only evidence must be visible before it can be copied into chat.",
      toolName: "read-file",
      filePath: "src/app/ai/page.tsx",
      lineNumber: 1,
      confidence: 0.82,
      warnings: [],
      type: "summary",
    },
    {
      id: "phase-28-weak-stale-warning",
      label: "Weak stale evidence warning example",
      snippet: "Older recalled evidence may be stale and must not override current files.",
      toolName: "memory-candidate",
      filePath: "src/lib/codexforge/evidence-memory/index.ts",
      lineNumber: 1,
      confidence: 0.42,
      warnings: ["Stale evidence warning"],
      type: "warning",
    },
  ],
};

export function EvidenceGroundedChatPanel({
  input = demoInput,
  onCopyPrompt,
  onUsePrompt,
  compact = false,
}: EvidenceGroundedChatPanelProps) {
  const model = useMemo(() => {
    const selection = buildEvidenceChatSelection(input);
    const context = buildEvidenceGroundingContext(selection);
    const citations = buildEvidenceCitationModel({ selectedItems: selection.selectedItems, context });
    const policy = buildEvidenceTrustPolicy(selection);
    const prompt = buildEvidenceGroundedChatPrompt({ context, citations, policy });
    const reply = buildEvidenceGroundedReplySections({ context, policy });
    const summary = buildEvidenceGroundingSummary({ context, citations, policy });
    return {
      selection,
      context,
      citations,
      policy: { ...policy, summary: summarizeEvidenceTrustPolicy(policy) },
      prompt,
      reply,
      summary,
    };
  }, [input]);

  return (
    <section
      data-codexforge-evidence-grounded-chat-panel="EvidenceGroundedChatPanel renders Evidence-Grounded Chat selected evidence only no hidden context injection evidence is context, not proof verify current files before edits no file mutation without Safe Patch Preview preserve latest-message authority"
      style={panel}
    >
      <div style={top}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Evidence-Grounded Chat</span>
          <h2 style={title}>Visible selected evidence</h2>
          <p style={body}>
            Use reviewed evidence in chat by copying or inserting the visible prompt. This does not auto-send,
            auto-create tasks, promote memory, mutate files, or mutate the Brain graph.
          </p>
        </div>
        <span style={pill}>{model.summary.selectedCount} selected</span>
      </div>

      <EvidenceGroundingSafetyNotice />
      <div style={grid}>
        <EvidenceSelectionPanel selection={model.selection} />
        <EvidenceTrustPolicyPanel policy={model.policy} />
      </div>

      {compact ? null : (
        <>
          <div style={cards}>
            {model.context.blocks.map((block) => (
              <EvidenceGroundingCard key={block.id} block={block} />
            ))}
          </div>
          <div style={grid}>
            <EvidenceCitationPanel model={model.citations} />
            <EvidenceReplyGroundingPanel reply={model.reply} />
          </div>
        </>
      )}

      <EvidencePromptPreviewPanel
        prompt={model.prompt}
        onCopyPrompt={onCopyPrompt}
        onUsePrompt={onUsePrompt}
      />
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "linear-gradient(145deg, rgba(15,23,42,0.84), rgba(2,6,23,0.7))", borderRadius: 8, padding: 14, display: "grid", gap: 12, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { fontSize: 11, textTransform: "uppercase", color: "#93c5fd", fontWeight: 900, overflowWrap: "anywhere" };
const title: CSSProperties = { margin: "4px 0", fontSize: 18, letterSpacing: 0, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.76, overflowWrap: "anywhere" };
const pill: CSSProperties = { border: "1px solid rgba(34,197,94,0.28)", background: "rgba(34,197,94,0.12)", borderRadius: 8, padding: "6px 8px", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 10, minWidth: 0 };
const cards: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
