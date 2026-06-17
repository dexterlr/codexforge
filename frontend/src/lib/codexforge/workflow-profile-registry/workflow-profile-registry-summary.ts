import type { WorkflowProfileRegistry, WorkflowProfileRegistryBoundary, WorkflowProfileRegistryModel } from "./workflow-profile-registry-types";
import { buildWorkflowProfileRegistryStableKey } from "./workflow-profile-registry-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const WORKFLOW_PROFILE_REGISTRY_LANGUAGE = [
  "Workflow profile registry",
  "Workflow profile registry does not execute workflow profiles",
  "Profile execution requires explicit operator approval",
  "Unresolved workflow profile blockers stay blocked",
  "Profile groups",
  "Video-call meeting profile",
] as const;

export function buildWorkflowProfileRegistry(input: Omit<WorkflowProfileRegistry, "id"> & { idHint: string }): WorkflowProfileRegistry {
  const { idHint, ...registry } = input;
  return { id: buildWorkflowProfileRegistryStableKey("workflow-profile-registry", idHint, input.status), ...registry };
}

export function buildWorkflowProfileRegistries(): WorkflowProfileRegistry[] {
  return [
    buildWorkflowProfileRegistry({
      idHint: "workflow-profile-registry",
      status: "blocked",
      identity: "Workflow profile registry identity: workflow-profile-registry lists workflow profiles without executing them, calling providers/tools/connectors, writing files, creating automations, or starting runtimes.",
      sections: [
        { label: "Profile groups", items: ["Profile groups: creative/video, research/live research, chatbot/agent, game/server, monitoring/automation, video-call/meeting, coding/project, connector workflow, evidence/result/recovery/export, and handoff profiles."] },
        { label: "Creative/video profile", items: ["Creative/video profile: image, video, 3D, storyboard, provider/model, local runtime/tool, evidence, result, recovery, and export readiness without generation."] },
        { label: "Research/live research profile", items: ["Research/live research profile: static research, live research, source/citation, connector/web/search, evidence, result, recovery, and export readiness without browsing/searching/fetching."] },
        { label: "Chatbot/agent profile", items: ["Chatbot/agent profile: persona, policy, knowledge, tool access, test conversation, deployment/export readiness without creating or deploying chatbots/agents."] },
        { label: "Game/server profile", items: ["Game/server profile: original fantasy server, project scaffold, file template, command/runtime, validation/package, and copyright/trademark safety readiness without building servers."] },
        { label: "Monitoring/automation profile", items: ["Monitoring/automation profile: schedules, watches, conditions, notifications, pause, stop, evidence, and recovery readiness without creating monitoring jobs."] },
        { label: "Video-call meeting profile", items: ["Video-call meeting profile: preparation, connector scope, meeting note, summary, action item, evidence, result, and privacy readiness without joining or monitoring video calls."] },
        { label: "Denied profile actions", items: ["Denied profile actions: execute profiles, call tools, call providers, call connectors, run commands, write files, create automations, join video calls, monitor jobs, or persist profile decisions from UI."] },
        { label: "Unresolved profile blockers", items: ["Unresolved workflow profile blockers stay blocked: missing file, command, runtime, provider/model, connector, automation, evidence, result, recovery, export, credential, and audit boundaries."] },
      ],
      routes: ["/creative-workflow-profile", "/research-workflow-profile", "/chatbot-workflow-profile", "/game-server-workflow-profile"],
      nextRecommendedAction: "Next recommended action: choose a workflow profile for review, keep execution blocked, and approve nothing until the required execution boundaries are implemented and evidenced.",
      advancedDetails: `Advanced workflow profile registry details: Workflow profile registry does not execute workflow profiles. Profile execution requires explicit operator approval. Unresolved workflow profile blockers stay blocked. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildWorkflowProfileRegistryBoundary(): WorkflowProfileRegistryBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeWorkflowProfileRegistry(model: Pick<WorkflowProfileRegistryModel, "workflowProfileRegistries">): string {
  return "Workflow profile registry lists " + model.workflowProfileRegistries.length + " workflow profile registry packet without executing workflow profiles. Profile execution requires explicit operator approval, and unresolved workflow profile blockers stay blocked.";
}

export function buildWorkflowProfileRegistryModel(): WorkflowProfileRegistryModel {
  const workflowProfileRegistries = buildWorkflowProfileRegistries();
  const model: WorkflowProfileRegistryModel = {
    title: "Workflow profile registry",
    summary: "",
    reviewPackets: workflowProfileRegistries,
    workflowProfileRegistries,
    boundary: buildWorkflowProfileRegistryBoundary(),
    language: [...WORKFLOW_PROFILE_REGISTRY_LANGUAGE],
    advancedDetails: [
      "Workflow profile registry identity",
      "Profile groups",
      "Creative/video profile",
      "Research/live research profile",
      "Chatbot/agent profile",
      "Game/server profile",
      "Monitoring/automation profile",
      "Video-call/meeting profile",
      "Denied profile actions",
      "Unresolved profile blockers",
      "Creative profile route",
      "Research profile route",
      "Chatbot profile route",
      "Game server profile route",
      "Next recommended action",
      "advanced workflow profile registry details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeWorkflowProfileRegistry(model) };
}
