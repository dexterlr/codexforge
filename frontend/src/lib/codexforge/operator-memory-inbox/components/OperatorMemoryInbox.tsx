"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  buildMemoryInboxCardsFromActivity,
  buildMemoryInboxCardsFromCreative,
  buildMemoryInboxCardsFromPatchWorkflow,
  buildMemoryInboxCardsFromRegression,
  buildMemoryInboxCardsFromStabilization,
  buildMemoryInboxCardsFromVerification,
  buildMemoryInboxPromotionPreview,
  buildMemoryInboxReviewPolicy,
  summarizeOperatorMemoryInboxSession,
  type OperatorMemoryInboxCard,
  type OperatorMemoryInboxSession,
} from "../index";
import { MemoryInboxClassifierPanel } from "./MemoryInboxClassifierPanel";
import { MemoryInboxFilterBar, type MemoryInboxFilters } from "./MemoryInboxFilterBar";
import { MemoryInboxPanel } from "./MemoryInboxPanel";
import { MemoryInboxPriorityBoard } from "./MemoryInboxPriorityBoard";
import { MemoryInboxPromotionPreviewPanel } from "./MemoryInboxPromotionPreviewPanel";
import { MemoryInboxReviewPolicyPanel } from "./MemoryInboxReviewPolicyPanel";
import { MemoryInboxSafetyNotice } from "./MemoryInboxSafetyNotice";
import { MemoryInboxSourcePanel } from "./MemoryInboxSourcePanel";
import { MemoryPromotionGatePanel } from "@/lib/codexforge/memory-promotion-gate/components";
import { RuntimeEventExecutorPanel } from "@/lib/codexforge/runtime-event-executor/components";

export function OperatorMemoryInbox({ session: providedSession }: { session?: OperatorMemoryInboxSession }) {
  const session = useMemo(() => providedSession ?? buildDefaultSession(), [providedSession]);
  const [filters, setFilters] = useState<MemoryInboxFilters>({ query: "", kind: "all", priority: "all" });
  const [selectedCardId, setSelectedCardId] = useState(session.cards[0]?.id ?? "memory-inbox-empty");
  const selectedCard = session.cards.find((card) => card.id === selectedCardId) ?? session.cards[0];
  const visibleCards = useMemo(() => filterCards(session.cards, filters), [filters, session.cards]);
  const preview = selectedCard ? buildMemoryInboxPromotionPreview(selectedCard) : null;
  const policy = buildMemoryInboxReviewPolicy(selectedCard);

  function copyReviewPrompt() {
    if (!selectedCard) return;
    void navigator.clipboard?.writeText(buildMemoryReviewPrompt(selectedCard));
  }

  function copyPromotionPreview() {
    if (!preview) return;
    void navigator.clipboard?.writeText([
      "Operator Memory Inbox promotion preview",
      `Runtime event type: ${preview.proposedRuntimeEventType}`,
      `Memory: ${preview.proposedMemoryItem.text}`,
      preview.futureMergeBoundary,
      "Review required before promotion; no auto-promotion; no graph mutation.",
    ].join("\n"));
  }

  return (
    <CodexForgeAppShell activePath="/memory-inbox" workspaceLabel="Operator Memory Inbox" nextActionContext={{ hasMemoryReview: true }}>
      <div
        style={contentShell}
        data-codexforge-operator-memory-inbox="OperatorMemoryInbox renders premium dark operator cockpit review required before promotion no auto-promotion no graph mutation evidence is context, not authority preserve latest-message authority no auto-persistence copy memory review prompt allowed"
      >
        <section style={hero}>
          <div style={heroCopy}>
            <span style={eyebrow}>CodexForge Phase 44</span>
            <h1 style={headline}>Personal Operator Memory Inbox</h1>
            <p style={lede}>
              Activity, evidence, regression, patch, stabilization, creative, and manual notes become reviewed memory
              inbox cards with confidence, importance, risk, dedupe, and promotion preview. This phase does not
              auto-promote memory and does not mutate the Brain graph.
              Runtime Event Executor review is available for approved memory.promoted requests only and never auto-executes.
            </p>
            <div style={heroActions}>
              <button type="button" onClick={copyReviewPrompt} style={actionButton}>Copy memory review prompt</button>
              <Link href="/memory" style={heroLink}>Memory Review boundary</Link>
              <Link href="/activity" style={heroLink}>Activity Feed candidates</Link>
            </div>
          </div>
          <div style={heroStats}>
            <HeroStat label="Cards" value={String(session.summary.cardCount)} />
            <HeroStat label="Pending review" value={String(session.summary.pendingReviewCount)} />
            <HeroStat label="Ready preview" value={String(session.summary.promotionReadyCount)} />
            <HeroStat label="Blocked" value={String(session.summary.blockedCount)} />
          </div>
        </section>

        <MemoryInboxSafetyNotice />
        <MemoryInboxFilterBar filters={filters} onChange={setFilters} />

        <div style={layout}>
          <div style={mainColumn}>
            <MemoryInboxPanel cards={visibleCards} selectedCardId={selectedCard?.id} onSelectCard={setSelectedCardId} />
          </div>
          <aside style={sideColumn}>
            <MemoryInboxPriorityBoard summary={session.summary} />
            <MemoryInboxClassifierPanel summary={session.classificationSummary} />
            <MemoryInboxSourcePanel sources={session.sourceSummary} />
            <MemoryInboxReviewPolicyPanel policy={policy} />
            {preview ? <MemoryInboxPromotionPreviewPanel preview={preview} onCopyPreview={copyPromotionPreview} /> : null}
            <RuntimeEventExecutorPanel card={selectedCard} compact />
            <MemoryPromotionGatePanel card={selectedCard} />
          </aside>
        </div>
      </div>
    </CodexForgeAppShell>
  );
}

function buildDefaultSession() {
  return summarizeOperatorMemoryInboxSession([
    ...buildMemoryInboxCardsFromActivity(),
    ...buildMemoryInboxCardsFromVerification(),
    ...buildMemoryInboxCardsFromRegression(),
    ...buildMemoryInboxCardsFromPatchWorkflow(),
    ...buildMemoryInboxCardsFromStabilization(),
    ...buildMemoryInboxCardsFromCreative(),
  ]);
}

function filterCards(cards: OperatorMemoryInboxCard[], filters: MemoryInboxFilters) {
  const query = filters.query.trim().toLowerCase();
  return cards.filter((card) => {
    if (filters.kind !== "all" && card.memoryKind !== filters.kind) return false;
    if (filters.priority !== "all" && card.priorityClass !== filters.priority) return false;
    if (!query) return true;
    return [card.title, card.proposedMemoryText, card.sourceSurface, card.relatedFiles.join(" ")].join(" ").toLowerCase().includes(query);
  });
}

function buildMemoryReviewPrompt(card: OperatorMemoryInboxCard): string {
  return [
    "Review this operator memory inbox card.",
    `Title: ${card.title}`,
    `Proposed memory: ${card.proposedMemoryText}`,
    `Kind: ${card.memoryKind}`,
    `Confidence: ${card.confidence}`,
    `Importance: ${card.importance}`,
    `Risk: ${card.risk}`,
    "Decide whether it needs dedupe review, contradiction review, clarification, or promotion preview.",
    "Do not auto-promote memory, mutate Brain graph, write files, run commands, or override latest-message authority.",
  ].join("\n");
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return <div style={stat}><span style={statLabel}>{label}</span><strong style={statValue}>{value}</strong></div>;
}

const safe: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const contentShell: CSSProperties = { width: "100%", display: "grid", gap: 16, minWidth: 0 };
const hero: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.8))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(min(100%, 430px), 0.8fr)", gap: 18, alignItems: "center", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safe };
const headline: CSSProperties = { margin: 0, fontSize: 40, lineHeight: 1.06, letterSpacing: 0, ...safe };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 980, ...safe };
const heroActions: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const heroLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 900, padding: "9px 11px", textDecoration: "none", ...safe };
const actionButton: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "rgba(20,184,166,0.12)", color: "#ccfbf1", borderRadius: 8, fontSize: 12, fontWeight: 900, padding: "9px 11px", cursor: "pointer", ...safe };
const heroStats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 14, display: "grid", gap: 5, minWidth: 0 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 11, textTransform: "uppercase", fontWeight: 850, ...safe };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 24, lineHeight: 1.1, ...safe };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(min(100%, 430px), 0.75fr)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
