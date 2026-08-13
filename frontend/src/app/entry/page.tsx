"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { createJarvisChatConversation } from "@/lib/codexforge/jarvis-chat/jarvis-chat-api-client";
import { JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS } from "@/lib/codexforge/jarvis-chat/jarvis-chat-policy";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import { addEntry, type CodexForgeActivityEntry } from "@/lib/storage";

type LaunchMode = "plan" | "debug" | "research" | "build";

type LaunchPreset = {
  id: string;
  label: string;
  description: string;
  mode: LaunchMode;
  title: string;
  goal: string;
  tags: string;
  notes: string;
};

type LaunchModeMeta = {
  label: string;
  description: string;
  promptInstruction: string;
  category: CodexForgeActivityEntry["category"];
  status: CodexForgeActivityEntry["status"];
  accent: string;
};

let fallbackIdCounter = 0;

const DEFAULT_REPO_PATH =
  "C:\\ai-lab\\projects\\openclaw-workspace\\repos\\codexforge\\frontend";

const MODE_META: Record<LaunchMode, LaunchModeMeta> = {
  plan: {
    label: "Plan",
    description:
      "Turn an idea into a structured goal, phased approach, target files, risks, and the next safe move.",
    promptInstruction:
      "Respond with a structured CodexForge plan including goal, files, risks, decisions, phased implementation path, and the next safe action.",
    category: "plan",
    status: "idea",
    accent: "rgba(99,102,241,0.22)",
  },
  debug: {
    label: "Debug",
    description:
      "Break down a problem into likely causes, inspection targets, checks, and the smallest safe fix path.",
    promptInstruction:
      "Respond with a structured debug plan including likely causes, files to inspect, validation steps, risks, and the smallest safe next action.",
    category: "task",
    status: "active",
    accent: "rgba(245,158,11,0.18)",
  },
  research: {
    label: "Research",
    description:
      "Frame unknowns, gather evidence, compare options, and produce a useful decision-ready research brief.",
    promptInstruction:
      "Respond with a structured research brief including key unknowns, evidence to gather, decision criteria, tradeoffs, risks, and recommended next action.",
    category: "research",
    status: "idea",
    accent: "rgba(16,185,129,0.18)",
  },
  build: {
    label: "Build",
    description:
      "Turn a task into implementation phases, file targets, execution order, approvals, and delivery steps.",
    promptInstruction:
      "Respond with a structured build plan including implementation phases, files, commands, risks, approvals, and the next safe action.",
    category: "execution",
    status: "active",
    accent: "rgba(236,72,153,0.16)",
  },
};

const PRESETS: readonly LaunchPreset[] = [
  {
    id: "workspace-shell",
    label: "Workspace shell",
    description: "Unify home, AI, history, brain, operator, and launch surfaces.",
    mode: "plan",
    title: "CodexForge workspace shell",
    goal:
      "Design the main CodexForge shell so home, ai, history, brain, entry, and operator surfaces feel like one real product.",
    tags: "codexforge, app-shell, ux, navigation, product",
    notes:
      "Focus on clear routing, shared product language, role separation between workspace and operator, and stronger first-time orientation.",
  },
  {
    id: "legacy-migration",
    label: "Migrate legacy pages",
    description: "Finish migration-era cleanup and remove remaining old framing.",
    mode: "build",
    title: "Migrate remaining legacy pages",
    goal:
      "Replace remaining migration-era surfaces with proper CodexForge pages and remove leftover legacy naming or framing.",
    tags: "codexforge, migration, cleanup, rename",
    notes:
      "History and entry should feel fully CodexForge-native, with legacy compatibility preserved only where still needed.",
  },
  {
    id: "execution-debug",
    label: "Debug execution flow",
    description: "Validate task steps, approvals, diffs, apply flow, and state transitions.",
    mode: "debug",
    title: "Execution flow validation",
    goal:
      "Check CodexForge engine start, approval flow, diff previews, apply/test transitions, and UI state handling for edge cases.",
    tags: "codexforge, engine, execution, debug, approvals",
    notes:
      "Focus on null safety, type stability, race conditions, approval transitions, and user-visible consistency after actions.",
  },
  {
    id: "offline-brain",
    label: "Offline-first brain",
    description: "Research practical local-first memory and provider-routing architecture.",
    mode: "research",
    title: "Offline-first brain architecture",
    goal:
      "Research a local-first CodexForge brain with provider routing, fallback behavior, cache layers, and safe execution boundaries.",
    tags: "codexforge, research, local-first, ai, memory",
    notes:
      "Need a practical architecture, not generic AI product advice. Include memory model, fallback rules, and operational constraints.",
  },
  {
    id: "video-pipeline",
    label: "Video generation system",
    description: "Set up the future Jarvis-style creative pipeline direction.",
    mode: "plan",
    title: "AI video generation pipeline",
    goal:
      "Design a CodexForge-native pipeline for AI video generation covering concept, script, shots, assets, voice, music, render steps, review flow, and automation hooks.",
    tags: "codexforge, video, ai-generation, pipeline, jarvis",
    notes:
      "This should connect future Jarvis orchestration, generation tools, memory, task execution, and asset flow without turning the workspace into a raw tool dashboard.",
  },
  {
    id: "website-build",
    label: "Website build task",
    description: "Kick off a safe phased implementation plan for a site.",
    mode: "build",
    title: "Build website in CodexForge",
    goal:
      "Break a website build into safe implementation phases covering pages, data, styling, APIs, execution steps, and validation.",
    tags: "codexforge, website, build, implementation",
    notes:
      "Prefer a practical implementation plan with files, phases, risks, and the smallest useful next step.",
  },
] as const;

function safeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  fallbackIdCounter += 1;
  return `launch-${new Date().toISOString()}-${fallbackIdCounter}`;
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

function countMeaningfulWords(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function buildPrompt(
  mode: LaunchMode,
  title: string,
  goal: string,
  repoPath: string,
  notes: string,
  tags: string
) {
  const meta = MODE_META[mode];

  return [
    `Help me ${meta.label.toLowerCase()} this CodexForge task.`,
    "",
    `Mode: ${meta.label}`,
    title.trim() ? `Title: ${title.trim()}` : "",
    goal.trim() ? `Goal: ${goal.trim()}` : "",
    repoPath.trim() ? `Repo path: ${repoPath.trim()}` : "",
    tags.trim() ? `Tags: ${tags.trim()}` : "",
    notes.trim() ? `Notes:\n${notes.trim()}` : "",
    "",
    meta.promptInstruction,
    "Keep the response practical, structured, and oriented toward the next safe move inside CodexForge.",
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
  const meta = MODE_META[mode];
  const cleanTitle =
    title.trim() || `New ${meta.label.toLowerCase()} task`;
  const cleanGoal = goal.trim();
  const cleanNotes = notes.trim();
  const cleanRepoPath = repoPath.trim();

  return {
    id: safeId(),
    date: todayISO(),
    title: cleanTitle,
    summary: cleanGoal,
    category: meta.category,
    status: meta.status,
    tags: dedupeTags(
      [
        tags,
        mode,
        "codexforge",
        cleanRepoPath ? "repo" : "",
        "launch",
      ]
        .filter(Boolean)
        .join(", ")
    ),
    notes:
      [
        cleanRepoPath ? `Repo path: ${cleanRepoPath}` : "",
        cleanNotes || "",
      ]
        .filter(Boolean)
        .join("\n\n") || undefined,
  };
}

function getModePillStyle(mode: LaunchMode): React.CSSProperties {
  return {
    ...modeBadge,
    background: MODE_META[mode].accent,
    border: "1px solid rgba(255,255,255,0.16)",
  };
}

export default function EntryPage() {
  const router = useRouter();

  const [mode, setMode] = useState<LaunchMode>("plan");
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [repoPath, setRepoPath] = useState(DEFAULT_REPO_PATH);
  const [tags, setTags] = useState("codexforge, workspace");
  const [notes, setNotes] = useState("");
  const [launching, setLaunching] = useState(false);
  const [launchError, setLaunchError] = useState<string | null>(null);
  const [submittedPrompt, setSubmittedPrompt] = useState<string | null>(null);

  const modeMeta = MODE_META[mode];

  const promptPreview = useMemo(
    () => buildPrompt(mode, title, goal, repoPath, notes, tags),
    [mode, title, goal, repoPath, notes, tags]
  );
  const visiblePromptPreview = submittedPrompt ?? promptPreview;

  const goalWordCount = useMemo(() => countMeaningfulWords(goal), [goal]);
  const noteWordCount = useMemo(() => countMeaningfulWords(notes), [notes]);
  const tagList = useMemo(() => dedupeTags(tags) ?? [], [tags]);
  const promptWithinLimit = promptPreview.length <= JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS;
  const isReady = goal.trim().length > 0 && promptWithinLimit;

  function applyPreset(preset: LaunchPreset) {
    setMode(preset.mode);
    setTitle(preset.title);
    setGoal(preset.goal);
    setTags(preset.tags);
    setNotes(preset.notes);
  }

  function resetForm() {
    setMode("plan");
    setTitle("");
    setGoal("");
    setRepoPath(DEFAULT_REPO_PATH);
    setTags("codexforge, workspace");
    setNotes("");
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!goal.trim()) {
      return;
    }

    setLaunching(true);
    setLaunchError(null);

    const prompt = buildPrompt(mode, title, goal, repoPath, notes, tags);
    const activityEntry = buildActivityEntry(mode, title, goal, repoPath, notes, tags);
    setSubmittedPrompt(prompt);

    try {
      await createJarvisChatConversation({ message: prompt });
      try {
        addEntry(activityEntry);
      } catch {
        // The canonical server chat succeeded; local activity history is best-effort only.
      }
      router.push("/jarvis");
    } catch (error) {
      setLaunchError(error instanceof Error ? error.message : "Jarvis could not create this chat safely.");
      setSubmittedPrompt(null);
      setLaunching(false);
    }
  }

  return (
    <main style={page}>
      <div style={shell}>
        <CodexForgeGlobalNav compact />

        <section style={heroCard}>
          <div style={heroGrid}>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={eyebrow}>CodexForge quick launch</div>
              <h1 style={titleStyle}>Turn intent into a structured workspace task</h1>
              <p style={subtitle}>
                This page is a visible handoff into <b>/jarvis</b>. It creates one bounded
                local chat from the preview below, then makes a best-effort local activity
                update without affecting chat creation. Approval and execution stay with you.
              </p>

              <div style={heroActionRow}>
                <Link href="/jarvis" style={heroPrimaryAction}>
                  Open Jarvis directly
                </Link>
                <Link href="/clawd" style={heroGhostAction}>
                  Operator surface
                </Link>
                <Link href="/brain" style={heroGhostAction}>
                  Brain graph
                </Link>
              </div>

              <div style={heroMetaGrid}>
                <div style={metaCard}>
                  <div style={metaLabel}>Primary destination</div>
                  <div style={metaValue}>/jarvis chat</div>
                </div>
                <div style={metaCard}>
                  <div style={metaLabel}>Best for</div>
                  <div style={metaValue}>Fast plan, build, debug, and research launches</div>
                </div>
                <div style={metaCard}>
                  <div style={metaLabel}>Also updates</div>
                  <div style={metaValue}>Activity history when browser storage is available</div>
                </div>
              </div>
            </div>

            <div style={heroSideCard}>
              <div style={heroSideTitle}>Current launch mode</div>
              <div style={getModePillStyle(mode)}>{modeMeta.label}</div>
              <div style={heroSideText}>{modeMeta.description}</div>

              <div style={heroSideStats}>
                <StatCard label="Goal words" value={goalWordCount} />
                <StatCard label="Tags" value={tagList.length} />
                <StatCard label="Notes words" value={noteWordCount} />
                <StatCard label="Ready" value={isReady ? "Yes" : "No"} />
              </div>

              <div style={heroSideHint}>
                Use this page when you want CodexForge to start from a clean, structured brief
                instead of an empty conversation.
              </div>
            </div>
          </div>
        </section>

        <section style={presetSection}>
          <div style={sectionHeader}>
            <div>
              <div style={sectionEyebrow}>Preset launches</div>
              <div style={sectionTitle}>Start from a real task shape</div>
            </div>
          </div>

          <div style={presetGrid}>
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                disabled={launching}
                aria-describedby={launching ? "codexforge-entry-launch-explanation" : undefined}
                style={presetCard}
              >
                <div style={presetTopRow}>
                  <div style={presetLabel}>{preset.label}</div>
                  <div style={presetMode}>{MODE_META[preset.mode].label}</div>
                </div>
                <div style={presetDescription}>{preset.description}</div>
              </button>
            ))}
          </div>
        </section>

        <form onSubmit={onSubmit} style={formCard}>
          <div style={formHeader}>
            <div>
              <div style={sectionEyebrow}>Launch form</div>
              <div style={sectionTitle}>Prepare the task</div>
            </div>

            <div style={getModePillStyle(mode)}>Mode: {modeMeta.label}</div>
          </div>

          <div style={responsiveGridTwo}>
            <Field label="Mode">
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as LaunchMode)}
                disabled={launching}
                aria-describedby={launching ? "codexforge-entry-launch-explanation" : undefined}
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
                disabled={launching}
                aria-describedby={launching ? "codexforge-entry-launch-explanation" : undefined}
                placeholder="Short task title"
                style={input}
              />
            </Field>
          </div>

          <Field label="Goal">
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              disabled={launching}
              aria-describedby={launching ? "codexforge-entry-launch-explanation" : undefined}
              placeholder="What do you want CodexForge to help you accomplish?"
              style={{ ...input, minHeight: 130, resize: "vertical" }}
              required
            />
          </Field>

          <div style={responsiveGridWide}>
            <Field label="Repo path">
              <input
                value={repoPath}
                onChange={(e) => setRepoPath(e.target.value)}
                disabled={launching}
                aria-describedby={launching ? "codexforge-entry-launch-explanation" : undefined}
                placeholder="Active repo path"
                style={input}
              />
            </Field>

            <Field label="Tags">
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                disabled={launching}
                aria-describedby={launching ? "codexforge-entry-launch-explanation" : undefined}
                placeholder="codexforge, workspace, debug"
                style={input}
              />
            </Field>
          </div>

          <Field label="Extra notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={launching}
              aria-describedby={launching ? "codexforge-entry-launch-explanation" : undefined}
              placeholder="Context, files, constraints, risks, approvals, desired output, or anything CodexForge should know"
              style={{ ...input, minHeight: 150, resize: "vertical" }}
            />
          </Field>

          <div style={launchChecklist}>
            <div style={checklistTitle}>What gets created on launch</div>
            <div style={checklistGrid}>
              <div style={checkItem}>- One bounded local Jarvis chat</div>
              <div style={checkItem}>- Best-effort activity entry when browser storage is available</div>
              <div style={checkItem}>- Visible handoff into /jarvis</div>
              <div style={checkItem}>- No hidden context, approval, or execution</div>
            </div>
          </div>

          <div id="codexforge-entry-launch-explanation" style={footnote}>
            {launching
              ? "Jarvis is creating this exact local chat."
              : !goal.trim()
                ? "Add a goal before creating the Jarvis chat."
                : !promptWithinLimit
                  ? `Shorten the preview to ${JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS} characters or fewer.`
                  : `The visible preview is ready (${promptPreview.length}/${JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS} characters).`}
          </div>

          {launchError ? <p role="alert" style={footnote}>{launchError}</p> : null}

          <div style={actionRow}>
            <button
              type="submit"
              disabled={launching || !isReady}
              aria-describedby={launching || !isReady ? "codexforge-entry-launch-explanation" : undefined}
              style={btnPrimary}
            >
              {launching ? "Creating local chat..." : "Create chat in Jarvis"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={launching}
              aria-describedby={launching ? "codexforge-entry-launch-explanation" : undefined}
              style={btnGhostButton}
            >
              Reset form
            </button>

            <Link href="/jarvis" style={btnGhost}>
              Go to Jarvis directly
            </Link>

            <Link href="/clawd" style={btnGhost}>
              Open operator
            </Link>

            <Link href="/history" style={btnGhost}>
              View activity
            </Link>
          </div>

          <div style={footnote}>
            Creates the exact visible prompt as a bounded local Jarvis chat, attempts a
            best-effort browser-local activity update, then routes to <b>/jarvis</b>. A
            blocked activity update never changes the chat result. Nothing is approved or
            executed automatically.
          </div>
        </form>

        <section style={previewCard}>
          <div style={sectionHeader}>
            <div>
              <div style={sectionEyebrow}>Prompt preview</div>
              <div style={sectionTitle}>What will be sent into the workspace</div>
            </div>
          </div>

          <pre style={previewBox}>{visiblePromptPreview}</pre>
        </section>

        <section style={infoGrid}>
          <div style={infoCard}>
            <div style={infoTitle}>Use this page when</div>
            <div style={infoList}>
              <div style={infoItem}>- you want a fast structured launch into chat</div>
              <div style={infoItem}>- you want a best-effort browser-local activity record</div>
              <div style={infoItem}>- you want CodexForge briefed before entering the full workspace</div>
              <div style={infoItem}>- you are starting a future Jarvis-style workflow from intent</div>
            </div>
          </div>

          <div style={infoCard}>
            <div style={infoTitle}>Use other pages when</div>
            <div style={infoList}>
              <div style={infoItem}>- go to <b>/jarvis</b> for the canonical chat</div>
              <div style={infoItem}>- go to <b>/clawd</b> for approvals, diffs, apply, tests, and checkpoints</div>
              <div style={infoItem}>- go to <b>/brain</b> to inspect graph memory state</div>
              <div style={infoItem}>- go to <b>/history</b> to review launches and workspace activity</div>
            </div>
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

function StatCard(props: { label: string; value: string | number }) {
  return (
    <div style={statCard}>
      <div style={statCardLabel}>{props.label}</div>
      <div style={statCardValue}>{props.value}</div>
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  padding: "clamp(16px, 4vw, 32px)",
  color: "white",
  fontFamily:
    'var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  background:
    "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.18), transparent 60%)," +
    "radial-gradient(900px 500px at 80% 20%, rgba(16,185,129,0.12), transparent 55%)," +
    "linear-gradient(180deg, #070A12 0%, #050710 100%)",
};

const shell: React.CSSProperties = {
  maxWidth: 1160,
  margin: "0 auto",
  display: "grid",
  gap: 18,
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

const heroGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.25fr) minmax(280px, 0.75fr)",
  gap: 16,
  alignItems: "start",
};

const heroActionRow: React.CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const heroPrimaryAction: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "linear-gradient(135deg, rgba(99,102,241,1), rgba(16,185,129,1))",
  color: "white",
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
};

const heroGhostAction: React.CSSProperties = {
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

const eyebrow: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: 1.2,
  textTransform: "uppercase",
  opacity: 0.72,
  fontWeight: 900,
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(32px, 4vw, 48px)",
  letterSpacing: -0.9,
  lineHeight: 1.02,
};

const subtitle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.7,
  opacity: 0.88,
  maxWidth: 860,
};

const heroSideCard: React.CSSProperties = {
  padding: 16,
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 12,
};

const heroSideTitle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  opacity: 0.84,
};

const heroSideText: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  opacity: 0.84,
};

const heroSideStats: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 10,
};

const heroSideHint: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.6,
  opacity: 0.76,
};

const heroMetaGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
};

const metaCard: React.CSSProperties = {
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 6,
};

const metaLabel: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.72,
  fontWeight: 900,
};

const metaValue: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 800,
  lineHeight: 1.45,
};

const presetSection: React.CSSProperties = {
  padding: 18,
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 14,
};

const sectionHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "flex-start",
  flexWrap: "wrap",
};

const sectionEyebrow: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  opacity: 0.72,
  fontWeight: 900,
};

const sectionTitle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 900,
  marginTop: 4,
};

const presetGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
};

const presetCard: React.CSSProperties = {
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "white",
  cursor: "pointer",
  textAlign: "left",
  display: "grid",
  gap: 8,
};

const presetTopRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "center",
};

const presetLabel: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 14,
};

const presetMode: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  opacity: 0.8,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const presetDescription: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.55,
  opacity: 0.82,
};

const formCard: React.CSSProperties = {
  padding: 18,
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(10px)",
  display: "grid",
  gap: 14,
};

const formHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
  flexWrap: "wrap",
};

const modeBadge: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 900,
};

const responsiveGridTwo: React.CSSProperties = {
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
};

const responsiveGridWide: React.CSSProperties = {
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
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

const launchChecklist: React.CSSProperties = {
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.03)",
  display: "grid",
  gap: 10,
};

const checklistTitle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 14,
};

const checklistGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 8,
};

const checkItem: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.55,
  opacity: 0.84,
};

const actionRow: React.CSSProperties = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  alignItems: "center",
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

const btnGhostButton: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
};

const footnote: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.74,
  lineHeight: 1.6,
};

const previewCard: React.CSSProperties = {
  padding: 18,
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 14,
};

const previewBox: React.CSSProperties = {
  margin: 0,
  padding: 14,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.22)",
  color: "rgba(255,255,255,0.92)",
  whiteSpace: "pre-wrap",
  fontSize: 12,
  lineHeight: 1.55,
};

const infoGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 14,
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

const statCard: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  display: "grid",
  gap: 4,
};

const statCardLabel: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.72,
  fontWeight: 900,
};

const statCardValue: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
};
