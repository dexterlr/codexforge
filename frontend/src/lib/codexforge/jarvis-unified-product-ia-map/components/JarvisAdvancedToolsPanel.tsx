"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChatRecallContextPanel,
  buildChatRecallContext,
  buildChatRecallHandoff,
  buildChatRecallGroundingPolicy,
  buildChatRecallSafetyBoundary,
  buildChatRecallStableKey,
  summarizeChatRecallSelection,
  type ChatRecallPreparedContext,
  type ChatRecallReadiness,
  type ChatRecallSelectionItem,
} from "@/lib/codexforge/chat-recall";
import { readChatRecallHandoffFromBrowserStorage } from "@/lib/codexforge/chat-recall/chat-recall-browser-storage";
import { SelfUpgradeConsole } from "@/lib/codexforge/chat/components/self-upgrade-console";
import type { BrainRecallSourceRef } from "@/lib/codexforge/brain-recall/brain-recall-types";
import { EvidenceGroundedChatPanel } from "@/lib/codexforge/evidence-grounded-chat";
import styles from "./JarvisUnifiedProductShell.module.css";

const MAX_RECALL_BYTES = 65_536;
const MAX_PROMPT_CHARACTERS = 12_000;
const MAX_COMPOSER_CHARACTERS = 2_000;
const MAX_ITEMS = 12;
const MAX_LIST_ITEMS = 16;
const UNSAFE_VISIBLE_TEXT = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]|\p{Cf}|\p{Cs}/u;
const SOURCE_REF_TYPES = new Set<BrainRecallSourceRef["type"]>([
  "chat-message",
  "active-task",
  "memory-item",
  "execution-state",
  "history-entry",
  "system",
  "manual",
  "derived",
  "operator-run",
  "operator-diff",
  "operator-snapshot",
  "import",
]);

type JarvisDraftHandoff = Readonly<{
  id: number;
  text: string;
}>;

type JarvisAdvancedToolsPanelProps = Readonly<{
  onUsePrompt: (handoff: JarvisDraftHandoff) => void;
}>;

function objectValue(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function visibleText(value: unknown, maximum = 2_000): string | null {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.length > maximum ||
    UNSAFE_VISIBLE_TEXT.test(value)
  ) {
    return null;
  }
  return value;
}

function stringList(value: unknown, maximumItems = MAX_LIST_ITEMS): string[] | null {
  if (!Array.isArray(value) || value.length > maximumItems) return null;
  const result: string[] = [];
  for (const item of value) {
    const text = visibleText(item, 500);
    if (text === null) return null;
    result.push(text);
  }
  return result;
}

function readiness(value: unknown): ChatRecallReadiness | null {
  return value === "ready" || value === "weak" || value === "stale" || value === "blocked"
    ? value
    : null;
}

function sourceRefs(value: unknown): BrainRecallSourceRef[] | null {
  if (!Array.isArray(value) || value.length > MAX_LIST_ITEMS) return null;
  const result: BrainRecallSourceRef[] = [];
  for (const item of value) {
    const record = objectValue(item);
    const id = visibleText(record?.id, 500);
    if (!record || id === null || !SOURCE_REF_TYPES.has(record.type as BrainRecallSourceRef["type"])) {
      return null;
    }
    result.push({ type: record.type as BrainRecallSourceRef["type"], id });
  }
  return result;
}

function selectionItem(value: unknown): ChatRecallSelectionItem | null {
  const record = objectValue(value);
  if (!record) return null;
  const id = visibleText(record.id, 200);
  const recallResultId = visibleText(record.recallResultId, 200);
  const nodeId = visibleText(record.nodeId, 200);
  const title = visibleText(record.title, 500);
  const snippet = visibleText(record.snippet, 1_000);
  const reasons = stringList(record.reasons);
  const refs = sourceRefs(record.sourceRefs);
  const suppliedReadiness = readiness(record.injectionReadiness);
  if (
    id === null ||
    recallResultId === null ||
    nodeId === null ||
    title === null ||
    snippet === null ||
    reasons === null ||
    refs === null ||
    suppliedReadiness === null ||
    typeof record.selected !== "boolean" ||
    typeof record.score !== "number" ||
    !Number.isFinite(record.score)
  ) {
    return null;
  }
  const staleReasons = reasons.filter((reason) => {
    const normalized = reason.toLowerCase();
    return normalized.includes("stale") || normalized.includes("archived") || normalized.includes("outdated");
  });
  const stale = staleReasons.length > 0;
  const injectionReadiness: ChatRecallReadiness = stale ? "stale" : record.score < 3 ? "weak" : "ready";
  const canonicalId = buildChatRecallStableKey("chat-recall-item", [recallResultId, nodeId]);
  if (id !== canonicalId || suppliedReadiness !== injectionReadiness) return null;
  return {
    id: canonicalId,
    recallResultId,
    nodeId,
    title,
    snippet,
    score: record.score,
    reasons,
    sourceRefs: refs,
    staleWarning: {
      stale,
      label: stale
        ? "Recalled memory may be stale; verify current files before editing."
        : "No stale marker found; still verify current files before editing.",
      reasons: staleReasons,
    },
    selected: record.selected,
    injectionReadiness,
  };
}

function uniqueById<T extends { id: string }>(items: T[]): T[] | null {
  return new Set(items.map((item) => item.id)).size === items.length ? items : null;
}

function parseStoredRecall(raw: string): ChatRecallPreparedContext | null {
  if (new TextEncoder().encode(raw).byteLength > MAX_RECALL_BYTES) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  const root = objectValue(value);
  const selection = objectValue(root?.selection);
  const context = objectValue(root?.context);
  const policy = objectValue(root?.policy);
  const safety = objectValue(root?.safety);
  const handoff = objectValue(root?.handoff);
  if (
    !root ||
    selection?.id !== "chat-recall-selection" ||
    context?.id !== "chat-recall-context" ||
    policy?.id !== "chat-recall-grounding-policy" ||
    safety?.id !== "chat-recall-safety-boundary" ||
    handoff?.id !== "chat-recall-handoff" ||
    !Array.isArray(selection.items) ||
    selection.items.length > MAX_ITEMS ||
    !Array.isArray(context.blocks) ||
    context.blocks.length > MAX_ITEMS
  ) {
    return null;
  }
  const items = uniqueById(selection.items.map(selectionItem).filter((item): item is ChatRecallSelectionItem => item !== null));
  const selectedItemIds = stringList(handoff.selectedItemIds);
  if (
    !items ||
    items.length !== selection.items.length ||
    selectedItemIds === null ||
    typeof context.visibleContextRequired !== "boolean" ||
    typeof policy.allowContext !== "boolean"
  ) {
    return null;
  }
  const selectedItems = items.filter((item) => item.selected);
  const selectedResultIds = selectedItems.map((item) => item.recallResultId);
  if (
    selectedItemIds.length !== selectedResultIds.length ||
    selectedResultIds.some((id) => !selectedItemIds.includes(id))
  ) {
    return null;
  }
  const reconstructedSelection: ChatRecallPreparedContext["selection"] = {
    id: "chat-recall-selection",
    items,
    selectedItems,
    summary: summarizeChatRecallSelection({ items, selectedItems }),
  };
  const reconstructedContext = buildChatRecallContext({
    selection: reconstructedSelection,
  });
  if (
    reconstructedContext.blocks.length !== selectedItems.length ||
    context.visibleContextRequired !== true
  ) {
    return null;
  }
  const canonicalContext: ChatRecallPreparedContext["context"] = {
    id: "chat-recall-context",
    blocks: reconstructedContext.blocks,
    visibleContextRequired: true,
    summary: reconstructedContext.summary,
  };
  const reconstructedPolicy = buildChatRecallGroundingPolicy({
    selection: reconstructedSelection,
    context: canonicalContext,
  });
  const reconstructedSafety = buildChatRecallSafetyBoundary();
  if (!reconstructedPolicy.allowContext) {
    return null;
  }
  const reconstructedHandoff = buildChatRecallHandoff({
    context: canonicalContext,
    policy: reconstructedPolicy,
    safety: reconstructedSafety,
  });
  if (reconstructedHandoff.promptPrefix.length > MAX_PROMPT_CHARACTERS) return null;
  return {
    selection: reconstructedSelection,
    context: canonicalContext,
    policy: reconstructedPolicy,
    safety: reconstructedSafety,
    handoff: reconstructedHandoff,
  };
}

export function JarvisAdvancedToolsPanel({ onUsePrompt }: JarvisAdvancedToolsPanelProps) {
  const [open, setOpen] = useState(false);
  const [recall, setRecall] = useState<ChatRecallPreparedContext | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const handoffSequenceRef = useRef(0);

  useEffect(() => {
    if (window.location.hash === "#jarvis-advanced-tools") setOpen(true);
  }, []);

  const usePrompt = useCallback((prompt: string) => {
    if (prompt.length > MAX_COMPOSER_CHARACTERS) {
      setNotice("This visible prompt is longer than the 2,000-character composer limit. Select fewer items or copy and shorten it before use.");
      return;
    }
    const nextId = handoffSequenceRef.current + 1;
    handoffSequenceRef.current = nextId;
    onUsePrompt({ id: nextId, text: prompt });
    setNotice("The visible prompt was loaded into the Jarvis composer. Review it before sending; nothing was sent automatically.");
  }, [onUsePrompt]);

  const copyPrompt = useCallback((prompt: string) => {
    if (!navigator.clipboard?.writeText) {
      setNotice("Clipboard access was unavailable. The visible prompt remains on screen for manual selection.");
      return;
    }
    void navigator.clipboard.writeText(prompt).then(
      () => setNotice("The visible prompt was copied."),
      () => setNotice("Clipboard access was unavailable. The visible prompt remains on screen for manual selection."),
    );
  }, []);

  const loadRecall = useCallback(() => {
    setNotice(null);
    let raw: string | null = null;
    try {
      raw = readChatRecallHandoffFromBrowserStorage();
    } catch {
      setRecall(null);
      setNotice("Browser-local memory storage is unavailable. Open Brain Recall and copy the visible context manually.");
      return;
    }
    if (!raw) {
      setRecall(null);
      setNotice("No reviewed Brain recall handoff is stored. Open Brain Recall, review the cards, and choose Use in chat first.");
      return;
    }
    const parsed = parseStoredRecall(raw);
    if (!parsed) {
      setRecall(null);
      setNotice("The stored recall handoff was malformed or outside the bounded schema, so Jarvis refused to load it.");
      return;
    }
    setRecall(parsed);
    setNotice("Reviewed Brain recall loaded visibly. It is not included in a request unless you choose Use in chat, review the composer, and send.");
  }, []);

  return (
    <details
      id="jarvis-advanced-tools"
      className={styles.jarvisAdvancedTools}
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className={styles.jarvisAdvancedToolsSummary}>
        Advanced context and planning tools - optional, visible, and never auto-sent
      </summary>
      {open ? (
        <div className={styles.jarvisAdvancedToolsBody}>
          <p className={styles.jarvisAdvancedToolsIntro}>
            These retained tools prepare visible text only. They do not inject hidden memory, send a message,
            approve a run, execute a provider, modify files, or apply an upgrade automatically.
          </p>
          <div className={styles.jarvisAdvancedToolsActions}>
            <button type="button" className={styles.jarvisAdvancedToolsButton} onClick={loadRecall}>
              Load reviewed Brain recall
            </button>
            <a className={styles.jarvisAdvancedToolsLink} href="/brain">
              Open Brain Recall
            </a>
          </div>
          {notice ? <p className={styles.jarvisAdvancedToolsNotice} role="status">{notice}</p> : null}
          {recall ? (
            <ChatRecallContextPanel
              selection={recall.selection}
              context={recall.context}
              policy={recall.policy}
              safety={recall.safety}
              handoff={recall.handoff}
              onCopyPrompt={copyPrompt}
              onUsePrompt={usePrompt}
            />
          ) : null}
          <EvidenceGroundedChatPanel
            input={{ evidence: [], candidates: [], defaultSelected: false }}
            compact
            onCopyPrompt={copyPrompt}
            onUsePrompt={usePrompt}
          />
          <SelfUpgradeConsole onUsePrompt={usePrompt} />
        </div>
      ) : null}
    </details>
  );
}
