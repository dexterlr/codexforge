import type {
  JarvisdSecretsRedactionGate,
  JarvisdSecretsRedactionGateBoundary,
  JarvisdSecretsRedactionGateModel,
} from "./jarvisd-secrets-redaction-gate-types";
import { buildJarvisdSecretsRedactionGateStableKey } from "./jarvisd-secrets-redaction-gate-types";

export const JARVISD_SECRETS_REDACTION_GATE_LANGUAGE = [
  "Jarvisd secrets redaction gate",
  "Secret values are never displayed",
  "Redaction happens before review",
  "Redaction does not approve provider or file sending",
  "Allowed display fields",
  "Denied display fields",
  "Approved local boundary required",
] as const;

export function buildJarvisdSecretsRedactionGate(
  input: Omit<JarvisdSecretsRedactionGate, "id"> & { idHint: string }
): JarvisdSecretsRedactionGate {
  const { idHint, ...gate } = input;
  return {
    id: buildJarvisdSecretsRedactionGateStableKey(
      "jarvisd-secrets-redaction-gate",
      idHint,
      input.redactionStatus
    ),
    ...gate,
  };
}

export function buildJarvisdSecretsRedactionGates(): JarvisdSecretsRedactionGate[] {
  return [
    buildJarvisdSecretsRedactionGate({
      idHint: "file-preview-sensitive-indicator",
      redactionGateIdentity:
        "Redaction gate identity: jarvisd-secrets-redaction-gate-file-preview, applied before any reviewed file preview result is shown.",
      sourceCapability:
        "Source capability: Jarvisd file read preview bridge, safe file search bridge, or workspace index sync redacted output.",
      findingCategory:
        "Finding category: suspected credential indicator, token-shaped string, environment setting name, provider config hint, or sensitive path marker.",
      redactionStatus: "redacted-before-review",
      sensitiveIndicatorSummary:
        "Sensitive indicator summary: category and confidence only; secret values are never displayed.",
      allowedDisplayFields: [
        "source capability",
        "finding category",
        "redaction status",
        "sensitive indicator summary",
        "approval requirement",
        "audit handoff",
        "blocked reasons",
      ],
      deniedDisplayFields: [
        "raw secret value",
        "full credential",
        "session token",
        "signing secret",
        "provider API key",
        "environment value",
        "private file content",
      ],
      approvalRequirement:
        "Approval requirement: redaction happens before review and does not approve provider or file sending.",
      auditHandoff:
        "Audit handoff: send only redacted category, status, allowed display fields, denied display fields, and blocked reasons to /jarvisd-audit-ingestion without calling appendEvent from UI.",
      blockedReasons: [
        "Secret values are never displayed",
        "Redaction happens before review",
        "Redaction does not approve provider or file sending",
      ],
      advancedRedactionDetails:
        "Advanced redaction details: this gate does not display secret values, send findings to providers automatically, mutate files, call Jarvisd directly, call appendEvent, call saveBrainGraph, or approve provider/file sending.",
    }),
    buildJarvisdSecretsRedactionGate({
      idHint: "provider-send-blocked",
      redactionGateIdentity:
        "Redaction gate identity: jarvisd-secrets-redaction-gate-provider-send-blocked.",
      sourceCapability:
        "Source capability: any future provider-facing result handoff that includes redacted project indicators.",
      findingCategory:
        "Finding category: provider-facing prompt, file preview excerpt, search result summary, or index metadata note with sensitive indicator.",
      redactionStatus: "approval-required",
      sensitiveIndicatorSummary:
        "Sensitive indicator summary: redacted indicator only; secret values are never displayed or exported.",
      allowedDisplayFields: [
        "source capability",
        "finding category",
        "redaction status",
        "approval requirement",
        "audit handoff",
      ],
      deniedDisplayFields: [
        "prompt with raw secret",
        "file content with secret value",
        "provider credential",
        "session token",
        "signing material",
      ],
      approvalRequirement:
        "Approval requirement: redaction does not approve provider or file sending; separate explicit approval is required for any future provider or file handoff.",
      auditHandoff:
        "Audit handoff: capture blocked provider/file sending reason as redacted audit candidate only.",
      blockedReasons: [
        "Provider send approval is separate",
        "File sending approval is separate",
        "Secret values are never displayed",
      ],
      advancedRedactionDetails:
        "Advanced redaction details: redacted review copy remains local-first and cannot auto-send prompts, files, findings, or index metadata to providers.",
    }),
  ];
}

export function buildJarvisdSecretsRedactionGateBoundary(): JarvisdSecretsRedactionGateBoundary {
  return {
    redactionBeforeReviewRequired: true,
    secretValuesDisplayedAllowed: false,
    rawSecretDisplayAllowed: false,
    secretsExportedAllowed: false,
    automaticProviderSendAllowed: false,
    providerApiCallsAllowedFromUi: false,
    fileSendingApprovedByRedaction: false,
    providerSendingApprovedByRedaction: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    liveHandshakeAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    apiKeyLocalStorageAllowed: false,
    processEnvDisplayAllowed: false,
    auditLogMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeJarvisdSecretsRedactionGate(
  model: Pick<JarvisdSecretsRedactionGateModel, "gates">
): string {
  return `Jarvisd secrets redaction gate prepares ${model.gates.length} redaction review shape(s). Secret values are never displayed, redaction happens before review, and redaction does not approve provider or file sending.`;
}

export function buildJarvisdSecretsRedactionGateModel(): JarvisdSecretsRedactionGateModel {
  const gates = buildJarvisdSecretsRedactionGates();
  const model: JarvisdSecretsRedactionGateModel = {
    title: "Jarvisd secrets redaction gate",
    summary: "",
    gates,
    boundary: buildJarvisdSecretsRedactionGateBoundary(),
    redactionLanguage: [...JARVISD_SECRETS_REDACTION_GATE_LANGUAGE],
    advancedDetails: [
      "Jarvisd secrets redaction gate",
      "Secret values are never displayed",
      "Redaction happens before review",
      "Redaction does not approve provider or file sending",
      "Redaction gate identity",
      "Source capability",
      "Finding category",
      "Redaction status",
      "Sensitive indicator summary",
      "Allowed display fields",
      "Denied display fields",
      "Approval requirement",
      "Audit handoff",
      "Blocked reasons",
      "Approved local boundary required",
    ],
  };
  return { ...model, summary: summarizeJarvisdSecretsRedactionGate(model) };
}
