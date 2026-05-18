import type {
  MissionRiskPosture,
  MissionSystemEdge,
  MissionSystemMap,
  MissionSystemNode,
} from "./mission-control-types";

export function buildMissionSystemEdge(
  from: MissionSystemEdge["from"],
  to: MissionSystemEdge["to"],
  label: string,
  safety: MissionRiskPosture
): MissionSystemEdge {
  return {
    id: `${from}-to-${to}`,
    from,
    to,
    label,
    safety,
  };
}

export function buildMissionSystemMap(): MissionSystemMap {
  const nodes: MissionSystemNode[] = [
    { id: "operator-home", label: "Operator Home", detail: "Launch deck and safe next action" },
    { id: "brain", label: "Brain", detail: "Memory and signals" },
    { id: "memory", label: "Memory Review", detail: "Promotion approval queue" },
    { id: "stabilization", label: "Stabilization", detail: "Read-only stabilization command center" },
    { id: "tasks", label: "Reviewed Tasks", detail: "Suggestions and activation previews" },
    { id: "files", label: "Files", detail: "File context" },
    { id: "patch-preview", label: "Patch Preview", detail: "Preview handoff" },
    { id: "runs", label: "Runs", detail: "Approval-gated operations" },
    { id: "creative", label: "Creative", detail: "Production planning" },
    { id: "artifacts", label: "Artifacts", detail: "Guarded workspace" },
    { id: "production", label: "Production Pack", detail: "Bundle and validate" },
    { id: "bridge", label: "Bridge", detail: "Consent handoff" },
    { id: "capabilities", label: "Capabilities", detail: "Tool posture" },
    { id: "chat", label: "Chat", detail: "Visible recall context and selected evidence grounding" },
    { id: "future-memory", label: "Brain future memory", detail: "Planned recall feedback" },
  ];

  const edges: MissionSystemEdge[] = [
    buildMissionSystemEdge("operator-home", "stabilization", "Home routes blockers to stabilization", "readonly"),
    buildMissionSystemEdge("operator-home", "chat", "Home routes reviewed handoffs to AI Workspace", "readonly"),
    buildMissionSystemEdge("operator-home", "files", "Home routes file attention to Files", "preview-only"),
    buildMissionSystemEdge("brain", "files", "Context informs file review", "readonly"),
    buildMissionSystemEdge("stabilization", "chat", "Stabilization handoff routes operator review into /ai", "readonly"),
    buildMissionSystemEdge("stabilization", "patch-preview", "Safe Patch Preview remains required before edits", "preview-only"),
    buildMissionSystemEdge("stabilization", "memory", "Memory review posture is context only", "readonly"),
    buildMissionSystemEdge("brain", "chat", "Selected recall cards become visible chat context", "readonly"),
    buildMissionSystemEdge("memory", "chat", "Selected reviewed evidence becomes visible chat grounding", "readonly"),
    buildMissionSystemEdge("brain", "tasks", "Recall signals inform reviewed task suggestions", "readonly"),
    buildMissionSystemEdge("tasks", "chat", "Reviewed Task Activation hands off to /ai", "preview-only"),
    buildMissionSystemEdge("tasks", "memory", "Read-only execution evidence becomes reviewable memory candidates", "preview-only"),
    buildMissionSystemEdge("artifacts", "memory", "Memory candidates enter review queue", "preview-only"),
    buildMissionSystemEdge("memory", "future-memory", "Approved candidates preview memory promotion events", "preview-only"),
    buildMissionSystemEdge("files", "patch-preview", "File workflow prepares previews", "preview-only"),
    buildMissionSystemEdge("patch-preview", "runs", "Preview may become run packet after approval", "approval-required"),
    buildMissionSystemEdge("creative", "artifacts", "Creative plans produce review artifacts", "preview-only"),
    buildMissionSystemEdge("artifacts", "production", "Artifacts bundle into production packs", "approval-required"),
    buildMissionSystemEdge("production", "runs", "Packs can inform guarded run readiness", "approval-required"),
    buildMissionSystemEdge("bridge", "runs", "Bridge handoff requires consent", "guarded-handoff"),
    buildMissionSystemEdge("capabilities", "runs", "Capabilities constrain run choices", "approval-required"),
    buildMissionSystemEdge("runs", "future-memory", "Run outcomes may later inform memory", "guarded-handoff"),
  ];

  return {
    id: "mission-system-map",
    nodes,
    edges,
    summary: summarizeMissionSystemMap(nodes, edges),
  };
}

export function summarizeMissionSystemMap(
  mapOrNodes: MissionSystemMap | MissionSystemNode[],
  maybeEdges?: MissionSystemEdge[]
): string[] {
  const nodes = Array.isArray(mapOrNodes) ? mapOrNodes : mapOrNodes.nodes;
  const edges = maybeEdges ?? (Array.isArray(mapOrNodes) ? [] : mapOrNodes.edges);

  return [
    `${nodes.length} product-system nodes mapped.`,
    `${edges.length} deterministic handoff paths represented.`,
    "This is a product map, not the brain graph schema.",
  ];
}
