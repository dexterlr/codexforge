import type {
  JarvisdLocalDaemonContract,
  JarvisdLocalDaemonContractBoundary,
  JarvisdLocalDaemonContractModel,
} from "./jarvisd-local-daemon-contract-types";
import { buildJarvisdLocalDaemonContractStableKey } from "./jarvisd-local-daemon-contract-types";

export const JARVISD_LOCAL_DAEMON_CONTRACT_LANGUAGE = [
  "Jarvisd local daemon contract",
  "Contract does not execute commands",
  "Daemon is local-only",
  "Live calls remain behind approved local boundary",
  "Capability negotiation shape",
  "Permission model summary",
] as const;

export function buildJarvisdLocalDaemonContract(
  input: Omit<JarvisdLocalDaemonContract, "id"> & { idHint: string }
): JarvisdLocalDaemonContract {
  const { idHint, ...contract } = input;
  return {
    id: buildJarvisdLocalDaemonContractStableKey("jarvisd-local-daemon-contract", idHint, input.readinessStatus),
    ...contract,
  };
}

export function buildJarvisdLocalDaemonContracts(): JarvisdLocalDaemonContract[] {
  return [
    buildJarvisdLocalDaemonContract({
      idHint: "approved-local-daemon-contract",
      daemonIdentity:
        "Daemon identity: Jarvisd is the future approved local daemon for local operator capabilities, not a cloud provider and not an arbitrary command runner.",
      localEndpointPolicy:
        "Local endpoint policy: daemon is local-only, localhost-bound, and unavailable to remote hosts or cloud callbacks.",
      protocolBoundary:
        "Protocol boundary: future requests use an approved local boundary with reviewed request shapes, explicit blocked reasons, and no raw fetch from arbitrary UI.",
      capabilityNegotiationShape:
        "Capability negotiation shape: frontend asks for declared capability names, categories, risk labels, permission requirements, and disabled reasons before any live use.",
      permissionModelSummary:
        "Permission model summary: every future capability needs a human-reviewed permission boundary and no local action runs from this contract page.",
      auditRequirement:
        "Audit requirement: any future daemon handoff records a redacted request summary, approval state, capability id, and blocked reason without secrets.",
      healthProbeRoute: "/jarvisd-health",
      capabilityRegistryRoute: "/jarvisd-capabilities",
      permissionBoundaryRoute: "/jarvisd-permissions",
      blockedReasons: [
        "Approved local boundary is not connected in this phase",
        "Contract does not execute commands",
        "No file browsing or file mutation is allowed from this page",
        "Live calls remain behind approved local boundary",
      ],
      readinessStatus: "boundary-required",
      advancedContractDetails:
        "Advanced contract details: this contract surface defines request and response expectations only. It does not call a daemon, run commands, browse files, mutate files, call providers, store credentials, or change routing policy.",
    }),
    buildJarvisdLocalDaemonContract({
      idHint: "blocked-arbitrary-local-action",
      daemonIdentity:
        "Daemon identity: any process that cannot prove the Jarvisd contract identity stays outside the approved local daemon boundary.",
      localEndpointPolicy:
        "Local endpoint policy: wildcard hosts, remote endpoints, provider endpoints, and hidden background polling are blocked.",
      protocolBoundary:
        "Protocol boundary: the UI can display the contract and blocked reasons only; it does not create a daemon client or send live probes.",
      capabilityNegotiationShape:
        "Capability negotiation shape: unknown capabilities stay disabled until the registry, health probe, permission boundary, and audit handoff agree.",
      permissionModelSummary:
        "Permission model summary: permissions are explicit, narrow, revocable, and reviewed before any future local action.",
      auditRequirement:
        "Audit requirement: blocked attempts must explain why they are blocked without exposing environment values, secrets, prompts, or file contents.",
      healthProbeRoute: "/jarvisd-health",
      capabilityRegistryRoute: "/jarvisd-capabilities",
      permissionBoundaryRoute: "/jarvisd-permissions",
      blockedReasons: [
        "No approved localhost daemon identity",
        "No reviewed permission grant",
        "No capability registry match",
        "No audit handoff",
      ],
      readinessStatus: "blocked",
      advancedContractDetails:
        "Advanced contract details: arbitrary local endpoints, command execution, file system mutation, provider calls, token spend, and silent registry mutation remain blocked.",
    }),
  ];
}

export function buildJarvisdLocalDaemonContractBoundary(): JarvisdLocalDaemonContractBoundary {
  return {
    daemonClientEnabledFromUi: false,
    automaticDaemonCallAllowed: false,
    commandExecutionAllowedFromUi: false,
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

export function summarizeJarvisdLocalDaemonContract(
  model: Pick<JarvisdLocalDaemonContractModel, "contracts">
): string {
  return `Jarvisd local daemon contract prepares ${model.contracts.length} reviewed contract shape(s). Contract does not execute commands, daemon is local-only, and live calls remain behind approved local boundary.`;
}

export function buildJarvisdLocalDaemonContractModel(): JarvisdLocalDaemonContractModel {
  const contracts = buildJarvisdLocalDaemonContracts();
  const model: JarvisdLocalDaemonContractModel = {
    title: "Jarvisd local daemon contract",
    summary: "",
    contracts,
    boundary: buildJarvisdLocalDaemonContractBoundary(),
    contractLanguage: [...JARVISD_LOCAL_DAEMON_CONTRACT_LANGUAGE],
    advancedDetails: [
      "Jarvisd local daemon contract",
      "Contract does not execute commands",
      "Daemon is local-only",
      "Live calls remain behind approved local boundary",
      "Daemon identity",
      "Local endpoint policy",
      "Protocol boundary",
      "Capability negotiation shape",
      "Permission model summary",
      "Audit requirement",
      "Health probe route",
      "Capability registry route",
      "Permission boundary route",
      "Blocked reasons",
      "No automatic daemon call",
      "No raw fetch from arbitrary UI",
    ],
  };
  return { ...model, summary: summarizeJarvisdLocalDaemonContract(model) };
}
