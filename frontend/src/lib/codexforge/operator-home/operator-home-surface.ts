import type { OperatorHomeCapability, OperatorHomeSurface } from "./operator-home-types";
import { buildOperatorHomeStableKey } from "./operator-home-types";

export function buildOperatorHomeCapability(args: {
  title: string;
  detail: string;
  posture: OperatorHomeCapability["posture"];
  tags: string[];
}): OperatorHomeCapability {
  return {
    id: buildOperatorHomeStableKey("operator-home-capability", args.title),
    title: args.title,
    detail: args.detail,
    posture: args.posture,
    tags: [...args.tags],
  };
}

export function buildOperatorHomeSurface(): OperatorHomeSurface {
  const capabilities: OperatorHomeCapability[] = [
    buildOperatorHomeCapability({
      title: "Cognitive runtime",
      detail:
        "Brain runtime, recall context, graph review, and memory evidence are visible as local-first operator context.",
      posture: "readonly",
      tags: ["Brain runtime", "recall", "review"],
    }),
    buildOperatorHomeCapability({
      title: "Engineering workspace",
      detail:
        "AI Workspace, Files Command Center, Tasks, patch preview queues, and apply gates stay link-driven from Home.",
      posture: "preview-only",
      tags: ["AI Workspace", "Files", "Tasks"],
    }),
    buildOperatorHomeCapability({
      title: "Creative production workspace",
      detail:
        "Creative Production Studio and Capability Cockpit are reachable for preview planning, artifact flow, and policy review.",
      posture: "preview-only",
      tags: ["Creative", "Capabilities", "artifacts"],
    }),
    buildOperatorHomeCapability({
      title: "Safe patch and apply workflow",
      detail:
        "Patch Preview, Preview Diff Composer, Patch Application Gate, dry run, and execution gate remain review surfaces only.",
      posture: "approval-required",
      tags: ["Safe Patch Preview", "apply gate", "dry run"],
    }),
    buildOperatorHomeCapability({
      title: "Stabilization workflow",
      detail:
        "Stabilization Command Center is the first route for blockers, verification signals, regression triage, and fix queue posture.",
      posture: "readonly",
      tags: ["Stabilization", "verification", "regression"],
    }),
  ];

  const surface: OperatorHomeSurface = {
    id: "operator-home-surface",
    identity: "CodexForge",
    title: "Operator Home Dashboard",
    subtitle:
      "Jarvis-level AI engineering workspace command deck for read-only launch, status review, and safe next action selection.",
    posture:
      "local-first, operator-safe, deterministic, link-driven, no auto-fix, no auto-run, and no source mutation from Home.",
    capabilities,
    principles: [
      "Read current posture before opening a workflow surface.",
      "Launch review surfaces through links only.",
      "Keep no command execution without approval visible.",
      "Keep no file writes without approval visible.",
      "Preserve latest-message authority for every handoff prompt.",
      "Keep Brain graph and memory promotion mutation outside Home.",
    ],
    nextAction:
      "Select the safest visible route: stabilize blockers first, then review queues, verification, files, memory, or creative flow.",
    summary: [],
  };

  return {
    ...surface,
    summary: summarizeOperatorHomeSurface(surface),
  };
}

export function summarizeOperatorHomeSurface(
  surface: Pick<OperatorHomeSurface, "identity" | "capabilities" | "posture" | "nextAction">
): string[] {
  return [
    `${surface.identity} Home is a local-first operator launch dashboard.`,
    `${surface.capabilities.length} command-deck capabilities are visible.`,
    `Safety posture: ${surface.posture}`,
    `Next action policy: ${surface.nextAction}`,
  ];
}
