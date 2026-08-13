"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  buildTaskAutopilotSummary,
  buildTaskHandoff,
  buildTaskPlanPreview,
  reduceTaskReviewQueue,
  type TaskAutopilotBundle,
  type TaskReviewActionType,
  type TaskReviewQueue,
} from "@/lib/codexforge/task-autopilot";
import { codexForgeFileFixtures } from "@/lib/codexforge/files/file-fixtures";
import { buildMissionControlSummary } from "@/lib/codexforge/mission-control";
import { TaskAutopilotSafetyNotice } from "./TaskAutopilotSafetyNotice";
import { TaskSignalPanel } from "./TaskSignalPanel";
import { TaskSuggestionQueue } from "./TaskSuggestionQueue";
import { TaskPriorityPanel } from "./TaskPriorityPanel";
import { TaskRiskPolicyPanel } from "./TaskRiskPolicyPanel";
import { TaskPlanPreviewPanel } from "./TaskPlanPreviewPanel";
import { TaskReviewActionsPanel } from "./TaskReviewActionsPanel";
import { TaskHandoffPanel } from "./TaskHandoffPanel";

export function TaskAutopilotPanel({ initialBundle }: { initialBundle?: TaskAutopilotBundle }) {
  const bundle = useMemo(
    () =>
      initialBundle ??
      buildTaskAutopilotSummary({
        selectedFile: codexForgeFileFixtures[0],
        missionControl: buildMissionControlSummary(),
        artifactHints: [
          {
            sourceType: "artifact-hint",
            sourceId: "task-autopilot-artifact-review",
            title: "Review artifact outputs before creating follow-up tasks",
            summary: "Artifact production hints can suggest review work, but handoff stays preview-only.",
            tags: ["artifact", "review-required"],
            relatedArtifactIds: ["artifact-review-preview"],
            confidence: 0.66,
          },
        ],
      }),
    [initialBundle]
  );
  const [selectedId, setSelectedId] = useState(bundle.suggestions[0]?.id ?? "");
  const [queue, setQueue] = useState<TaskReviewQueue>(bundle.queue);
  const [copied, setCopied] = useState(false);

  const selectedSuggestion = bundle.suggestions.find((suggestion) => suggestion.id === selectedId) ?? bundle.suggestions[0] ?? null;
  const selectedItem =
    queue.items.find((item) => item.suggestion.id === selectedSuggestion?.id) ?? queue.items[0] ?? null;
  const plan = selectedSuggestion ? selectedItem?.planPreview ?? buildTaskPlanPreview(selectedSuggestion) : null;
  const handoff = selectedSuggestion ? buildTaskHandoff(selectedSuggestion, plan) : null;

  function handleAction(type: TaskReviewActionType) {
    if (!selectedItem) return;
    setQueue((current) =>
      reduceTaskReviewQueue(current, {
        id: `task-review-action:${selectedItem.id}:${type}`,
        type,
        itemId: selectedItem.id,
        note: "Local review action only; no persistence write.",
      })
    );
    setCopied(false);
  }

  function handleCopy() {
    if (!handoff || typeof navigator === "undefined") return;
    navigator.clipboard?.writeText(handoff.prompt).then(() => setCopied(true)).catch(() => setCopied(false));
  }

  return (
    <main style={page} data-codexforge-task-autopilot="review required no auto-run no file mutation without preview inspect first memory as context, not proof">
      <div style={shell}>
        <section style={hero}>
          <div style={heroCopy}>
            <div style={eyebrow}>CodexForge Phase 22</div>
            <h1 style={headline}>Task Memory Autopilot</h1>
            <p style={lede}>
              Recalled memories, active context, file risks, and mission state now produce visible task suggestions,
              review queue actions, safe plan previews, and user-approved handoff prompts.
            </p>
          </div>
          <div style={stats}>
            <Stat label="Signals" value={String(bundle.signals.length)} />
            <Stat label="Suggestions" value={String(bundle.suggestions.length)} />
            <Stat label="Review" value="required" />
            <Stat label="Run mode" value="no auto-run" />
          </div>
        </section>

        <section style={navStrip}>
          <Link href="/jarvis" style={link}>Jarvis chat</Link>
          <Link href="/brain" style={link}>Brain memory</Link>
          <Link href="/files" style={link}>Files intelligence</Link>
          <Link href="/mission" style={link}>Mission Control</Link>
        </section>

        <TaskAutopilotSafetyNotice />

        <section style={layout}>
          <div style={mainColumn}>
            <TaskSignalPanel signals={bundle.signals} summary={bundle.signalSummary} />
            <TaskSuggestionQueue
              suggestions={bundle.suggestions}
              summary={bundle.suggestionSummary}
              selectedId={selectedSuggestion?.id ?? ""}
              onSelect={(id) => {
                setSelectedId(id);
                setCopied(false);
              }}
            />
            <TaskPlanPreviewPanel plan={plan} />
          </div>
          <aside style={sideColumn}>
            <TaskPriorityPanel suggestion={selectedSuggestion} />
            <TaskRiskPolicyPanel policy={bundle.policy} />
            <TaskReviewActionsPanel item={selectedItem} onAction={handleAction} />
            <TaskHandoffPanel handoff={handoff} copied={copied} onCopy={handleCopy} />
          </aside>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <strong style={statValue}>{value}</strong>
    </div>
  );
}

const page: CSSProperties = {
  minHeight: "100vh",
  color: "#f8fafc",
  background:
    "radial-gradient(760px 420px at 14% 0%, rgba(20,184,166,0.16), transparent 58%)," +
    "radial-gradient(720px 380px at 84% 8%, rgba(59,130,246,0.13), transparent 56%)," +
    "linear-gradient(180deg, #020617 0%, #050814 100%)",
  padding: "20px min(4vw, 44px) 32px",
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
};
const shell: CSSProperties = { maxWidth: 1580, margin: "0 auto", display: "grid", gap: 16, minWidth: 0 };
const hero: CSSProperties = { border: "1px solid rgba(45,212,191,0.20)", background: "linear-gradient(135deg, rgba(8,13,24,0.96), rgba(15,23,42,0.76))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(min(100%,420px),0.8fr)", gap: 16, alignItems: "center", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 9, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 40, lineHeight: 1.08, letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 940, overflowWrap: "anywhere" };
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 10 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 13, display: "grid", gap: 4, minWidth: 0 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 24, lineHeight: 1, overflowWrap: "anywhere" };
const navStrip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const link: CSSProperties = { color: "#dbeafe", border: "1px solid rgba(125,211,252,0.18)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: "8px 10px", textDecoration: "none", fontSize: 12, fontWeight: 850 };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(min(100%,440px),0.85fr)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
