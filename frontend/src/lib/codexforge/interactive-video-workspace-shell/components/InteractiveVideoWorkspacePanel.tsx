"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  APPROVAL_CHECKS,
  ASSET_CHECKLIST_ITEMS,
  AUDIENCE_CHOICES,
  AUDIO_PLANNER_ROWS,
  BACKEND_WIRING_REQUIREMENTS,
  BLOCKED_BACKEND_ACTIONS,
  BRAND_GUARD_ITEMS,
  CAPTION_PLANNER_ROWS,
  FAKE_JOB_TIMELINE_EVENTS,
  FORMAT_CHOICES,
  OUTCOME_CHOICES,
  PLATFORM_INTENT_CHOICES,
  PROJECT_BRIEF_FIELDS,
  READINESS_GATES,
  RIGHTS_CONSENT_CHECKS,
  SCRIPT_SECTIONS,
  SHOT_PLANNER_ROWS,
  STORYBOARD_SCENES,
  buildInteractiveVideoWorkspaceModel,
  buildInteractiveVideoWorkspaceStableKey,
  type InteractiveBriefField,
  type InteractiveCheckItem,
  type InteractiveChoice,
  type InteractivePlannerRow,
  type InteractiveScriptSection,
  type InteractiveVideoWorkspaceRouteSlug,
} from "../interactive-video-workspace-model";

type ToggleMap = Record<string, boolean>;
type TextMap = Record<string, string>;

export function InteractiveVideoWorkspacePageClientShell({ routeSlug }: { routeSlug: InteractiveVideoWorkspaceRouteSlug }) {
  const model = buildInteractiveVideoWorkspaceModel(routeSlug);
  return (
    <CodexForgeAppShell
      activePath={model.route.href}
      workspaceLabel={model.route.title}
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <InteractiveVideoWorkspaceRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function InteractiveVideoWorkspaceCockpitPanel() {
  return <InteractiveVideoWorkspaceRoutePanel routeSlug="cockpit-interactive-video-workspace-summary" embedded />;
}

export function InteractiveVideoWorkspaceRoutePanel({ routeSlug, embedded = false }: { routeSlug: InteractiveVideoWorkspaceRouteSlug; embedded?: boolean }) {
  const model = buildInteractiveVideoWorkspaceModel(routeSlug);
  return (
    <section
      style={embedded ? cockpitPage : page}
      data-codexforge-interactive-video-workspace={model.safetyMarkers.join(" | ")}
      data-codexforge-interactive-video-workspace-route={model.route.markerPhrases.join(" | ")}
    >
      <WorkspaceHero routeSlug={routeSlug} embedded={embedded} />
      <InteractiveVideoWorkspaceExperience routeSlug={routeSlug} embedded={embedded} />
    </section>
  );
}

function WorkspaceHero({ routeSlug, embedded }: { routeSlug: InteractiveVideoWorkspaceRouteSlug; embedded: boolean }) {
  const model = buildInteractiveVideoWorkspaceModel(routeSlug);
  return (
    <header style={hero}>
      <div style={eyebrowRow}>
        <span style={phaseBadge}>{embedded ? "Interactive Video Workspace" : model.route.phase}</span>
        <span style={surfaceBadge}>{embedded ? "Normal user cockpit" : "Phase diagnostic"}</span>
        <span style={blockedBadge}>Backend wiring required</span>
      </div>
      {embedded ? <h2 style={titleStyle}>Interactive Video Workspace</h2> : <h1 style={titleStyle}>{model.route.title}</h1>}
      <p style={summaryText}>
        {model.route.summary} Local React state only. Synthetic data only. No backend execution, frontend
        persistence, browser storage writes, provider calls, model calls, connector calls, prompt sending, upload,
        download, render, export, publish, schedule, command execution, service creation, or API creation.
      </p>
      <section style={markerBand} aria-label="Interactive video workspace safety markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span key={buildInteractiveVideoWorkspaceStableKey(["route-marker", model.route.slug, String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </section>
    </header>
  );
}

function InteractiveVideoWorkspaceExperience({ routeSlug, embedded }: { routeSlug: InteractiveVideoWorkspaceRouteSlug; embedded: boolean }) {
  const model = buildInteractiveVideoWorkspaceModel(routeSlug);
  const seededChecked = model.route.stateTone === "approved" || model.route.stateTone === "candidate";
  const [briefValues, setBriefValues] = useState<TextMap>(() => makeBriefState(model.route.stateTone === "empty"));
  const [selectedAudience, setSelectedAudience] = useState(AUDIENCE_CHOICES[0].id);
  const [selectedOutcome, setSelectedOutcome] = useState(OUTCOME_CHOICES[0].id);
  const [selectedFormat, setSelectedFormat] = useState(FORMAT_CHOICES[0].id);
  const [selectedPlatformIntent, setSelectedPlatformIntent] = useState(PLATFORM_INTENT_CHOICES[0].id);
  const [scriptDrafts, setScriptDrafts] = useState<TextMap>(() => makeScriptState(model.route.stateTone === "empty"));
  const [activeSceneId, setActiveSceneId] = useState(STORYBOARD_SCENES[0].id);
  const [sceneReady, setSceneReady] = useState<ToggleMap>(() => makeToggleState(STORYBOARD_SCENES.map((scene) => scene.id), seededChecked));
  const [shotReady, setShotReady] = useState<ToggleMap>(() => makeToggleState(SHOT_PLANNER_ROWS.map((shot) => shot.id), seededChecked));
  const [assetReady, setAssetReady] = useState<ToggleMap>(() => makeCheckState(ASSET_CHECKLIST_ITEMS, seededChecked));
  const [brandReady, setBrandReady] = useState<ToggleMap>(() => makeCheckState(BRAND_GUARD_ITEMS, seededChecked));
  const [rightsReady, setRightsReady] = useState<ToggleMap>(() => makeCheckState(RIGHTS_CONSENT_CHECKS, seededChecked));
  const [approvalReady, setApprovalReady] = useState<ToggleMap>(() => makeCheckState(APPROVAL_CHECKS, seededChecked));
  const [timelineIndex, setTimelineIndex] = useState(model.route.stateTone === "approved" ? 1 : 0);

  const readiness = useMemo(() => {
    const briefComplete = PROJECT_BRIEF_FIELDS.every((field) => briefValues[field.id]?.trim());
    const scriptComplete = SCRIPT_SECTIONS.every((section) => scriptDrafts[section.id]?.trim());
    const storyboardComplete = countReady(sceneReady).ready >= 3;
    const shotComplete = countReady(shotReady).ready >= 3;
    const assetComplete = countReady(assetReady).ready >= 3;
    const brandComplete = countReady(brandReady).ready >= 3;
    const rightsComplete = countReady(rightsReady).ready >= 4;
    const approvalComplete = countReady(approvalReady).ready >= 5;
    const gateMap: ToggleMap = {
      brief: Boolean(briefComplete && scriptComplete),
      storyboard: Boolean(storyboardComplete && shotComplete),
      assets: Boolean(assetComplete && brandComplete),
      audio: Boolean(scriptComplete),
      captions: Boolean(scriptComplete),
      rights: Boolean(rightsComplete),
      approval: Boolean(approvalComplete),
    };
    const ready = Object.values(gateMap).filter(Boolean).length;
    return { gateMap, ready, total: READINESS_GATES.length, percentage: Math.round((ready / READINESS_GATES.length) * 100) };
  }, [approvalReady, assetReady, brandReady, briefValues, rightsReady, sceneReady, scriptDrafts, shotReady]);

  const dirtyCount = useMemo(() => {
    const briefChanges = PROJECT_BRIEF_FIELDS.filter((field) => briefValues[field.id] !== field.seedValue).length;
    const scriptChanges = SCRIPT_SECTIONS.filter((section) => scriptDrafts[section.id] !== section.seedValue).length;
    return briefChanges + scriptChanges;
  }, [briefValues, scriptDrafts]);

  function updateBriefValue(fieldId: string, value: string) {
    setBriefValues((current) => ({ ...current, [fieldId]: value }));
  }

  function updateScriptDraft(sectionId: string, value: string) {
    setScriptDrafts((current) => ({ ...current, [sectionId]: value }));
  }

  function switchToggle(setter: (value: ToggleMap | ((current: ToggleMap) => ToggleMap)) => void, itemId: string) {
    setter((current: ToggleMap) => ({ ...current, [itemId]: !current[itemId] }));
  }

  function resetLocalPlan() {
    setBriefValues(makeBriefState(false));
    setScriptDrafts(makeScriptState(false));
    setSceneReady(makeToggleState(STORYBOARD_SCENES.map((scene) => scene.id), false));
    setShotReady(makeToggleState(SHOT_PLANNER_ROWS.map((shot) => shot.id), false));
    setAssetReady(makeCheckState(ASSET_CHECKLIST_ITEMS, false));
    setBrandReady(makeCheckState(BRAND_GUARD_ITEMS, false));
    setRightsReady(makeCheckState(RIGHTS_CONSENT_CHECKS, false));
    setApprovalReady(makeCheckState(APPROVAL_CHECKS, false));
    setTimelineIndex(0);
  }

  const activeScene = STORYBOARD_SCENES.find((scene) => scene.id === activeSceneId) ?? STORYBOARD_SCENES[0];

  return (
    <div style={experienceStack}>
      <section style={workspaceTopGrid} aria-label="Interactive workspace cockpit summary">
        <article style={productPanel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Project setup</p>
              <h3 style={panelTitle}>Project Brief Editor Mock</h3>
            </div>
            <span style={stateBadge}>{dirtyCount > 0 ? "Local edits" : "Seeded mock"}</span>
          </div>
          <div style={briefGrid}>
            {PROJECT_BRIEF_FIELDS.map((field) => (
              <BriefField
                key={buildInteractiveVideoWorkspaceStableKey(["brief", field.id])}
                field={field}
                value={briefValues[field.id] ?? ""}
                onValue={updateBriefValue}
              />
            ))}
          </div>
        </article>

        <article style={productPanel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Audience and outcome</p>
              <h3 style={panelTitle}>Audience Outcome Selector Mock</h3>
            </div>
            <span style={stateBadge}>Local React state only</span>
          </div>
          <SelectorBlock title="Audience" choices={AUDIENCE_CHOICES} value={selectedAudience} onValue={setSelectedAudience} />
          <SelectorBlock title="Outcome" choices={OUTCOME_CHOICES} value={selectedOutcome} onValue={setSelectedOutcome} />
          <SelectorBlock title="Format" choices={FORMAT_CHOICES} value={selectedFormat} onValue={setSelectedFormat} />
          <SelectorBlock title="Platform intent" choices={PLATFORM_INTENT_CHOICES} value={selectedPlatformIntent} onValue={setSelectedPlatformIntent} />
          <p style={bodyText}>
            Visible planning summary updates locally: {labelFor(AUDIENCE_CHOICES, selectedAudience)} / {labelFor(OUTCOME_CHOICES, selectedOutcome)} / {labelFor(FORMAT_CHOICES, selectedFormat)} / {labelFor(PLATFORM_INTENT_CHOICES, selectedPlatformIntent)}. Backend wiring required before persistence or protected actions.
          </p>
        </article>
      </section>

      {model.route.focusSection === "empty" ? <EmptyStateCard /> : null}
      {model.route.focusSection === "dirty" || dirtyCount > 0 ? <DirtyStateCard dirtyCount={dirtyCount} onReset={resetLocalPlan} /> : null}
      {model.route.focusSection === "actions" ? <BlockedStateCard /> : null}

      <section style={workspaceGrid} aria-label="Script storyboard and shot planning">
        <article style={productPanel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Script outline</p>
              <h3 style={panelTitle}>Script Outline Editor Mock</h3>
            </div>
            <span style={stateBadge}>Generation blocked</span>
          </div>
          <div style={scriptGrid}>
            {SCRIPT_SECTIONS.map((section) => (
              <ScriptSectionEditor
                key={buildInteractiveVideoWorkspaceStableKey(["script", section.id])}
                section={section}
                value={scriptDrafts[section.id] ?? ""}
                onValue={updateScriptDraft}
              />
            ))}
          </div>
        </article>

        <article style={productPanel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Storyboard</p>
              <h3 style={panelTitle}>Scene Storyboard Builder Mock</h3>
            </div>
            <span style={stateBadge}>{countReady(sceneReady).ready}/{STORYBOARD_SCENES.length} local ready</span>
          </div>
          <div style={sceneRail}>
            {STORYBOARD_SCENES.map((scene) => (
              <button
                key={buildInteractiveVideoWorkspaceStableKey(["scene-tab", scene.id])}
                type="button"
                style={scene.id === activeScene.id ? selectedSceneButton : sceneButton}
                onClick={() => setActiveSceneId(scene.id)}
              >
                {scene.label}
              </button>
            ))}
          </div>
          <div style={storyboardCard}>
            <div style={mockFrame}><span>{activeScene.label}</span></div>
            <p style={checkLabel}>{activeScene.visualIntent}</p>
            <p style={checkDetail}>Motion: {activeScene.motionNote}</p>
            <p style={checkDetail}>Asset placeholder: {activeScene.assetPlaceholder}</p>
            <p style={checkDetail}>Risk note: {activeScene.riskNote}</p>
            <button type="button" style={localButton} onClick={() => switchToggle(setSceneReady, activeScene.id)}>
              {sceneReady[activeScene.id] ? "Mark local scene not ready" : "Mark local scene ready"}
            </button>
          </div>
        </article>
      </section>

      <section style={workspaceGrid} aria-label="Shot and asset planning">
        <article style={productPanel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Shot list</p>
              <h3 style={panelTitle}>Shot List Planner Mock</h3>
            </div>
            <span style={stateBadge}>{countReady(shotReady).ready}/{SHOT_PLANNER_ROWS.length} local ready</span>
          </div>
          <div style={tableGrid}>
            {SHOT_PLANNER_ROWS.map((shot) => (
              <article key={buildInteractiveVideoWorkspaceStableKey(["shot", shot.id])} style={tableRow}>
                <button type="button" style={shotReady[shot.id] ? toggleOn : toggleOff} onClick={() => switchToggle(setShotReady, shot.id)}>
                  {shotReady[shot.id] ? "Ready" : "Needed"}
                </button>
                <div>
                  <p style={checkLabel}>{shot.shotType} / {shot.framing}</p>
                  <p style={checkDetail}>{shot.movement} / {shot.assetNeed} / {shot.duration}</p>
                  <p style={checkDetail}>{shot.dependencyState}</p>
                </div>
              </article>
            ))}
          </div>
        </article>

        <ChecklistPanel title="Asset Checklist Panel Mock" eyebrow="Assets" items={ASSET_CHECKLIST_ITEMS} state={assetReady} onToggle={(itemId) => switchToggle(setAssetReady, itemId)} />
      </section>

      <section style={workspaceGrid} aria-label="Audio captions and brand planning">
        <PlannerPanel title="Audio Voiceover Planner Mock" eyebrow="Audio" rows={AUDIO_PLANNER_ROWS} />
        <PlannerPanel title="Caption Accessibility Planner Mock" eyebrow="Captions" rows={CAPTION_PLANNER_ROWS} />
        <ChecklistPanel title="Brand Style Guard Panel Mock" eyebrow="Brand" items={BRAND_GUARD_ITEMS} state={brandReady} onToggle={(itemId) => switchToggle(setBrandReady, itemId)} />
      </section>

      <section style={workspaceGrid} aria-label="Rights approval and readiness">
        <ChecklistPanel title="Rights Consent Checklist Mock" eyebrow="Rights consent" items={RIGHTS_CONSENT_CHECKS} state={rightsReady} onToggle={(itemId) => switchToggle(setRightsReady, itemId)} />
        <ChecklistPanel title="Approval Gate Checklist Mock" eyebrow="Approval gate" items={APPROVAL_CHECKS} state={approvalReady} onToggle={(itemId) => switchToggle(setApprovalReady, itemId)} />
        <ReadinessPanel readiness={readiness} />
      </section>

      <section style={workspaceGrid} aria-label="Timeline blocked actions and backend preview">
        <TimelinePanel timelineIndex={timelineIndex} onSelect={setTimelineIndex} />
        <BlockedActionPanel />
        <BackendPreviewPanel />
      </section>

      <section style={contractPanel} aria-label="Interactive UX contract summary">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Interactive UX Contract Summary</p>
            <h3 style={panelTitle}>Clickable local-state UX, not backend wired</h3>
          </div>
          <span style={stateBadge}>Operator review required</span>
        </div>
        <p style={bodyText}>
          Project setup, script, storyboard, shot planning, asset checklist, audio, captions, brand guard, rights, approval, readiness, timeline, and blocked action centre are usable as local planning controls only. Backend wiring required before generation, persistence, upload, download, render, export, publish, schedule, provider calls, model calls, connector calls, prompt sending, service creation, API creation, or command execution.
        </p>
        <div style={diagnosticLinkGrid}>
          {model.routes.slice(0, embedded ? 8 : model.routes.length).map((route) => (
            <a key={buildInteractiveVideoWorkspaceStableKey(["diagnostic-route", route.slug])} style={diagnosticLink} href={route.href}>
              <span>{route.phase}</span>
              <strong>{route.title}</strong>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function BriefField({ field, value, onValue }: { field: InteractiveBriefField; value: string; onValue: (fieldId: string, value: string) => void }) {
  return (
    <label style={fieldBlock}>
      <span style={fieldLabel}>{field.label}</span>
      {field.multiline ? (
        <textarea style={textAreaInput} value={value} onChange={(event) => onValue(field.id, event.target.value)} rows={3} />
      ) : (
        <input style={textInput} value={value} onChange={(event) => onValue(field.id, event.target.value)} />
      )}
      <span style={fieldHelp}>{field.helper}</span>
    </label>
  );
}

function SelectorBlock({ title, choices, value, onValue }: { title: string; choices: readonly InteractiveChoice[]; value: string; onValue: (value: string) => void }) {
  return (
    <label style={fieldBlock}>
      <span style={fieldLabel}>{title}</span>
      <select style={selectInput} value={value} onChange={(event) => onValue(event.target.value)}>
        {choices.map((choice) => (
          <option key={buildInteractiveVideoWorkspaceStableKey(["choice", title, choice.id])} value={choice.id}>
            {choice.label}
          </option>
        ))}
      </select>
      <span style={fieldHelp}>{choiceDetail(choices, value)}</span>
    </label>
  );
}

function ScriptSectionEditor({ section, value, onValue }: { section: InteractiveScriptSection; value: string; onValue: (sectionId: string, value: string) => void }) {
  return (
    <label style={scriptBlock}>
      <span style={fieldLabel}>{section.label}</span>
      <textarea style={scriptInput} value={value} onChange={(event) => onValue(section.id, event.target.value)} rows={3} />
      <span style={fieldHelp}>{section.intent}</span>
    </label>
  );
}

function ChecklistPanel({ title, eyebrow, items, state, onToggle }: { title: string; eyebrow: string; items: readonly InteractiveCheckItem[]; state: ToggleMap; onToggle: (itemId: string) => void }) {
  return (
    <article style={productPanel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>{eyebrow}</p>
          <h3 style={panelTitle}>{title}</h3>
        </div>
        <span style={stateBadge}>{countReady(state).ready}/{items.length} local checked</span>
      </div>
      <div style={checklistGrid}>
        {items.map((item) => (
          <article key={buildInteractiveVideoWorkspaceStableKey(["check-item", title, item.id])} style={checkRow}>
            <button type="button" style={state[item.id] ? toggleOn : toggleOff} onClick={() => onToggle(item.id)}>
              {state[item.id] ? "Checked" : "Open"}
            </button>
            <div>
              <p style={checkLabel}>{item.label}</p>
              <p style={checkDetail}>{item.detail}</p>
              <p style={backendNeed}>{item.backendNeed}</p>
            </div>
          </article>
        ))}
      </div>
    </article>
  );
}

function PlannerPanel({ title, eyebrow, rows }: { title: string; eyebrow: string; rows: readonly InteractivePlannerRow[] }) {
  return (
    <article style={productPanel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>{eyebrow}</p>
          <h3 style={panelTitle}>{title}</h3>
        </div>
        <span style={stateBadge}>Synthetic plan</span>
      </div>
      <div style={checklistGrid}>
        {rows.map((row) => (
          <article key={buildInteractiveVideoWorkspaceStableKey(["planner", title, row.id])} style={plannerRow}>
            <p style={checkLabel}>{row.label}</p>
            <p style={checkDetail}>{row.plan}</p>
            <p style={checkDetail}>{row.dependencyState}</p>
            <p style={backendNeed}>{row.backendNeed}</p>
          </article>
        ))}
      </div>
    </article>
  );
}

function ReadinessPanel({ readiness }: { readiness: { gateMap: ToggleMap; ready: number; total: number; percentage: number } }) {
  return (
    <article style={productPanel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Readiness</p>
          <h3 style={panelTitle}>Render Readiness Panel Mock / Export Readiness Panel Mock / Publish Readiness Panel Mock</h3>
        </div>
        <span style={stateBadge}>{readiness.percentage}% local readiness</span>
      </div>
      <div style={progressTrack}><div style={{ ...progressFill, width: String(readiness.percentage) + "%" }} /></div>
      <div style={checklistGrid}>
        {READINESS_GATES.map((gate) => (
          <article key={buildInteractiveVideoWorkspaceStableKey(["readiness", gate.id])} style={readiness.gateMap[gate.id] ? readyGate : blockedGate}>
            <p style={checkLabel}>{gate.label}</p>
            <p style={checkDetail}>{readiness.gateMap[gate.id] ? "Locally complete" : "Needs local planning"}</p>
            <p style={backendNeed}>{gate.backendNeed}</p>
          </article>
        ))}
      </div>
      <div style={blockedTriplet}>
        <span style={blockedChip}>Render blocked</span>
        <span style={blockedChip}>Export blocked</span>
        <span style={blockedChip}>Publish blocked</span>
      </div>
    </article>
  );
}

function TimelinePanel({ timelineIndex, onSelect }: { timelineIndex: number; onSelect: (index: number) => void }) {
  return (
    <article style={productPanel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Timeline</p>
          <h3 style={panelTitle}>Fake Video Job Timeline Mock</h3>
        </div>
        <span style={stateBadge}>No backend job</span>
      </div>
      <div style={timelineList}>
        {FAKE_JOB_TIMELINE_EVENTS.map((event, index) => (
          <button key={buildInteractiveVideoWorkspaceStableKey(["timeline", event.id])} type="button" style={index === timelineIndex ? selectedTimelineRow : timelineRow} onClick={() => onSelect(index)}>
            <span style={timelineDot} />
            <span>
              <strong>{event.stage}</strong>
              <em>{event.mockStatus}</em>
              <small>{event.note}</small>
            </span>
          </button>
        ))}
      </div>
    </article>
  );
}

function BlockedActionPanel() {
  return (
    <article style={productPanel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Blocked actions</p>
          <h3 style={panelTitle}>Blocked Backend Action Centre</h3>
        </div>
        <span style={blockedBadge}>All protected actions disabled</span>
      </div>
      <div style={blockedActionGrid}>
        {BLOCKED_BACKEND_ACTIONS.map((action) => (
          <button key={buildInteractiveVideoWorkspaceStableKey(["blocked-action", action.id])} type="button" disabled style={disabledActionButton} title={action.backendContract}>
            <strong>{action.label}</strong>
            <span>{action.reason}</span>
          </button>
        ))}
      </div>
    </article>
  );
}

function BackendPreviewPanel() {
  return (
    <article style={productPanel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>First Backend Wiring Readiness Preview</p>
          <h3 style={panelTitle}>Prerequisites before real execution</h3>
        </div>
        <span style={stateBadge}>Preview only</span>
      </div>
      <div style={chipGrid}>
        {BACKEND_WIRING_REQUIREMENTS.map((item) => (
          <span key={buildInteractiveVideoWorkspaceStableKey(["backend-need", item])} style={backendChip}>{item}</span>
        ))}
      </div>
      <p style={bodyText}>Backend contracts are foundation complete enough for the first backend wiring boundary, but this UX does not implement that wiring.</p>
    </article>
  );
}

function EmptyStateCard() {
  return (
    <section style={emptyPanel}>
      <p style={panelEyebrow}>Interactive Workspace Empty State</p>
      <h3 style={panelTitle}>Start with brief, audience, script, storyboard, assets, audio, captions, rights, and approval.</h3>
      <p style={bodyText}>This empty state creates no project and starts no backend job. Use the visible local controls to plan the workspace before backend wiring exists.</p>
    </section>
  );
}

function DirtyStateCard({ dirtyCount, onReset }: { dirtyCount: number; onReset: () => void }) {
  return (
    <section style={dirtyPanel}>
      <p style={panelEyebrow}>Interactive Workspace Dirty State Mock</p>
      <h3 style={panelTitle}>{dirtyCount} local-only edit markers</h3>
      <p style={bodyText}>Unsaved local-only changes are visible. Backend-owned project persistence remains required before saving drafts.</p>
      <button type="button" style={localButton} onClick={onReset}>Reset local mock state</button>
    </section>
  );
}

function BlockedStateCard() {
  return (
    <section style={blockedStatePanel}>
      <p style={panelEyebrow}>Interactive Workspace Blocked State Mock</p>
      <h3 style={panelTitle}>Provider gateway, storage, render queue, artifact export, publish gateway, approval capture, and audit ledger are not wired.</h3>
      <p style={bodyText}>The UI helps users see exactly why protected actions are blocked. No tickets, backend workflows, services, APIs, or commands are created from the frontend.</p>
    </section>
  );
}

function makeBriefState(empty: boolean): TextMap {
  return PROJECT_BRIEF_FIELDS.reduce<TextMap>((state, field) => {
    state[field.id] = empty ? "" : field.seedValue;
    return state;
  }, {});
}

function makeScriptState(empty: boolean): TextMap {
  return SCRIPT_SECTIONS.reduce<TextMap>((state, section) => {
    state[section.id] = empty ? "" : section.seedValue;
    return state;
  }, {});
}

function makeToggleState(ids: readonly string[], checked: boolean): ToggleMap {
  return ids.reduce<ToggleMap>((state, id) => {
    state[id] = checked;
    return state;
  }, {});
}

function makeCheckState(items: readonly InteractiveCheckItem[], forceChecked: boolean): ToggleMap {
  return items.reduce<ToggleMap>((state, item) => {
    state[item.id] = forceChecked ? true : item.defaultChecked;
    return state;
  }, {});
}

function countReady(state: ToggleMap): { ready: number; total: number } {
  const values = Object.values(state);
  return { ready: values.filter(Boolean).length, total: values.length };
}

function labelFor(choices: readonly InteractiveChoice[], id: string): string {
  return choices.find((choice) => choice.id === id)?.label ?? choices[0].label;
}

function choiceDetail(choices: readonly InteractiveChoice[], id: string): string {
  return choices.find((choice) => choice.id === id)?.detail ?? choices[0].detail;
}

const page: CSSProperties = { display: "flex", flexDirection: "column", gap: 18, padding: 28, color: "#172026", background: "#f6f8fa" };
const cockpitPage: CSSProperties = { display: "flex", flexDirection: "column", gap: 18, padding: 22, color: "#172026", background: "#f6f8fa", border: "1px solid #d0d7de", borderRadius: 8 };
const hero: CSSProperties = { display: "flex", flexDirection: "column", gap: 12 };
const eyebrowRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const phaseBadge: CSSProperties = { border: "1px solid #9ab4c4", background: "#eaf3f7", color: "#17384c", borderRadius: 6, padding: "6px 9px", fontSize: 12, fontWeight: 800 };
const surfaceBadge: CSSProperties = { ...phaseBadge, borderColor: "#b7d6c8", background: "#edf8f2", color: "#184a37" };
const blockedBadge: CSSProperties = { ...phaseBadge, borderColor: "#e5b8b8", background: "#fff1f0", color: "#7a2720" };
const titleStyle: CSSProperties = { margin: 0, fontSize: 34, lineHeight: 1.08, letterSpacing: 0, color: "#14202b" };
const summaryText: CSSProperties = { margin: 0, maxWidth: 1120, color: "#344854", fontSize: 15, lineHeight: 1.6 };
const markerBand: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const markerPill: CSSProperties = { border: "1px solid #d0d7de", background: "#ffffff", color: "#2d3b45", borderRadius: 6, padding: "7px 9px", fontSize: 12, lineHeight: 1.35 };
const experienceStack: CSSProperties = { display: "flex", flexDirection: "column", gap: 16 };
const workspaceTopGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 14 };
const workspaceGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 14 };
const productPanel: CSSProperties = { display: "flex", flexDirection: "column", gap: 12, minWidth: 0, border: "1px solid #d0d7de", borderRadius: 8, padding: 16, background: "#ffffff" };
const panelHeader: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" };
const panelEyebrow: CSSProperties = { margin: "0 0 4px", color: "#5e6d78", fontSize: 11, fontWeight: 800, letterSpacing: 0, textTransform: "uppercase" };
const panelTitle: CSSProperties = { margin: 0, color: "#14202b", fontSize: 19, lineHeight: 1.25, letterSpacing: 0 };
const stateBadge: CSSProperties = { display: "inline-flex", alignItems: "center", width: "fit-content", border: "1px solid #bdd3c7", background: "#eef8f2", color: "#184a37", borderRadius: 999, padding: "6px 9px", fontSize: 12, fontWeight: 800 };
const bodyText: CSSProperties = { margin: 0, color: "#425563", fontSize: 14, lineHeight: 1.55 };
const briefGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 };
const fieldBlock: CSSProperties = { display: "flex", flexDirection: "column", gap: 6, minWidth: 0 };
const fieldLabel: CSSProperties = { color: "#273946", fontSize: 12, fontWeight: 800 };
const fieldHelp: CSSProperties = { color: "#657582", fontSize: 11, lineHeight: 1.35 };
const textInput: CSSProperties = { width: "100%", boxSizing: "border-box", border: "1px solid #cfd8df", borderRadius: 6, padding: "9px 10px", color: "#14202b", background: "#fbfcfd", fontSize: 13 };
const selectInput: CSSProperties = { ...textInput };
const textAreaInput: CSSProperties = { ...textInput, minHeight: 80, resize: "vertical" };
const scriptGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 10 };
const scriptBlock: CSSProperties = { ...fieldBlock, border: "1px solid #edf1f4", borderRadius: 8, padding: 10, background: "#fbfcfd" };
const scriptInput: CSSProperties = { ...textAreaInput, minHeight: 92, background: "#ffffff" };
const sceneRail: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const sceneButton: CSSProperties = { border: "1px solid #cfd8df", background: "#ffffff", color: "#263640", borderRadius: 6, padding: "7px 9px", fontSize: 12, fontWeight: 800, cursor: "pointer" };
const selectedSceneButton: CSSProperties = { ...sceneButton, background: "#14384a", color: "#ffffff", borderColor: "#14384a" };
const storyboardCard: CSSProperties = { display: "flex", flexDirection: "column", gap: 8, border: "1px solid #dbe3e8", borderRadius: 8, padding: 12, background: "#fbfcfd" };
const mockFrame: CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", minHeight: 120, borderRadius: 8, border: "1px solid #bfd1d9", background: "linear-gradient(135deg, #e7f3f5, #f7f4e8)", color: "#17384c", fontWeight: 900 };
const localButton: CSSProperties = { width: "fit-content", border: "1px solid #9ab4c4", background: "#ffffff", color: "#17384c", borderRadius: 6, padding: "8px 10px", fontSize: 13, fontWeight: 800, cursor: "pointer" };
const tableGrid: CSSProperties = { display: "grid", gap: 10 };
const tableRow: CSSProperties = { display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, border: "1px solid #edf1f4", borderRadius: 8, padding: 10, background: "#fbfcfd" };
const toggleOff: CSSProperties = { border: "1px solid #d6b8b3", background: "#fff5f2", color: "#7a2720", borderRadius: 999, padding: "6px 8px", fontSize: 11, fontWeight: 900, cursor: "pointer", height: "fit-content" };
const toggleOn: CSSProperties = { ...toggleOff, borderColor: "#acd1bf", background: "#edf8f2", color: "#184a37" };
const checkLabel: CSSProperties = { margin: 0, color: "#263640", fontSize: 13, fontWeight: 900, lineHeight: 1.35 };
const checkDetail: CSSProperties = { margin: "3px 0 0", color: "#51626e", fontSize: 12, lineHeight: 1.45 };
const backendNeed: CSSProperties = { margin: "6px 0 0", color: "#6a4b0f", fontSize: 11, lineHeight: 1.4, fontWeight: 800 };
const checklistGrid: CSSProperties = { display: "grid", gap: 10 };
const checkRow: CSSProperties = { display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, alignItems: "start", border: "1px solid #edf1f4", borderRadius: 8, padding: 10, background: "#fbfcfd" };
const plannerRow: CSSProperties = { border: "1px solid #edf1f4", borderRadius: 8, padding: 10, background: "#fbfcfd" };
const progressTrack: CSSProperties = { width: "100%", height: 10, borderRadius: 999, background: "#e6edf2", overflow: "hidden" };
const progressFill: CSSProperties = { height: "100%", borderRadius: 999, background: "#2c7a67" };
const readyGate: CSSProperties = { border: "1px solid #acd1bf", borderRadius: 8, padding: 10, background: "#f1fbf5" };
const blockedGate: CSSProperties = { border: "1px solid #ead0b3", borderRadius: 8, padding: 10, background: "#fff8ec" };
const blockedTriplet: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const blockedChip: CSSProperties = { border: "1px solid #e5b8b8", background: "#fff1f0", color: "#7a2720", borderRadius: 999, padding: "6px 8px", fontSize: 12, fontWeight: 800 };
const timelineList: CSSProperties = { display: "grid", gap: 8 };
const timelineRow: CSSProperties = { display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, textAlign: "left", border: "1px solid #dbe3e8", borderRadius: 8, padding: 10, background: "#ffffff", color: "#263640", cursor: "pointer" };
const selectedTimelineRow: CSSProperties = { ...timelineRow, borderColor: "#2c7a67", background: "#f1fbf5" };
const timelineDot: CSSProperties = { width: 10, height: 10, marginTop: 4, borderRadius: 999, background: "#2c7a67" };
const blockedActionGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 };
const disabledActionButton: CSSProperties = { display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-start", textAlign: "left", border: "1px solid #e5b8b8", borderRadius: 8, padding: 10, background: "#fff4f2", color: "#7a2720", opacity: 1 };
const chipGrid: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const backendChip: CSSProperties = { border: "1px solid #d5c29b", background: "#fff8e6", color: "#5c4512", borderRadius: 999, padding: "6px 9px", fontSize: 12, fontWeight: 800 };
const contractPanel: CSSProperties = { ...productPanel, background: "#f8fbfc" };
const diagnosticLinkGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 };
const diagnosticLink: CSSProperties = { display: "flex", flexDirection: "column", gap: 4, border: "1px solid #d0d7de", borderRadius: 8, padding: 10, background: "#ffffff", color: "#14202b", textDecoration: "none", fontSize: 12 };
const emptyPanel: CSSProperties = { border: "1px solid #d0d7de", borderRadius: 8, padding: 16, background: "#ffffff" };
const dirtyPanel: CSSProperties = { border: "1px solid #efd3b3", borderRadius: 8, padding: 16, background: "#fff8ec", display: "flex", flexDirection: "column", gap: 10 };
const blockedStatePanel: CSSProperties = { border: "1px solid #e5b8b8", borderRadius: 8, padding: 16, background: "#fff4f2" };
