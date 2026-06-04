import type {
  JarvisdLocalSessionConsent,
  JarvisdLocalSessionConsentBoundary,
  JarvisdLocalSessionConsentModel,
} from "./jarvisd-local-session-consent-types";
import { buildJarvisdLocalSessionConsentStableKey } from "./jarvisd-local-session-consent-types";

export const JARVISD_LOCAL_SESSION_CONSENT_LANGUAGE = [
  "Jarvisd local session consent",
  "Consent does not grant permissions automatically",
  "No local action runs without explicit approval",
  "Sessions expire and can be revoked",
  "Allowed session scope",
  "Consent copy",
] as const;

export function buildJarvisdLocalSessionConsent(
  input: Omit<JarvisdLocalSessionConsent, "id"> & { idHint: string }
): JarvisdLocalSessionConsent {
  const { idHint, ...session } = input;
  return {
    id: buildJarvisdLocalSessionConsentStableKey(
      "jarvisd-local-session-consent",
      idHint,
      input.consentStatus
    ),
    ...session,
  };
}

export function buildJarvisdLocalSessionConsents(): JarvisdLocalSessionConsent[] {
  return [
    buildJarvisdLocalSessionConsent({
      idHint: "future-local-session-review",
      sessionIdentity:
        "Session identity: jarvisd-local-session-consent-review is a future session review packet, not a live session created from this UI.",
      operatorIntent:
        "Operator intent: review one future local Jarvisd session before any local action, with intent written in plain English and scoped to a specific workspace.",
      workspaceTrustDependency:
        "Workspace trust dependency: /workspace-trust-policy must be reviewed before any future local session can be considered eligible.",
      requestedCapabilities: [
        "Read approved daemon readiness",
        "Prepare signed request review",
        "Prepare audit handoff",
      ],
      allowedSessionScope: [
        "Review-only readiness context",
        "Approved workspace reference only",
        "Time-limited future handoff copy",
      ],
      deniedSessionScope: [
        "No command execution",
        "No arbitrary local file browsing",
        "No file mutation",
        "No Jarvisd capability execution from this page",
      ],
      expiryPolicy:
        "Expiry policy: sessions expire after a short reviewed window and must fail closed when consent, workspace trust, permission, or health evidence changes.",
      revocationGuidance:
        "Revocation guidance: sessions expire and can be revoked; future revocation should invalidate pending requests and route back to permission and audit review.",
      auditRequirement:
        "Audit requirement: future session review must record redacted intent, scope, expiry, revocation state, permission reference, and blocked reasons.",
      consentCopy:
        "Consent copy: I understand this consent review does not grant permissions automatically, does not create a live Jarvisd session, and no local action runs without explicit approval.",
      consentStatus: "pending-explicit-approval",
      blockedReasons: [
        "Consent does not grant permissions automatically",
        "No local action runs without explicit approval",
        "Session tokens are not stored in localStorage",
      ],
      advancedConsentDetails:
        "Advanced consent details: this page does not create live sessions, call Jarvisd, execute commands, browse files, mutate files, store session tokens in localStorage, store signing material, call providers, or call GitHub APIs.",
    }),
    buildJarvisdLocalSessionConsent({
      idHint: "blocked-overbroad-session",
      sessionIdentity:
        "Session identity: jarvisd-local-session-consent-blocked-overbroad covers a session request that is too broad, too long-lived, or missing revocation.",
      operatorIntent:
        "Operator intent: blocked if intent is vague, asks for background autonomy, or cannot be tied to an approved workspace.",
      workspaceTrustDependency:
        "Workspace trust dependency: blocked if trusted workspace scope is missing, stale, or denied by workspace trust policy.",
      requestedCapabilities: [
        "Unknown Jarvisd capability",
        "Broad local execution",
        "Unreviewed file access",
      ],
      allowedSessionScope: [
        "None until explicit approval exists",
        "Review blocked reasons only",
      ],
      deniedSessionScope: [
        "No automatic permission grant",
        "No local action without approval",
        "No session token browser storage",
        "No persistent autonomous session",
      ],
      expiryPolicy:
        "Expiry policy: blocked if a request has no expiry, no timeout, or tries to continue after revocation.",
      revocationGuidance:
        "Revocation guidance: blocked if the request cannot explain how the session is revoked or invalidated.",
      auditRequirement:
        "Audit requirement: blocked if the audit handoff would omit consent copy, allowed scope, denied scope, expiry, or blocked reasons.",
      consentCopy:
        "Consent copy: blocked until the operator can review exact scope, expiry, revocation guidance, audit requirement, and explicit approval boundary.",
      consentStatus: "blocked",
      blockedReasons: [
        "Overbroad requested capabilities",
        "Missing workspace trust dependency",
        "Missing expiry or revocation guidance",
        "Automatic permission grant requested",
      ],
      advancedConsentDetails:
        "Advanced consent details: blocked means no live session creation, no local command execution, no file read/open, no file mutation, no settings auto-import, and no provider registry mutation.",
    }),
  ];
}

export function buildJarvisdLocalSessionConsentBoundary(): JarvisdLocalSessionConsentBoundary {
  return {
    liveSessionCreationAllowedFromUi: false,
    automaticPermissionGrantAllowed: false,
    localActionAllowedWithoutApproval: false,
    sessionTokenStorageAllowedInBrowser: false,
    localStorageSessionTokenAllowed: false,
    daemonDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    settingsAutoImportAllowed: false,
    secretsDisplayedAllowed: false,
    secretsExportedAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    processEnvDisplayAllowed: false,
    providerRegistryMutationAllowed: false,
    automaticRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeJarvisdLocalSessionConsent(
  model: Pick<JarvisdLocalSessionConsentModel, "sessions">
): string {
  return `Jarvisd local session consent defines ${model.sessions.length} future consent posture(s). Consent does not grant permissions automatically, no local action runs without explicit approval, and sessions expire and can be revoked.`;
}

export function buildJarvisdLocalSessionConsentModel(): JarvisdLocalSessionConsentModel {
  const sessions = buildJarvisdLocalSessionConsents();
  const model: JarvisdLocalSessionConsentModel = {
    title: "Jarvisd local session consent",
    summary: "",
    sessions,
    boundary: buildJarvisdLocalSessionConsentBoundary(),
    consentLanguage: [...JARVISD_LOCAL_SESSION_CONSENT_LANGUAGE],
    advancedDetails: [
      "Jarvisd local session consent",
      "Consent does not grant permissions automatically",
      "No local action runs without explicit approval",
      "Sessions expire and can be revoked",
      "Session identity",
      "Operator intent",
      "Workspace trust dependency",
      "Requested capabilities",
      "Allowed session scope",
      "Denied session scope",
      "Expiry policy",
      "Revocation guidance",
      "Audit requirement",
      "Consent copy",
      "Blocked reasons",
    ],
  };
  return { ...model, summary: summarizeJarvisdLocalSessionConsent(model) };
}
