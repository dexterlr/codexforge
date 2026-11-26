"use client";

import { useEffect, useId, useRef, type RefObject } from "react";
import {
  JARVIS_CHAT_MAX_TURNS,
  JARVIS_CHAT_MAX_TITLE_CHARACTERS,
  JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS,
} from "../jarvis-chat-policy";
import type {
  JarvisChatConversation,
  JarvisChatTurnState,
} from "../jarvis-chat-types";
import { WorkReplyText } from "./WorkReplyText";
import styles from "./JarvisWorkConversation.module.css";

type Props = Readonly<{
  conversation: JarvisChatConversation | null;
  draft: string;
  onDraft: (value: string) => void;
  onSend: () => void;
  composerRef: RefObject<HTMLTextAreaElement | null>;
  loading: boolean;
  busy: boolean;
  generating: boolean;
  canStop: boolean;
  canRecover: boolean;
  composerBlockedReason: string | null;
  executionReason: string | null;
  status: string | null;
  error: string | null;
  onRefresh: () => void;
  onCancel: () => void;
  onStop: () => void;
  onRecover: () => void;
  onNew: () => void;
}>;

const turnUpdates: Record<JarvisChatTurnState, string> = {
  binding: "Preparing your message…",
  awaiting_approval: "Message saved.",
  approved: "Message saved.",
  executing: "Jarvis is writing a reply…",
  stopping: "Stopping this response…",
  succeeded: "Response complete.",
  stopped: "Response stopped.",
  canceled: "Turn canceled.",
  failed: "Jarvis couldn’t complete this response.",
  rejected: "Jarvis couldn’t accept the result of this turn.",
};

function displayChatTitle(conversation: JarvisChatConversation) {
  const { title } = conversation;
  const firstLine = conversation.turns[0]?.userMessage.text.split("\n", 1)[0]?.replace(/\s+/gu, " ").trim();
  if (!firstLine || firstLine.length <= JARVIS_CHAT_MAX_TITLE_CHARACTERS ||
      !firstLine.startsWith(title) || conversation.auditEvents.some((event) => event.eventType === "conversation.renamed")) return title;
  const nextCharacter = firstLine.codePointAt(title.length);
  if (nextCharacter === undefined || title.length + String.fromCodePoint(nextCharacter).length <= JARVIS_CHAT_MAX_TITLE_CHARACTERS) return title;
  const sentence = firstLine.match(/^.*?[.!?](?=\s|$)/u)?.[0];
  if (sentence && sentence.length <= title.length) return sentence;
  const wholeWords = /\s/u.test(firstLine[title.length]) ? title : title.replace(/\s+\S*$/u, "");
  return wholeWords.trimEnd() + "…";
}

export function JarvisWorkConversation(props: Props) {
  const {
    conversation, draft, onDraft, onSend, composerRef, loading, busy,
    generating, canStop, canRecover, composerBlockedReason, executionReason,
    status, error, onRefresh, onCancel, onStop, onRecover, onNew,
  } = props;
  const id = useId();
  const transcript = useRef<HTMLOListElement>(null);
  const bottomTurn = useRef<HTMLLIElement>(null);
  const latestReply = useRef<HTMLElement>(null);
  const readingLatest = useRef(true);
  const current = conversation?.turns.at(-1);
  const state = conversation?.state;
  const running = generating || state === "executing" || state === "stopping";
  const locked = loading || busy;
  const savedUnsent = !running && !locked && Boolean(current?.runBinding) && !conversation?.pendingOperation &&
    (state === "awaiting_approval" || state === "approved");
  const excess = draft.length - JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS;
  const atLimit = (conversation?.turns.length ?? 0) >= JARVIS_CHAT_MAX_TURNS;
  const canSend = !locked && !running && !executionReason &&
    (savedUnsent || (!composerBlockedReason && !atLimit && Boolean(draft.trim()) && excess <= 0));
  const followupId = id + "-followup";
  const helpId = id + "-help";
  const reasonId = id + "-reason";
  const countId = id + "-count";
  const blockedReason = atLimit ? "This chat is full. Start a new chat to continue." : composerBlockedReason;

  useEffect(() => {
    const list = transcript.current;
    const turn = bottomTurn.current;
    if (list && turn) {
      list.scrollTop = turn.offsetTop;
      readingLatest.current = list.scrollHeight - list.scrollTop - list.clientHeight < 48;
    }
  }, [conversation?.conversationId, current?.turnId]);

  useEffect(() => {
    const list = transcript.current;
    const reply = latestReply.current;
    if (!list || !reply || !readingLatest.current) return;
    const viewport = list.getBoundingClientRect();
    const message = reply.getBoundingClientRect();
    const hiddenEnd = message.bottom - viewport.bottom;
    if (hiddenEnd > 0) list.scrollTop += Math.max(0, Math.min(hiddenEnd, message.top - viewport.top - 10));
  }, [current?.assistantMessage?.messageId]);

  return (
    <section className={styles.panel} aria-labelledby={id + "-title"}>
      <header className={styles.header}>
        <h2 id={id + "-title"}>{conversation ? displayChatTitle(conversation) : "Conversation"}</h2>
        <button className={styles.secondary} type="button" disabled={locked} onClick={onNew}>New chat</button>
      </header>

      {error && (
        <div className={styles.error} role="alert">
          <p>{error}</p>
          <button className={styles.secondary} type="button" onClick={onRefresh} disabled={locked}>Refresh conversation</button>
        </div>
      )}
      {loading && !conversation && <p className={styles.loading} role="status">Opening your conversation…</p>}
      {conversation && (
        <>
          <ol
            className={styles.transcript}
            ref={transcript}
            aria-label="Conversation messages"
            aria-live="polite"
            aria-relevant="additions"
            tabIndex={0}
            onScroll={(event) => {
              const list = event.currentTarget;
              readingLatest.current = list.scrollHeight - list.scrollTop - list.clientHeight < 48;
            }}
          >
            {conversation.turns.map((turn) => (
              <li key={turn.turnId} ref={turn.turnId === current?.turnId ? bottomTurn : undefined} className={styles.turn}>
                <article className={styles.userMessage} aria-label="Your message">
                  <h3>You</h3>
                  <p>{turn.userMessage.text}</p>
                </article>
                {turn.assistantMessage ? (
                  <article ref={turn.turnId === current?.turnId ? latestReply : undefined} className={styles.reply} aria-label="Jarvis reply">
                    <h3><span className={styles.monogram} aria-hidden="true">J</span>Jarvis</h3>
                    <WorkReplyText text={turn.assistantMessage.text} />
                  </article>
                ) : (
                  <p className={styles.turnUpdate}>
                    {turn.safeFailureMessage || turnUpdates[turn.state]}
                  </p>
                )}
              </li>
            ))}
          </ol>

          {running && (
            <div className={styles.actionRow}>
              <p role="status">{state === "stopping" ? "Stop requested." : "Generating a local reply…"}</p>
              <button type="button" className={styles.secondary} disabled={!canStop} onClick={onStop}>Stop response</button>
            </div>
          )}
          {canRecover && (
            <div className={styles.actionRow}>
              <p>An interrupted action needs review.</p>
              <button type="button" className={styles.secondary} disabled={locked} onClick={onRecover}>Recover interrupted action</button>
            </div>
          )}

          <form className={styles.composer} onSubmit={(event) => {
            event.preventDefault();
            if (canSend) onSend();
          }}>
            {savedUnsent ? (
              <p className={styles.help}>Send the saved message above to receive a local reply.</p>
            ) : (
              <>
                <label htmlFor={followupId}>Ask a follow-up</label>
                <textarea
                  id={followupId}
                  ref={composerRef}
                  value={draft}
                  disabled={locked || Boolean(blockedReason)}
                  onChange={(event) => onDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                      event.preventDefault();
                      if (canSend) event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  aria-invalid={excess > 0}
                  aria-describedby={[helpId, countId, !locked && !running && blockedReason && reasonId].filter(Boolean).join(" ")}
                  rows={3}
                  placeholder="Ask for more detail, a different approach, or a revision…"
                />
                <p id={countId} className={excess > 0 ? styles.lengthError : styles.count}>
                  {excess > 0
                    ? `Shorten your message by ${excess} ${excess === 1 ? "character" : "characters"}.`
                    : `${draft.length} / ${JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS} characters`}
                </p>
                <p id={helpId} className={styles.help}>Jarvis uses recent messages from this chat. Shift+Enter adds a new line.</p>
                {!locked && !running && blockedReason && <p className={styles.hint} id={reasonId}>{blockedReason}</p>}
              </>
            )}
            {!locked && !running && executionReason && <p className={styles.hint}>{executionReason}</p>}
            <div className={styles.buttons}>
              {savedUnsent && <button type="button" className={styles.secondary} onClick={onCancel}>Cancel saved message</button>}
              <button type="submit" className={styles.primary} disabled={!canSend}>Send</button>
            </div>
          </form>
        </>
      )}
      <div className={styles.status} role="status">{status}</div>
    </section>
  );
}
