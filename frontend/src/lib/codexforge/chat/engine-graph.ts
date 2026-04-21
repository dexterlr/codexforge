import type {
  CodexForgeChatContext,
  CodexForgeDiff,
  CodexForgeExecutionPhase,
  CodexForgeMessage,
  CodexForgeStructuredReply,
} from "../types";
import {
  connectNodes,
  dedupeGraph,
  upsertNode,
  type CodexForgeBrainGraph,
} from "../brain/graph";
import type {
  CodexForgeEngineAnalysis,
  CodexForgeEngineDependencies,
  CodexForgeEnginePlan,
} from "./contracts";
import {
  LIMITS,
  buildStableId,
  clampText,
  getExecutionRequest,
  now,
  resolveExecutionPhase,
  tryJsonStringify,
} from "./engine-shared";

/* ================= HELPERS ================= */

function getProjectIdentity(context: CodexForgeChatContext): string {
  return context.projectName || "CodexForge";
}

function getConversationIdentity(
  context: CodexForgeChatContext,
  analysis: CodexForgeEngineAnalysis
): string {
  return buildStableId(
    "conversation",
    getProjectIdentity(context),
    context.repoPath || context.workspaceRoot || "default",
    analysis.domain
  );
}

function upsertWorkspaceNode(
  graph: CodexForgeBrainGraph,
  context: CodexForgeChatContext
) {
  const label = context.projectName || "CodexForge Workspace";
  const workspaceRoot = context.workspaceRoot || label;
  const nodeId = buildStableId("workspace", workspaceRoot);

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "workspace",
      data: {
        label,
        description: "Primary CodexForge workspace",
        repoPath: context.repoPath,
      },
      meta: {
        status: "active",
        importance: "high",
        sourceRefs: [{ type: "system", id: "workspace" }],
      },
    }),
    () => ({
      data: {
        label,
        description: "Primary CodexForge workspace",
        repoPath: context.repoPath,
      },
      meta: {
        status: "active",
        importance: "high",
      },
    })
  );
}

function upsertProjectNode(
  graph: CodexForgeBrainGraph,
  context: CodexForgeChatContext
) {
  const projectName = getProjectIdentity(context);
  const nodeId = buildStableId("project", projectName);

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "project",
      data: {
        label: projectName,
        description: `${projectName} project`,
        repoPath: context.repoPath,
        workspaceRoot: context.workspaceRoot,
      },
      meta: {
        status: "active",
        importance: "high",
        sourceRefs: [{ type: "system", id: "project" }],
      },
    }),
    () => ({
      data: {
        label: projectName,
        description: `${projectName} project`,
        repoPath: context.repoPath,
        workspaceRoot: context.workspaceRoot,
      },
      meta: {
        status: "active",
        importance: "high",
      },
    })
  );
}

function upsertRepoNode(
  graph: CodexForgeBrainGraph,
  context: CodexForgeChatContext
) {
  if (!context.repoPath) {
    return null;
  }

  const nodeId = buildStableId("repo", context.repoPath);
  const repoLabel =
    context.repoPath.split("\\").filter(Boolean).slice(-2).join("\\") || "Repo";

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "repo",
      data: {
        label: repoLabel,
        repoPath: context.repoPath,
      },
      meta: {
        status: "active",
        importance: "high",
        sourceRefs: [{ type: "system", id: "repo" }],
      },
    }),
    () => ({
      data: {
        label: repoLabel,
        repoPath: context.repoPath,
      },
      meta: {
        status: "active",
        importance: "high",
      },
    })
  );
}

function upsertConversationNode(
  graph: CodexForgeBrainGraph,
  context: CodexForgeChatContext,
  analysis: CodexForgeEngineAnalysis,
  messages: CodexForgeMessage[]
) {
  const nodeId = getConversationIdentity(context, analysis);
  const latestMessageTs =
    messages.length > 0
      ? Math.max(...messages.map((message) => message.ts || 0))
      : now();

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "conversation",
      data: {
        label: `${analysis.projectName} ${analysis.domain} conversation`,
        messageCount: messages.length,
        lastMessageAt: latestMessageTs,
      },
      meta: {
        status: "active",
        importance: "medium",
        sourceRefs: [{ type: "derived", id: nodeId }],
      },
    }),
    () => ({
      data: {
        label: `${analysis.projectName} ${analysis.domain} conversation`,
        messageCount: messages.length,
        lastMessageAt: latestMessageTs,
      },
      meta: {
        status: "active",
        importance: "medium",
      },
    })
  );
}

function upsertMessageNodes(
  graph: CodexForgeBrainGraph,
  conversationId: string,
  messages: CodexForgeMessage[]
): void {
  const recentMessages = messages.slice(-LIMITS.maxGraphMessages);

  for (const message of recentMessages) {
    const nodeId = buildStableId("message", message.id);

    upsertNode(
      graph,
      (node) => node.id === nodeId,
      () => ({
        id: nodeId,
        kind: "message",
        data: {
          label: clampText(`${message.role}: ${message.text}`, 96),
          role: message.role,
          text: message.text,
          source: message.source,
          ts: message.ts,
        },
        meta: {
          status: "done",
          importance: message.role === "assistant" ? "medium" : "low",
          sourceRefs: [{ type: "chat-message", id: message.id }],
        },
      }),
      () => ({
        data: {
          label: clampText(`${message.role}: ${message.text}`, 96),
          role: message.role,
          text: message.text,
          source: message.source,
          ts: message.ts,
        },
        meta: {
          status: "done",
          importance: message.role === "assistant" ? "medium" : "low",
        },
      })
    );

    connectNodes(graph, conversationId, nodeId, "contains");
  }
}

function upsertMemoryNodes(
  graph: CodexForgeBrainGraph,
  workspaceId: string,
  memory: NonNullable<CodexForgeChatContext["memory"]>
): void {
  for (const item of memory.slice(0, LIMITS.maxGraphMemoryItems)) {
    const nodeId = buildStableId("memory", item.id);

    upsertNode(
      graph,
      (node) => node.id === nodeId,
      () => ({
        id: nodeId,
        kind: "memory",
        data: {
          label: clampText(item.content, 72),
          memoryType: item.type,
          content: item.content,
        },
        meta: {
          status: "active",
          importance:
            item.importance !== undefined && item.importance >= 0.75
              ? "high"
              : item.pinned
                ? "high"
                : "medium",
          pinned: item.pinned === true,
          sourceRefs: [{ type: "memory-item", id: item.id }],
        },
      }),
      () => ({
        data: {
          label: clampText(item.content, 72),
          memoryType: item.type,
          content: item.content,
        },
        meta: {
          status: "active",
          importance:
            item.importance !== undefined && item.importance >= 0.75
              ? "high"
              : item.pinned
                ? "high"
                : "medium",
          pinned: item.pinned === true,
        },
      })
    );

    connectNodes(graph, workspaceId, nodeId, "contains");
  }
}

function upsertTaskNode(
  graph: CodexForgeBrainGraph,
  context: CodexForgeChatContext,
  analysis: CodexForgeEngineAnalysis,
  plan: CodexForgeEnginePlan
) {
  const executionRequest = getExecutionRequest(context);

  const taskIdentity =
    executionRequest?.taskId ||
    executionRequest?.taskGoal ||
    context.activePlan?.goal ||
    plan.goal;

  const nodeId = buildStableId("task", analysis.projectName, taskIdentity);
  const totalSteps = context.activePlan?.steps.length ?? plan.nextSteps.length ?? 0;

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "task",
      data: {
        label: clampText(taskIdentity, 96),
        goal: executionRequest?.taskGoal || context.activePlan?.goal || plan.goal,
        domain: analysis.domain,
        currentStep: executionRequest?.stepIndex,
        totalSteps,
        tags: analysis.tags,
      },
      meta: {
        status: executionRequest?.mode === "execute-task-step" ? "active" : "idle",
        importance: "high",
        sourceRefs: executionRequest?.taskId
          ? [{ type: "active-task", id: executionRequest.taskId }]
          : [{ type: "derived", id: nodeId }],
      },
    }),
    () => ({
      data: {
        label: clampText(taskIdentity, 96),
        goal: executionRequest?.taskGoal || context.activePlan?.goal || plan.goal,
        domain: analysis.domain,
        currentStep: executionRequest?.stepIndex,
        totalSteps,
        tags: analysis.tags,
      },
      meta: {
        status: executionRequest?.mode === "execute-task-step" ? "active" : "idle",
        importance: "high",
      },
    })
  );
}

function upsertPlanNode(
  graph: CodexForgeBrainGraph,
  analysis: CodexForgeEngineAnalysis,
  plan: CodexForgeEnginePlan,
  structured: CodexForgeStructuredReply
) {
  const planIdentity = tryJsonStringify({
    goal: structured.plan?.goal ?? plan.goal,
    domain: structured.plan?.domain ?? analysis.domain,
    intent: analysis.intent,
  });

  const nodeId = buildStableId("plan", planIdentity);

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "plan",
      data: {
        label: clampText(structured.title || plan.goal, 96),
        goal: structured.plan?.goal ?? plan.goal,
        domain: structured.plan?.domain ?? analysis.domain,
        stepCount: structured.plan?.steps.length ?? plan.nextSteps.length,
        nextAction: structured.plan?.nextAction,
        risks: structured.plan?.risks,
        files: structured.plan?.files,
        commands: structured.plan?.commands,
        tags: structured.plan?.tags,
      },
      meta: {
        status:
          structured.plan?.status === "executed"
            ? "done"
            : structured.plan?.status === "blocked"
              ? "blocked"
              : "active",
        importance: "high",
        sourceRefs: [{ type: "derived", id: nodeId }],
      },
    }),
    () => ({
      data: {
        label: clampText(structured.title || plan.goal, 96),
        goal: structured.plan?.goal ?? plan.goal,
        domain: structured.plan?.domain ?? analysis.domain,
        stepCount: structured.plan?.steps.length ?? plan.nextSteps.length,
        nextAction: structured.plan?.nextAction,
        risks: structured.plan?.risks,
        files: structured.plan?.files,
        commands: structured.plan?.commands,
        tags: structured.plan?.tags,
      },
      meta: {
        status:
          structured.plan?.status === "executed"
            ? "done"
            : structured.plan?.status === "blocked"
              ? "blocked"
              : "active",
        importance: "high",
      },
    })
  );
}

function resolveStepNodeStatus(args: {
  index: number;
  currentStepIndex?: number;
  executionStepIndex?: number;
  executionPhase?: CodexForgeExecutionPhase;
}): "idle" | "active" | "done" | "error" {
  const {
    index,
    currentStepIndex,
    executionStepIndex,
    executionPhase,
  } = args;

  if (typeof executionStepIndex === "number" && index === executionStepIndex) {
    return executionPhase === "error" ? "error" : "active";
  }

  if (typeof currentStepIndex === "number") {
    if (index < currentStepIndex) return "done";
    if (index === currentStepIndex) return "active";
    return "idle";
  }

  return index === 0 ? "active" : "idle";
}

function upsertStepNodes(
  graph: CodexForgeBrainGraph,
  planNodeId: string,
  taskNodeId: string | null,
  structured: CodexForgeStructuredReply,
  context: CodexForgeChatContext
): void {
  const steps = structured.plan?.steps ?? structured.nextSteps ?? [];
  const currentStepIndex = getExecutionRequest(context)?.stepIndex;
  const executionStepIndex = structured.execution?.stepIndex;
  const executionPhase = structured.execution?.phase;

  steps.slice(0, LIMITS.maxGraphSteps).forEach((step, index) => {
    const nodeId = buildStableId("step", planNodeId, index, step);

    const isCurrentExecutionStep = executionStepIndex === index;
    const status = resolveStepNodeStatus({
      index,
      currentStepIndex,
      executionStepIndex,
      executionPhase,
    });

    const stepNode = upsertNode(
      graph,
      (node) => node.id === nodeId,
      () => ({
        id: nodeId,
        kind: "step",
        data: {
          label: clampText(step, 84),
          text: step,
          stepIndex: index,
          result: isCurrentExecutionStep
            ? structured.execution?.resultSummary
            : undefined,
        },
        meta: {
          status,
          importance: index === currentStepIndex || index === 0 ? "high" : "medium",
          sourceRefs: [{ type: "derived", id: nodeId }],
        },
      }),
      () => ({
        data: {
          label: clampText(step, 84),
          text: step,
          stepIndex: index,
          result: isCurrentExecutionStep
            ? structured.execution?.resultSummary
            : undefined,
        },
        meta: {
          status,
          importance: index === currentStepIndex || index === 0 ? "high" : "medium",
        },
      })
    );

    connectNodes(graph, planNodeId, stepNode.id, "contains");

    if (taskNodeId) {
      connectNodes(graph, taskNodeId, stepNode.id, "contains");
      if (
        index === (typeof currentStepIndex === "number" ? currentStepIndex : 0)
      ) {
        connectNodes(graph, taskNodeId, stepNode.id, "next_for");
      }
    }
  });
}

function upsertTagNodes(
  graph: CodexForgeBrainGraph,
  ownerNodeIds: string[],
  tags: string[] | undefined
): void {
  for (const tag of tags ?? []) {
    const nodeId = buildStableId("tag", tag);

    upsertNode(
      graph,
      (node) => node.id === nodeId,
      () => ({
        id: nodeId,
        kind: "tag",
        data: {
          label: tag,
          value: tag,
        },
        meta: {
          status: "active",
          importance: "low",
          sourceRefs: [{ type: "derived", id: nodeId }],
        },
      }),
      () => ({
        data: {
          label: tag,
          value: tag,
        },
        meta: {
          status: "active",
          importance: "low",
        },
      })
    );

    for (const ownerNodeId of ownerNodeIds) {
      connectNodes(graph, ownerNodeId, nodeId, "tagged_with");
    }
  }
}

function upsertRunNode(
  graph: CodexForgeBrainGraph,
  context: CodexForgeChatContext,
  analysis: CodexForgeEngineAnalysis,
  structured: CodexForgeStructuredReply
) {
  if (!structured.execution) {
    return null;
  }

  const executionRequest = getExecutionRequest(context);
  const phase = structured.execution.phase ?? resolveExecutionPhase(context);

  const nodeId = buildStableId(
    "run",
    analysis.projectName,
    executionRequest?.taskId ||
      executionRequest?.taskGoal ||
      analysis.userText ||
      structured.summary ||
      "run",
    executionRequest?.stepIndex,
    phase
  );

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "run",
      data: {
        label: clampText(structured.title || "Execution run", 96),
        phase,
        resultSummary: structured.execution?.resultSummary,
        diffCount: structured.execution?.diffCount,
        snapshotFileCount: structured.execution?.snapshotFileCount,
      },
      meta: {
        status:
          phase === "done"
            ? "done"
            : phase === "error"
              ? "error"
              : phase === "fallback"
                ? "blocked"
                : "active",
        importance: "high",
        sourceRefs: executionRequest?.taskId
          ? [{ type: "execution-state", id: executionRequest.taskId }]
          : [{ type: "derived", id: nodeId }],
      },
    }),
    () => ({
      data: {
        label: clampText(structured.title || "Execution run", 96),
        phase,
        resultSummary: structured.execution?.resultSummary,
        diffCount: structured.execution?.diffCount,
        snapshotFileCount: structured.execution?.snapshotFileCount,
      },
      meta: {
        status:
          phase === "done"
            ? "done"
            : phase === "error"
              ? "error"
              : phase === "fallback"
                ? "blocked"
                : "active",
        importance: "high",
      },
    })
  );
}

function upsertSnapshotNode(
  graph: CodexForgeBrainGraph,
  runNodeId: string,
  structured: CodexForgeStructuredReply
) {
  const snapshot = structured.snapshot;
  if (!snapshot) {
    return null;
  }

  const snapshotIdentity = tryJsonStringify({
    runNodeId,
    fileCount: snapshot.fileCount,
    sampledPaths: snapshot.sampledPaths,
  });

  const nodeId = buildStableId("snapshot", snapshotIdentity);

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "snapshot",
      data: {
        label: `Snapshot (${snapshot.fileCount} files)`,
        fileCount: snapshot.fileCount,
        sampledPaths: snapshot.sampledPaths.slice(0, LIMITS.maxSampledPaths),
      },
      meta: {
        status: "done",
        importance: "medium",
        sourceRefs: [{ type: "derived", id: nodeId }],
      },
    }),
    () => ({
      data: {
        label: `Snapshot (${snapshot.fileCount} files)`,
        fileCount: snapshot.fileCount,
        sampledPaths: snapshot.sampledPaths.slice(0, LIMITS.maxSampledPaths),
      },
      meta: {
        status: "done",
        importance: "medium",
      },
    })
  );
}

function upsertDiffNodes(
  graph: CodexForgeBrainGraph,
  runNodeId: string,
  diffs: CodexForgeDiff[] | undefined
): string[] {
  const diffNodes: string[] = [];

  for (const diff of (diffs ?? []).slice(0, LIMITS.maxGraphDiffs)) {
    const nodeId = buildStableId("diff", runNodeId, diff.filePath);

    const diffNode = upsertNode(
      graph,
      (node) => node.id === nodeId,
      () => ({
        id: nodeId,
        kind: "diff",
        data: {
          label: diff.filePath,
          filePath: diff.filePath,
          patchPreview: clampText(diff.patch, 240),
        },
        meta: {
          status: "done",
          importance: "medium",
          sourceRefs: [{ type: "derived", id: nodeId }],
        },
      }),
      () => ({
        data: {
          label: diff.filePath,
          filePath: diff.filePath,
          patchPreview: clampText(diff.patch, 240),
        },
        meta: {
          status: "done",
          importance: "medium",
        },
      })
    );

    diffNodes.push(diffNode.id);
    connectNodes(graph, runNodeId, diffNode.id, "produced");
  }

  return diffNodes;
}

/* ================= PUBLIC ================= */

export function persistBrainGraph(args: {
  deps: CodexForgeEngineDependencies;
  messages: CodexForgeMessage[];
  context: CodexForgeChatContext;
  analysis: CodexForgeEngineAnalysis;
  plan: CodexForgeEnginePlan;
  structured: CodexForgeStructuredReply;
}): void {
  const snapshot = args.deps.brainGraph.load();
  const graph = snapshot.graph;

  const workspaceNode = upsertWorkspaceNode(graph, args.context);
  const projectNode = upsertProjectNode(graph, args.context);
  const repoNode = upsertRepoNode(graph, args.context);
  const conversationNode = upsertConversationNode(
    graph,
    args.context,
    args.analysis,
    args.messages
  );

  connectNodes(graph, workspaceNode.id, projectNode.id, "contains");
  connectNodes(graph, projectNode.id, conversationNode.id, "contains");

  if (repoNode) {
    connectNodes(graph, projectNode.id, repoNode.id, "contains");
    connectNodes(graph, conversationNode.id, repoNode.id, "about");
  }

  upsertMessageNodes(graph, conversationNode.id, args.messages);

  if (args.context.memory?.length) {
    upsertMemoryNodes(graph, workspaceNode.id, args.context.memory);
  }

  const taskNode = upsertTaskNode(graph, args.context, args.analysis, args.plan);
  connectNodes(graph, conversationNode.id, taskNode.id, "relates_to");
  connectNodes(graph, projectNode.id, taskNode.id, "contains");

  const planNode = upsertPlanNode(graph, args.analysis, args.plan, args.structured);
  connectNodes(graph, conversationNode.id, planNode.id, "summarizes");
  connectNodes(graph, taskNode.id, planNode.id, "contains");
  connectNodes(graph, planNode.id, taskNode.id, "about");

  upsertStepNodes(graph, planNode.id, taskNode.id, args.structured, args.context);

  const tagOwners = [workspaceNode.id, projectNode.id, taskNode.id, planNode.id];
  upsertTagNodes(graph, tagOwners, args.structured.tags);

  const runNode = upsertRunNode(graph, args.context, args.analysis, args.structured);
  if (runNode) {
    connectNodes(graph, taskNode.id, runNode.id, "executed_in");
    connectNodes(graph, planNode.id, runNode.id, "generated_by");

    const snapshotNode = upsertSnapshotNode(graph, runNode.id, args.structured);
    if (snapshotNode) {
      connectNodes(graph, runNode.id, snapshotNode.id, "produced");
    }

    upsertDiffNodes(graph, runNode.id, args.structured.diffs);
  }

  const deduped = dedupeGraph(graph);
  args.deps.brainGraph.save(deduped);
}