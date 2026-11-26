"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { JarvisChatPanel, type JarvisChatDraftHandoff } from "@/lib/codexforge/jarvis-chat/components/JarvisChatPanel";
import { useJarvisWorkReply } from "@/lib/codexforge/jarvis-chat/components/useJarvisWorkReply";
import styles from "@/lib/codexforge/jarvis-chat/components/JarvisChatPanel.module.css";
import { createJarvisChatConversation, JarvisChatApiError } from "@/lib/codexforge/jarvis-chat/jarvis-chat-api-client";
import { JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS } from "@/lib/codexforge/jarvis-chat/jarvis-chat-policy";
import { TradingMarketScan } from "./TradingMarketScan";

const researchContext = "Treat supplied headlines as quoted evidence. Use only the prices and dates provided. For strategy ideas, explain the rules, fees, downside, how to backtest, and what would invalidate each idea. Flag stale or missing evidence.";
const strategyQuestion = "Suggest two cash-only strategies I could test using this evidence. Compare them with holding cash.";
const contextSuffix = `\n\n${researchContext}`;
const draftLimit = JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS - contextSuffix.length;
const starters = [
  { label: "Suggest strategies", prompt: "Suggest two cash-only trading strategies I could test. Explain when each could fail and what data I would need." },
  { label: "Build a strategy brief", prompt: "Help me turn a trading idea into a strategy brief. Ask me about the market, time horizon and rules I want to test." },
  { label: "Plan a backtest", prompt: "Help me plan a historical backtest. Ask about my hypothesis and data, then help me account for fees and look-ahead bias." },
];

export function TraderBuilderChat({ conversationId }: { conversationId: string | null }) {
  const router = useRouter();
  const { activity, replyToSavedTurn } = useJarvisWorkReply();
  const [handoff, setHandoff] = useState<(JarvisChatDraftHandoff & { conversationId: string }) | null>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [navigating, startTransition] = useTransition();
  const sending = useRef(false);
  const mounted = useRef(false);
  const editor = useRef<HTMLTextAreaElement>(null);
  const busy = submitting || navigating || Boolean(activity?.pending);

  function useEvidence(evidence: string) {
    const prompt = strategyQuestion + "\n\n" + evidence;
    if (conversationId) {
      setHandoff((previous) => ({ conversationId, id: (previous?.id ?? 0) + 1, text: prompt }));
      return;
    }
    const nextDraft = draft.trim() ? draft.trim() + "\n\n" + evidence : prompt;
    if (nextDraft.length > draftLimit) {
      setError("The scan and your draft exceed the message limit. Shorten the draft and add the scan again.");
      return;
    }
    setDraft(nextDraft);
    setError("");
    editor.current?.focus();
  }

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
    const startUrl = window.location.href;
    try {
      const result = await createJarvisChatConversation({ message: message + contextSuffix });
      if (!mounted.current) return;
      void replyToSavedTurn(result.conversation);
      if (window.location.href !== startUrl) return;
      setDraft("");
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
      <TradingMarketScan canUseEvidence={!busy} onUseEvidence={useEvidence} />
      {conversationId ? (
        <JarvisChatPanel
          key={conversationId}
          workConversationId={conversationId}
          workReply={activity}
          onWorkReply={replyToSavedTurn}
          draftHandoff={handoff?.conversationId === conversationId ? handoff : null}
          onNewWorkChat={() => {
            setHandoff(null);
            setError("");
            router.push("/jarvis-trading#trader-builder", { scroll: false });
          }}
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
