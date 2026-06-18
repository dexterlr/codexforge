import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildAdapterBackedExecutionPreviewStableKey as buildCommandRunnerAdapterPreviewStableKey } from "../adapter-backed-execution-preview-kit";
import {
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildCommandRunnerAdapterPreviewStableKey };

export const COMMAND_RUNNER_ADAPTER_PREVIEW_LANGUAGE = [
  "Command Runner Adapter Preview",
  "Command runner adapter preview does not run commands",
  "Command runner execution requires explicit operator approval",
  "Adapter-backed shape",
  "Preview only",
  "Not executed",
  "Approval required",
  "What this unlocks later",
  "Command",
  "Working directory",
  "Env/secrets handling",
  "Timeout",
  "Stdout/stderr",
  "Exit code",
  "Recovery plan",
  "Denied actions",
] as const;

const COMMAND_RUNNER_ADAPTER_PREVIEW_ADVANCED_DETAILS = [
  "Command runner adapter preview identity",
  "Command",
  "Working directory",
  "Env/secrets handling",
  "Timeout",
  "Stdout/stderr",
  "Exit code",
  "Recovery plan",
  "Denied actions",
  "Unresolved blockers",
  "Next recommended action",
  "advanced command runner adapter preview details collapsed/secondary",
  "no live adapter implementation",
  "no adapter execution",
  "no adapter preview execution",
  "no project scaffold creation",
  "no file write/delete/mutation",
  "no command execution",
  "no local runtime start/stop",
  "no provider/model calls",
  "no prompt sending",
  "no connector access/fetch/mutation",
  "no automation/schedule/reminder/task/watch creation",
  "no evidence capture/ingestion/storage",
  "no output/result storage or reuse",
  "no recovery/retry trigger",
  "no package/export/write behavior",
  "no creative/video/image/3D generation",
  "no research browsing/searching/fetching",
  "no chatbot/agent creation/deployment",
  "no video-call joining/monitoring",
  "no monitoring job creation",
  "no Minecraft/project/server build or launch execution",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "no approval automation",
  "no approval decision persistence",
  "no policy/settings/preference persistence",
  "no web/search/GitHub API calls from UI",
  "no arbitrary project scanning/local file browsing/path crawling",
  "no memory/RAG ingestion or memory auto-promotion",
  "no Brain graph mutation",
  "no plugin/tool/agent/MCP execution",
  "no credential/key/token/endpoint/output storage",
  "no process.env printing",
  "no route coverage removal",
  "no duplicate route hrefs or shortLabels",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "checkpoint documentation smoke still exists and remains registered",
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake",
] as const;

export function buildCommandRunnerAdapterPreview(input: AdapterBackedExecutionPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview("command-runner-adapter-preview", input);
}

export function buildCommandRunnerAdapterPreviews(): UniversalExecutionReviewPacket[] {
  return [
    buildCommandRunnerAdapterPreview({
      idHint: "command-runner-adapter-preview",
      status: "blocked",
      identity: "Command runner adapter preview identity: Command runner adapter preview does not run commands. Command runner execution requires explicit operator approval, and this surface shows the adapter-backed shape only; it is preview only and not executed.",
      sections: buildAdapterBackedExecutionPreviewSections(
        { label: "Command", items: ["Command: show the executable, arguments, purpose, expected output, forbidden side effects, and risk note as text only; no shell, git, test, build, smoke, package, or server command runs."] },
        { label: "Working directory", items: ["Working directory: preview the fixed workspace root, path boundary, no hidden directory change, no parent traversal, and no external repository target."] },
        { label: "Env/secrets handling", items: ["Env/secrets handling: show redaction expectations, secret exclusion, no process environment printing, no token display, and no credential injection from UI."] },
        { label: "Timeout", items: ["Timeout: preview maximum runtime, cancellation expectation, long-running process rule, retry limit, and blocked-state handling."] },
        { label: "Stdout/stderr", items: ["Stdout/stderr: preview redaction, truncation, evidence routing, and operator review for future outputs without capturing output now."] },
        { label: "Exit code", items: ["Exit code: preview success, warning, failure, timeout, denied, and blocked states without starting a next action automatically."] },
        { label: "Recovery plan", items: ["Recovery plan: preview retry, cleanup, rollback, and escalation requirements without triggering recovery or retry."] },
        { label: "Denied actions", items: ["Denied actions: no command execution, shell execution, git execution, test/build/smoke execution, package tools, server launch, output storage, retry trigger, or approval persistence from UI."] },
      ),
      routes: ["/adapter-backed-execution-preview-inventory", "/local-runtime-adapter-preview", "/recovery-adapter-preview"],
      nextRecommendedAction: "Next recommended action: keep command execution blocked while command, directory, secrets, timeout, stdout/stderr, exit-code, and recovery previews are reviewed.",
      advancedDetails: buildAdapterBackedExecutionPreviewAdvancedDetails("command runner adapter preview", COMMAND_RUNNER_ADAPTER_PREVIEW_LANGUAGE, COMMAND_RUNNER_ADAPTER_PREVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildCommandRunnerAdapterPreviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function summarizeCommandRunnerAdapterPreview(model: { commandRunnerAdapterPreviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterBackedExecutionPreview("Command Runner Adapter Preview", model.commandRunnerAdapterPreviews, "Command runner execution requires explicit operator approval.");
}

export function buildCommandRunnerAdapterPreviewModel() {
  const commandRunnerAdapterPreviews = buildCommandRunnerAdapterPreviews();
  const model = buildAdapterBackedExecutionPreviewModel({
    phase: "Phase 684",
    title: "Command Runner Adapter Preview",
    summarySubject: "Command Runner Adapter Preview",
    approvalCopy: "Command runner execution requires explicit operator approval.",
    subtitle: "Preview the command runner adapter packet without running commands.",
    primaryLabel: "Review command preview",
    anchor: "command-runner-adapter-preview",
    plainEnglishTitle: "Plain-English command runner adapter preview",
    plainEnglishCopy: "This page shows the packet a future command runner adapter would need before execution: command, working directory, secrets handling, timeout, outputs, exit code, recovery plan, and denied actions. It does not run commands.",
    language: COMMAND_RUNNER_ADAPTER_PREVIEW_LANGUAGE,
    advancedDetails: [...COMMAND_RUNNER_ADAPTER_PREVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/adapter-backed-execution-preview-inventory", label: "Preview inventory" },
      { href: "/local-runtime-adapter-preview", label: "Runtime preview" },
      { href: "/recovery-adapter-preview", label: "Recovery preview" },
    ],
    packets: commandRunnerAdapterPreviews,
    advancedCopy: "advanced command runner adapter preview details collapsed/secondary. This route is adapter-backed shape preview only and not executed; it has no live adapter implementation, no adapter execution, no adapter preview execution, no approval automation, and no approval decision persistence.",
    dataScope: "command-runner-adapter-preview buildCommandRunnerAdapterPreviewStableKey CommandRunnerAdapterPreviewPanel",
  });
  return { ...model, commandRunnerAdapterPreviews };
}
