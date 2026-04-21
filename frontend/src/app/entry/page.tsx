"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { addEntry, type CodexForgeActivityEntry } from "@/lib/storage";

type LaunchMode = "plan" | "debug" | "research" | "build";

const STORAGE = {
  draft: "codexforge_ai_draft_v11",
} as const;

function safeWriteString(key: string, value: string) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

function safeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function dedupeTags(raw: string): string[] | undefined {
  const tags = Array.from(
    new Set(
      raw
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );

  return tags.length > 0 ? tags : undefined;
}

function toCategory(mode: LaunchMode): CodexForgeActivityEntry["category"] {
  switch (mode) {
    case "plan":
      return "plan";
    case "debug":
      return "task";
    case "research":
      return "research";
    case "build":
      return "execution";
    default:
      return "note";
  }
}

function toStatus(mode: LaunchMode): CodexForgeActivityEntry["status"] {
  switch (mode) {
    case "plan":
    case "research":
      return "idea";
    case "debug":
    case "build":
      return "active";
    default:
      return "idea";
  }
}

function buildPrompt(
  mode: LaunchMode,
  title: string,
  goal: string,
  repoPath: string,
  notes: string,
  tags: string
) {
  const header =
    mode === "plan"
      ? "Help me plan this CodexForge task."
      : mode === "debug"
        ? "Help me debug this CodexForge problem."
        : mode === "research"
          ? "Help me research this CodexForge topic."
          : "Help me build this in CodexForge.";

  return [
    header,
    "",
    title.trim() ? `Title: ${title.trim()}` : "",
    goal.trim() ? `Goal: ${goal.trim()}` : "",
    repoPath.trim() ? `Repo path: ${repoPath.trim()}` : "",
    tags.trim() ? `Tags: ${tags.trim()}` : "",
    notes.trim() ? `Notes:\n${notes.trim()}` : "",
    "",
    "Respond with a structured CodexForge plan including goal, files, risks, and next action.",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildActivityEntry(
  mode: LaunchMode,
  title: string,
  goal: string,
  repoPath: string,
  notes: string,
  tags: string
): CodexForgeActivityEntry {
  const cleanTitle =
    title.trim() ||
    (mode === "plan"
      ? "New planning task"
      : mode === "debug"
        ? "New debug task"
        : mode === "research"
          ? "New research task"
          : "New build task");

  const cleanGoal = goal.trim();
  const cleanNotes = notes.trim();
  const cleanRepoPath = repoPath.trim();
  const tagList = dedupeTags(tags);

  return {
    id: safeId(),
    date: todayISO(),
    title: cleanTitle,
    summary: cleanGoal,
    category: toCategory(mode),
    status: toStatus(mode),
    tags: dedupeTags(
      [tags, mode, "codexforge", cleanRepoPath ? "repo" : ""]
        .filter(Boolean)
        .join(", ")
    ),
    notes: [
      cleanRepoPath ? `Repo path: ${cleanRepoPath}` : "",
      cleanNotes ? cleanNotes : "",
    ]
      .filter(Boolean)
      .join("\n\n") || undefined,
  };
}

export default function EntryPage() {
  const router = useRouter();

  const [mode, setMode] = useState<LaunchMode>("plan");
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [repoPath, setRepoPath] = useState(
    "C:\\ai-lab\\projects\\openclaw-workspace\\repos\\health-tracker\\frontend"
  );
  const [tags, setTags] = useState("codexforge, workspace");
  const [notes, setNotes] = useState("");
  const [launching, setLaunching] = useState(false);

  const suggestions = useMemo(
    () => [
      {
        label: "Plan workspace shell",
        onClick: () => {
          setMode("plan");
          setTitle("CodexForge workspace shell");
          setGoal(
            "Design the main CodexForge shell so home, ai, history, and execution surfaces feel like one real product."
          );
          setTags("codexforge, app-shell, ux, navigation");
          setNotes("Focus on unifying /, /ai, /history, and quick-start surfaces.");
        },
      },
      {
        label: "Migrate old pages",
        onClick: () => {
          setMode("build");
          setTitle("Migrate remaining legacy pages");
          setGoal(
            "Replace remaining migration-era surfaces with proper CodexForge pages and remove leftover Health Tracker naming."
          );
          setTags("codexforge, migration, cleanup");
          setNotes(
            "History and entry should feel fully CodexForge-native, with legacy data only preserved as compatibility content."
          );
        },
      },
      {
        label: "Debug execution flow",
        onClick: () => {
          setMode("debug");
          setTitle("Execution flow validation");
          setGoal(
            "Check CodexForge engine start, approval flow, diff previews, and state transitions for edge cases."
          );
          setTags("codexforge, engine, execution, debug");
          setNotes("Focus on null safety, type stability, and UI consistency after approvals.");
        },
      },
      {
        label: "Research offline brain",
        onClick: () => {
          setMode("research");
          setTitle("Offline-first brain architecture");
          setGoal(
            "Research a local-first CodexForge brain with provider routing, fallback behavior, cache layers, and safe execution boundaries."
          );
          setTags("codexforge, research, local-first, ai");
          setNotes("Need a practical architecture, not generic AI product advice.");
        },
      },
    ],
    []
  );

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLaunching(true);

    const prompt = buildPrompt(mode, title, goal, repoPath, notes, tags);
    const activityEntry = buildActivityEntry(mode, title, goal, repoPath, notes, tags);

    safeWriteString(STORAGE.draft, prompt);
    addEntry(activityEntry);

    router.push("/ai");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 24,
        color: "white",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        background:
          "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.18), transparent 60%)," +
          "radial-gradient(900px 500px at 80% 20%, rgba(16,185,129,0.12), transparent 55%)," +
          "linear-gradient(180deg, #070A12 0%, #050710 100%)",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 18 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/" style={navLink}>
            ← Home
          </Link>
          <div style={{ opacity: 0.6 }}>•</div>
          <Link href="/ai" style={navLink}>
            AI workspace
          </Link>
          <div style={{ opacity: 0.6 }}>•</div>
          <Link href="/history" style={navLink}>
            Activity
          </Link>
        </div>

        <section style={heroCard}>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={eyebrow}>CodexForge quick start</div>
            <h1 style={titleStyle}>Launch work into the AI workspace</h1>
            <p style={subtitle}>
              This page is now a real CodexForge launch surface. Submitting here does two things:
              it saves a structured draft for <b>/ai</b> and also records a new activity item so
              the workspace history reflects what you started.
            </p>
          </div>

          <div style={suggestionGrid}>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.label}
                type="button"
                onClick={suggestion.onClick}
                style={suggestionCard}
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        </section>

        <form
          onSubmit={onSubmit}
          style={{
            padding: 18,
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(10px)",
            display: "grid",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            }}
          >
            <Field label="Mode">
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as LaunchMode)}
                style={input}
              >
                <option value="plan">Plan</option>
                <option value="build">Build</option>
                <option value="debug">Debug</option>
                <option value="research">Research</option>
              </select>
            </Field>

            <Field label="Title">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Short task title"
                style={input}
              />
            </Field>
          </div>

          <Field label="Goal">
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="What do you want CodexForge to help you accomplish?"
              style={{ ...input, minHeight: 120, resize: "vertical" }}
              required
            />
          </Field>

          <div
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            <Field label="Repo path">
              <input
                value={repoPath}
                onChange={(e) => setRepoPath(e.target.value)}
                placeholder="Active repo path"
                style={input}
              />
            </Field>

            <Field label="Tags">
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="codexforge, workspace, debug"
                style={input}
              />
            </Field>
          </div>

          <Field label="Extra notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Context, risks, files, constraints, or anything CodexForge should know"
              style={{ ...input, minHeight: 140, resize: "vertical" }}
            />
          </Field>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button type="submit" disabled={launching} style={btnPrimary}>
              {launching ? "Launching…" : "Open in AI workspace"}
            </button>

            <Link href="/ai" style={btnGhost}>
              Go to AI directly
            </Link>

            <Link href="/history" style={btnGhost}>
              View activity
            </Link>

            <div style={{ fontSize: 12, opacity: 0.72 }}>
              Saves the prepared prompt into local CodexForge draft storage, records a workspace activity item, then routes to /ai.
            </div>
          </div>
        </form>

        <section style={infoCard}>
          <div style={infoTitle}>What this page is for now</div>
          <div style={infoList}>
            <div style={infoItem}>• quick task launch into CodexForge chat</div>
            <div style={infoItem}>• lightweight project briefing without opening the full workspace first</div>
            <div style={infoItem}>• first-class activity creation for workspace history</div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field(props: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <div style={{ fontSize: 12, opacity: 0.8, fontWeight: 800 }}>{props.label}</div>
      {props.children}
    </label>
  );
}

const navLink: React.CSSProperties = {
  color: "rgba(255,255,255,0.88)",
  textDecoration: "none",
  fontWeight: 800,
};

const heroCard: React.CSSProperties = {
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.12)",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
  boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
  padding: 20,
  display: "grid",
  gap: 16,
};

const eyebrow: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: 1.2,
  textTransform: "uppercase",
  opacity: 0.72,
  fontWeight: 900,
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(30px, 4vw, 46px)",
  letterSpacing: -0.8,
};

const subtitle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.65,
  opacity: 0.88,
  maxWidth: 820,
};

const suggestionGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
};

const suggestionCard: React.CSSProperties = {
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
  textAlign: "left",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.25)",
  color: "white",
  outline: "none",
};

const btnPrimary: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "linear-gradient(135deg, rgba(99,102,241,1), rgba(16,185,129,1))",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
};

const btnGhost: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
};

const infoCard: React.CSSProperties = {
  padding: 18,
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 10,
};

const infoTitle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 16,
};

const infoList: React.CSSProperties = {
  display: "grid",
  gap: 6,
};

const infoItem: React.CSSProperties = {
  opacity: 0.85,
  lineHeight: 1.6,
};