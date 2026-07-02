export type InteractiveVideoWorkspaceRouteSlug =
  | "interactive-video-workspace-shell"
  | "project-brief-editor-mock"
  | "audience-outcome-selector-mock"
  | "script-outline-editor-mock"
  | "scene-storyboard-builder-mock"
  | "shot-list-planner-mock"
  | "asset-checklist-panel-mock"
  | "audio-voiceover-planner-mock"
  | "caption-accessibility-planner-mock"
  | "brand-style-guard-panel-mock"
  | "rights-consent-checklist-mock"
  | "approval-gate-checklist-mock"
  | "render-readiness-panel-mock"
  | "export-readiness-panel-mock"
  | "publish-readiness-panel-mock"
  | "fake-video-job-timeline-mock"
  | "blocked-backend-action-centre"
  | "interactive-workspace-empty-state"
  | "interactive-workspace-dirty-state-mock"
  | "interactive-workspace-review-state-mock"
  | "interactive-workspace-approved-state-mock"
  | "interactive-workspace-blocked-state-mock"
  | "interactive-ux-contract-summary"
  | "cockpit-interactive-video-workspace-summary"
  | "first-interactive-video-workspace-candidate"
  | "controlled-interactive-video-workspace-release-candidate"
  | "ux-safety-regression-guard"
  | "ux-navigation-integration-guard"
  | "ux-smoke-coverage-guard"
  | "ux-checkpoint-completion-guard"
  | "first-backend-wiring-readiness-preview"
  | "controlled-interactive-video-workspace-completion-candidate";

export type InteractiveVideoWorkspaceFocus =
  | "workspace"
  | "brief"
  | "audience"
  | "script"
  | "storyboard"
  | "shots"
  | "assets"
  | "audio"
  | "captions"
  | "brand"
  | "rights"
  | "approval"
  | "readiness"
  | "timeline"
  | "actions"
  | "empty"
  | "dirty"
  | "review"
  | "approved"
  | "contract"
  | "cockpit"
  | "candidate"
  | "safety"
  | "navigation"
  | "smoke"
  | "checkpoint"
  | "backend";

export type InteractiveVideoWorkspaceTone = "local-only" | "dirty" | "review" | "approved" | "blocked" | "empty" | "candidate";

export type InteractiveVideoWorkspaceRouteDefinition = {
  slug: InteractiveVideoWorkspaceRouteSlug;
  href: string;
  phase: string;
  phaseNumber: number;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  focusSection: InteractiveVideoWorkspaceFocus;
  stateTone: InteractiveVideoWorkspaceTone;
};

export type InteractiveBriefField = { id: string; label: string; seedValue: string; helper: string; multiline?: boolean };
export type InteractiveChoice = { id: string; label: string; detail: string };
export type InteractiveScriptSection = { id: string; label: string; seedValue: string; intent: string };
export type InteractiveStoryboardScene = { id: string; label: string; visualIntent: string; motionNote: string; assetPlaceholder: string; riskNote: string };
export type InteractiveShotRow = { id: string; shotType: string; framing: string; movement: string; assetNeed: string; duration: string; dependencyState: string };
export type InteractiveCheckItem = { id: string; label: string; detail: string; backendNeed: string; defaultChecked: boolean };
export type InteractivePlannerRow = { id: string; label: string; plan: string; dependencyState: string; backendNeed: string };
export type InteractiveTimelineEvent = { id: string; stage: string; mockStatus: string; note: string };
export type InteractiveBlockedAction = { id: string; label: string; reason: string; backendContract: string };
export type InteractiveWorkspaceModel = { route: InteractiveVideoWorkspaceRouteDefinition; routes: readonly InteractiveVideoWorkspaceRouteDefinition[]; safetyMarkers: readonly string[] };

export const INTERACTIVE_VIDEO_WORKSPACE_SHARED_MARKERS = [
  "Interactive Video Workspace",
  "Interactive Video Workspace Shell",
  "Project Brief Editor Mock",
  "Audience Outcome Selector Mock",
  "Script Outline Editor Mock",
  "Scene Storyboard Builder Mock",
  "Shot List Planner Mock",
  "Asset Checklist Panel Mock",
  "Audio Voiceover Planner Mock",
  "Caption Accessibility Planner Mock",
  "Brand Style Guard Panel Mock",
  "Rights Consent Checklist Mock",
  "Approval Gate Checklist Mock",
  "Render Readiness Panel Mock",
  "Export Readiness Panel Mock",
  "Publish Readiness Panel Mock",
  "Fake Video Job Timeline Mock",
  "Blocked Backend Action Centre",
  "Interactive Workspace Empty State",
  "Interactive Workspace Dirty State Mock",
  "Interactive Workspace Review State Mock",
  "Interactive Workspace Approved State Mock",
  "Interactive Workspace Blocked State Mock",
  "Interactive UX Contract Summary",
  "Cockpit Interactive Video Workspace Summary",
  "First Backend Wiring Readiness Preview",
  "Controlled Interactive Video Workspace Completion Candidate",
  "Local React state only",
  "Synthetic data only",
  "No backend execution",
  "No frontend persistence",
  "No browser storage writes",
  "No provider calls",
  "No model calls",
  "No connector calls",
  "No prompt sending",
  "No upload",
  "No download",
  "No render",
  "No export",
  "No publish",
  "No schedule",
  "No command execution",
  "No service creation",
  "No API creation",
  "Backend wiring required",
  "Operator review required",
  "Explicit operator approval required",
] as const;

export const INTERACTIVE_VIDEO_WORKSPACE_ROUTES: readonly InteractiveVideoWorkspaceRouteDefinition[] = [
  {
    slug: "interactive-video-workspace-shell",
    href: "/interactive-video-workspace-shell",
    phase: "Phase 2186",
    phaseNumber: 2186,
    title: "Interactive Video Workspace Shell",
    commandLabel: "Go to Interactive Video Workspace Shell",
    summary: "Interactive Video Workspace Shell keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Interactive video workspace shell","Interactive video workspace shell uses local React state only and does not persist projects call providers call models call connectors upload files download files render videos export videos publish content schedule content create APIs create services run commands or write browser storage","Interactive video workspace shell makes the cockpit feel like a real product while backend execution remains blocked","Interactive video workspace shell requires backend wiring before generation rendering export publishing or persistence","Denied interactive workspace execution paths remain blocked","Interactive video workspace shell checklist"],
    focusSection: "workspace",
    stateTone: "local-only",
  },
  {
    slug: "project-brief-editor-mock",
    href: "/project-brief-editor-mock",
    phase: "Phase 2187",
    phaseNumber: 2187,
    title: "Project Brief Editor Mock",
    commandLabel: "Go to Project Brief Editor Mock",
    summary: "Project Brief Editor Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Project brief editor mock","Project brief editor mock uses local React state only and does not save briefs persist projects send prompts call providers call models or write browser storage","Project brief editor mock includes editable fields for title objective audience tone duration platform and success criteria","Project brief editor mock shows unsaved local-only state and backend persistence required","Denied project brief persistence paths remain blocked","Project brief editor mock checklist"],
    focusSection: "brief",
    stateTone: "local-only",
  },
  {
    slug: "audience-outcome-selector-mock",
    href: "/audience-outcome-selector-mock",
    phase: "Phase 2188",
    phaseNumber: 2188,
    title: "Audience Outcome Selector Mock",
    commandLabel: "Go to Audience Outcome Selector Mock",
    summary: "Audience Outcome Selector Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Audience outcome selector mock","Audience outcome selector mock uses local React state only and does not persist audience data send prompts call providers call models or create jobs","Audience outcome selector mock includes selectable audience segments outcomes formats and platform intent","Audience outcome selector mock updates visible planning summary locally without backend execution","Denied audience outcome persistence paths remain blocked","Audience outcome selector mock checklist"],
    focusSection: "audience",
    stateTone: "local-only",
  },
  {
    slug: "script-outline-editor-mock",
    href: "/script-outline-editor-mock",
    phase: "Phase 2189",
    phaseNumber: 2189,
    title: "Script Outline Editor Mock",
    commandLabel: "Go to Script Outline Editor Mock",
    summary: "Script Outline Editor Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Script outline editor mock","Script outline editor mock uses local React state only and does not generate scripts send prompts call models persist text or write files","Script outline editor mock includes hook problem proof offer call to action and closing sections","Script outline editor mock allows local text edits and shows generation blocked until provider gateway wiring exists","Denied script generation paths remain blocked","Script outline editor mock checklist"],
    focusSection: "script",
    stateTone: "local-only",
  },
  {
    slug: "scene-storyboard-builder-mock",
    href: "/scene-storyboard-builder-mock",
    phase: "Phase 2190",
    phaseNumber: 2190,
    title: "Scene Storyboard Builder Mock",
    commandLabel: "Go to Scene Storyboard Builder Mock",
    summary: "Scene Storyboard Builder Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Scene storyboard builder mock","Scene storyboard builder mock uses local React state only and does not create media generate images render video upload assets or persist scene cards","Scene storyboard builder mock includes scene cards with visual intent motion note asset placeholder and risk note","Scene storyboard builder mock supports local-only scene selection reorder-like controls or status toggles without persistence","Denied storyboard generation paths remain blocked","Scene storyboard builder mock checklist"],
    focusSection: "storyboard",
    stateTone: "local-only",
  },
  {
    slug: "shot-list-planner-mock",
    href: "/shot-list-planner-mock",
    phase: "Phase 2191",
    phaseNumber: 2191,
    title: "Shot List Planner Mock",
    commandLabel: "Go to Shot List Planner Mock",
    summary: "Shot List Planner Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Shot list planner mock","Shot list planner mock uses local React state only and does not create jobs render shots upload media or persist shot lists","Shot list planner mock includes shot type framing movement asset need duration and dependency state","Shot list planner mock updates local readiness counts only","Denied shot planning persistence paths remain blocked","Shot list planner mock checklist"],
    focusSection: "shots",
    stateTone: "local-only",
  },
  {
    slug: "asset-checklist-panel-mock",
    href: "/asset-checklist-panel-mock",
    phase: "Phase 2192",
    phaseNumber: 2192,
    title: "Asset Checklist Panel Mock",
    commandLabel: "Go to Asset Checklist Panel Mock",
    summary: "Asset Checklist Panel Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Asset checklist panel mock","Asset checklist panel mock uses local React state only and does not upload assets download assets store media scan files or persist asset state","Asset checklist panel mock includes asset needed asset supplied rights needed scan required and storage required indicators","Asset checklist panel mock makes asset storage backend prerequisites visible","Denied asset upload and persistence paths remain blocked","Asset checklist panel mock checklist"],
    focusSection: "assets",
    stateTone: "local-only",
  },
  {
    slug: "audio-voiceover-planner-mock",
    href: "/audio-voiceover-planner-mock",
    phase: "Phase 2193",
    phaseNumber: 2193,
    title: "Audio Voiceover Planner Mock",
    commandLabel: "Go to Audio Voiceover Planner Mock",
    summary: "Audio Voiceover Planner Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Audio voiceover planner mock","Audio voiceover planner mock uses local React state only and does not upload audio generate voice clone voice transcribe audio or persist audio state","Audio voiceover planner mock includes voice tone pacing music bed sound effects and consent requirement rows","Audio voiceover planner mock makes audio storage and consent backend prerequisites visible","Denied audio generation and persistence paths remain blocked","Audio voiceover planner mock checklist"],
    focusSection: "audio",
    stateTone: "local-only",
  },
  {
    slug: "caption-accessibility-planner-mock",
    href: "/caption-accessibility-planner-mock",
    phase: "Phase 2194",
    phaseNumber: 2194,
    title: "Caption Accessibility Planner Mock",
    commandLabel: "Go to Caption Accessibility Planner Mock",
    summary: "Caption Accessibility Planner Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Caption accessibility planner mock","Caption accessibility planner mock uses local React state only and does not generate captions persist transcripts export subtitles or write files","Caption accessibility planner mock includes caption style reading speed accessibility note and transcript dependency state","Caption accessibility planner mock shows caption backend prerequisites clearly","Denied caption persistence paths remain blocked","Caption accessibility planner mock checklist"],
    focusSection: "captions",
    stateTone: "local-only",
  },
  {
    slug: "brand-style-guard-panel-mock",
    href: "/brand-style-guard-panel-mock",
    phase: "Phase 2195",
    phaseNumber: 2195,
    title: "Brand Style Guard Panel Mock",
    commandLabel: "Go to Brand Style Guard Panel Mock",
    summary: "Brand Style Guard Panel Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Brand style guard panel mock","Brand style guard panel mock uses local React state only and does not approve legal review persist brand decisions or call providers","Brand style guard panel mock includes brand tone visual rules restricted claims colour notes and compliance warnings","Brand style guard panel mock keeps brand/legal approval blocked until backend approval capture exists","Denied brand approval paths remain blocked","Brand style guard panel mock checklist"],
    focusSection: "brand",
    stateTone: "local-only",
  },
  {
    slug: "rights-consent-checklist-mock",
    href: "/rights-consent-checklist-mock",
    phase: "Phase 2196",
    phaseNumber: 2196,
    title: "Rights Consent Checklist Mock",
    commandLabel: "Go to Rights Consent Checklist Mock",
    summary: "Rights Consent Checklist Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Rights consent checklist mock","Rights consent checklist mock uses local React state only and does not clear rights approve consent persist evidence grant licenses or audit events","Rights consent checklist mock includes likeness consent music rights asset rights attribution consent expiry and revocation checks","Rights consent checklist mock keeps rights clearance blocked until backend rights consent audit workflow exists","Denied rights consent persistence paths remain blocked","Rights consent checklist mock checklist"],
    focusSection: "rights",
    stateTone: "local-only",
  },
  {
    slug: "approval-gate-checklist-mock",
    href: "/approval-gate-checklist-mock",
    phase: "Phase 2197",
    phaseNumber: 2197,
    title: "Approval Gate Checklist Mock",
    commandLabel: "Go to Approval Gate Checklist Mock",
    summary: "Approval Gate Checklist Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Approval gate checklist mock","Approval gate checklist mock uses local React state only and does not persist approvals capture signatures verify identity or approve protected actions","Approval gate checklist mock includes creative review legal review rights review operator review export review and publish review checks","Approval gate checklist mock keeps approval capture blocked until backend approval ledger exists","Denied approval persistence paths remain blocked","Approval gate checklist mock checklist"],
    focusSection: "approval",
    stateTone: "local-only",
  },
  {
    slug: "render-readiness-panel-mock",
    href: "/render-readiness-panel-mock",
    phase: "Phase 2198",
    phaseNumber: 2198,
    title: "Render Readiness Panel Mock",
    commandLabel: "Go to Render Readiness Panel Mock",
    summary: "Render Readiness Panel Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Render readiness panel mock","Render readiness panel mock uses local React state only and does not create render jobs create queues dispatch workers render videos or persist readiness","Render readiness panel mock computes readiness from local brief storyboard asset audio caption rights and approval mock states","Render readiness panel mock keeps render blocked until backend queue and worker wiring exists","Denied render queue paths remain blocked","Render readiness panel mock checklist"],
    focusSection: "readiness",
    stateTone: "local-only",
  },
  {
    slug: "export-readiness-panel-mock",
    href: "/export-readiness-panel-mock",
    phase: "Phase 2199",
    phaseNumber: 2199,
    title: "Export Readiness Panel Mock",
    commandLabel: "Go to Export Readiness Panel Mock",
    summary: "Export Readiness Panel Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Export readiness panel mock","Export readiness panel mock uses local React state only and does not create artifacts export files download files create signed URLs or persist export state","Export readiness panel mock computes export readiness from local render artifact rights approval and format mock states","Export readiness panel mock keeps export blocked until backend artifact export wiring exists","Denied export paths remain blocked","Export readiness panel mock checklist"],
    focusSection: "readiness",
    stateTone: "local-only",
  },
  {
    slug: "publish-readiness-panel-mock",
    href: "/publish-readiness-panel-mock",
    phase: "Phase 2200",
    phaseNumber: 2200,
    title: "Publish Readiness Panel Mock",
    commandLabel: "Go to Publish Readiness Panel Mock",
    summary: "Publish Readiness Panel Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Publish readiness panel mock","Publish readiness panel mock uses local React state only and does not publish posts schedule content call social APIs upload media store tokens or persist publish state","Publish readiness panel mock computes publish readiness from local artifact rights approval account and schedule mock states","Publish readiness panel mock keeps publish blocked until backend publish gateway wiring exists","Denied publish and schedule paths remain blocked","Publish readiness panel mock checklist"],
    focusSection: "readiness",
    stateTone: "local-only",
  },
  {
    slug: "fake-video-job-timeline-mock",
    href: "/fake-video-job-timeline-mock",
    phase: "Phase 2201",
    phaseNumber: 2201,
    title: "Fake Video Job Timeline Mock",
    commandLabel: "Go to Fake Video Job Timeline Mock",
    summary: "Fake Video Job Timeline Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Fake video job timeline mock","Fake video job timeline mock uses deterministic synthetic timeline data and local state only and does not create jobs run workers render video export files publish content or persist telemetry","Fake video job timeline mock shows planned draft review render export publish stages as mock statuses","Fake video job timeline mock clearly marks all backend execution as not wired","Denied job execution paths remain blocked","Fake video job timeline mock checklist"],
    focusSection: "timeline",
    stateTone: "local-only",
  },
  {
    slug: "blocked-backend-action-centre",
    href: "/blocked-backend-action-centre",
    phase: "Phase 2202",
    phaseNumber: 2202,
    title: "Blocked Backend Action Centre",
    commandLabel: "Go to Blocked Backend Action Centre",
    summary: "Blocked Backend Action Centre keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Blocked backend action centre","Blocked backend action centre shows disabled or safe blocked buttons for generate script generate storyboard upload assets generate voice render video export video publish video and schedule post","Blocked backend action centre does not call providers call models call connectors upload files download files render export publish schedule create APIs create services run commands or write browser storage","Blocked backend action centre explains the backend contract that must be wired first for each action","Denied backend action paths remain blocked","Blocked backend action centre checklist"],
    focusSection: "actions",
    stateTone: "blocked",
  },
  {
    slug: "interactive-workspace-empty-state",
    href: "/interactive-workspace-empty-state",
    phase: "Phase 2203",
    phaseNumber: 2203,
    title: "Interactive Workspace Empty State",
    commandLabel: "Go to Interactive Workspace Empty State",
    summary: "Interactive Workspace Empty State keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Interactive workspace empty state","Interactive workspace empty state uses local React state only and does not create projects persist state call providers or create jobs","Interactive workspace empty state guides the user into project brief script storyboard asset audio caption rights and approval setup","Interactive workspace empty state keeps backend actions blocked","Denied empty state execution paths remain blocked","Interactive workspace empty state checklist"],
    focusSection: "empty",
    stateTone: "empty",
  },
  {
    slug: "interactive-workspace-dirty-state-mock",
    href: "/interactive-workspace-dirty-state-mock",
    phase: "Phase 2204",
    phaseNumber: 2204,
    title: "Interactive Workspace Dirty State Mock",
    commandLabel: "Go to Interactive Workspace Dirty State Mock",
    summary: "Interactive Workspace Dirty State Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Interactive workspace dirty state mock","Interactive workspace dirty state mock uses local React state only and does not save changes persist drafts or write browser storage","Interactive workspace dirty state mock shows unsaved local-only changes and backend persistence required","Interactive workspace dirty state mock includes safe reset or local edit indicators only","Denied dirty state persistence paths remain blocked","Interactive workspace dirty state mock checklist"],
    focusSection: "dirty",
    stateTone: "dirty",
  },
  {
    slug: "interactive-workspace-review-state-mock",
    href: "/interactive-workspace-review-state-mock",
    phase: "Phase 2205",
    phaseNumber: 2205,
    title: "Interactive Workspace Review State Mock",
    commandLabel: "Go to Interactive Workspace Review State Mock",
    summary: "Interactive Workspace Review State Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Interactive workspace review state mock","Interactive workspace review state mock uses local React state only and does not persist review state approve actions or trigger backend workflows","Interactive workspace review state mock shows review checklist progress and blocked approval capture","Interactive workspace review state mock keeps export publish render blocked until backend approval capture exists","Denied review state persistence paths remain blocked","Interactive workspace review state mock checklist"],
    focusSection: "review",
    stateTone: "review",
  },
  {
    slug: "interactive-workspace-approved-state-mock",
    href: "/interactive-workspace-approved-state-mock",
    phase: "Phase 2206",
    phaseNumber: 2206,
    title: "Interactive Workspace Approved State Mock",
    commandLabel: "Go to Interactive Workspace Approved State Mock",
    summary: "Interactive Workspace Approved State Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Interactive workspace approved state mock","Interactive workspace approved state mock uses local React state only and does not persist approvals trigger render export publish or call services","Interactive workspace approved state mock shows what a locally complete planning state looks like while backend execution remains blocked","Interactive workspace approved state mock keeps protected actions disabled","Denied approved state execution paths remain blocked","Interactive workspace approved state mock checklist"],
    focusSection: "approved",
    stateTone: "approved",
  },
  {
    slug: "interactive-workspace-blocked-state-mock",
    href: "/interactive-workspace-blocked-state-mock",
    phase: "Phase 2207",
    phaseNumber: 2207,
    title: "Interactive Workspace Blocked State Mock",
    commandLabel: "Go to Interactive Workspace Blocked State Mock",
    summary: "Interactive Workspace Blocked State Mock keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Interactive workspace blocked state mock","Interactive workspace blocked state mock uses local React state only and does not persist blockers create tickets dispatch workflows or call services","Interactive workspace blocked state mock explains missing backend prerequisites for provider gateway asset storage audio storage render queue artifact export publish gateway approval capture and audit ledger","Interactive workspace blocked state mock helps users see exactly why actions are blocked","Denied blocked state execution paths remain blocked","Interactive workspace blocked state mock checklist"],
    focusSection: "actions",
    stateTone: "blocked",
  },
  {
    slug: "interactive-ux-contract-summary",
    href: "/interactive-ux-contract-summary",
    phase: "Phase 2208",
    phaseNumber: 2208,
    title: "Interactive UX Contract Summary",
    commandLabel: "Go to Interactive UX Contract Summary",
    summary: "Interactive UX Contract Summary keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Interactive UX contract summary","Interactive UX contract summary states that the UX is clickable local state only and not backend wired","Interactive UX contract summary does not enable persistence upload download render export publish schedule provider calls model calls connector calls or command execution","Interactive UX contract summary maps each visible product action to its backend contract prerequisite","Denied UX contract paths remain blocked","Interactive UX contract summary checklist"],
    focusSection: "contract",
    stateTone: "local-only",
  },
  {
    slug: "cockpit-interactive-video-workspace-summary",
    href: "/cockpit-interactive-video-workspace-summary",
    phase: "Phase 2209",
    phaseNumber: 2209,
    title: "Cockpit Interactive Video Workspace Summary",
    commandLabel: "Go to Cockpit Interactive Video Workspace Summary",
    summary: "Cockpit Interactive Video Workspace Summary keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Cockpit interactive video workspace summary","Cockpit interactive video workspace summary keeps the cockpit as the normal user surface and makes the video workspace feel usable","Cockpit interactive video workspace summary does not remove backend contract safety boundaries or diagnostic phase coverage","Cockpit interactive video workspace summary includes project setup script storyboard asset audio caption rights approval readiness and blocked action centre","Denied cockpit execution paths remain blocked","Cockpit interactive video workspace summary checklist"],
    focusSection: "cockpit",
    stateTone: "local-only",
  },
  {
    slug: "first-interactive-video-workspace-candidate",
    href: "/first-interactive-video-workspace-candidate",
    phase: "Phase 2210",
    phaseNumber: 2210,
    title: "First Interactive Video Workspace Candidate",
    commandLabel: "Go to First Interactive Video Workspace Candidate",
    summary: "First Interactive Video Workspace Candidate keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["First interactive video workspace candidate","First interactive video workspace candidate combines local project brief script storyboard shot asset audio caption brand rights approval readiness timeline and blocked action centre without persistence or backend execution","First interactive video workspace candidate requires backend wiring before generation render export publish schedule upload download or save","First interactive video workspace candidate keeps diagnostic contract links secondary","Denied first interactive workspace candidate paths remain blocked","First interactive video workspace candidate checklist"],
    focusSection: "candidate",
    stateTone: "candidate",
  },
  {
    slug: "controlled-interactive-video-workspace-release-candidate",
    href: "/controlled-interactive-video-workspace-release-candidate",
    phase: "Phase 2211",
    phaseNumber: 2211,
    title: "Controlled Interactive Video Workspace Release Candidate",
    commandLabel: "Go to Controlled Interactive Video Workspace Release Candidate",
    summary: "Controlled Interactive Video Workspace Release Candidate keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Controlled interactive video workspace release candidate","Controlled interactive video workspace release candidate does not persist projects call providers call models call connectors send prompts upload files download files render videos export files publish content schedule content create artifacts create APIs create services run commands spawn processes bind ports deploy runtimes store credentials store tokens write browser storage or guarantee performance from the frontend","Controlled interactive video workspace release candidate makes the workspace interactive using local React state only","Controlled interactive video workspace release candidate requires backend wiring before protected actions","Denied controlled interactive workspace paths remain blocked","Controlled interactive video workspace release candidate checklist"],
    focusSection: "candidate",
    stateTone: "candidate",
  },
  {
    slug: "ux-safety-regression-guard",
    href: "/ux-safety-regression-guard",
    phase: "Phase 2212",
    phaseNumber: 2212,
    title: "UX Safety Regression Guard",
    commandLabel: "Go to UX Safety Regression Guard",
    summary: "UX Safety Regression Guard keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["UX safety regression guard","UX safety regression guard verifies the interactive UX remains local state only with no persistence no network no backend execution no browser storage writes no uploads no downloads no render no export no publish no schedule","UX safety regression guard protects all existing backend contract boundaries","UX safety regression guard blocks hidden execution affordances","Denied UX safety regression paths remain blocked","UX safety regression guard checklist"],
    focusSection: "safety",
    stateTone: "local-only",
  },
  {
    slug: "ux-navigation-integration-guard",
    href: "/ux-navigation-integration-guard",
    phase: "Phase 2213",
    phaseNumber: 2213,
    title: "UX Navigation Integration Guard",
    commandLabel: "Go to UX Navigation Integration Guard",
    summary: "UX Navigation Integration Guard keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["UX navigation integration guard","UX navigation integration guard verifies interactive workspace routes are registered without duplicate command palette hrefs invalid route hrefs invalid navigation groups invalid safety posture values or broken cockpit links","UX navigation integration guard keeps phase pages diagnostics and cockpit normal user surface","UX navigation integration guard preserves existing contract navigation coverage","Denied UX navigation regression paths remain blocked","UX navigation integration guard checklist"],
    focusSection: "navigation",
    stateTone: "local-only",
  },
  {
    slug: "ux-smoke-coverage-guard",
    href: "/ux-smoke-coverage-guard",
    phase: "Phase 2214",
    phaseNumber: 2214,
    title: "UX Smoke Coverage Guard",
    commandLabel: "Go to UX Smoke Coverage Guard",
    summary: "UX Smoke Coverage Guard keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["UX smoke coverage guard","UX smoke coverage guard verifies the UX batch has targeted smoke scripts and full smoke registration without removing previous smoke coverage","UX smoke coverage guard keeps smoke scanning scoped to UX batch-owned files to avoid false positives from old helper rules","UX smoke coverage guard preserves checkpoint smoke coverage","Denied UX smoke coverage regression paths remain blocked","UX smoke coverage guard checklist"],
    focusSection: "smoke",
    stateTone: "local-only",
  },
  {
    slug: "ux-checkpoint-completion-guard",
    href: "/ux-checkpoint-completion-guard",
    phase: "Phase 2215",
    phaseNumber: 2215,
    title: "UX Checkpoint Completion Guard",
    commandLabel: "Go to UX Checkpoint Completion Guard",
    summary: "UX Checkpoint Completion Guard keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["UX checkpoint completion guard","UX checkpoint completion guard updates checkpoint docs through phase 2217 and marks interactive UX complete without claiming backend wiring exists","UX checkpoint completion guard records next likely batch as First Backend Wiring Boundary Mega Batch v1","UX checkpoint completion guard states backend contracts are foundation complete and interactive UX is local-state only","Denied UX checkpoint regression paths remain blocked","UX checkpoint completion guard checklist"],
    focusSection: "checkpoint",
    stateTone: "local-only",
  },
  {
    slug: "first-backend-wiring-readiness-preview",
    href: "/first-backend-wiring-readiness-preview",
    phase: "Phase 2216",
    phaseNumber: 2216,
    title: "First Backend Wiring Readiness Preview",
    commandLabel: "Go to First Backend Wiring Readiness Preview",
    summary: "First Backend Wiring Readiness Preview keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["First backend wiring readiness preview","First backend wiring readiness preview does not create APIs create services call providers dispatch jobs persist data or execute backend actions","First backend wiring readiness preview lists prerequisites for provider gateway asset storage audio storage render queue worker orchestration artifact export publish gateway approval capture rights consent and audit ledger wiring","First backend wiring readiness preview prepares for the next backend wiring batch without implementing it","Denied backend wiring preview execution paths remain blocked","First backend wiring readiness preview checklist"],
    focusSection: "review",
    stateTone: "review",
  },
  {
    slug: "controlled-interactive-video-workspace-completion-candidate",
    href: "/controlled-interactive-video-workspace-completion-candidate",
    phase: "Phase 2217",
    phaseNumber: 2217,
    title: "Controlled Interactive Video Workspace Completion Candidate",
    commandLabel: "Go to Controlled Interactive Video Workspace Completion Candidate",
    summary: "Controlled Interactive Video Workspace Completion Candidate keeps the interactive video workspace clickable with local React state only while backend wiring remains required for protected actions.",
    markerPhrases: ["Controlled interactive video workspace completion candidate","Controlled interactive video workspace completion candidate does not persist projects call providers call models call connectors send prompts upload files download files render videos export files publish content schedule content create artifacts create APIs create services bind ports spawn workers run commands deploy runtimes store credentials store tokens write browser storage or guarantee performance from the frontend","Controlled interactive video workspace completion candidate closes the UX pass and marks readiness for First Backend Wiring Boundary Mega Batch v1","Controlled interactive video workspace completion candidate keeps all protected actions blocked pending backend wiring","Denied interactive workspace completion paths remain blocked","Controlled interactive video workspace completion checklist"],
    focusSection: "candidate",
    stateTone: "candidate",
  }
] as const;

export const PROJECT_BRIEF_FIELDS: readonly InteractiveBriefField[] = [
  { id: "title", label: "Title", seedValue: "Launch explainer for Recovery Score", helper: "Editable local title only." },
  { id: "objective", label: "Objective", seedValue: "Explain the weekly health insight in under one minute", helper: "Planning copy only; no prompt leaves the browser.", multiline: true },
  { id: "audience", label: "Audience", seedValue: "Time-poor wellness users comparing habits", helper: "Deterministic seed audience." },
  { id: "tone", label: "Tone", seedValue: "Calm, clinical, optimistic", helper: "Local tone guard." },
  { id: "duration", label: "Duration", seedValue: "45 seconds", helper: "Mock duration target." },
  { id: "platform", label: "Platform", seedValue: "Vertical social cutdown", helper: "No account connection." },
  { id: "successCriteria", label: "Success criteria", seedValue: "Viewer understands score, next habit, and review requirement", helper: "No analytics persistence.", multiline: true },
] as const;

export const AUDIENCE_CHOICES: readonly InteractiveChoice[] = [
  { id: "daily-user", label: "Daily tracker", detail: "Needs a fast health progress explanation." },
  { id: "coach", label: "Coach", detail: "Needs client-safe education copy." },
  { id: "product-reviewer", label: "Product reviewer", detail: "Needs a concise workflow proof point." },
];

export const OUTCOME_CHOICES: readonly InteractiveChoice[] = [
  { id: "understand-score", label: "Understand score", detail: "Make the metric readable and trustworthy." },
  { id: "choose-action", label: "Choose next action", detail: "End with one low-risk habit choice." },
  { id: "request-review", label: "Request review", detail: "Move to operator review before anything protected." },
];

export const FORMAT_CHOICES: readonly InteractiveChoice[] = [
  { id: "short-social", label: "Short social", detail: "Vertical 45 second plan." },
  { id: "dashboard-walkthrough", label: "Dashboard walkthrough", detail: "Screen-led product narrative." },
  { id: "voiceover-demo", label: "Voiceover demo", detail: "Narration-led planning shell." },
];

export const PLATFORM_INTENT_CHOICES: readonly InteractiveChoice[] = [
  { id: "draft-review", label: "Draft review", detail: "Prepare for internal review only." },
  { id: "export-later", label: "Export later", detail: "Backend artifact export required." },
  { id: "publish-later", label: "Publish later", detail: "Backend publish gateway required." },
];

export const SCRIPT_SECTIONS: readonly InteractiveScriptSection[] = [
  { id: "hook", label: "Hook", seedValue: "Your weekly score is not a grade; it is a signal.", intent: "Open with reassurance." },
  { id: "problem", label: "Problem", seedValue: "Most trackers show numbers without explaining what changed.", intent: "Name the friction." },
  { id: "proof", label: "Proof", seedValue: "The cockpit compares sleep, activity, and recovery against your own baseline.", intent: "Show product logic." },
  { id: "offer", label: "Offer", seedValue: "CodexForge turns that signal into a simple review-ready video plan.", intent: "Position the value." },
  { id: "callToAction", label: "Call to action", seedValue: "Review the checklist before any generation or export begins.", intent: "Keep approval visible." },
  { id: "closing", label: "Closing", seedValue: "Backend wiring is required before this becomes a rendered asset.", intent: "Close with the safety boundary." },
] as const;

export const STORYBOARD_SCENES: readonly InteractiveStoryboardScene[] = [
  { id: "scene-1", label: "Scene 1", visualIntent: "Dashboard score card with a calm highlight ring", motionNote: "Slow push-in on the score", assetPlaceholder: "Synthetic UI frame", riskNote: "No real user data" },
  { id: "scene-2", label: "Scene 2", visualIntent: "Three signal lanes for sleep activity and recovery", motionNote: "Horizontal step-through", assetPlaceholder: "Mock lane chips", riskNote: "Avoid medical claim" },
  { id: "scene-3", label: "Scene 3", visualIntent: "Operator review checklist overlay", motionNote: "Checklist items tick locally", assetPlaceholder: "Review badges", riskNote: "Approval not captured" },
  { id: "scene-4", label: "Scene 4", visualIntent: "Blocked action centre with backend prerequisites", motionNote: "Buttons remain disabled", assetPlaceholder: "Contract cards", riskNote: "No hidden execution" },
] as const;

export const SHOT_PLANNER_ROWS: readonly InteractiveShotRow[] = [
  { id: "shot-1", shotType: "Product macro", framing: "Tight dashboard crop", movement: "Push-in", assetNeed: "Synthetic score card", duration: "6s", dependencyState: "Brief ready" },
  { id: "shot-2", shotType: "Explainer", framing: "Three-column signal band", movement: "Slide reveal", assetNeed: "Mock icons", duration: "10s", dependencyState: "Script section ready" },
  { id: "shot-3", shotType: "Evidence", framing: "Checklist rail", movement: "Static hold", assetNeed: "Review chips", duration: "8s", dependencyState: "Rights and approval needed" },
  { id: "shot-4", shotType: "Blocked action", framing: "Action centre", movement: "None", assetNeed: "Backend contract labels", duration: "7s", dependencyState: "Backend wiring required" },
] as const;

export const ASSET_CHECKLIST_ITEMS: readonly InteractiveCheckItem[] = [
  { id: "dashboard-frame", label: "Dashboard frame", detail: "Synthetic product image supplied", backendNeed: "Backend-owned asset storage required", defaultChecked: true },
  { id: "brand-logo", label: "Brand logo", detail: "Source and rights note needed", backendNeed: "Backend-owned rights evidence required", defaultChecked: false },
  { id: "voice-reference", label: "Voice reference", detail: "Consent required before use", backendNeed: "Backend-owned audio storage required", defaultChecked: false },
  { id: "music-bed", label: "Music bed", detail: "License and attribution needed", backendNeed: "Backend-owned rights consent audit required", defaultChecked: false },
];

export const AUDIO_PLANNER_ROWS: readonly InteractivePlannerRow[] = [
  { id: "voice-tone", label: "Voice tone", plan: "Warm product narrator", dependencyState: "Consent required", backendNeed: "Backend-owned voice and consent workflow" },
  { id: "pacing", label: "Pacing", plan: "112 words per minute", dependencyState: "Script timing needed", backendNeed: "Backend-owned audio storage" },
  { id: "music", label: "Music bed", plan: "Low-volume ambient pulse", dependencyState: "License needed", backendNeed: "Backend-owned rights workflow" },
  { id: "effects", label: "Sound effects", plan: "Subtle checklist ticks", dependencyState: "Asset source needed", backendNeed: "Backend-owned media storage" },
] as const;

export const CAPTION_PLANNER_ROWS: readonly InteractivePlannerRow[] = [
  { id: "caption-style", label: "Caption style", plan: "High contrast two-line captions", dependencyState: "Transcript required", backendNeed: "Backend-owned caption workflow" },
  { id: "reading-speed", label: "Reading speed", plan: "14 characters per second target", dependencyState: "Timing required", backendNeed: "Backend-owned transcript timing" },
  { id: "accessibility-note", label: "Accessibility note", plan: "Avoid flashing motion and preserve safe contrast", dependencyState: "Review required", backendNeed: "Backend-owned accessibility review" },
] as const;

export const BRAND_GUARD_ITEMS: readonly InteractiveCheckItem[] = [
  { id: "tone", label: "Brand tone", detail: "Calm and precise without medical certainty", backendNeed: "Backend-owned brand review required", defaultChecked: true },
  { id: "visual-rules", label: "Visual rules", detail: "No misleading biometric claims", backendNeed: "Backend-owned legal review required", defaultChecked: false },
  { id: "restricted-claims", label: "Restricted claims", detail: "No diagnosis, treatment, or guaranteed outcome language", backendNeed: "Backend-owned compliance workflow required", defaultChecked: false },
  { id: "colour-notes", label: "Colour notes", detail: "Use high-contrast slate, teal, and amber accents", backendNeed: "Backend-owned brand decision capture required", defaultChecked: true },
] as const;

export const RIGHTS_CONSENT_CHECKS: readonly InteractiveCheckItem[] = [
  { id: "likeness", label: "Likeness consent", detail: "No human likeness used in seed data", backendNeed: "Backend-owned consent evidence required", defaultChecked: true },
  { id: "music", label: "Music rights", detail: "License must be attached before export", backendNeed: "Backend-owned music rights workflow required", defaultChecked: false },
  { id: "asset-rights", label: "Asset rights", detail: "Synthetic assets need source tags", backendNeed: "Backend-owned asset rights tagging required", defaultChecked: false },
  { id: "attribution", label: "Attribution", detail: "Attribution line planned but not stored", backendNeed: "Backend-owned audit ledger required", defaultChecked: false },
  { id: "expiry", label: "Consent expiry", detail: "Expiration review required for reusable media", backendNeed: "Backend-owned consent expiration policy required", defaultChecked: false },
  { id: "revocation", label: "Revocation", detail: "Takedown path must be reviewable", backendNeed: "Backend-owned revocation workflow required", defaultChecked: false },
] as const;

export const APPROVAL_CHECKS: readonly InteractiveCheckItem[] = [
  { id: "creative-review", label: "Creative review", detail: "Storyboard and script reviewed locally", backendNeed: "Backend-owned approval capture required", defaultChecked: false },
  { id: "legal-review", label: "Legal review", detail: "Claims and rights need legal review", backendNeed: "Backend-owned legal approval ledger required", defaultChecked: false },
  { id: "rights-review", label: "Rights review", detail: "Consent and license evidence required", backendNeed: "Backend-owned rights consent audit required", defaultChecked: false },
  { id: "operator-review", label: "Operator review", detail: "Explicit operator approval required", backendNeed: "Backend-owned operator approval required", defaultChecked: false },
  { id: "export-review", label: "Export review", detail: "Export stays blocked until artifact contract exists", backendNeed: "Backend-owned artifact export required", defaultChecked: false },
  { id: "publish-review", label: "Publish review", detail: "Publish stays blocked until gateway exists", backendNeed: "Backend-owned publish gateway required", defaultChecked: false },
] as const;

export const READINESS_GATES = [
  { id: "brief", label: "Brief", backendNeed: "Backend-owned project persistence" },
  { id: "storyboard", label: "Storyboard", backendNeed: "Backend-owned storyboard persistence" },
  { id: "assets", label: "Assets", backendNeed: "Backend-owned asset storage" },
  { id: "audio", label: "Audio", backendNeed: "Backend-owned audio storage" },
  { id: "captions", label: "Captions", backendNeed: "Backend-owned caption workflow" },
  { id: "rights", label: "Rights", backendNeed: "Backend-owned rights consent audit ledger" },
  { id: "approval", label: "Approval", backendNeed: "Backend-owned approval capture" },
] as const;

export const FAKE_JOB_TIMELINE_EVENTS: readonly InteractiveTimelineEvent[] = [
  { id: "draft", stage: "Draft", mockStatus: "Local plan", note: "Seeded outline is editable but not saved." },
  { id: "review", stage: "Review", mockStatus: "Operator review", note: "Checklist progress is local only." },
  { id: "render", stage: "Render", mockStatus: "Backend required", note: "No render queue exists in the frontend." },
  { id: "export", stage: "Export", mockStatus: "Backend required", note: "No artifact export path exists in the frontend." },
  { id: "publish", stage: "Publish", mockStatus: "Backend required", note: "No account, token, schedule, or gateway is connected." },
] as const;

export const BLOCKED_BACKEND_ACTIONS: readonly InteractiveBlockedAction[] = [
  { id: "generate-script", label: "Generate script", reason: "Disabled until provider gateway and prompt review are backend-owned.", backendContract: "Provider gateway plus prompt review" },
  { id: "generate-storyboard", label: "Generate storyboard", reason: "Disabled until model routing and asset storage are backend-owned.", backendContract: "Provider gateway plus asset storage" },
  { id: "supply-assets", label: "Supply assets", reason: "Disabled until asset intake, scan, rights, and storage contracts exist.", backendContract: "Asset storage contract" },
  { id: "generate-voice", label: "Generate voice", reason: "Disabled until audio storage and consent workflow exist.", backendContract: "Audio storage plus consent audit" },
  { id: "render-video", label: "Render video", reason: "Disabled until render queue and worker orchestration are wired.", backendContract: "Render queue plus worker orchestration" },
  { id: "export-video", label: "Export video", reason: "Disabled until artifacts and signed export handoff are backend-owned.", backendContract: "Artifact export contract" },
  { id: "publish-video", label: "Publish video", reason: "Disabled until publish gateway and account authorization exist.", backendContract: "Publish gateway contract" },
  { id: "schedule-post", label: "Schedule post", reason: "Disabled until schedule policy, approval capture, and audit ledger are wired.", backendContract: "Publish gateway plus approval ledger" },
] as const;

export const BACKEND_WIRING_REQUIREMENTS = [
  "Backend-owned provider gateway",
  "Backend-owned asset storage",
  "Backend-owned audio storage",
  "Backend-owned render queue",
  "Backend-owned worker orchestration",
  "Backend-owned artifact export",
  "Backend-owned publish gateway",
  "Backend-owned approval capture",
  "Backend-owned rights consent audit ledger",
] as const;

export function buildInteractiveVideoWorkspaceStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listInteractiveVideoWorkspaceRoutes(): readonly InteractiveVideoWorkspaceRouteDefinition[] {
  return INTERACTIVE_VIDEO_WORKSPACE_ROUTES;
}

export function getInteractiveVideoWorkspaceRoute(slug: InteractiveVideoWorkspaceRouteSlug): InteractiveVideoWorkspaceRouteDefinition {
  const route = INTERACTIVE_VIDEO_WORKSPACE_ROUTES.find((candidate) => candidate.slug === slug);
  return route ?? INTERACTIVE_VIDEO_WORKSPACE_ROUTES[0];
}

export function buildInteractiveVideoWorkspaceModel(slug: InteractiveVideoWorkspaceRouteSlug = "interactive-video-workspace-shell"): InteractiveWorkspaceModel {
  return {
    route: getInteractiveVideoWorkspaceRoute(slug),
    routes: INTERACTIVE_VIDEO_WORKSPACE_ROUTES,
    safetyMarkers: INTERACTIVE_VIDEO_WORKSPACE_SHARED_MARKERS,
  };
}
