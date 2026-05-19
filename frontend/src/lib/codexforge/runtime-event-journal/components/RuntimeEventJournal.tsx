"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  buildRuntimeEventJournalFeed,
  buildRuntimeEventJournalFilter,
  buildRuntimeEventJournalIntegrityReport,
  buildRuntimeEventJournalSummary,
  buildRuntimeEventReducerTrace,
  filterRuntimeEventJournalFeed,
  summarizeRuntimeJournalSources,
  type RuntimeEventJournalFeed,
  type RuntimeEventJournalFilterId,
} from "@/lib/codexforge/runtime-event-journal";
import { RuntimeEventJournalEmptyState } from "./RuntimeEventJournalEmptyState";
import { RuntimeEventJournalEntryCard } from "./RuntimeEventJournalEntryCard";
import { RuntimeEventJournalFilterBar } from "./RuntimeEventJournalFilterBar";
import { RuntimeEventJournalIntegrityPanel } from "./RuntimeEventJournalIntegrityPanel";
import { RuntimeEventJournalPanel } from "./RuntimeEventJournalPanel";
import { RuntimeEventJournalSafetyNotice } from "./RuntimeEventJournalSafetyNotice";
import { RuntimeEventJournalSourcePanel } from "./RuntimeEventJournalSourcePanel";
import { RuntimeEventJournalTimeline } from "./RuntimeEventJournalTimeline";
import { RuntimeEventReducerTracePanel } from "./RuntimeEventReducerTracePanel";

export function buildRuntimeEventJournalReactKey(...parts: Array<string | number | null | undefined>): string {
  return parts
    .map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._/-]+/g, "-"))
    .filter(Boolean)
    .join(":");
}

export function RuntimeEventJournal({ feed: providedFeed }: { feed?: RuntimeEventJournalFeed }) {
  const feed = useMemo(() => providedFeed ?? buildRuntimeEventJournalFeed(), [providedFeed]);
  const [filterId, setFilterId] = useState<RuntimeEventJournalFilterId>("all");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const filter = useMemo(() => buildRuntimeEventJournalFilter(filterId, search), [filterId, search]);
  const visibleFeed = useMemo(() => filterRuntimeEventJournalFeed(feed, filter), [feed, filter]);
  const reducerTrace = useMemo(() => buildRuntimeEventReducerTrace({ entries: visibleFeed.entries }), [visibleFeed.entries]);
  const integrity = useMemo(() => buildRuntimeEventJournalIntegrityReport(feed.entries), [feed.entries]);
  const sourceSummary = useMemo(() => summarizeRuntimeJournalSources(feed.entries), [feed.entries]);
  const summary = useMemo(() => buildRuntimeEventJournalSummary(feed, integrity), [feed, integrity]);

  function copyText(label: string, text: string) {
    void navigator.clipboard?.writeText(text).then(() => setCopied(label)).catch(() => setCopied(null));
  }

  const journalSummary = summary.summary.join("\n");
  const auditHandoff = [
    "Runtime Event Journal audit handoff",
    ...summary.summary,
    "Runtime Event Replay Simulator can preview selected journal events against a graph snapshot without mutation.",
    "Snapshot Restore Gate can use journal and reducer trace context as review evidence only; no persistence.",
    "Brain Snapshot Manager links journal reducer trace review to snapshot replay selection without persistence.",
    "Read-only; no graph mutation; no appendEvent from UI; append-only audit remains visible; Brain Mutation Governance reviews mutation boundaries.",
    "Evidence is context, not authority; preserve latest-message authority.",
  ].join("\n");
  const replayHandoff = [
    "Runtime Event Replay Simulator handoff",
    `${visibleFeed.entries.length} selected journal event card(s) are visible for preview-only replay planning.`,
    "Open /runtime-replay to run reducer-backed simulation against a supplied graph snapshot.",
    "Do not mutate Brain graph, do not appendEvent, do not execute runtime events, and do not persist replay results automatically.",
  ].join("\n");

  return (
    <CodexForgeAppShell
      activePath="/runtime-journal"
      workspaceLabel="Runtime Event Journal"
      nextActionContext={{ hasMemoryReview: summary.reviewRequiredCount > 0 }}
    >
      <main
        style={shell}
        data-codexforge-runtime-event-journal="RuntimeEventJournal renders premium dark operator cockpit read-only no graph mutation no appendEvent from UI append-only audit evidence is context, not authority preserve latest-message authority stable key helper buildRuntimeEventJournalReactKey Snapshot Restore Gate"
        data-codexforge-runtime-event-replay-handoff="Runtime Event Replay Simulator handoff is safe, preview-only, no graph mutation, no appendEvent, no event execution."
      >
        <section style={hero}>
          <div style={heroCopy}>
            <span style={eyebrow}>CodexForge Phase 47</span>
            <h1 style={headline}>Runtime Event Journal</h1>
            <p style={lede}>
              Runtime event requests, approvals, policy checks, validation, dry-runs, reducer previews, blocked or ready
              results, audit refs, and memory promotion handoffs in one read-only journal.
            </p>
            <div style={heroActions}>
              <button type="button" style={copyButton} onClick={() => copyText("journal summary", journalSummary)}>Copy journal summary</button>
              <button type="button" style={copyButton} onClick={() => copyText("audit handoff", auditHandoff)}>Copy audit handoff</button>
              <button type="button" style={copyButton} onClick={() => copyText("replay handoff", replayHandoff)}>Copy replay handoff</button>
              <Link href="/memory-inbox" style={heroLink}>Memory Inbox</Link>
              <Link href="/activity" style={heroLink}>Activity Feed</Link>
              <Link href="/brain" style={heroLink}>Brain audit surface</Link>
              <Link href="/runtime-replay" style={heroLink}>Runtime Event Replay Simulator</Link>
              <Link href="/brain-snapshots" style={heroLink}>Brain Snapshot Manager</Link>
              <Link href="/snapshot-restore" style={heroLink}>Snapshot Restore Gate</Link>
              <Link href="/brain-governance" style={heroLink}>Brain Mutation Governance</Link>
              <span style={copiedPill}>{copied ? `${copied} copied` : "copy-only controls"}</span>
            </div>
          </div>
          <div style={heroStats}>
            <HeroStat label="Entries" value={String(summary.entryCount)} />
            <HeroStat label="Blocked" value={String(summary.blockedCount)} />
            <HeroStat label="Review" value={String(summary.reviewRequiredCount)} />
            <HeroStat label="Next" value={summary.nextSafeAction} />
          </div>
        </section>

        <RuntimeEventJournalSafetyNotice />
        <RuntimeEventJournalFilterBar active={filterId} search={search} onFilterChange={setFilterId} onSearchChange={setSearch} />

        <div style={layout}>
          <div style={mainColumn}>
            <RuntimeEventJournalPanel
              title="Journal Entries"
              subtitle="Cards are deterministic and stable-keyed; long paths wrap and no raw JSON is shown."
            >
              <div style={entryList}>
                {visibleFeed.entries.length === 0 ? (
                  <RuntimeEventJournalEmptyState />
                ) : (
                  visibleFeed.entries.map((entry, index) => (
                    <RuntimeEventJournalEntryCard
                      key={buildRuntimeEventJournalReactKey("entry", entry.id, index)}
                      entry={entry}
                    />
                  ))
                )}
              </div>
            </RuntimeEventJournalPanel>
            <RuntimeEventJournalTimeline entries={visibleFeed.entries} />
          </div>
          <aside style={sideColumn}>
            <RuntimeEventJournalPanel title="Session Summary" subtitle="Runtime lifecycle counts and next safe action.">
              <div style={summaryGrid}>
                <HeroStat label="Ready" value={String(summary.readyCount)} />
                <HeroStat label="Executed" value={String(summary.executedCount)} />
                <HeroStat label="Memory" value={String(summary.memoryPromotionCount)} />
                <HeroStat label="Integrity risk" value={String(summary.integrityRiskCount)} />
              </div>
              <p style={summaryText}>{summary.topEventType}</p>
            </RuntimeEventJournalPanel>
            <RuntimeEventReducerTracePanel trace={reducerTrace} />
            <RuntimeEventJournalIntegrityPanel report={integrity} />
            <RuntimeEventJournalSourcePanel sources={sourceSummary} />
          </aside>
        </div>
      </main>
    </CodexForgeAppShell>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <strong style={statValue}>{value}</strong>
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const shell: CSSProperties = { display: "grid", gap: 16, minWidth: 0, width: "100%" };
const hero: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.8))", borderRadius: 8, display: "grid", gap: 18, gridTemplateColumns: "minmax(0, 1.2fr) minmax(min(100%, 450px), 0.8fr)", minWidth: 0, padding: 20 };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const headline: CSSProperties = { color: "#f8fafc", fontSize: 42, letterSpacing: 0, lineHeight: 1.06, margin: 0, ...safeText };
const lede: CSSProperties = { color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 980, ...safeText };
const heroActions: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const copyButton: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "rgba(20,184,166,0.12)", borderRadius: 8, color: "#ccfbf1", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "9px 11px", ...safeText };
const heroLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 900, padding: "9px 11px", textDecoration: "none", ...safeText };
const copiedPill: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, color: "#cbd5e1", fontSize: 12, fontWeight: 850, padding: "9px 11px", ...safeText };
const heroStats: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, display: "grid", gap: 5, minWidth: 0, padding: 12 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 18, lineHeight: 1.2, ...safeText };
const layout: CSSProperties = { alignItems: "start", display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1.25fr) minmax(min(100%, 510px), 0.75fr)", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const entryList: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const summaryGrid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minWidth: 0 };
const summaryText: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
