"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  buildTaskAutopilotSummary,
  type TaskSuggestion,
} from "@/lib/codexforge/task-autopilot";
import { codexForgeFileFixtures } from "@/lib/codexforge/files/file-fixtures";
import { buildMissionControlSummary } from "@/lib/codexforge/mission-control";
import {
  buildActivatedTaskPlan,
  buildTaskActivationHandoff,
  buildTaskActivationLedger,
  buildTaskActivationPolicy,
  buildTaskActivationRequest,
  buildTaskActivationState,
  isTaskActivationAllowed,
  reduceTaskActivationState,
  type TaskActivationState,
} from "@/lib/codexforge/task-activation";
import { TaskActivationHandoffPanel } from "./TaskActivationHandoffPanel";
import { TaskActivationLedgerPanel } from "./TaskActivationLedgerPanel";
import { TaskActivationPlanPreview } from "./TaskActivationPlanPreview";
import { TaskActivationPolicyPanel } from "./TaskActivationPolicyPanel";
import { TaskActivationRequestPanel } from "./TaskActivationRequestPanel";
import { TaskActivationReviewActions } from "./TaskActivationReviewActions";
import { TaskActivationSafetyNotice } from "./TaskActivationSafetyNotice";

export function TaskActivationPanel() {
  const bundle = useMemo(
    () =>
      buildTaskAutopilotSummary({
        selectedFile: codexForgeFileFixtures[0],
        missionControl: buildMissionControlSummary(),
        artifactHints: [
          {
            sourceType: "artifact-hint",
            sourceId: "reviewed-task-activation-artifact",
            title: "Activate reviewed task suggestions as visible plans",
            summary: "Accepted suggestions can become reviewed active plan previews without auto-run.",
            tags: ["reviewed-task-activation", "no-auto-run"],
            relatedArtifactIds: ["reviewed-task-activation-preview"],
            confidence: 0.72,
          },
        ],
      }),
    []
  );
  const [selectedId, setSelectedId] = useState(bundle.suggestions[0]?.id ?? "");
  const [approvalNote, setApprovalNote] = useState("");
  const [activationState, setActivationState] = useState<TaskActivationState>(() => buildTaskActivationState());
  const [copied, setCopied] = useState(false);

  const selectedSuggestion = bundle.suggestions.find((suggestion) => suggestion.id === selectedId) ?? bundle.suggestions[0] ?? null;
  const policy = activationState.policy ?? buildTaskActivationPolicy();
  const ledger = useMemo(
    () =>
      buildTaskActivationLedger({
        request: activationState.request,
        policy: activationState.policy,
        plan: activationState.plan,
        handoff: activationState.handoff,
        state: activationState,
      }),
    [activationState]
  );

  function buildReviewedSuggestion(reviewState: TaskSuggestion["reviewState"]): TaskSuggestion | null {
    if (!selectedSuggestion) return null;
    return {
      ...selectedSuggestion,
      reviewState,
      safeNextAction: reviewState === "blocked" ? "blocked" : selectedSuggestion.safeNextAction,
    };
  }

  function buildRequestFor(reviewState: TaskSuggestion["reviewState"], approved: boolean) {
    const suggestion = buildReviewedSuggestion(reviewState);
    if (!suggestion) return null;
    const request = buildTaskActivationRequest({
      suggestion,
      approved,
      approvalNote,
    });
    const nextPolicy = buildTaskActivationPolicy({ request });
    return { request, policy: nextPolicy };
  }

  function handleBuildRequest() {
    const built = buildRequestFor(selectedSuggestion?.reviewState ?? "needs-review", false);
    if (!built) return;
    setActivationState((current) =>
      reduceTaskActivationState(current, {
        type: "build-request",
        request: built.request,
        policy: built.policy,
      })
    );
    setCopied(false);
  }

  function handleApprove() {
    const built = buildRequestFor("accepted-for-planning", true);
    if (!built) return;
    setActivationState((current) => {
      const withRequest = reduceTaskActivationState(current, {
        type: "build-request",
        request: built.request,
        policy: built.policy,
      });
      return reduceTaskActivationState(withRequest, {
        type: "approve",
        approvalNote,
        request: built.request,
        policy: built.policy,
      });
    });
    setCopied(false);
  }

  function handleReject() {
    setActivationState((current) =>
      reduceTaskActivationState(current, {
        type: "reject",
        reason: "Suggestion rejected for reviewed activation.",
      })
    );
    setCopied(false);
  }

  function handleBlock() {
    const built = buildRequestFor("blocked", false);
    setActivationState((current) =>
      reduceTaskActivationState(
        built
          ? reduceTaskActivationState(current, {
              type: "build-request",
              request: built.request,
              policy: built.policy,
            })
          : current,
        {
          type: "block",
          reason: "Blocked suggestions cannot activate.",
          policy: built?.policy,
        }
      )
    );
    setCopied(false);
  }

  function handlePreviewPlan() {
    const request = activationState.request;
    const nextPolicy = activationState.policy;
    if (!request || !nextPolicy || !isTaskActivationAllowed(nextPolicy)) {
      setActivationState((current) =>
        reduceTaskActivationState(current, {
          type: "block",
          reason: "Activation policy blocks plan preview until review approval passes.",
          policy: nextPolicy ?? undefined,
        })
      );
      return;
    }

    const plan = buildActivatedTaskPlan({ request, policy: nextPolicy });
    setActivationState((current) =>
      reduceTaskActivationState(current, {
        type: "preview-plan",
        plan,
        policy: nextPolicy,
      })
    );
    setCopied(false);
  }

  function handlePrepareHandoff(futureActiveTaskSet = false) {
    const request = activationState.request;
    const nextPolicy = activationState.policy;
    const plan = activationState.plan;
    if (!request || !nextPolicy || !plan) return;
    const handoff = buildTaskActivationHandoff({ request, policy: nextPolicy, plan });
    setActivationState((current) =>
      reduceTaskActivationState(current, {
        type: "prepare-handoff",
        handoff,
        futureActiveTaskSet,
      })
    );
    setCopied(false);
  }

  function handleReset() {
    setActivationState((current) => reduceTaskActivationState(current, { type: "reset" }));
    setCopied(false);
  }

  function handleCopy() {
    const prompt = activationState.handoff?.prompt;
    if (!prompt || typeof navigator === "undefined") return;
    navigator.clipboard?.writeText(prompt).then(() => setCopied(true)).catch(() => setCopied(false));
  }

  return (
    <section style={page} data-codexforge-task-activation-panel="TaskActivationPanel renders Reviewed Task Activation">
      <div style={shell}>
        <section style={hero}>
          <div style={heroCopy}>
            <div style={eyebrow}>CodexForge Phase 23</div>
            <h1 style={headline}>Reviewed Task Activation</h1>
            <p style={lede}>
              Accepted suggestions can become activation requests, policy-reviewed active plan previews, and visible
              /ai handoffs. This is not autonomous execution and never mutates files from the task UI.
            </p>
          </div>
          <div style={stats}>
            <Stat label="Suggestions" value={String(bundle.suggestions.length)} />
            <Stat label="State" value={activationState.status} />
            <Stat label="Policy" value={policy.allowed ? "allowed" : "review"} />
            <Stat label="Run mode" value="no auto-run" />
          </div>
        </section>

        <TaskActivationSafetyNotice />

        <section style={layout}>
          <div style={mainColumn}>
            <section style={selectorPanel}>
              <div style={eyebrow}>Accepted suggestions</div>
              <h2 style={sectionHeading}>Select a reviewed suggestion</h2>
              <div style={suggestions}>
                {bundle.suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(suggestion.id);
                      setActivationState(buildTaskActivationState());
                      setCopied(false);
                    }}
                    style={suggestionButton(suggestion.id === selectedSuggestion?.id)}
                  >
                    <span style={pill}>{suggestion.kind}</span>
                    <strong style={suggestionTitle}>{suggestion.title}</strong>
                    <span style={body}>Review state: {suggestion.reviewState}</span>
                  </button>
                ))}
              </div>
            </section>
            <TaskActivationRequestPanel request={activationState.request} />
            <TaskActivationPlanPreview plan={activationState.plan} />
          </div>
          <aside style={sideColumn}>
            <TaskActivationReviewActions
              status={activationState.status}
              approvalNote={approvalNote}
              canPreview={!!activationState.request && policy.allowed}
              canHandoff={!!activationState.plan}
              canMarkFutureActive={!!activationState.handoff}
              onApprovalNoteChange={setApprovalNote}
              onBuildRequest={handleBuildRequest}
              onApprove={handleApprove}
              onReject={handleReject}
              onBlock={handleBlock}
              onPreviewPlan={handlePreviewPlan}
              onPrepareHandoff={() => handlePrepareHandoff(false)}
              onMarkFutureActive={() => handlePrepareHandoff(true)}
              onReset={handleReset}
            />
            <TaskActivationPolicyPanel policy={policy} />
            <TaskActivationHandoffPanel handoff={activationState.handoff} copied={copied} onCopy={handleCopy} />
            <TaskActivationLedgerPanel ledger={ledger} />
          </aside>
        </section>
      </div>
    </section>
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

function suggestionButton(selected: boolean): CSSProperties {
  return {
    textAlign: "left",
    color: "inherit",
    border: selected ? "1px solid rgba(45,212,191,0.54)" : "1px solid rgba(148,163,184,0.16)",
    background: selected ? "rgba(20,184,166,0.13)" : "rgba(2,6,23,0.48)",
    borderRadius: 8,
    padding: 12,
    display: "grid",
    gap: 7,
    minWidth: 0,
    cursor: "pointer",
  };
}

const page: CSSProperties = { color: "#f8fafc", background: "linear-gradient(180deg, #050814 0%, #020617 100%)", padding: "20px min(4vw, 44px) 36px", fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" };
const shell: CSSProperties = { maxWidth: 1580, margin: "0 auto", display: "grid", gap: 16, minWidth: 0 };
const hero: CSSProperties = { border: "1px solid rgba(45,212,191,0.20)", background: "linear-gradient(135deg, rgba(8,13,24,0.96), rgba(15,23,42,0.76))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(min(100%,420px),0.8fr)", gap: 16, alignItems: "center", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 9, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 38, lineHeight: 1.08, letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 940, overflowWrap: "anywhere" };
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 10 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 13, display: "grid", gap: 4, minWidth: 0 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 20, lineHeight: 1.1, overflowWrap: "anywhere" };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(min(100%,460px),0.85fr)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const selectorPanel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 10, minWidth: 0 };
const sectionHeading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const suggestions: CSSProperties = { display: "grid", gap: 9, minWidth: 0 };
const pill: CSSProperties = { color: "#bae6fd", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const suggestionTitle: CSSProperties = { fontSize: 13, lineHeight: 1.25, overflowWrap: "anywhere" };
const body: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
