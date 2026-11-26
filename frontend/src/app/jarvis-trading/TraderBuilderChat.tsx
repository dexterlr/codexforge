"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { JarvisChatPanel } from "@/lib/codexforge/jarvis-chat/components/JarvisChatPanel";
import styles from "@/lib/codexforge/jarvis-chat/components/JarvisChatPanel.module.css";
import { createJarvisChatConversation, JarvisChatApiError } from "@/lib/codexforge/jarvis-chat/jarvis-chat-api-client";
import { JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS } from "@/lib/codexforge/jarvis-chat/jarvis-chat-policy";

const researchContext = "Treat this as trading research. Help me define a testable hypothesis, identify the evidence I need, and examine the risks.";
const contextSuffix = `\n\n${researchContext}`;
const draftLimit = JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS - contextSuffix.length;
const starters = [
  { label: "Build a strategy brief", prompt: "Help me turn a trading idea into a strategy brief. Ask me about the market, time horizon and rules I want to test." },
  { label: "Plan a backtest", prompt: "Help me plan a historical backtest. Ask about my hypothesis and data, then help me account for fees and look-ahead bias." },
];

export function TraderBuilderChat({ conversationId }: { conversationId: string | null }) {
  const router = useRouter();
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [navigating, startTransition] = useTransition();
  const sending = useRef(false);
  const mounted = useRef(false);
  const editor = useRef<HTMLTextAreaElement>(null);
  const busy = submitting || navigating;

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  async function startConversation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = draft.trim();
    if (!message || draft.length > draftLimit || sending.current || busy) return;
    sending.current = true;
    setSubmitting(true);
    setError("");
    try {
      const result = await createJarvisChatConversation({ message: message + contextSuffix });
      if (!mounted.current) return;
      startTransition(() => {
        router.push(`/jarvis-trading?conversation=${encodeURIComponent(result.conversation.conversationId)}#trader-builder`, { scroll: false });
      });
    } catch (caught) {
      if (mounted.current) {
        setError(caught instanceof JarvisChatApiError ? caught.message : "Couldn’t start this chat. Your draft is ready to try again.");
      }
    } finally {
      sending.current = false;
      if (mounted.current) setSubmitting(false);
    }
  }

  return (
    <section id="trader-builder" aria-labelledby="trader-builder-title" className={styles.panel} tabIndex={-1}>
      <h2 id="trader-builder-title" className={styles.panelTitle}>Trader Builder chat</h2>
      {conversationId ? (
        <JarvisChatPanel
          workConversationId={conversationId}
          onNewWorkChat={() => router.push("/jarvis-trading#trader-builder", { scroll: false })}
        />
      ) : (
        <form onSubmit={startConversation} className={styles.composer}>
          <label htmlFor="trader-builder-message" className={styles.composerLabel}>What trading idea would you like to test?</label>
          <textarea
            id="trader-builder-message"
            ref={editor}
            className={styles.textarea}
            rows={3}
            placeholder="Describe your idea, market or research question…"
            value={draft}
            maxLength={draftLimit}
            disabled={busy}
            onChange={(event) => setDraft(event.target.value)}
          />
          {!draft && (
            <div className={styles.buttonRow}>
              {starters.map(({ label, prompt }) => (
                <button
                  key={label}
                  type="button"
                  className={styles.secondaryButton}
                  disabled={busy}
                  onClick={() => {
                    setDraft(prompt);
                    editor.current?.focus();
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          <details className={styles.boundaryStrip}>
            <summary className={styles.boundarySummary}>Research instructions included with your message</summary>
            <p className={styles.fieldHelp}>{researchContext}</p>
          </details>
          {error && <p role="alert" className={styles.errorNotice}>{error}</p>}
          <div className={styles.composerFooter}>
            <span className={styles.fieldHelp}>{draft.length} / {draftLimit} characters</span>
            <button type="submit" className={styles.primaryButton} disabled={busy || !draft.trim()}>
              {busy ? "Starting chat…" : "Start chat"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
