import type {
  JarvisdSignedRequestContract,
  JarvisdSignedRequestContractBoundary,
  JarvisdSignedRequestContractModel,
} from "./jarvisd-signed-request-contract-types";
import { buildJarvisdSignedRequestContractStableKey } from "./jarvisd-signed-request-contract-types";

export const JARVISD_SIGNED_REQUEST_CONTRACT_LANGUAGE = [
  "Jarvisd signed request contract",
  "Signing secrets are never displayed",
  "Signing material is not stored in browser storage",
  "Requests are not sent from this page",
  "Replay protection note",
  "Permission boundary reference",
] as const;

export function buildJarvisdSignedRequestContract(
  input: Omit<JarvisdSignedRequestContract, "id"> & { idHint: string }
): JarvisdSignedRequestContract {
  const { idHint, ...contract } = input;
  return {
    id: buildJarvisdSignedRequestContractStableKey(
      "jarvisd-signed-request-contract",
      idHint,
      input.signatureStatus
    ),
    ...contract,
  };
}

export function buildJarvisdSignedRequestContracts(): JarvisdSignedRequestContract[] {
  return [
    buildJarvisdSignedRequestContract({
      idHint: "pending-approved-signer",
      requestContractIdentity:
        "Request contract identity: jarvisd-signed-request-preview-pending-signer defines the future authorization envelope without sending a request from this page.",
      requestPurpose:
        "Request purpose: prove operator intent, selected capability, permission boundary, nonce/challenge, expiry, and audit handoff before a future Jarvisd action.",
      capabilityTarget:
        "Capability target: future Jarvisd capability id must match the capability registry and remain disabled until permission and consent are reviewed.",
      permissionBoundaryReference:
        "Permission boundary reference: /jarvisd-permissions is required before any signed handoff can be treated as eligible.",
      nonceChallengeSummary:
        "Nonce/challenge summary: future requests include an approved challenge reference, single-use nonce placeholder, expiry window, and signer identity reference without generating secrets in the browser.",
      signatureStatus: "pending-approved-signer",
      signatureStatusLabel:
        "Signature status: pending approved signer; signing secrets are never displayed and signing material is not stored in browser storage.",
      replayProtectionNote:
        "Replay protection note: future signed requests must be single-use, time-limited, capability-scoped, and rejected after expiry or reuse.",
      expiryTimeoutPolicy:
        "Expiry/timeout policy: future signed request review uses a short expiry and fails closed when approval, consent, or health evidence is stale.",
      auditHandoff:
        "Audit handoff: future audit record stores a redacted request summary, capability id, permission reference, consent reference, and blocked reason without secrets.",
      blockedReasons: [
        "Approved signer is not connected in this phase",
        "Requests are not sent from this page",
        "Signing secrets are never displayed",
        "Signing material is not stored in browser storage",
      ],
      advancedRequestDetails:
        "Advanced request details: this contract does not generate real secrets, store tokens in localStorage, call Jarvisd, execute capabilities, run commands, mutate files, call providers, or call GitHub APIs.",
    }),
    buildJarvisdSignedRequestContract({
      idHint: "blocked-missing-permission",
      requestContractIdentity:
        "Request contract identity: jarvisd-signed-request-blocked-missing-permission covers unsigned or permissionless handoffs.",
      requestPurpose:
        "Request purpose: blocked when the request cannot prove reviewed operator intent, consent, permission scope, and audit dependency.",
      capabilityTarget:
        "Capability target: blocked if the target capability is unknown, disabled, too broad, or outside the registry.",
      permissionBoundaryReference:
        "Permission boundary reference: blocked until /jarvisd-permissions confirms narrow reviewed scope.",
      nonceChallengeSummary:
        "Nonce/challenge summary: blocked if nonce/challenge data is missing, reusable, expired, or asks the browser to persist signing material.",
      signatureStatus: "blocked",
      signatureStatusLabel:
        "Signature status: blocked; no request is eligible without an approved signer and reviewed permission boundary.",
      replayProtectionNote:
        "Replay protection note: blocked if replay protection is absent or if a request can be reused across sessions.",
      expiryTimeoutPolicy:
        "Expiry/timeout policy: blocked if the request has no expiry, no timeout, or tries to remain valid after consent revocation.",
      auditHandoff:
        "Audit handoff: blocked if the audit summary would include secrets, full tokens, file contents, or environment values.",
      blockedReasons: [
        "Missing permission boundary reference",
        "Missing approved signer",
        "Replay protection missing",
        "Audit handoff not redacted",
      ],
      advancedRequestDetails:
        "Advanced request details: blocked means no live Jarvisd call, no automatic local action, no raw fetch from arbitrary UI, no browser-stored signing secrets, and no session token localStorage storage.",
    }),
  ];
}

export function buildJarvisdSignedRequestContractBoundary(): JarvisdSignedRequestContractBoundary {
  return {
    requestSendAllowedFromUi: false,
    signingSecretDisplayAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    signingSecretGenerationAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    localStorageTokenStorageAllowed: false,
    daemonDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    automaticLocalActionAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    secretsDisplayedAllowed: false,
    secretsExportedAllowed: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    processEnvDisplayAllowed: false,
    settingsAutoImportAllowed: false,
    providerRegistryMutationAllowed: false,
    automaticRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeJarvisdSignedRequestContract(
  model: Pick<JarvisdSignedRequestContractModel, "contracts">
): string {
  return `Jarvisd signed request contract defines ${model.contracts.length} authorization posture(s). Signing secrets are never displayed, signing material is not stored in browser storage, and requests are not sent from this page.`;
}

export function buildJarvisdSignedRequestContractModel(): JarvisdSignedRequestContractModel {
  const contracts = buildJarvisdSignedRequestContracts();
  const model: JarvisdSignedRequestContractModel = {
    title: "Jarvisd signed request contract",
    summary: "",
    contracts,
    boundary: buildJarvisdSignedRequestContractBoundary(),
    contractLanguage: [...JARVISD_SIGNED_REQUEST_CONTRACT_LANGUAGE],
    advancedDetails: [
      "Jarvisd signed request contract",
      "Signing secrets are never displayed",
      "Signing material is not stored in browser storage",
      "Requests are not sent from this page",
      "Request contract identity",
      "Request purpose",
      "Capability target",
      "Permission boundary reference",
      "Nonce/challenge summary",
      "Signature status",
      "Replay protection note",
      "Expiry/timeout policy",
      "Audit handoff",
      "Blocked reasons",
    ],
  };
  return { ...model, summary: summarizeJarvisdSignedRequestContract(model) };
}
