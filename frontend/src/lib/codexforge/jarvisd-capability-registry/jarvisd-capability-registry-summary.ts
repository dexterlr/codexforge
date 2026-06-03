import type {
  JarvisdCapabilityRegistryBoundary,
  JarvisdCapabilityRegistryItem,
  JarvisdCapabilityRegistryModel,
} from "./jarvisd-capability-registry-types";
import { buildJarvisdCapabilityRegistryStableKey } from "./jarvisd-capability-registry-types";

export const JARVISD_CAPABILITY_REGISTRY_LANGUAGE = [
  "Jarvisd capability registry",
  "Capabilities are not executed from this page",
  "Disabled capabilities stay blocked",
  "Permission required",
  "Local-only status",
  "Audit requirement",
] as const;

export function buildJarvisdCapabilityRegistryItem(
  input: Omit<JarvisdCapabilityRegistryItem, "id"> & { idHint: string }
): JarvisdCapabilityRegistryItem {
  const { idHint, ...capability } = input;
  return {
    id: buildJarvisdCapabilityRegistryStableKey("jarvisd-capability-registry", idHint, input.status),
    ...capability,
  };
}

export function buildJarvisdCapabilityRegistryItems(): JarvisdCapabilityRegistryItem[] {
  return [
    buildJarvisdCapabilityRegistryItem({
      idHint: "project-index-read",
      capabilityIdentity: "Capability identity: project index read.",
      capabilityCategory: "Capability category: read-only project metadata.",
      permissionRequired:
        "Permission required: reviewed project-root read scope, no arbitrary file browsing, and no mutation.",
      localOnlyStatus:
        "Local-only status: local-only and disabled until Jarvisd health and permission boundary pass.",
      riskLevel: "medium",
      auditRequirement:
        "Audit requirement: record requested project root label, reviewed scope, and blocked reason without file contents.",
      disabledBlockedReason:
        "Disabled/blocked reason: approved local boundary and permission grant do not exist in this phase.",
      healthDependency:
        "Health dependency: Jarvisd health and version probe must be reviewed before this capability can be considered.",
      permissionBoundaryRoute: "/jarvisd-permissions",
      runbookHandoff:
        "Runbook handoff: document the reviewed project index request in the provider runbook generator as manual operator copy.",
      status: "disabled",
      advancedCapabilityDetails:
        "Advanced capability details: registry entry only; no project index is read and no files are browsed.",
    }),
    buildJarvisdCapabilityRegistryItem({
      idHint: "file-read-preview",
      capabilityIdentity: "Capability identity: file read preview.",
      capabilityCategory: "Capability category: reviewed local read preview.",
      permissionRequired:
        "Permission required: explicit file path inside approved scope, human review, and no secret request.",
      localOnlyStatus:
        "Local-only status: local-only, permission-gated, and blocked for arbitrary paths.",
      riskLevel: "high",
      auditRequirement:
        "Audit requirement: record selected path label and reason; do not record secret values or broad file contents.",
      disabledBlockedReason:
        "Disabled/blocked reason: arbitrary local file browsing is blocked and no file read runs from this page.",
      healthDependency:
        "Health dependency: daemon identity and health/version readiness must be known first.",
      permissionBoundaryRoute: "/jarvisd-permissions",
      runbookHandoff:
        "Runbook handoff: route any future read-preview request to explicit approval copy before local action.",
      status: "blocked",
      advancedCapabilityDetails:
        "Advanced capability details: file read preview is an example of a future reviewed capability, not an executor.",
    }),
    buildJarvisdCapabilityRegistryItem({
      idHint: "command-plan-preview",
      capabilityIdentity: "Capability identity: command plan preview.",
      capabilityCategory: "Capability category: command planning text.",
      permissionRequired:
        "Permission required: planning-only permission with no command execution and no shell bridge.",
      localOnlyStatus:
        "Local-only status: local planning only; execution remains blocked.",
      riskLevel: "blocked",
      auditRequirement:
        "Audit requirement: record planned command intent as text and preserve the blocked execution reason.",
      disabledBlockedReason:
        "Disabled/blocked reason: commands are not executed from this page or from arbitrary UI.",
      healthDependency:
        "Health dependency: not executable even if Jarvisd health passes.",
      permissionBoundaryRoute: "/jarvisd-permissions",
      runbookHandoff:
        "Runbook handoff: copy planning notes to a manual runbook; this registry does not run commands.",
      status: "blocked",
      advancedCapabilityDetails:
        "Advanced capability details: command plan preview can describe intent only and cannot invoke a command runner.",
    }),
    buildJarvisdCapabilityRegistryItem({
      idHint: "process-status-read",
      capabilityIdentity: "Capability identity: process status read.",
      capabilityCategory: "Capability category: local status metadata.",
      permissionRequired:
        "Permission required: approved status-only scope, no process control, and no environment value display.",
      localOnlyStatus:
        "Local-only status: local-only, status-only, and disabled until approved boundary exists.",
      riskLevel: "medium",
      auditRequirement:
        "Audit requirement: record process label summary, status shape, and blocked reason without environment values.",
      disabledBlockedReason:
        "Disabled/blocked reason: no approved local daemon boundary for process status in this phase.",
      healthDependency:
        "Health dependency: Jarvisd health route must confirm daemon readiness before future status reads.",
      permissionBoundaryRoute: "/jarvisd-permissions",
      runbookHandoff:
        "Runbook handoff: include process status review as manual operator notes, not automated polling.",
      status: "disabled",
      advancedCapabilityDetails:
        "Advanced capability details: process status read is non-executing metadata and remains disabled here.",
    }),
    buildJarvisdCapabilityRegistryItem({
      idHint: "local-model-status-read",
      capabilityIdentity: "Capability identity: local model status read.",
      capabilityCategory: "Capability category: local model readiness metadata.",
      permissionRequired:
        "Permission required: local model status scope only, no model download, no model install, and no prompt send.",
      localOnlyStatus:
        "Local-only status: local-only and blocked until health, registry, and permission boundaries agree.",
      riskLevel: "medium",
      auditRequirement:
        "Audit requirement: record model label and readiness state without prompts, files, tokens, or secrets.",
      disabledBlockedReason:
        "Disabled/blocked reason: this registry cannot query models or start local runtimes.",
      healthDependency:
        "Health dependency: daemon version and capability registry revision must be compatible.",
      permissionBoundaryRoute: "/jarvisd-permissions",
      runbookHandoff:
        "Runbook handoff: use manual model readiness notes for future local-first routing review.",
      status: "disabled",
      advancedCapabilityDetails:
        "Advanced capability details: no local model status request is sent and no model is installed.",
    }),
    buildJarvisdCapabilityRegistryItem({
      idHint: "artifact-capture-read",
      capabilityIdentity: "Capability identity: artifact capture read.",
      capabilityCategory: "Capability category: reviewed artifact metadata.",
      permissionRequired:
        "Permission required: approved artifact boundary and read-only capture metadata scope.",
      localOnlyStatus:
        "Local-only status: local-only and disabled until the artifact boundary is reviewed.",
      riskLevel: "medium",
      auditRequirement:
        "Audit requirement: record artifact label, allowed scope, denied scope, and no deletion or mutation.",
      disabledBlockedReason:
        "Disabled/blocked reason: artifact capture is a read example only; this page does not browse or delete artifacts.",
      healthDependency:
        "Health dependency: Jarvisd health and permission boundary must pass first.",
      permissionBoundaryRoute: "/jarvisd-permissions",
      runbookHandoff:
        "Runbook handoff: copy artifact capture read requirements into the manual runbook handoff.",
      status: "disabled",
      advancedCapabilityDetails:
        "Advanced capability details: artifact metadata capture is not executed, exported, deleted, or mutated here.",
    }),
  ];
}

export function buildJarvisdCapabilityRegistryBoundary(): JarvisdCapabilityRegistryBoundary {
  return {
    capabilityExecutionAllowedFromUi: false,
    disabledCapabilityExecutionAllowed: false,
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

export function summarizeJarvisdCapabilityRegistry(
  model: Pick<JarvisdCapabilityRegistryModel, "capabilities">
): string {
  return `Jarvisd capability registry describes ${model.capabilities.length} approved-local capability example(s). Capabilities are not executed from this page and disabled capabilities stay blocked.`;
}

export function buildJarvisdCapabilityRegistryModel(): JarvisdCapabilityRegistryModel {
  const capabilities = buildJarvisdCapabilityRegistryItems();
  const model: JarvisdCapabilityRegistryModel = {
    title: "Jarvisd capability registry",
    summary: "",
    capabilities,
    boundary: buildJarvisdCapabilityRegistryBoundary(),
    capabilityLanguage: [...JARVISD_CAPABILITY_REGISTRY_LANGUAGE],
    advancedDetails: [
      "Jarvisd capability registry",
      "Capabilities are not executed from this page",
      "Disabled capabilities stay blocked",
      "Capability identity",
      "Capability category",
      "Permission required",
      "Local-only status",
      "Risk level",
      "Audit requirement",
      "Disabled/blocked reason",
      "Health dependency",
      "Permission boundary route",
      "Runbook handoff",
      "No command execution",
      "No arbitrary local file browsing",
    ],
  };
  return { ...model, summary: summarizeJarvisdCapabilityRegistry(model) };
}
