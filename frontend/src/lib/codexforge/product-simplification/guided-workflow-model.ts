import type { GuidedWorkflow, GuidedWorkflowStep } from "./product-simplification-types";

export function buildGuidedWorkflowStep(input: GuidedWorkflowStep): GuidedWorkflowStep {
  return { ...input };
}

export function buildGuidedWorkflow(input: GuidedWorkflow): GuidedWorkflow {
  return { ...input, steps: input.steps.map(buildGuidedWorkflowStep) };
}

export function buildDefaultGuidedWorkflows(): GuidedWorkflow[] {
  return [
    buildGuidedWorkflow({
      id: "code-fix-workflow",
      title: "Code Fix Workflow",
      description: "Move from a file inspection to a reviewed fix and validation loop.",
      currentStep: "Inspect project files",
      steps: [
        { id: "real-coding-flow", label: "Real coding flow", route: "/code-flow", description: "Fix code safely from file selection through result review.", safety: ["Review first", "Approval required"] },
        { id: "files", label: "Files", route: "/files", description: "Inspect the file first.", safety: ["No file writes"] },
        { id: "preview", label: "Real Patch Preview", route: "/code-flow", description: "Prepare a preview diff.", safety: ["Preview only"] },
        { id: "apply", label: "Approved Patch Apply", route: "/code-flow", description: "Review approval packet before apply.", safety: ["Approval required"] },
        { id: "validation", label: "Validation Runner", route: "/validation", description: "Prepare checks.", safety: ["No auto-run"] },
        { id: "closed-loop", label: "Closed Loop", route: "/closed-loop", description: "Review failures and next fix.", safety: ["Review first"] },
      ],
      primaryAction: "Start code fix",
      secondaryAction: "Inspect files",
      advancedDetailsSummary: "Patch preview, apply request, validation routing, and closed-loop evidence remain separate technical details.",
      safetySummary: "Review first, approval required, no auto-run.",
      routeTargets: ["/code-flow", "/files", "/validation", "/closed-loop"],
    }),
    buildGuidedWorkflow({
      id: "validation-workflow",
      title: "Validation Workflow",
      description: "Prepare checks, ingest output, triage failures, and queue fixes.",
      currentStep: "Prepare checks",
      steps: [
        { id: "validation", label: "Validation Runner", route: "/validation", description: "Choose checks.", safety: ["Approval required"] },
        { id: "ingestion", label: "Verification Ingestion", route: "/validation", description: "Bring output back.", safety: ["Review first"] },
        { id: "triage", label: "Regression Triage", route: "/closed-loop", description: "Classify failures.", safety: ["Preview only"] },
        { id: "fix-queue", label: "Fix Queue", route: "/closed-loop", description: "Choose the next repair.", safety: ["Review first"] },
      ],
      primaryAction: "Start validation",
      secondaryAction: "Review a failure",
      advancedDetailsSummary: "Allowlists, policy checks, output routing, and triage cards stay collapsed until needed.",
      safetySummary: "Approval required before execution; pasted output is reviewed before routing.",
      routeTargets: ["/validation", "/closed-loop"],
    }),
    buildGuidedWorkflow({
      id: "creative-planning-workflow",
      title: "Creative Planning Workflow",
      description: "Choose a creative path and review the expected artifact before execution planning.",
      currentStep: "Plan creative work",
      steps: [
        { id: "studio", label: "Creative Studio", route: "/creative", description: "Pick the creative path.", safety: ["Preview only"] },
        { id: "adapters", label: "Blender/ComfyUI/Unreal Preview", route: "/blender", description: "Review tool-specific plans.", safety: ["No auto-run"] },
        { id: "video", label: "Video Render Preview", route: "/video-render", description: "Review render queue intent.", safety: ["Preview only"] },
        { id: "review", label: "Artifact Review", route: "/artifacts/review", description: "Review outputs and provenance.", safety: ["Review first"] },
      ],
      primaryAction: "Start creative plan",
      secondaryAction: "Review artifacts",
      advancedDetailsSummary: "Adapter packets and future executor plans stay behind advanced details.",
      safetySummary: "Preview only; no Blender, ComfyUI, Unreal, ffmpeg, or render execution from UI.",
      routeTargets: ["/creative", "/blender", "/comfyui", "/unreal", "/video-render", "/artifacts/review"],
    }),
    buildGuidedWorkflow({
      id: "creative-execution-readiness-workflow",
      title: "Creative Execution Readiness Workflow",
      description: "Check setup and MVP readiness before any real creative executor work.",
      currentStep: "Check setup",
      steps: [
        { id: "bridge", label: "Local Bridge Health", route: "/local-bridge-health", description: "Review setup gaps.", safety: ["Review first"] },
        { id: "probe", label: "Health Probe", route: "/health-probe", description: "Prepare metadata-only probe review.", safety: ["No auto-run"] },
        { id: "readiness", label: "Creative Readiness", route: "/creative-readiness", description: "Audit boundaries.", safety: ["Preview only"] },
        { id: "mvp", label: "Creative MVP", route: "/creative-mvp", description: "Review the recommended candidate.", safety: ["Design only"] },
      ],
      primaryAction: "Setup local tools",
      secondaryAction: "Review creative MVP",
      advancedDetailsSummary: "Allowlists, path boundaries, probe policy, and kill-switch details stay collapsed.",
      safetySummary: "Design-only and approval required; no real execution.",
      routeTargets: ["/local-bridge-health", "/health-probe", "/creative-readiness", "/creative-mvp"],
    }),
    buildGuidedWorkflow({
      id: "artifact-review-workflow",
      title: "Artifact Review Workflow",
      description: "Review artifact quality, provenance, safety, and handoff.",
      currentStep: "Review artifact",
      steps: [
        { id: "review", label: "Artifact Review", route: "/artifacts/review", description: "Inspect the artifact.", safety: ["Review first"] },
        { id: "provenance", label: "Provenance", route: "/artifacts/review", description: "Check source and metadata.", safety: ["Preview only"] },
        { id: "safety", label: "Safety", route: "/artifacts/review", description: "Confirm boundaries.", safety: ["Approval required"] },
        { id: "handoff", label: "Handoff", route: "/artifacts/review", description: "Prepare next step.", safety: ["No auto-run"] },
      ],
      primaryAction: "Review artifact",
      secondaryAction: "Plan creative work",
      advancedDetailsSummary: "Provenance, policy, and handoff packets stay secondary.",
      safetySummary: "Review first; artifact handoffs do not execute work.",
      routeTargets: ["/artifacts/review", "/creative"],
    }),
  ];
}

export function summarizeGuidedWorkflow(workflow: GuidedWorkflow): string {
  return `${workflow.title}: ${workflow.steps.length} steps. Primary action: ${workflow.primaryAction}. ${workflow.safetySummary}`;
}
