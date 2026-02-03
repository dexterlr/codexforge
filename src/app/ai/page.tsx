"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Msg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  ts: number;
};

function uid() {
  return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

const STORAGE_KEY = "health_tracker_ai_chat_v1";

export default function AiPage() {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Load chat from localStorage (fast + local-first)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Msg[];
      if (Array.isArray(parsed)) setMessages(parsed);
    } catch {
      // ignore
    }
  }, []);

  // Save chat to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const systemHint = useMemo(() => {
    return [
      "You are the Health Tracker assistant.",
      "This app is a testbed for future projects.",
      "Be concise and practical.",
      "When asked for changes, suggest concrete file edits and commands.",
    ].join(" ");
  }, []);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    const userMsg: Msg = { id: uid(), role: "user", text, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setBusy(true);

    try {
      // For now this is a local “stub” so we can keep building UI safely.
      // Next step: replace this with a call to your backend AI endpoint.
      // We include a "systemHint" so the eventual backend gets consistent behavior.
      const replyText =
        "✅ Stub AI (local) reply:\n\n" +
        "I can help you build this testbed fast.\n" +
        "Next, we should:\n" +
        "1) Save entries locally (weight/steps/water/sleep/notes)\n" +
        "2) Show them on /history\n" +
        "3) Add an /api/ai route (or backend endpoint) so I can generate insights.\n\n" +
        "Ask me: “Design the entry model” or “What files do I edit next?”";

      // Simulate small latency to feel realistic
      await new Promise((r) => setTimeout(r, 250));

      const assistantMsg: Msg = {
        id: uid(),
        role: "assistant",
        text: replyText + "\n\n(System hint: " + systemHint + ")",
        ts: Date.now(),
      };

      setMessages((m) => [...m, assistantMsg]);
    } finally {
      setBusy(false);
    }
  }

  function clearChat() {
    if (!confirm("Clear chat history?")) return;
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "clamp(16px, 4vw, 40px)",
        background:
          "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.22), transparent 60%)," +
          "radial-gradient(900px 500px at 80% 20%, rgba(16,185,129,0.18), transparent 55%)," +
          "radial-gradient(700px 400px at 50% 90%, rgba(236,72,153,0.12), transparent 55%)," +
          "linear-gradient(180deg, #070A12 0%, #050710 100%)",
        color: "white",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        display: "grid",
        placeItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 980, display: "grid", gap: 14 }}>
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 12px",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              aria-hidden="true"
              style={{
                width: 28,
                height: 28,
                borderRadius: 10,
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.95), rgba(16,185,129,0.85))",
                boxShadow: "0 10px 30px rgba(99,102,241,0.18)",
              }}
            />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontWeight: 800, letterSpacing: 0.2 }}>AI Assistant</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Local-first (stubbed), testbed-ready</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/" style={pillGhost}>
              ← Home
            </Link>
            <Link href="/entry" style={pillGhost}>
              Entry
            </Link>
            <Link href="/history" style={pillGhost}>
              History
            </Link>
            <button onClick={clearChat} style={pillDanger} type="button">
              Clear
            </button>
          </div>
        </div>

        {/* Main card */}
        <section
          style={{
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.12)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
            boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "clamp(16px, 3vw, 26px)", display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={badge}>
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: busy ? "rgba(245,158,11,0.95)" : "rgba(16,185,129,0.95)",
                      boxShadow: busy
                        ? "0 0 0 4px rgba(245,158,11,0.15)"
                        : "0 0 0 4px rgba(16,185,129,0.15)",
                      marginRight: 8,
                    }}
                  />
                  {busy ? "Thinking…" : "Ready"} • local stub
                </span>

                <span style={{ fontSize: 12, opacity: 0.75 }}>
                  Next: swap stub for backend AI endpoint
                </span>
              </div>

              <div style={{ fontSize: 12, opacity: 0.75 }}>
                Stored locally (localStorage)
              </div>
            </div>

            <div
              ref={listRef}
              style={{
                height: "min(56vh, 520px)",
                overflow: "auto",
                padding: 12,
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(0,0,0,0.22)",
              }}
            >
              {messages.length === 0 ? (
                <div style={{ opacity: 0.8, lineHeight: 1.6 }}>
                  <div style={{ fontWeight: 800, marginBottom: 6 }}>What this is</div>
                  <div>
                    A clean AI “slot” in the app. Today it’s stubbed locally so we can build the UX
                    and wiring safely. Soon it will call your backend AI route for real.
                  </div>
                  <div style={{ marginTop: 10, fontWeight: 700 }}>Try:</div>
                  <ul style={{ margin: "6px 0 0 18px", opacity: 0.9 }}>
                    <li>“Design the entry data model”</li>
                    <li>“What should /history show first?”</li>
                    <li>“Give me the next 3 steps to wire storage”</li>
                  </ul>
                </div>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        display: "grid",
                        justifyItems: m.role === "user" ? "end" : "start",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: 820,
                          padding: "10px 12px",
                          borderRadius: 14,
                          border: "1px solid rgba(255,255,255,0.12)",
                          background: m.role === "user" ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.06)",
                          whiteSpace: "pre-wrap",
                          lineHeight: 1.5,
                        }}
                      >
                        <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 6, fontWeight: 700 }}>
                          {m.role === "user" ? "You" : "AI"}
                        </div>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 10,
                alignItems: "center",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                placeholder='Ask: "What should we build next?"'
                style={{
                  width: "100%",
                  padding: "12px 12px",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "rgba(255,255,255,0.06)",
                  color: "white",
                  outline: "none",
                }}
              />

              <button
                onClick={() => void send()}
                disabled={busy || input.trim().length === 0}
                type="button"
                style={{
                  padding: "12px 14px",
                  borderRadius: 14,
                  fontWeight: 900,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background:
                    busy || input.trim().length === 0
                      ? "rgba(255,255,255,0.10)"
                      : "linear-gradient(135deg, rgba(99,102,241,1) 0%, rgba(16,185,129,1) 100%)",
                  color: "white",
                  cursor: busy || input.trim().length === 0 ? "not-allowed" : "pointer",
                }}
              >
                Send
              </button>
            </div>

            <div style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.5 }}>
              This is intentionally lightweight (no extra UI libs) to keep performance high. Next we’ll
              add a backend route so AI can generate insights from your saved entries.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const pillBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "9px 12px",
  borderRadius: 12,
  fontWeight: 800,
  fontSize: 13,
  textDecoration: "none",
  userSelect: "none",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "transparent",
  color: "white",
};

const pillGhost: React.CSSProperties = { ...pillBase, opacity: 0.9 };

const pillDanger: React.CSSProperties = {
  ...pillBase,
  background: "rgba(239,68,68,0.14)",
  border: "1px solid rgba(239,68,68,0.35)",
  color: "rgba(255,255,255,0.95)",
};

const badge: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.05)",
  fontSize: 12,
  fontWeight: 800,
};
