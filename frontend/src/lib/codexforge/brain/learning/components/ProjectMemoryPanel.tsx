"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { recallProjectMemory, type ProjectMemoryEntry } from "../project-learning";
import { useProjectMemory } from "../use-project-memory";
import styles from "./ProjectMemoryPanel.module.css";

const PAGE_SIZE = 12;
const entryLabels = { decision: "Decision", worked: "Worked", "did-not-work": "Didn’t work" };
const timestamp = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });

type MemoryGroup = { entry: ProjectMemoryEntry; outcomes: ProjectMemoryEntry[] };

function groupMatches(entries: ProjectMemoryEntry[], matches: ProjectMemoryEntry[]): MemoryGroup[] {
  const decisions = new Map(entries.filter(entry => entry.kind === "decision").map(entry => [entry.id, entry]));
  const outcomes = new Map<string, ProjectMemoryEntry[]>();
  for (const entry of entries) {
    if (entry.relatedDecisionId && entry.kind !== "decision") {
      const related = outcomes.get(entry.relatedDecisionId);
      if (related) related.push(entry);
      else outcomes.set(entry.relatedDecisionId, [entry]);
    }
  }

  const groups = new Map<string, MemoryGroup>();
  for (const match of matches) {
    const entry = (match.relatedDecisionId && decisions.get(match.relatedDecisionId)) || match;
    if (!groups.has(entry.id)) groups.set(entry.id, { entry, outcomes: outcomes.get(entry.id) ?? [] });
  }
  return [...groups.values()];
}

function Entry({ entry }: { entry: ProjectMemoryEntry }) {
  const isChat = entry.sourceType === "jarvis";
  const sourceUrl = isChat ? "/jarvis?conversation=" : "/jarvis-websites?project=";
  return (
    <div className={styles.entry}>
      <strong className={styles.entryKind} data-kind={entry.kind}>{entryLabels[entry.kind]}</strong>
      <p className={styles.text}>{entry.text}</p>
      <div className={styles.provenance}>
        {entry.sourceType === "codex-chat" ? (
          <span>Codex development chat · {entry.sourceLabel}</span>
        ) : entry.sourceType === "project-note" ? (
          <span title="docs/development/project-memory.md">Project notes · {entry.sourceLabel}</span>
        ) : (
          <Link prefetch={false} href={sourceUrl + encodeURIComponent(entry.sourceId)}>
            {isChat ? "Jarvis" : "Creator"} · {entry.sourceLabel}
          </Link>
        )}
        <time dateTime={entry.at}>{timestamp.format(new Date(entry.at))}</time>
      </div>
    </div>
  );
}

export function ProjectMemoryPanel() {
  const { entries, developmentChatStatus, status, refresh } = useProjectMemory();
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const groups = useMemo(() => {
    const matches = query.trim() ? recallProjectMemory(entries, query, entries.length) : entries;
    return groupMatches(entries, matches);
  }, [entries, query]);

  return (
    <section className={styles.panel} aria-labelledby="project-memory-heading">
      <header className={styles.header}>
        <div>
          <h2 id="project-memory-heading">Project memory</h2>
          <p>Review decisions and outcomes from your workspace. Each entry shows where it came from.</p>
          {developmentChatStatus === "connected" && <p>Decisions and reported outcomes from your linked Codex chat appear automatically.</p>}
          {developmentChatStatus === "unavailable" && <p role="status">The linked Codex chat is currently unavailable. The Brain will check again.</p>}
        </div>
        <button type="button" className={styles.button} onClick={refresh} disabled={status === "loading"}>
          Refresh memory
        </button>
      </header>
      {status === "loading" && <p role="status">Loading project memory…</p>}
      {status === "error" && <p role="alert">Project memory could not be loaded. Refresh to try again.</p>}
      {status === "ready" && entries.length === 0 && (
        <p>No decisions or outcomes yet. State a decision in <Link href="/jarvis">Jarvis chat</Link>, then describe what worked or failed.</p>
      )}
      {status === "ready" && entries.length > 0 && (
        <>
          <label className={styles.search}>
            Search decisions and outcomes
            <input type="search" value={query} onChange={event => {
              setQuery(event.target.value);
              setLimit(PAGE_SIZE);
            }} />
          </label>
          {groups.length === 0 && <p role="status">No matching decisions or outcomes. Try another search.</p>}
          {groups.length > 0 && (
            <ul className={styles.list}>
              {groups.slice(0, limit).map(({ entry, outcomes }) => (
                <li className={styles.group} key={entry.id}>
                  <Entry entry={entry} />
                  {outcomes.length > 0 && (
                    <ul className={styles.outcomes} aria-label="Recorded outcomes for this decision">
                      {outcomes.map(outcome => <li key={outcome.id}><Entry entry={outcome} /></li>)}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
          {groups.length > limit && (
            <button type="button" className={styles.button} onClick={() => setLimit(value => value + PAGE_SIZE)}>Show more</button>
          )}
        </>
      )}
    </section>
  );
}
