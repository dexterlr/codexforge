import type {
  JarvisdRecoveryCase,
  JarvisdRecoveryConsoleBoundary,
  JarvisdRecoveryConsoleModel,
} from "./jarvisd-recovery-console-types";
import { buildJarvisdRecoveryConsoleStableKey } from "./jarvisd-recovery-console-types";

export const JARVISD_RECOVERY_CONSOLE_LANGUAGE = [
  "Jarvisd recovery console",
  "Recovery actions are reviewed not executed",
  "Restart kill reset actions require future approved local boundary",
  "No local process is mutated from this page",
  "Safe recovery checklist",
  "Manual handoff",
] as const;

export function buildJarvisdRecoveryCase(
  input: Omit<JarvisdRecoveryCase, "id"> & { idHint: string }
): JarvisdRecoveryCase {
  const { idHint, ...recoveryCase } = input;
  return {
    id: buildJarvisdRecoveryConsoleStableKey(
      "jarvisd-recovery-console",
      idHint,
      input.failureCategory,
      input.reviewStatus
    ),
    ...recoveryCase,
  };
}

export function buildJarvisdRecoveryCases(): JarvisdRecoveryCase[] {
  return [
    buildJarvisdRecoveryCase({
      idHint: "daemon-unreachable-review",
      recoveryIdentity:
        "Recovery identity: jarvisd-daemon-unreachable-reviewed-handoff.",
      sourceEventFailure:
        "Source event/failure: audit viewer shows a blocked daemon health request with no approved local boundary.",
      failureCategory: "daemon-unreachable",
      safeRecoveryChecklist: [
        "Confirm the failure is from a reviewed audit entry",
        "Confirm no command is executed from this page",
        "Confirm restart kill reset actions require future approved local boundary",
        "Confirm secrets and environment values are not requested",
      ],
      blockedRecoveryReasons: [
        "Recovery actions are reviewed not executed",
        "No local process is mutated from this page",
        "Jarvisd actions are not executed from arbitrary UI",
      ],
      permissionDependency:
        "Permission dependency: /jarvisd-permissions must approve any future local recovery action before it can run.",
      auditDependency:
        "Audit dependency: /jarvisd-audit-log must retain a redacted source event and blocked reason before recovery review.",
      manualHandoff:
        "Manual handoff: copy the safe recovery checklist into the operator runbook and perform any approved local work outside arbitrary UI.",
      escalationRoute: "/jarvisd-audit-log",
      nextRecommendedRoute: "/jarvisd-settings-review",
      reviewStatus: "blocked",
      advancedRecoveryDetails:
        "Advanced recovery details: this console does not restart, kill, reset, poll, execute commands, mutate files, call Jarvisd, or mutate local processes.",
    }),
    buildJarvisdRecoveryCase({
      idHint: "capability-permission-denied",
      recoveryIdentity:
        "Recovery identity: jarvisd-capability-permission-denied-review.",
      sourceEventFailure:
        "Source event/failure: capability request was denied because approval copy and audit dependency were incomplete.",
      failureCategory: "permission-denied",
      safeRecoveryChecklist: [
        "Read the permission boundary reference",
        "Keep recovery as a review checklist",
        "Route missing approvals back to Jarvisd permissions",
        "Keep advanced daemon detail secondary",
      ],
      blockedRecoveryReasons: [
        "Approved local boundary required",
        "Missing permission approval copy",
        "Missing redacted audit dependency",
      ],
      permissionDependency:
        "Permission dependency: /jarvisd-permissions must name allowed scope, denied scope, and revocation guidance.",
      auditDependency:
        "Audit dependency: the source event must remain redacted and read-only before any future recovery handoff.",
      manualHandoff:
        "Manual handoff: document the denied capability and ask for explicit approval instead of retrying automatically.",
      escalationRoute: "/jarvisd-permissions",
      nextRecommendedRoute: "/jarvisd-audit-log",
      reviewStatus: "needs-approval",
      advancedRecoveryDetails:
        "Advanced recovery details: no local process is inspected or changed from this page; recovery remains a reviewed handoff.",
    }),
  ];
}

export function buildJarvisdRecoveryConsoleBoundary(): JarvisdRecoveryConsoleBoundary {
  return {
    recoveryExecutionAllowedFromUi: false,
    processRestartAllowedFromUi: false,
    processKillAllowedFromUi: false,
    daemonResetAllowedFromUi: false,
    localProcessMutationAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    settingsAutoImportAllowed: false,
    secretsDisplayedAllowed: false,
    secretsExportedAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeJarvisdRecoveryConsole(
  model: Pick<JarvisdRecoveryConsoleModel, "cases">
): string {
  return `Jarvisd recovery console reviews ${model.cases.length} recovery case(s). Recovery actions are reviewed not executed, restart kill reset actions require future approved local boundary, and no local process is mutated from this page.`;
}

export function buildJarvisdRecoveryConsoleModel(): JarvisdRecoveryConsoleModel {
  const cases = buildJarvisdRecoveryCases();
  const model: JarvisdRecoveryConsoleModel = {
    title: "Jarvisd recovery console",
    summary: "",
    cases,
    boundary: buildJarvisdRecoveryConsoleBoundary(),
    recoveryLanguage: [...JARVISD_RECOVERY_CONSOLE_LANGUAGE],
    advancedDetails: [
      "Jarvisd recovery console",
      "Recovery actions are reviewed not executed",
      "Restart kill reset actions require future approved local boundary",
      "No local process is mutated from this page",
      "Recovery identity",
      "Source event/failure",
      "Failure category",
      "Safe recovery checklist",
      "Blocked recovery reasons",
      "Permission dependency",
      "Audit dependency",
      "Manual handoff",
      "Escalation route",
      "Next recommended route",
      "No command execution",
      "No file mutation",
    ],
  };
  return { ...model, summary: summarizeJarvisdRecoveryConsole(model) };
}
