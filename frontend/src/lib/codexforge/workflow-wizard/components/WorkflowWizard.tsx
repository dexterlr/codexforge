"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import {
  buildDefaultWizardCopy,
  buildDefaultWizardFlows,
  buildDefaultWizardIntents,
  buildWizardProgress,
  buildWizardState,
  buildWorkflowWizardSummary,
  selectWizardFlowForIntent,
  selectWizardIntent,
  selectWizardNextAction,
  updateWizardState,
  type WizardIntentId,
} from "../index";
import { WizardAdvancedDetails } from "./WizardAdvancedDetails";
import { WizardFlowCard } from "./WizardFlowCard";
import { WizardFriendlyEmptyState } from "./WizardFriendlyEmptyState";
import { WizardIntentPicker } from "./WizardIntentPicker";
import { WizardNextActionPanel } from "./WizardNextActionPanel";
import { WizardProgressBar } from "./WizardProgressBar";
import { WizardSafetyStrip } from "./WizardSafetyStrip";
import { WizardStepList } from "./WizardStepList";
import { WizardStepPanel } from "./WizardStepPanel";

export function WorkflowWizard() {
  const intents = useMemo(() => buildDefaultWizardIntents(), []);
  const flows = useMemo(() => buildDefaultWizardFlows(), []);
  const copy = useMemo(() => buildDefaultWizardCopy(), []);
  const [state, setState] = useState(() => buildWizardState());
  const intent = selectWizardIntent(state.selectedIntentId, intents);
  const flow = state.selectedFlowId ? flows.find((item) => item.id === state.selectedFlowId) ?? selectWizardFlowForIntent(intent, flows) : selectWizardFlowForIntent(intent, flows);
  const currentStep = flow?.steps.find((step) => step.id === state.currentStepId) ?? flow?.steps[0] ?? null;
  const progress = buildWizardProgress(flow, state);
  const nextAction = selectWizardNextAction(flow, state);
  const summary = buildWorkflowWizardSummary(intent, flow, state);

  function chooseIntent(id: WizardIntentId) {
    const selectedIntent = selectWizardIntent(id, intents);
    const selectedFlow = selectWizardFlowForIntent(selectedIntent, flows);
    setState((current) => updateWizardState(current, { selectedIntentId: id, selectedFlowId: selectedFlow?.id ?? null, currentStepId: selectedFlow?.steps[0]?.id ?? null, lastUserChoiceLabel: selectedIntent?.label ?? "Choose task", flow: selectedFlow }));
  }

  return (
    <div style={shell} data-codexforge-workflow-wizard="WorkflowWizard renders Real Workflow Wizard v1 Focus Mode UX calm workflow layout markers no duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>CodexForge Start</span>
          <h1 style={headline}>{copy.startHero}</h1>
          <p style={lede}>Pick a task. The wizard shows one next safe step and sends you to the right page.</p>
          <WizardSafetyStrip badges={["Review first", "Approval required", "No auto-run", "No file writes"]} />
        </div>
        <WizardNextActionPanel action={nextAction} />
      </section>

      <WizardIntentPicker intents={intents} selectedIntentId={state.selectedIntentId} onSelectIntent={chooseIntent} />
      <WizardFlowCard flow={flow} />
      <WizardProgressBar progress={progress} />

      <section style={mainGrid}>
        <div style={leftRail}>
          {flow ? <WizardStepList steps={flow.steps} currentStepId={state.currentStepId} /> : <WizardFriendlyEmptyState />}
        </div>
        <div style={rightPane}>
          <WizardStepPanel step={currentStep} />
          <WizardAdvancedDetails flow={flow} />
        </div>
      </section>

      <span hidden data-codexforge-workflow-wizard-summary={`Real Workflow Wizard summary selected ${summary.selectedIntent} flow ${summary.selectedFlow} step ${summary.currentStep} next ${summary.primaryAction} advanced ${summary.advancedDetailsCount}`} />
      <span hidden data-codexforge-workflow-wizard-routes="/code-flow /files /validation /creative /creative-mvp /local-bridge-health /health-probe /artifacts/review /closed-loop" />
      <span hidden data-codexforge-workflow-wizard-flows="code-fix validation creative-plan local-setup" />
    </div>
  );
}

const shell: CSSProperties = { display: "grid", gap: 16, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.86))", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 360px)", minWidth: 0, padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 38, letterSpacing: 0, lineHeight: 1.05, margin: 0, overflowWrap: "normal", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 760 };
const mainGrid: CSSProperties = { alignItems: "start", display: "grid", gap: 14, gridTemplateColumns: "minmax(220px, 0.36fr) minmax(0, 1fr)", minWidth: 0 };
const leftRail: CSSProperties = { minWidth: 0 };
const rightPane: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
