import type {
  LocalProcessMonitorPreview,
  LocalProcessMonitorPreviewBoundary,
  LocalProcessMonitorPreviewModel,
} from "./local-process-monitor-preview-types";
import { buildLocalProcessMonitorPreviewStableKey } from "./local-process-monitor-preview-types";

export const LOCAL_PROCESS_MONITOR_PREVIEW_LANGUAGE = [
  "Local process monitor preview",
  "Process data is read-only",
  "Live monitoring remains behind approved local boundary",
  "Cannot kill restart or mutate processes",
  "Refresh policy",
  "Permission dependency",
] as const;

export function buildLocalProcessMonitorPreview(
  input: Omit<LocalProcessMonitorPreview, "id"> & { idHint: string }
): LocalProcessMonitorPreview {
  const { idHint, ...processGroup } = input;
  return {
    id: buildLocalProcessMonitorPreviewStableKey("local-process-monitor-preview", idHint, input.status),
    ...processGroup,
  };
}

export function buildLocalProcessMonitorPreviews(): LocalProcessMonitorPreview[] {
  return [
    buildLocalProcessMonitorPreview({
      idHint: "jarvisd-daemon-status-preview",
      processGroupSummary:
        "Process group summary: future Jarvisd daemon and approved local helper status, grouped by capability boundary.",
      processStatusSummary:
        "Process status summary: read-only health labels only; no process data is changed and no live command is run.",
      sourceCapability:
        "Source capability: future Jarvisd process-status-read capability after health and permission boundaries pass review.",
      readOnlyScope:
        "Read-only scope: process names, reviewed status labels, and redacted health notes only.",
      refreshPolicy:
        "Refresh policy: manual refresh request through an approved local boundary later; this page does not poll from arbitrary UI.",
      healthDependency:
        "Health dependency: Jarvisd health and version probe must be reviewed before live monitoring is considered.",
      permissionDependency:
        "Permission dependency: Jarvisd permission boundary must grant a narrow read-only status capability before any live process data is requested.",
      blockedReasons: [
        "Live monitoring remains behind approved local boundary",
        "Process data is read-only",
        "Cannot kill restart or mutate processes",
      ],
      recoveryRoute: "/jarvisd-health",
      auditNote:
        "Audit note: record source capability, read-only scope, refresh policy, health dependency, permission dependency, and blocked reasons without process secrets.",
      status: "boundary-required",
      advancedProcessDetails:
        "Advanced process details: this preview is not a live process manager. It cannot kill, restart, mutate, poll, run commands, or change local state.",
    }),
    buildLocalProcessMonitorPreview({
      idHint: "unsafe-manager-blocked",
      processGroupSummary:
        "Process group summary: unreviewed process manager requests remain blocked.",
      processStatusSummary:
        "Process status summary: no status is loaded because the approved local boundary is missing.",
      sourceCapability:
        "Source capability: none; arbitrary UI cannot request process lists or command output.",
      readOnlyScope:
        "Read-only scope: blocked explanation only.",
      refreshPolicy:
        "Refresh policy: no automatic refresh, background polling, or hidden daemon calls.",
      healthDependency:
        "Health dependency: local daemon identity and health must be established first.",
      permissionDependency:
        "Permission dependency: explicit read-only process permission is required and absent.",
      blockedReasons: [
        "No approved local boundary",
        "No read-only process permission",
        "This page cannot kill restart or mutate processes",
      ],
      recoveryRoute: "/jarvisd-permissions",
      auditNote:
        "Audit note: route blocked process requests to permission review and do not expose command output, environment values, or secrets.",
      status: "blocked",
      advancedProcessDetails:
        "Advanced process details: blocked manager requests stay educational and do not become local executor calls.",
    }),
  ];
}

export function buildLocalProcessMonitorPreviewBoundary(): LocalProcessMonitorPreviewBoundary {
  return {
    processDataMutationAllowedFromUi: false,
    liveMonitoringWithoutBoundaryAllowed: false,
    pollingFromArbitraryUiAllowed: false,
    processKillAllowedFromUi: false,
    processRestartAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    localStateMutationAllowedFromUi: false,
    jarvisdDirectCallAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    fileMutationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    secretsDisplayedAllowed: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    routerPolicyMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeLocalProcessMonitorPreview(
  model: Pick<LocalProcessMonitorPreviewModel, "processGroups">
): string {
  return `Local process monitor preview prepares ${model.processGroups.length} read-only process status shape(s). Process data is read-only, live monitoring remains behind approved local boundary, and this page cannot kill restart or mutate processes.`;
}

export function buildLocalProcessMonitorPreviewModel(): LocalProcessMonitorPreviewModel {
  const processGroups = buildLocalProcessMonitorPreviews();
  const model: LocalProcessMonitorPreviewModel = {
    title: "Local process monitor preview",
    summary: "",
    processGroups,
    boundary: buildLocalProcessMonitorPreviewBoundary(),
    previewLanguage: [...LOCAL_PROCESS_MONITOR_PREVIEW_LANGUAGE],
    advancedDetails: [
      "Local process monitor preview",
      "Process data is read-only",
      "Live monitoring remains behind approved local boundary",
      "Cannot kill restart or mutate processes",
      "Process group summary",
      "Process status summary",
      "Source capability",
      "Read-only scope",
      "Refresh policy",
      "Health dependency",
      "Permission dependency",
      "Blocked reasons",
      "Recovery route",
      "Audit note",
      "Approved local boundary required",
      "Nothing executes from arbitrary UI",
    ],
  };
  return { ...model, summary: summarizeLocalProcessMonitorPreview(model) };
}
