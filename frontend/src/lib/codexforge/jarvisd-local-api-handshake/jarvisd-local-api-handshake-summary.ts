import type {
  JarvisdLocalApiHandshake,
  JarvisdLocalApiHandshakeBoundary,
  JarvisdLocalApiHandshakeModel,
} from "./jarvisd-local-api-handshake-types";
import { buildJarvisdLocalApiHandshakeStableKey } from "./jarvisd-local-api-handshake-types";

export const JARVISD_LOCAL_API_HANDSHAKE_LANGUAGE = [
  "Jarvisd local API handshake",
  "No handshake runs automatically",
  "Live handshake remains behind approved local boundary",
  "Localhost-only policy",
  "Protocol version",
  "Timeout policy",
] as const;

export function buildJarvisdLocalApiHandshake(
  input: Omit<JarvisdLocalApiHandshake, "id"> & { idHint: string }
): JarvisdLocalApiHandshake {
  const { idHint, ...handshake } = input;
  return {
    id: buildJarvisdLocalApiHandshakeStableKey(
      "jarvisd-local-api-handshake",
      idHint,
      input.readinessStatus
    ),
    ...handshake,
  };
}

export function buildJarvisdLocalApiHandshakes(): JarvisdLocalApiHandshake[] {
  return [
    buildJarvisdLocalApiHandshake({
      idHint: "approved-local-handshake-design",
      handshakeIdentity:
        "Handshake identity: jarvisd-local-api-handshake-design describes the future first contact with Jarvisd without running a live handshake automatically.",
      daemonEndpointSummary:
        "Daemon endpoint summary: future endpoint is a localhost-only Jarvisd bridge selected by an approved local boundary, not an arbitrary URL and not a provider endpoint.",
      localhostOnlyPolicy:
        "Localhost-only policy: future requests must stay on loopback, reject remote hosts, reject wildcard hosts, and avoid browser-created polling loops.",
      versionRequirement:
        "Version requirement: Jarvisd must report an approved minimum daemon version before any future capability handoff is considered.",
      protocolVersion:
        "Protocol version: jarvisd-local-api/v1-preview is the frontend contract label for review; no live protocol negotiation runs here.",
      nonceChallengePlaceholderShape:
        "Nonce/challenge placeholder shape: challenge id, nonce placeholder, protocol version, expiry window, and signed-response requirement are modeled without generating secrets in the browser.",
      timeoutPolicy:
        "Timeout policy: future approved handshake must use a short bounded timeout and show blocked reasons instead of retrying forever.",
      retryPolicy:
        "Retry policy: retries are manual review choices only; no handshake runs automatically and no polling loop is created.",
      healthVersionDependency:
        "Health/version dependency: /jarvisd-health must confirm readiness through an approved local boundary before live handshake work.",
      readinessStatus: "waiting-for-approved-boundary",
      blockedReasons: [
        "No approved local boundary for live handshake",
        "No automatic handshake from this page",
        "Endpoint secrets are not stored in browser storage",
      ],
      advancedHandshakeDetails:
        "Advanced handshake details: this page defines endpoint, version, timeout, retry, and nonce/challenge placeholders only. It does not call Jarvisd, run fetch, open sockets, poll, print environment values, display secrets, or store endpoint secrets.",
    }),
    buildJarvisdLocalApiHandshake({
      idHint: "blocked-non-localhost-handshake",
      handshakeIdentity:
        "Handshake identity: jarvisd-local-api-handshake-blocked-non-localhost covers any future endpoint that is not explicit localhost loopback.",
      daemonEndpointSummary:
        "Daemon endpoint summary: remote hosts, cloud endpoints, provider APIs, and user-supplied arbitrary URLs are blocked.",
      localhostOnlyPolicy:
        "Localhost-only policy: only a reviewed loopback endpoint can be eligible after a future approved bridge exists.",
      versionRequirement:
        "Version requirement: blocked if health/version evidence is missing, stale, or from an unapproved boundary.",
      protocolVersion:
        "Protocol version: blocked when the daemon cannot identify the approved protocol version.",
      nonceChallengePlaceholderShape:
        "Nonce/challenge placeholder shape: blocked if a request expects the browser to generate or store signing secrets.",
      timeoutPolicy:
        "Timeout policy: blocked if the request proposes unbounded waits or background probes.",
      retryPolicy:
        "Retry policy: blocked if the request proposes automatic retry loops from arbitrary UI.",
      healthVersionDependency:
        "Health/version dependency: blocked until /jarvisd-health is reviewed.",
      readinessStatus: "blocked",
      blockedReasons: [
        "Non-localhost endpoint",
        "Missing approved health/version dependency",
        "Automatic retry or polling requested",
        "Browser storage requested for endpoint secrets",
      ],
      advancedHandshakeDetails:
        "Advanced handshake details: blocked means no raw fetch from arbitrary UI, no live handshake from arbitrary UI, no command execution, no file reads, no provider calls, and no GitHub API calls.",
    }),
  ];
}

export function buildJarvisdLocalApiHandshakeBoundary(): JarvisdLocalApiHandshakeBoundary {
  return {
    automaticHandshakeAllowedFromUi: false,
    liveHandshakeAllowedFromArbitraryUi: false,
    rawFetchAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    endpointSecretStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    signingMaterialStorageAllowedInBrowser: false,
    daemonDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    secretsDisplayedAllowed: false,
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

export function summarizeJarvisdLocalApiHandshake(
  model: Pick<JarvisdLocalApiHandshakeModel, "handshakes">
): string {
  return `Jarvisd local API handshake defines ${model.handshakes.length} future handshake posture(s). No handshake runs automatically, live handshake remains behind approved local boundary, and endpoint secrets are not stored in browser storage.`;
}

export function buildJarvisdLocalApiHandshakeModel(): JarvisdLocalApiHandshakeModel {
  const handshakes = buildJarvisdLocalApiHandshakes();
  const model: JarvisdLocalApiHandshakeModel = {
    title: "Jarvisd local API handshake",
    summary: "",
    handshakes,
    boundary: buildJarvisdLocalApiHandshakeBoundary(),
    handshakeLanguage: [...JARVISD_LOCAL_API_HANDSHAKE_LANGUAGE],
    advancedDetails: [
      "Jarvisd local API handshake",
      "No handshake runs automatically",
      "Live handshake remains behind approved local boundary",
      "Endpoint secrets are not stored in browser storage",
      "Daemon endpoint summary",
      "Localhost-only policy",
      "Version requirement",
      "Protocol version",
      "Nonce/challenge placeholder shape",
      "Timeout policy",
      "Retry policy",
      "Health/version dependency",
      "Blocked reasons",
    ],
  };
  return { ...model, summary: summarizeJarvisdLocalApiHandshake(model) };
}
