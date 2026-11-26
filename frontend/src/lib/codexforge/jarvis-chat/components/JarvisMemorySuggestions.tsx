"use client";

import Link from "next/link";
import { useDeferredValue, useMemo } from "react";
import { recallProjectMemory, withoutRecalledMemory, type ProjectMemoryEntry } from "../../brain/learning/project-learning";
import { useProjectMemory } from "../../brain/learning/use-project-memory";
import { JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS } from "../jarvis-chat-policy";
import styles from "./JarvisChatPanel.module.css";

const labels = {
  decision: "Decision",
  worked: "Worked",
  "did-not-work": "Didn’t work",
};

function citation(entry: ProjectMemoryEntry) {
  const source = { creator: "Creator evidence", jarvis: "Jarvis operator", "project-note": "Project notes", "codex-chat": "Codex development chat" }[entry.sourceType];
  return `${labels[entry.kind]} · ${source} · ${entry.sourceLabel} · ${entry.at.slice(0, 10)}`;
}

export function JarvisMemorySuggestions({ draft, onUse }: {
  draft: string;
  onUse: (draft: string) => void;
}) {
  const { entries, status, refresh } = useProjectMemory();
  const query = useDeferredValue(withoutRecalledMemory(draft).trim());

  const matches = useMemo(() => recallProjectMemory(entries, query, 4), [entries, query]);
  if (status === "error") {
    return <p className={styles.fieldHelp}>Related Brain memory is unavailable.{" "}
      <button type="button" className={styles.textButton} onClick={refresh}>Try again</button>
    </p>;
  }
  if (!matches.length) return null;

  return (
    <section className={styles.memorySuggestions} aria-label="Related Brain memory">
      <h4 className={styles.sectionTitle}>Related Brain memory</h4>
      <p className={styles.fieldHelp}>Choose a memory to include in your message. <Link href="/brain">Open Brain</Link></p>
      {matches.map((entry) => {
        const decision = entry.relatedDecisionId ? entries.find((item) => item.id === entry.relatedDecisionId) : undefined;
        const evidence = [decision, entry].filter((item): item is ProjectMemoryEntry => Boolean(item));
        const quote = evidence.map((item) => `> ${citation(item)}\n> ${item.text}`).join("\n");
        const block = `[Brain memory]\n${quote}\n[/Brain memory]`;
        const nextDraft = `${draft.trimEnd()}\n\n${block}`;
        const alreadyAdded = draft.includes(block);
        const tooLong = nextDraft.length > JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS;
        return (
          <div key={entry.id} className={styles.memorySuggestion}>
            <small>{citation(entry)}</small>
            {decision ? <p><strong>Decision</strong> · {decision.text}</p> : null}
            <p>{entry.text}</p>
            <button type="button" className={styles.textButton} disabled={alreadyAdded || tooLong} onClick={() => onUse(nextDraft)}>
              {alreadyAdded ? "Added to draft" : tooLong ? "Shorten draft to add memory" : "Add to draft"}
            </button>
          </div>
        );
      })}
    </section>
  );
}
