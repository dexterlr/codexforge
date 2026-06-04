import type {
  JarvisdLocalDaemonMvpScaffold,
  JarvisdLocalDaemonMvpScaffoldBoundary,
  JarvisdLocalDaemonMvpScaffoldModel,
} from "./jarvisd-local-daemon-mvp-scaffold-types";
import { buildJarvisdLocalDaemonMvpScaffoldStableKey } from "./jarvisd-local-daemon-mvp-scaffold-types";

export const JARVISD_LOCAL_DAEMON_MVP_SCAFFOLD_LANGUAGE = [
  "Jarvisd local daemon MVP scaffold",
  "Frontend does not start the daemon",
  "Daemon setup remains manual",
  "Local actions require explicit approved boundaries",
  "Local-only endpoint policy",
  "Unsupported actions",
] as const;

export function buildJarvisdLocalDaemonMvpScaffold(
  input: Omit<JarvisdLocalDaemonMvpScaffold, "id"> & { idHint: string }
): JarvisdLocalDaemonMvpScaffold {
  const { idHint, ...scaffold } = input;
  return {
    id: buildJarvisdLocalDaemonMvpScaffoldStableKey(
      "jarvisd-local-daemon-mvp-scaffold",
      idHint,
      input.lifecycleStatus
    ),
    ...scaffold,
  };
}

export function buildJarvisdLocalDaemonMvpScaffolds(): JarvisdLocalDaemonMvpScaffold[] {
  return [
    buildJarvisdLocalDaemonMvpScaffold({
      idHint: "manual-local-daemon-foundation",
      daemonScaffoldIdentity:
        "Daemon scaffold identity: jarvisd-local-daemon-mvp-manual-foundation describes a future local Jarvisd bridge without creating a listening daemon process from the frontend.",
      localOnlyEndpointPolicy:
        "Local-only endpoint policy: future communication must be localhost-only, explicitly approved, and unavailable to remote hosts, cloud callbacks, or arbitrary browser pages.",
      lifecycleStatus: "ready-for-approved-bridge",
      lifecycleStatusLabel:
        "Lifecycle status: ready for approved bridge after manual setup, permission review, audit handoff, and recovery review.",
      requiredOperatorSetup: [
        "Install or configure Jarvisd manually outside this frontend",
        "Review permission boundary before any local action",
        "Review audit log expectations before any handoff",
        "Keep signing material and secrets outside browser storage",
      ],
      supportedMvpSurfaces: [
        "Daemon readiness review",
        "Local API handshake design",
        "Signed request contract review",
        "Local session consent review",
      ],
      unsupportedActions: [
        "Starting, installing, or restarting Jarvisd from the frontend",
        "Executing commands or Jarvisd capabilities from arbitrary UI",
        "Browsing or mutating local files",
        "Generating or storing secrets in the browser",
      ],
      auditDependency:
        "Audit dependency: future handoffs must reference the Jarvisd audit log viewer with redacted request summaries only.",
      permissionDependency:
        "Permission dependency: local actions require explicit approved boundaries and narrow capability permission before any future execution.",
      recoveryDependency:
        "Recovery dependency: recovery remains a reviewed checklist unless a future approved local boundary exists.",
      nextRecommendedRoute: "/jarvisd-api-handshake",
      blockedReasons: [
        "No approved backend bridge is connected in this scaffold",
        "Frontend does not start the daemon",
        "Daemon setup remains manual",
        "Local actions require explicit approved boundaries",
      ],
      advancedScaffoldDetails:
        "Advanced scaffold details: this is a frontend contract and readiness model only. It does not create sockets, start a daemon, execute commands, mutate files, store secrets, call providers, call GitHub APIs, auto-route traffic, spend tokens, mutate Brain graph, or promote memory.",
    }),
    buildJarvisdLocalDaemonMvpScaffold({
      idHint: "blocked-automatic-daemon-start",
      daemonScaffoldIdentity:
        "Daemon scaffold identity: jarvisd-local-daemon-mvp-blocked-start covers any request that expects the frontend to install, launch, or control a daemon process.",
      localOnlyEndpointPolicy:
        "Local-only endpoint policy: remote endpoints, wildcard hosts, hidden socket listeners, and browser-created daemon processes are blocked.",
      lifecycleStatus: "blocked",
      lifecycleStatusLabel:
        "Lifecycle status: blocked when setup is not manual or when a future approved installer boundary is missing.",
      requiredOperatorSetup: [
        "Confirm a real approved local boundary exists before live use",
        "Confirm audit, permission, and recovery dependencies are reviewed",
        "Confirm no session tokens or signing material are persisted in localStorage",
      ],
      supportedMvpSurfaces: [
        "Plain-English readiness",
        "Blocked reason review",
        "Next route guidance",
      ],
      unsupportedActions: [
        "Creating a listening daemon process from the frontend",
        "Opening sockets or raw fetch loops from arbitrary UI",
        "Granting Jarvisd permissions automatically",
        "Mutating provider registry or routing live traffic",
      ],
      auditDependency:
        "Audit dependency: blocked daemon-start requests must remain explainable without displaying secrets.",
      permissionDependency:
        "Permission dependency: no permission is granted automatically from this scaffold.",
      recoveryDependency:
        "Recovery dependency: no kill, restart, or reset action is wired into this page.",
      nextRecommendedRoute: "/jarvisd-permissions",
      blockedReasons: [
        "No approved local installer boundary",
        "No approved session consent",
        "No approved signed request handoff",
        "No daemon process control from frontend",
      ],
      advancedScaffoldDetails:
        "Advanced scaffold details: blocked means no execution, no daemon control, no arbitrary file access, no settings auto-import, no package install behavior, and no process kill/restart/reset.",
    }),
  ];
}

export function buildJarvisdLocalDaemonMvpScaffoldBoundary(): JarvisdLocalDaemonMvpScaffoldBoundary {
  return {
    daemonProcessCreationAllowedFromFrontend: false,
    daemonInstallAllowedFromFrontend: false,
    daemonStartupAllowedFromFrontend: false,
    daemonDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    automaticLocalActionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    secretsDisplayedAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    settingsAutoImportAllowed: false,
    settingsAutoExportSecretsAllowed: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    providerRegistryMutationAllowed: false,
    automaticRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeJarvisdLocalDaemonMvpScaffold(
  model: Pick<JarvisdLocalDaemonMvpScaffoldModel, "scaffolds">
): string {
  return `Jarvisd local daemon MVP scaffold defines ${model.scaffolds.length} safe readiness posture(s). Frontend does not start the daemon, daemon setup remains manual, and local actions require explicit approved boundaries.`;
}

export function buildJarvisdLocalDaemonMvpScaffoldModel(): JarvisdLocalDaemonMvpScaffoldModel {
  const scaffolds = buildJarvisdLocalDaemonMvpScaffolds();
  const model: JarvisdLocalDaemonMvpScaffoldModel = {
    title: "Jarvisd local daemon MVP scaffold",
    summary: "",
    scaffolds,
    boundary: buildJarvisdLocalDaemonMvpScaffoldBoundary(),
    scaffoldLanguage: [...JARVISD_LOCAL_DAEMON_MVP_SCAFFOLD_LANGUAGE],
    advancedDetails: [
      "Jarvisd local daemon MVP scaffold",
      "Frontend does not start the daemon",
      "Daemon setup remains manual",
      "Local actions require explicit approved boundaries",
      "Local-only endpoint policy",
      "Unsupported actions",
      "Audit dependency",
      "Permission dependency",
      "Recovery dependency",
      "Next recommended route",
      "Blocked reasons",
      "Approved local boundary required",
      "No daemon process creation from frontend",
    ],
  };
  return { ...model, summary: summarizeJarvisdLocalDaemonMvpScaffold(model) };
}
