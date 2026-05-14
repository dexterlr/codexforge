import type { ArtifactPlan, ArtifactPlanItem, ArtifactType } from "./artifact-types";

const DEFAULT_ITEMS: Array<Omit<ArtifactPlanItem, "id">> = [
  {
    type: "patch-plan-markdown",
    title: "Safe Patch Preview handoff",
    targetPlaceholderPath: "preview://artifacts/patch-plan.md",
    sourceSurface: "Safe Patch Preview",
    previewLanguage: "markdown",
    intent: "Convert a reviewed patch plan into markdown for operator review.",
    blockedActions: ["source mutation blocked", "apply step blocked"],
  },
  {
    type: "storyboard-markdown",
    title: "Creative storyboard preview",
    targetPlaceholderPath: "preview://artifacts/storyboard.md",
    sourceSurface: "Creative Production Studio",
    previewLanguage: "markdown",
    intent: "Represent creative beats without rendering images or video.",
    blockedActions: ["external app execution blocked", "render execution blocked"],
  },
  {
    type: "blender-script-preview",
    title: "Blender script text preview",
    targetPlaceholderPath: "preview://artifacts/blender-scene.py.txt",
    sourceSurface: "Creative Production Studio",
    previewLanguage: "text",
    intent: "Show a script-shaped artifact as inert text only.",
    blockedActions: ["Blender execution blocked", "command execution blocked"],
  },
  {
    type: "comfyui-workflow-json",
    title: "ComfyUI workflow JSON preview",
    targetPlaceholderPath: "preview://artifacts/comfyui-workflow.json",
    sourceSurface: "Creative Production Studio",
    previewLanguage: "json",
    intent: "Preview workflow data without contacting or launching ComfyUI.",
    blockedActions: ["ComfyUI execution blocked", "external service call blocked"],
  },
  {
    type: "unreal-command-preview",
    title: "Unreal command preview",
    targetPlaceholderPath: "preview://artifacts/unreal-command.txt",
    sourceSurface: "Operator Run Center",
    previewLanguage: "text",
    intent: "Describe a future Unreal command without executing it.",
    blockedActions: ["Unreal execution blocked", "command execution blocked"],
  },
  {
    type: "render-queue-manifest",
    title: "Render queue manifest",
    targetPlaceholderPath: "preview://artifacts/render-queue.json",
    sourceSurface: "Operator Run Center",
    previewLanguage: "json",
    intent: "Preview queue metadata without rendering video.",
    blockedActions: ["video render blocked", "external app execution blocked"],
  },
  {
    type: "run-summary-markdown",
    title: "Operator run summary",
    targetPlaceholderPath: "preview://artifacts/run-summary.md",
    sourceSurface: "Operator Run Center",
    previewLanguage: "markdown",
    intent: "Summarize the run path before any future approval gate.",
    blockedActions: ["execution blocked", "source mutation blocked"],
  },
  {
    type: "research-summary",
    title: "Research summary preview",
    targetPlaceholderPath: "preview://artifacts/research-summary.md",
    sourceSurface: "Brain runtime",
    previewLanguage: "markdown",
    intent: "Preview local-first research notes without network calls.",
    blockedActions: ["external network dependency blocked"],
  },
  {
    type: "generic-artifact-preview",
    title: "Generic artifact preview",
    targetPlaceholderPath: "preview://artifacts/generic.txt",
    sourceSurface: "Files command center",
    previewLanguage: "text",
    intent: "Carry arbitrary preview text through the guarded executor.",
    blockedActions: ["file write blocked until approval", "source mutation blocked"],
  },
];

export function buildArtifactPlanItem(
  input: Partial<ArtifactPlanItem> & Pick<ArtifactPlanItem, "type" | "title">,
  index = 0
): ArtifactPlanItem {
  return {
    id: input.id ?? `artifact-plan-item-${index + 1}`,
    type: input.type,
    title: input.title,
    targetPlaceholderPath:
      input.targetPlaceholderPath ?? `preview://artifacts/${input.type}`,
    sourceSurface: input.sourceSurface ?? "Operator Run Center",
    previewLanguage: input.previewLanguage ?? inferPreviewLanguage(input.type),
    intent: input.intent ?? "Generate a deterministic preview artifact.",
    blockedActions: input.blockedActions ?? [
      "source mutation blocked",
      "command execution blocked",
      "external app execution blocked",
    ],
  };
}

export function buildArtifactPlan(items?: ArtifactPlanItem[]): ArtifactPlan {
  const planItems =
    items ??
    DEFAULT_ITEMS.map((item, index) =>
      buildArtifactPlanItem({ ...item }, index)
    );
  const plan: ArtifactPlan = {
    id: "artifact-plan-phase-10",
    title: "Guarded Local Artifact Executor plan",
    mode: "preview-only",
    items: planItems,
    summary: [],
    nextAction: "",
  };

  return {
    ...plan,
    summary: summarizeArtifactPlan(plan),
    nextAction: selectNextArtifactAction(plan),
  };
}

export function summarizeArtifactPlan(plan: ArtifactPlan): string[] {
  return [
    `${plan.items.length} deterministic artifact previews prepared.`,
    "preview-only pipeline; no source mutation, command execution, external app launch, or broker execution.",
    "future writes or execution must pass approval, Operator Run Center, and Local Bridge consent where relevant.",
  ];
}

export function selectNextArtifactAction(plan: ArtifactPlan): string {
  const blocked = plan.items.some((item) => item.blockedActions.length > 0);
  return blocked
    ? "Review policy boundary and validation notes before any future approval request."
    : "Continue preview review; no execution path is available from this surface.";
}

function inferPreviewLanguage(type: ArtifactType): ArtifactPlanItem["previewLanguage"] {
  if (type.includes("json") || type === "render-queue-manifest") return "json";
  if (type.includes("markdown") || type === "research-summary") return "markdown";
  return "text";
}
