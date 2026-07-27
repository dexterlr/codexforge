"use client";

import { useEffect, useId, useState } from "react";
import type {
  PrivateAlphaApprovalBindingVersion,
  PrivateAlphaBoundApprovalRecord,
  PrivateAlphaBoundDataBoundary,
  PrivateAlphaCapability,
  PrivateAlphaCloudDataTransferAcknowledgement,
  PrivateAlphaCloudDataTransferRequirement,
  PrivateAlphaRunRecord,
  PrivateAlphaRunSummary,
  PrivateAlphaRuntimeModelKey,
  PrivateAlphaStatus,
} from "@/lib/codexforge/private-alpha";
import {
  PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
  PRIVATE_ALPHA_DATA_ROOT_LABEL,
  PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_MAX_OUTPUT_TOKENS,
  PRIVATE_ALPHA_MIN_OUTPUT_TOKENS,
  PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE,
  PRIVATE_ALPHA_PRODUCTION_MODEL,
  PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
  PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL,
  PRIVATE_ALPHA_RUNTIME_MODEL_KEYS,
  PRIVATE_ALPHA_SECRET_GUIDANCE,
  isPrivateAlphaCloudExecutionConfiguration,
  isPrivateAlphaLocalExecutionConfiguration,
  resolvePrivateAlphaBoundConfiguration,
} from "@/lib/codexforge/private-alpha";
import {
  approvePrivateAlphaRun,
  cancelPrivateAlphaRun,
  createPrivateAlphaRun,
  executePrivateAlphaRun,
  fetchPrivateAlphaRun,
  fetchPrivateAlphaStatus,
  listPrivateAlphaRuns,
} from "@/lib/codexforge/private-alpha/private-alpha-api-client";
import styles from "./JarvisUnifiedProductShell.module.css";

type PrivateAlphaLoadState = "loading" | "ready" | "error";
type PrivateAlphaPanelView = "current-run" | "recent-runs" | "audit";
type PrivateAlphaProgressStepState =
  | "pending"
  | "current"
  | "complete"
  | "success"
  | "failure"
  | "blocked";
type PrivateAlphaProgressTone = "secondary" | "blocked";

type PrivateAlphaProgressStep = Readonly<{
  id: "created" | "approved" | "executing" | "result";
  label: "Created" | "Approved" | "Executing" | "Result";
  state: PrivateAlphaProgressStepState;
}>;

type PrivateAlphaProgressSnapshot = Readonly<{
  steps: readonly PrivateAlphaProgressStep[];
  terminalLabel: string | null;
  terminalTone: PrivateAlphaProgressTone | null;
}>;

type PrivateAlphaTabRecord = Readonly<{
  id: PrivateAlphaPanelView;
  label: string;
}>;

type PrivateAlphaManualProviderId = "ollama-local" | "groq-cloud";

type PrivateAlphaManualTargetConfiguration = Readonly<{
  providerId: PrivateAlphaManualProviderId;
  providerLabel: "Local Ollama" | "Groq Cloud";
  modelKey: PrivateAlphaRuntimeModelKey;
  modelLabel:
    | "gpt-oss:20b"
    | "openai/gpt-oss-20b"
    | "openai/gpt-oss-120b";
  dataBoundaryLabel: "Local machine" | "Cloud provider";
  approvalModeLabel: "Local execution" | "Manual cloud execution";
  supportsCode: boolean;
  executableNow: boolean;
}>;

type PrivateAlphaRunClassification =
  | Readonly<{
      kind: "local-executable";
      target: PrivateAlphaManualTargetConfiguration;
    }>
  | Readonly<{
      kind: "cloud-executable";
      target: PrivateAlphaManualTargetConfiguration;
    }>
  | Readonly<{
      kind: "historical";
    }>;

type PrivateAlphaBoundRequestMetadata = Readonly<{
  bindingVersion: PrivateAlphaApprovalBindingVersion;
  modelKey: PrivateAlphaRuntimeModelKey;
  dataBoundary: PrivateAlphaBoundDataBoundary;
  cloudDataTransferRequirement: PrivateAlphaCloudDataTransferRequirement;
}>;

type PrivateAlphaSelectedTargetBadge = Readonly<{
  label: string;
  className: string;
}>;

const PRIVATE_ALPHA_PANEL_TABS = [
  { id: "current-run", label: "Current run" },
  { id: "recent-runs", label: "Recent runs" },
  { id: "audit", label: "Audit" },
] as const satisfies readonly PrivateAlphaTabRecord[];

const PRIVATE_ALPHA_GROQ_PROVIDER_LABEL = "Groq Cloud" as const;

const PRIVATE_ALPHA_MANUAL_PROVIDER_OPTIONS = [
  { id: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID, label: PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL },
  { id: "groq-cloud", label: PRIVATE_ALPHA_GROQ_PROVIDER_LABEL },
] as const;

const PRIVATE_ALPHA_MANUAL_TARGETS = [
  {
    providerId: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
    providerLabel: PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL,
    modelKey: PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
    modelLabel: PRIVATE_ALPHA_PRODUCTION_MODEL,
    dataBoundaryLabel: "Local machine",
    approvalModeLabel: "Local execution",
    supportsCode: true,
    executableNow: true,
  },
  {
    providerId: "groq-cloud",
    providerLabel: PRIVATE_ALPHA_GROQ_PROVIDER_LABEL,
    modelKey: PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    modelLabel: "openai/gpt-oss-20b",
    dataBoundaryLabel: "Cloud provider",
    approvalModeLabel: "Manual cloud execution",
    supportsCode: false,
    executableNow: true,
  },
  {
    providerId: "groq-cloud",
    providerLabel: PRIVATE_ALPHA_GROQ_PROVIDER_LABEL,
    modelKey: PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
    modelLabel: "openai/gpt-oss-120b",
    dataBoundaryLabel: "Cloud provider",
    approvalModeLabel: "Manual cloud execution",
    supportsCode: false,
    executableNow: true,
  },
] as const satisfies readonly PrivateAlphaManualTargetConfiguration[];

const PRIVATE_ALPHA_LOCAL_TARGET = PRIVATE_ALPHA_MANUAL_TARGETS[0];
const PRIVATE_ALPHA_GROQ_20B_TARGET = PRIVATE_ALPHA_MANUAL_TARGETS[1];
const PRIVATE_ALPHA_GROQ_120B_TARGET = PRIVATE_ALPHA_MANUAL_TARGETS[2];
const PRIVATE_ALPHA_GROQ_TARGETS = [
  PRIVATE_ALPHA_GROQ_20B_TARGET,
  PRIVATE_ALPHA_GROQ_120B_TARGET,
] as const;

function resolveStateClass(state: string): string {
  switch (state) {
    case "approved":
    case "awaiting_approval":
      return styles.metricStateApproval;
    case "succeeded":
      return styles.metricStateReady;
    case "failed":
    case "blocked":
    case "canceled":
      return styles.metricStateBlocked;
    default:
      return styles.metricStateSecondary;
  }
}

function resolveProgressStateClass(state: PrivateAlphaProgressStepState): string {
  switch (state) {
    case "current":
      return styles.metricStateApproval;
    case "complete":
    case "success":
      return styles.metricStateReady;
    case "failure":
    case "blocked":
      return styles.metricStateBlocked;
    default:
      return styles.metricStateSecondary;
  }
}

function formatKillSwitchSources(status: PrivateAlphaStatus | null): string {
  if (!status || status.killSwitchSources.length === 0) {
    return "No kill-switch source engaged.";
  }

  return `Engaged via ${status.killSwitchSources.join(" + ")}.`;
}

function isPrivateAlphaRuntimeModelKey(
  value: unknown
): value is PrivateAlphaRuntimeModelKey {
  return PRIVATE_ALPHA_RUNTIME_MODEL_KEYS.some((modelKey) => modelKey === value);
}

function isPrivateAlphaCapabilityValue(
  value: string
): value is PrivateAlphaCapability {
  return value === "text" || value === "code";
}

function isPrivateAlphaManualProviderId(
  value: string
): value is PrivateAlphaManualProviderId {
  return value === PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID || value === "groq-cloud";
}

function resolveManualTargetConfiguration(
  modelKey: PrivateAlphaRuntimeModelKey
): PrivateAlphaManualTargetConfiguration {
  switch (modelKey) {
    case PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY:
      return PRIVATE_ALPHA_LOCAL_TARGET;
    case PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY:
      return PRIVATE_ALPHA_GROQ_20B_TARGET;
    case PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY:
      return PRIVATE_ALPHA_GROQ_120B_TARGET;
  }
}

function resolveManualProviderLabel(providerId: string): string {
  switch (providerId) {
    case "ollama-local":
      return PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL;
    case "groq-cloud":
      return PRIVATE_ALPHA_GROQ_PROVIDER_LABEL;
    case "auto":
      return "Auto";
    default:
      return providerId;
  }
}

function resolveRunModelLabel(modelPreferenceLabel: string | null): string {
  return modelPreferenceLabel ?? "No model recorded";
}

function readBoundMetadata(
  source: Pick<
    PrivateAlphaRunRecord["request"],
    | "providerPreference"
    | "modelPreferenceLabel"
    | "executionMode"
    | "capability"
    | "retentionMode"
    | "maximumOutputTokens"
  > &
    Partial<
      Pick<
        PrivateAlphaBoundRequestMetadata,
        "bindingVersion" | "modelKey" | "dataBoundary" | "cloudDataTransferRequirement"
      >
    >
): PrivateAlphaBoundRequestMetadata | null {
  if (
    !("bindingVersion" in source) ||
    !("modelKey" in source) ||
    !("dataBoundary" in source) ||
    !("cloudDataTransferRequirement" in source)
  ) {
    return null;
  }

  const modelKey = source.modelKey;
  if (!isPrivateAlphaRuntimeModelKey(modelKey)) {
    return null;
  }

  const exactConfiguration = resolvePrivateAlphaBoundConfiguration(modelKey);
  if (
    source.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
    source.dataBoundary !== exactConfiguration.dataBoundary ||
    source.cloudDataTransferRequirement !==
      exactConfiguration.cloudDataTransferRequirement
  ) {
    return null;
  }

  return {
    bindingVersion: source.bindingVersion,
    modelKey,
    dataBoundary: source.dataBoundary,
    cloudDataTransferRequirement: source.cloudDataTransferRequirement,
  };
}

function isBoundApprovalRecord(
  approval: PrivateAlphaRunRecord["approval"]
): approval is PrivateAlphaBoundApprovalRecord {
  return approval !== null && "cloudDataTransferAcknowledgement" in approval;
}

function readCloudDataTransferAcknowledgement(
  run: PrivateAlphaRunRecord
): PrivateAlphaCloudDataTransferAcknowledgement | null {
  if (!isBoundApprovalRecord(run.approval)) {
    return null;
  }

  return run.approval.cloudDataTransferAcknowledgement;
}

function resolveExactBoundManualTarget(
  run: PrivateAlphaRunRecord
): PrivateAlphaManualTargetConfiguration | null {
  if (
    isPrivateAlphaLocalExecutionConfiguration(run.request) &&
    isPrivateAlphaLocalExecutionConfiguration(run.approvalScope)
  ) {
    return PRIVATE_ALPHA_LOCAL_TARGET;
  }

  const boundRequest = readBoundMetadata(run.request);
  const boundApprovalScope = readBoundMetadata(run.approvalScope);
  if (boundRequest === null || boundApprovalScope === null) {
    return null;
  }

  if (
    !isPrivateAlphaCloudExecutionConfiguration(run.request) ||
    !isPrivateAlphaCloudExecutionConfiguration(run.approvalScope) ||
    boundRequest.bindingVersion !== boundApprovalScope.bindingVersion ||
    boundRequest.modelKey !== boundApprovalScope.modelKey ||
    boundRequest.dataBoundary !== boundApprovalScope.dataBoundary ||
    boundRequest.cloudDataTransferRequirement !==
      boundApprovalScope.cloudDataTransferRequirement
  ) {
    return null;
  }

  const derivedConfiguration = resolvePrivateAlphaBoundConfiguration(
    boundRequest.modelKey
  );
  if (
    run.request.providerPreference !== derivedConfiguration.providerPreference ||
    run.request.modelPreferenceLabel !== derivedConfiguration.modelPreferenceLabel ||
    run.request.executionMode !== derivedConfiguration.executionMode ||
    run.approvalScope.providerPreference !==
      derivedConfiguration.providerPreference ||
    run.approvalScope.modelPreferenceLabel !==
      derivedConfiguration.modelPreferenceLabel ||
    run.approvalScope.executionMode !== derivedConfiguration.executionMode ||
    boundRequest.bindingVersion !== derivedConfiguration.bindingVersion ||
    boundRequest.dataBoundary !== derivedConfiguration.dataBoundary ||
    boundRequest.cloudDataTransferRequirement !==
      derivedConfiguration.cloudDataTransferRequirement
  ) {
    return null;
  }

  return resolveManualTargetConfiguration(boundRequest.modelKey);
}

function classifyPrivateAlphaRun(
  run: PrivateAlphaRunRecord | null
): PrivateAlphaRunClassification | null {
  if (!run) {
    return null;
  }

  const target = resolveExactBoundManualTarget(run);
  if (target === null) {
    return { kind: "historical" };
  }

  if (target.providerId === "groq-cloud") {
    return isPrivateAlphaCloudExecutionConfiguration(run.request)
      ? { kind: "cloud-executable", target }
      : { kind: "historical" };
  }

  return isPrivateAlphaLocalExecutionConfiguration(run.request) &&
    isPrivateAlphaLocalExecutionConfiguration(run.approvalScope)
    ? { kind: "local-executable", target }
    : { kind: "historical" };
}

function resolveLocalRuntimeStatus(status: PrivateAlphaStatus | null): string {
  if (status === null) {
    return "Checking local Ollama";
  }

  if (!status.providerAvailable) {
    return "Local Ollama unavailable";
  }

  if (!status.modelAvailable) {
    return "Local gpt-oss:20b missing";
  }

  return "Local Ollama ready";
}

function buildSelectedTargetBadge(
  status: PrivateAlphaStatus | null,
  providerId: PrivateAlphaManualProviderId
): PrivateAlphaSelectedTargetBadge {
  if (providerId === "groq-cloud") {
    return {
      label: "Manual cloud execution",
      className: styles.metricStateApproval,
    };
  }

  if (status === null) {
    return {
      label: "Checking local state",
      className: styles.metricStateSecondary,
    };
  }

  return status.executionAllowed
    ? {
        label: "Local execution allowed",
        className: styles.metricStateReady,
      }
    : {
        label: "Local execution blocked",
        className: styles.metricStateBlocked,
      };
}

function resolveCurrentRunDataBoundaryLabel(
  run: PrivateAlphaRunRecord,
  classification: PrivateAlphaRunClassification
): string {
  if (classification.kind === "local-executable") {
    return classification.target.dataBoundaryLabel;
  }

  if (classification.kind === "cloud-executable") {
    return classification.target.dataBoundaryLabel;
  }

  const boundRequest = readBoundMetadata(run.request);
  if (boundRequest?.dataBoundary === "local-machine") {
    return "Local machine";
  }

  if (boundRequest?.dataBoundary === "cloud-provider") {
    return "Cloud provider";
  }

  return "Historical record";
}

function resolveCurrentRunApprovalModeLabel(
  run: PrivateAlphaRunRecord,
  classification: PrivateAlphaRunClassification
): string {
  if (classification.kind === "local-executable") {
    return classification.target.approvalModeLabel;
  }

  if (classification.kind === "cloud-executable") {
    return classification.target.approvalModeLabel;
  }

  return run.request.executionMode === PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE
    ? "Local execution"
    : "Readable only";
}

function formatNanosecondDuration(durationNanoseconds: number | null): string | null {
  if (durationNanoseconds === null) {
    return null;
  }

  if (durationNanoseconds >= 60_000_000_000) {
    const totalSeconds = Math.round(durationNanoseconds / 1_000_000_000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}m ${seconds}s`;
  }

  if (durationNanoseconds >= 1_000_000_000) {
    return `${(durationNanoseconds / 1_000_000_000).toFixed(2)}s`;
  }

  if (durationNanoseconds >= 1_000_000) {
    return `${(durationNanoseconds / 1_000_000).toFixed(0)}ms`;
  }

  return `${durationNanoseconds}ns`;
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);

  if (Number.isNaN(date.valueOf())) {
    return timestamp;
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function buildExecutionOutcomeMessage(run: PrivateAlphaRunRecord): string {
  const groqExecution = run.execution?.provider === "groq-cloud";

  switch (run.state) {
    case "succeeded":
      return groqExecution
        ? "Groq Cloud execution finished and output was persisted locally."
        : "Local Ollama execution finished and output was persisted locally.";
    case "failed":
      return groqExecution
        ? "Groq Cloud execution finished with a persisted failure record."
        : "Local Ollama execution finished with a persisted failure record.";
    case "blocked":
      return "A persisted blocked execution record is now loaded.";
    default:
      return "Private-alpha run state refreshed.";
  }
}

function buildProgressSnapshot(
  run: PrivateAlphaRunRecord | null
): PrivateAlphaProgressSnapshot {
  let createdState: PrivateAlphaProgressStepState = "pending";
  let approvedState: PrivateAlphaProgressStepState = "pending";
  let executingState: PrivateAlphaProgressStepState = "pending";
  let resultState: PrivateAlphaProgressStepState = "pending";
  let terminalLabel: string | null = null;
  let terminalTone: PrivateAlphaProgressTone | null = null;

  if (run) {
    switch (run.state) {
      case "awaiting_approval":
        createdState = "current";
        break;
      case "approved":
        createdState = "complete";
        approvedState = "complete";
        break;
      case "executing":
        createdState = "complete";
        approvedState = "complete";
        executingState = "current";
        break;
      case "succeeded":
        createdState = "complete";
        approvedState = "complete";
        executingState = "complete";
        resultState = "success";
        terminalLabel = "Succeeded";
        terminalTone = "secondary";
        break;
      case "failed":
        createdState = "complete";
        approvedState = "complete";
        executingState = "complete";
        resultState = "failure";
        terminalLabel = "Failed";
        terminalTone = "blocked";
        break;
      case "blocked":
        createdState = "complete";
        approvedState = "complete";
        executingState = "complete";
        resultState = "blocked";
        terminalLabel = "Blocked";
        terminalTone = "blocked";
        break;
      case "canceled":
        createdState = "complete";
        approvedState = run.approval ? "complete" : "pending";
        terminalLabel = "Canceled";
        terminalTone = "blocked";
        break;
      default:
        break;
    }
  }

  return {
    steps: [
      { id: "created", label: "Created", state: createdState },
      { id: "approved", label: "Approved", state: approvedState },
      { id: "executing", label: "Executing", state: executingState },
      { id: "result", label: "Result", state: resultState },
    ],
    terminalLabel,
    terminalTone,
  };
}

function buildCurrentRunStateMessage(
  run: PrivateAlphaRunRecord | null,
  classification: PrivateAlphaRunClassification | null
): string {
  if (!run) {
    return "No persisted run is selected yet. Create an approval request to begin the workflow.";
  }

  if (classification?.kind === "cloud-executable") {
    switch (run.state) {
      case "awaiting_approval":
        return "The request is persisted locally. No prompt was sent to Groq. The exact cloud scope is awaiting approval.";
      case "approved":
        return "The exact cloud scope is approved. Cloud transfer consent is recorded. No prompt was sent yet, and a separate execution acknowledgement is required.";
      case "executing":
        return "The exact approved prompt has been sent to the exact Groq model. The persisted executing state is loaded.";
      case "succeeded":
        return "The exact Groq output and metrics are persisted locally.";
      case "failed":
      case "blocked":
        return "The exact Groq execution finished with a bounded persisted status record.";
      case "canceled":
        return "This Groq run was canceled locally.";
      default:
        return "This exact Groq Cloud record remains readable. Execution requires an explicit operator action.";
    }
  }

  if (classification?.kind === "historical") {
    return "Historical or legacy record loaded. It remains readable, but Jarvis does not execute it.";
  }

  switch (run.state) {
    case "awaiting_approval":
      return "The request is persisted locally and ready for manual approval.";
    case "approved":
      return "Manual approval is recorded. Execution still requires an explicit local action.";
    case "executing":
      return "Execution is in progress and the latest persisted state is loaded.";
    case "succeeded":
      return "Execution completed and the result is available below.";
    case "failed":
      return "Execution failed and a safe persisted error record is available below.";
    case "blocked":
      return "Execution was blocked and the safe blocked record is available below.";
    case "canceled":
      return "This run was canceled before execution.";
    default:
      return "The latest private-alpha state is loaded.";
  }
}

function buildNextActionSummary(
  run: PrivateAlphaRunRecord | null,
  status: PrivateAlphaStatus | null,
  classification: PrivateAlphaRunClassification | null
): string {
  if (!run) {
    return "Create an approval request to persist the task and open the manual review path.";
  }

  if (classification?.kind === "historical") {
    if (run.state === "awaiting_approval" || run.state === "approved") {
      return "This historical record remains readable only. Review it or cancel it locally, then create a new exact bound request.";
    }

    return "Review the historical record and create a new exact bound request when another task is needed.";
  }

  if (classification?.kind === "cloud-executable") {
    switch (run.state) {
      case "awaiting_approval":
        return "Review the exact Groq Cloud scope, record both acknowledgements, or cancel the run locally.";
      case "approved":
        if (status?.killSwitchEngaged === true) {
          return "The global private-alpha kill switch is engaged. Groq execution stays blocked until it is disengaged.";
        }

        return "Grant the one-time Groq execution acknowledgement, then execute once. Availability and credential checks occur server-side only after the explicit action.";
      case "executing":
        return "Generation is in progress. Refresh local state to load the persisted terminal result.";
      case "succeeded":
        return "Review the persisted output, metrics, hashes, and audit trail.";
      case "failed":
      case "blocked":
        return "Review the persisted safe error details and audit trail before creating another run.";
      case "canceled":
        return "This run is closed. Create a new exact bound request for another task.";
      default:
        return "Review the persisted cloud execution record.";
    }
  }

  switch (run.state) {
    case "awaiting_approval":
      return "Record manual approval when the request and scope are correct.";
    case "approved":
      if (status?.executionAllowed === false) {
        return "Execution is still blocked until local availability and kill-switch checks allow it.";
      }

      return "Acknowledge the local execution scope, then execute once on local Ollama.";
    case "executing":
      return "Execution is in progress. Refresh local state to load the terminal result.";
    case "succeeded":
      return "Review the persisted result, metrics, and audit trail.";
    case "failed":
      return "Review the safe failure details and audit trail before creating another run.";
    case "blocked":
      return "Review the blocked status and safe message before creating another run.";
    case "canceled":
      return "This run is closed. Create a new approval request for another task.";
    default:
      return "Create an approval request to begin the workflow.";
  }
}

function buildCurrentRunResultSummary(
  run: PrivateAlphaRunRecord | null,
  classification: PrivateAlphaRunClassification | null
): string {
  if (!run) {
    return "No persisted result is loaded yet.";
  }

  if (classification?.kind === "cloud-executable") {
    if (run.state === "canceled") {
      return "The run was canceled locally before any prompt was sent to Groq.";
    }

    if (run.state === "awaiting_approval" || run.state === "approved") {
      return "No provider generation call has occurred.";
    }

    if (run.state === "executing") {
      return "Generation is in progress.";
    }
  }

  if (classification?.kind === "historical") {
    if (run.state === "awaiting_approval" || run.state === "approved") {
      return "This historical record remains readable only. Jarvis does not execute it.";
    }
  }

  if (run.state === "succeeded") {
    const outputText = run.execution?.outputText ?? null;

    if (outputText !== null && outputText.trim().length > 0) {
      return "Response text is available above in the result panel.";
    }

    return "The model completed successfully, but no visible response text was returned.";
  }

  if ((run.state === "failed" || run.state === "blocked") && run.execution?.safeErrorMessage) {
    return run.execution.safeErrorMessage;
  }

  if (run.state === "canceled") {
    return "The run was canceled before execution.";
  }

  if (run.state === "executing") {
    return "Execution is still in progress.";
  }

  return "A terminal result will appear here after execution completes.";
}

export function PrivateAlphaRunPanel() {
  const [status, setStatus] = useState<PrivateAlphaStatus | null>(null);
  const [runs, setRuns] = useState<readonly PrivateAlphaRunSummary[]>([]);
  const [currentRun, setCurrentRun] = useState<PrivateAlphaRunRecord | null>(null);
  const [loadState, setLoadState] = useState<PrivateAlphaLoadState>("loading");
  const [selectedProviderId, setSelectedProviderId] =
    useState<PrivateAlphaManualProviderId>(PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID);
  const [selectedModelKey, setSelectedModelKey] =
    useState<PrivateAlphaRuntimeModelKey | null>(
      PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY
    );
  const [requestText, setRequestText] = useState("");
  const [capability, setCapability] = useState<PrivateAlphaCapability>("text");
  const [maximumOutputTokens, setMaximumOutputTokens] = useState("512");
  const [approvalAcknowledged, setApprovalAcknowledged] = useState(false);
  const [cloudDataTransferAcknowledged, setCloudDataTransferAcknowledged] =
    useState(false);
  const [cloudExecutionAcknowledged, setCloudExecutionAcknowledged] =
    useState(false);
  const [executionAcknowledged, setExecutionAcknowledged] = useState(false);
  const [cancellationReason, setCancellationReason] = useState(
    "Operator canceled this private-alpha run before execution."
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actionInFlight, setActionInFlight] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<PrivateAlphaPanelView>("current-run");
  const [showCancellationForm, setShowCancellationForm] = useState(false);

  const requestFieldId = useId();
  const providerFieldId = useId();
  const modelFieldId = useId();
  const capabilityFieldId = useId();
  const maximumOutputTokensFieldId = useId();
  const cancellationReasonFieldId = useId();
  const tabBaseId = useId();

  async function refreshPanel(preferredRunId?: string): Promise<void> {
    setLoadState("loading");
    setErrorMessage(null);

    try {
      const [nextStatus, nextRuns] = await Promise.all([
        fetchPrivateAlphaStatus(),
        listPrivateAlphaRuns(),
      ]);
      const nextRunId =
        preferredRunId ?? currentRun?.runId ?? nextRuns[0]?.runId ?? null;

      let nextRun: PrivateAlphaRunRecord | null = null;
      if (nextRunId) {
        nextRun = await fetchPrivateAlphaRun(nextRunId);
      }

      setStatus(nextStatus);
      setRuns(nextRuns);
      setCurrentRun(nextRun);
      setLoadState("ready");
    } catch (error) {
      setLoadState("error");
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Unable to load private-alpha local execution status."
      );
    }
  }

  useEffect(() => {
    void refreshPanel();
  }, []);

  useEffect(() => {
    setApprovalAcknowledged(false);
    setCloudDataTransferAcknowledged(false);
    setCloudExecutionAcknowledged(false);
    setExecutionAcknowledged(false);
    setShowCancellationForm(false);
  }, [currentRun?.runId]);

  function handleProviderSelectionChange(value: string): void {
    if (!isPrivateAlphaManualProviderId(value)) {
      setErrorMessage("Select one of the manual providers.");
      return;
    }

    setErrorMessage(null);
    setSelectedProviderId(value);
    if (value === PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID) {
      setSelectedModelKey(PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY);
      return;
    }

    setSelectedModelKey(null);
    setCapability("text");
  }

  function handleModelSelectionChange(value: string): void {
    if (value.length === 0) {
      setErrorMessage(null);
      setSelectedModelKey(null);
      return;
    }

    if (!isPrivateAlphaRuntimeModelKey(value)) {
      setErrorMessage("Select one exact allowlisted model.");
      return;
    }

    const target = resolveManualTargetConfiguration(value);
    if (target.providerId !== selectedProviderId) {
      setErrorMessage("The selected model does not match the chosen provider.");
      setSelectedModelKey(null);
      return;
    }

    setErrorMessage(null);
    setSelectedModelKey(value);
  }

  function handleCapabilityChange(value: string): void {
    if (!isPrivateAlphaCapabilityValue(value)) {
      setErrorMessage("Select either Text or Code.");
      return;
    }

    setErrorMessage(null);
    setCapability(value);
  }

  async function handleCreateRun(): Promise<void> {
    const selectedTarget =
      selectedModelKey === null
        ? null
        : resolveManualTargetConfiguration(selectedModelKey);
    const exactTarget =
      selectedTarget !== null && selectedTarget.providerId === selectedProviderId
        ? selectedTarget
        : null;
    if (exactTarget === null) {
      setErrorMessage("Choose an exact provider and model before creating a run.");
      return;
    }

    setActionInFlight("create");
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await createPrivateAlphaRun({
        requestText,
        capability: exactTarget.supportsCode ? capability : "text",
        modelKey: exactTarget.modelKey,
        modelPreferenceLabel: exactTarget.modelLabel,
        maximumOutputTokens: Number(maximumOutputTokens),
      });

      await refreshPanel(result.run.runId);
      setActiveView("current-run");
      setSuccessMessage(
        result.created
          ? "Approval request persisted locally."
          : "Existing private-alpha run returned from idempotency protection."
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Unable to create the private-alpha run."
      );
    } finally {
      setActionInFlight(null);
    }
  }

  async function handleApprove(): Promise<void> {
    const classification = classifyPrivateAlphaRun(currentRun);
    if (
      !currentRun ||
      classification === null ||
      classification.kind === "historical" ||
      currentRun.state !== "awaiting_approval"
    ) {
      return;
    }

    setActionInFlight("approve");
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (classification.kind === "cloud-executable") {
        await approvePrivateAlphaRun(currentRun.runId, {
          approvalScopeHash: currentRun.approvalScopeHash,
          approved: true,
          acknowledgement: true,
          expectedRevision: currentRun.revision,
          cloudDataTransferAcknowledgement: true,
        });
      } else {
        await approvePrivateAlphaRun(currentRun.runId, {
          approvalScopeHash: currentRun.approvalScopeHash,
          approved: true,
          acknowledgement: true,
          expectedRevision: currentRun.revision,
        });
      }

      await refreshPanel(currentRun.runId);
      setActiveView("current-run");
      setSuccessMessage(
        classification.kind === "cloud-executable"
          ? "Cloud approval recorded locally. No prompt was sent to Groq."
          : "Manual approval recorded locally."
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Unable to record manual approval."
      );
    } finally {
      setActionInFlight(null);
    }
  }

  async function handleExecute(): Promise<void> {
    const classification = classifyPrivateAlphaRun(currentRun);
    if (
      !currentRun ||
      classification === null ||
      (classification.kind !== "local-executable" &&
        classification.kind !== "cloud-executable")
    ) {
      return;
    }

    setActionInFlight("execute");
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const nextRun =
        classification.kind === "cloud-executable"
          ? await executePrivateAlphaRun(currentRun.runId, {
              execute: true,
              acknowledgement: true,
              approvalScopeHash: currentRun.approvalScopeHash,
              expectedRevision: currentRun.revision,
              cloudExecutionAcknowledgement: true,
            })
          : await executePrivateAlphaRun(currentRun.runId, {
              execute: true,
              acknowledgement: true,
              approvalScopeHash: currentRun.approvalScopeHash,
              expectedRevision: currentRun.revision,
            });

      await refreshPanel(nextRun.runId);
      setActiveView("current-run");
      setSuccessMessage(buildExecutionOutcomeMessage(nextRun));
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Unable to execute the private-alpha run.";

      try {
        await refreshPanel(currentRun.runId);
      } catch {
        setLoadState("error");
      }

      setErrorMessage(message);
    } finally {
      setActionInFlight(null);
    }
  }

  async function handleCancel(): Promise<void> {
    if (!currentRun) {
      return;
    }

    setActionInFlight("cancel");
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await cancelPrivateAlphaRun(currentRun.runId, {
        expectedRevision: currentRun.revision,
        reason: cancellationReason,
      });

      await refreshPanel(currentRun.runId);
      setActiveView("current-run");
      setSuccessMessage("Run canceled locally.");
      setShowCancellationForm(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Unable to cancel the private-alpha run."
      );
    } finally {
      setActionInFlight(null);
    }
  }

  const currentExecution = currentRun?.execution ?? null;
  const currentRunClassification = classifyPrivateAlphaRun(currentRun);
  const selectedTargetCandidate =
    selectedModelKey === null
      ? null
      : resolveManualTargetConfiguration(selectedModelKey);
  const selectedTarget =
    selectedTargetCandidate !== null &&
    selectedTargetCandidate.providerId === selectedProviderId
      ? selectedTargetCandidate
      : null;
  const selectedTargetBadge = buildSelectedTargetBadge(status, selectedProviderId);
  const selectedProviderLabel = resolveManualProviderLabel(selectedProviderId);
  const selectedModelLabel =
    selectedTarget?.modelLabel ??
    (selectedProviderId === "groq-cloud"
      ? "Select a Groq model"
      : PRIVATE_ALPHA_LOCAL_TARGET.modelLabel);
  const selectedDataBoundaryLabel =
    selectedProviderId === "groq-cloud"
      ? PRIVATE_ALPHA_GROQ_20B_TARGET.dataBoundaryLabel
      : PRIVATE_ALPHA_LOCAL_TARGET.dataBoundaryLabel;
  const selectedApprovalModeLabel =
    selectedProviderId === "groq-cloud"
      ? PRIVATE_ALPHA_GROQ_20B_TARGET.approvalModeLabel
      : PRIVATE_ALPHA_LOCAL_TARGET.approvalModeLabel;
  const currentRunBoundMetadata = currentRun
    ? readBoundMetadata(currentRun.request)
    : null;
  const currentRunCloudAcknowledgement = currentRun
    ? readCloudDataTransferAcknowledgement(currentRun)
    : null;
  const currentExecutionModelKey =
    currentExecution?.provider === "groq-cloud" ? currentExecution.modelKey : null;
  const currentExecutionDataBoundary =
    currentExecution?.provider === "groq-cloud" ? currentExecution.dataBoundary : null;
  const currentExecutionCloudAcknowledgement =
    currentExecution?.provider === "groq-cloud"
      ? currentExecution.cloudExecutionAcknowledgement
      : null;
  const currentRunProviderLabel = currentRun
    ? resolveManualProviderLabel(currentRun.request.providerPreference)
    : null;
  const currentRunModelLabel = currentRun
    ? resolveRunModelLabel(currentRun.request.modelPreferenceLabel)
    : null;
  const currentRunDataBoundaryLabel =
    currentRun && currentRunClassification
      ? resolveCurrentRunDataBoundaryLabel(currentRun, currentRunClassification)
      : null;
  const currentRunApprovalModeLabel =
    currentRun && currentRunClassification
      ? resolveCurrentRunApprovalModeLabel(currentRun, currentRunClassification)
      : null;
  const localExecutableRun = currentRunClassification?.kind === "local-executable";
  const cloudExecutableRun = currentRunClassification?.kind === "cloud-executable";
  const canApprove =
    currentRun?.state === "awaiting_approval" &&
    currentRunClassification !== null &&
    currentRunClassification.kind !== "historical";
  const canCancel =
    currentRun?.state === "awaiting_approval" || currentRun?.state === "approved";
  const canExecuteLocal =
    currentRun?.state === "approved" &&
    localExecutableRun &&
    executionAcknowledged &&
    status?.executionAllowed === true &&
    actionInFlight === null;
  const canExecuteCloud =
    currentRun?.state === "approved" &&
    cloudExecutableRun &&
    cloudExecutionAcknowledged &&
    status?.killSwitchEngaged === false &&
    actionInFlight === null;
  const canExecute = canExecuteLocal || canExecuteCloud;
  const progress = buildProgressSnapshot(currentRun);
  const executionDuration = formatNanosecondDuration(
    currentExecution?.totalDurationNanoseconds ?? null
  );
  const currentOutputText = currentExecution?.outputText ?? null;
  const recentRuns = runs.slice(0, 10);
  const currentRunMessage = buildCurrentRunStateMessage(
    currentRun,
    currentRunClassification
  );
  const nextActionSummary = buildNextActionSummary(
    currentRun,
    status,
    currentRunClassification
  );
  const currentRunResultSummary = buildCurrentRunResultSummary(
    currentRun,
    currentRunClassification
  );
  const canCreateBoundRun = selectedTarget !== null && actionInFlight === null;
  const approvalButtonDisabled =
    !canApprove ||
    actionInFlight !== null ||
    !approvalAcknowledged ||
    (cloudExecutableRun && !cloudDataTransferAcknowledged);
  const selectedTab = PRIVATE_ALPHA_PANEL_TABS.find((tab) => tab.id === activeView);

  return (
    <section
      className={`${styles.panel} ${styles.privateAlphaPanel}`}
      aria-label="Private alpha manual provider and model approval"
      data-codexforge-private-alpha-layout="focused"
    >
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.panelEyebrow}>Private Alpha</p>
          <h2 className={styles.panelTitle}>Manual provider and model approval</h2>
        </div>
        <span className={`${styles.panelBadge} ${selectedTargetBadge.className}`}>
          {selectedTargetBadge.label}
        </span>
      </div>

      <p className={styles.panelBody}>
        Choose a local or cloud target, persist the exact request scope, and
        review the audit trail. Local Ollama may execute after approval and
        runtime gates. Groq requires a later explicit execute-once action, with
        no automatic routing, retry, or fallback.
      </p>

      <div className={styles.privateAlphaStatusStrip}>
        <div className={styles.privateAlphaStatusItem}>
          <span className={styles.privateAlphaStatusLabel}>Selected provider</span>
          <span className={styles.privateAlphaStatusValue}>{selectedProviderLabel}</span>
        </div>
        <div className={styles.privateAlphaStatusItem}>
          <span className={styles.privateAlphaStatusLabel}>Selected model</span>
          <span className={styles.privateAlphaStatusValue}>{selectedModelLabel}</span>
        </div>
        <div className={styles.privateAlphaStatusItem}>
          <span className={styles.privateAlphaStatusLabel}>Data boundary</span>
          <span className={styles.privateAlphaStatusValue}>
            {selectedDataBoundaryLabel}
          </span>
        </div>
        <div className={styles.privateAlphaStatusItem}>
          <span className={styles.privateAlphaStatusLabel}>Approval mode</span>
          <span className={styles.privateAlphaStatusValue}>
            {selectedApprovalModeLabel}
          </span>
        </div>
        <div className={styles.privateAlphaStatusItem}>
          <span className={styles.privateAlphaStatusLabel}>Runtime status</span>
          <span className={styles.privateAlphaStatusValue}>
            {selectedProviderId === "groq-cloud"
              ? "Checked server-side at execution"
              : "Checked locally"}
          </span>
        </div>
        <div className={styles.privateAlphaStatusItem}>
          <span className={styles.privateAlphaStatusLabel}>Local runtime</span>
          <span className={styles.privateAlphaStatusValue}>
            {resolveLocalRuntimeStatus(status)}
          </span>
        </div>
        <div className={styles.privateAlphaStatusItem}>
          <span className={styles.privateAlphaStatusLabel}>Kill switch</span>
          <span className={styles.privateAlphaStatusValue}>
            {status === null
              ? "Checking"
              : status.killSwitchEngaged
                ? "Engaged"
                : "Disengaged"}
          </span>
        </div>
      </div>

      <p className={styles.privateAlphaSupportText}>
        {PRIVATE_ALPHA_SECRET_GUIDANCE} One execution attempt per approved run.
        Output is persisted locally at{" "}
        {status?.dataRootLabel ?? PRIVATE_ALPHA_DATA_ROOT_LABEL}. Local Ollama
        can execute only after manual approval, runtime checks, and kill-switch
        clearance. Groq availability and credential checks occur server-side
        only after the explicit execute action. Creating or approving a Groq
        request does not contact Groq, the exact model remains fixed, and no
        automatic routing occurs. {formatKillSwitchSources(status)}
      </p>

      {loadState === "loading" ? (
        <div className={styles.privateAlphaNotice} aria-live="polite" role="status">
          Loading private-alpha local execution status...
        </div>
      ) : null}

      {errorMessage ? (
        <div
          className={`${styles.privateAlphaNotice} ${styles.privateAlphaNoticeError}`}
          aria-live="assertive"
          role="alert"
        >
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div
          className={`${styles.privateAlphaNotice} ${styles.privateAlphaNoticeSuccess}`}
          aria-live="polite"
          role="status"
        >
          {successMessage}
        </div>
      ) : null}

      <div className={styles.privateAlphaWorkspace}>
        <div className={styles.privateAlphaMainColumn}>
          <section
            className={`${styles.summaryCard} ${styles.privateAlphaSection}`}
            data-codexforge-private-alpha-composer="true"
          >
            <div className={styles.privateAlphaSectionHeader}>
              <div>
                <p className={styles.panelEyebrow}>Request</p>
                <h3 className={styles.privateAlphaSectionTitle}>
                  Persist an approval request
                </h3>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
                {selectedProviderId === "groq-cloud"
                  ? "manual cloud execution"
                  : "local execution"}
              </span>
            </div>

            <p className={styles.privateAlphaSectionBody}>
              Use one real request textarea to choose a local or cloud approval
              target, then persist the exact provider and model scope for manual
              review.
            </p>

            <div className={styles.privateAlphaForm}>
              <label className={styles.privateAlphaField} htmlFor={requestFieldId}>
                <span className={styles.athenaInputLabel}>Request</span>
                <textarea
                  id={requestFieldId}
                  className={styles.privateAlphaTextarea}
                  value={requestText}
                  onChange={(event) => setRequestText(event.target.value)}
                  rows={7}
                  placeholder="Describe the text or code task for manual provider and model approval."
                />
              </label>

              <div className={styles.privateAlphaTargetSelectorGrid}>
                <label className={styles.privateAlphaField} htmlFor={providerFieldId}>
                  <span className={styles.athenaInputLabel}>Provider</span>
                  <select
                    id={providerFieldId}
                    className={styles.privateAlphaSelect}
                    data-codexforge-private-alpha-provider-selector="manual"
                    value={selectedProviderId}
                    onChange={(event) =>
                      handleProviderSelectionChange(event.target.value)
                    }
                  >
                    {PRIVATE_ALPHA_MANUAL_PROVIDER_OPTIONS.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={styles.privateAlphaField} htmlFor={modelFieldId}>
                  <span className={styles.athenaInputLabel}>Model</span>
                  <select
                    id={modelFieldId}
                    className={styles.privateAlphaSelect}
                    data-codexforge-private-alpha-model-selector="manual"
                    value={
                      selectedProviderId === "groq-cloud"
                        ? selectedTarget?.modelKey ?? ""
                        : PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY
                    }
                    onChange={(event) => handleModelSelectionChange(event.target.value)}
                  >
                    {selectedProviderId === "ollama-local" ? (
                      <option value={PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY}>
                        {PRIVATE_ALPHA_LOCAL_TARGET.modelLabel}
                      </option>
                    ) : (
                      <>
                        <option value="">Select a Groq model</option>
                        {PRIVATE_ALPHA_GROQ_TARGETS.map((target) => (
                          <option key={target.modelKey} value={target.modelKey}>
                            {target.modelLabel}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </label>
              </div>

              <label className={styles.privateAlphaField} htmlFor={capabilityFieldId}>
                <span className={styles.athenaInputLabel}>Capability</span>
                <select
                  id={capabilityFieldId}
                  className={styles.privateAlphaSelect}
                  value={selectedProviderId === "groq-cloud" ? "text" : capability}
                  onChange={(event) => handleCapabilityChange(event.target.value)}
                  disabled={selectedProviderId === "groq-cloud"}
                >
                  <option value="text">Text</option>
                  <option value="code">Code</option>
                </select>
              </label>
              <p className={styles.privateAlphaSecondaryText}>
                {selectedProviderId === "groq-cloud"
                  ? "Groq approval binding currently supports text requests only."
                  : "Local Ollama keeps both Text and Code available after manual approval."}
              </p>

              <div
                className={`${styles.privateAlphaTargetSummary} ${
                  selectedProviderId === "groq-cloud"
                    ? styles.privateAlphaTargetCloud
                    : styles.privateAlphaTargetLocal
                }`}
                data-codexforge-private-alpha-target-summary="true"
              >
                <div className={styles.privateAlphaTargetMeta}>
                  <div className={styles.privateAlphaStatusItem}>
                    <span className={styles.privateAlphaStatusLabel}>Provider</span>
                    <span className={styles.privateAlphaStatusValue}>
                      {selectedProviderLabel}
                    </span>
                  </div>
                  <div className={styles.privateAlphaStatusItem}>
                    <span className={styles.privateAlphaStatusLabel}>Model</span>
                    <span className={styles.privateAlphaStatusValue}>
                      {selectedModelLabel}
                    </span>
                  </div>
                  <div className={styles.privateAlphaStatusItem}>
                    <span className={styles.privateAlphaStatusLabel}>Data boundary</span>
                    <span className={styles.privateAlphaStatusValue}>
                      {selectedDataBoundaryLabel}
                    </span>
                  </div>
                  <div className={styles.privateAlphaStatusItem}>
                    <span className={styles.privateAlphaStatusLabel}>Approval mode</span>
                    <span className={styles.privateAlphaStatusValue}>
                      {selectedApprovalModeLabel}
                    </span>
                  </div>
                </div>
                <p className={styles.privateAlphaSectionBody}>
                  {selectedProviderId === "groq-cloud"
                    ? "This request stays inside the cloud-provider boundary. Creating or approving the request does not contact Groq. Only a later explicit execute action can send the approved prompt."
                    : "This request stays on the local machine. It can execute only after manual approval, and local runtime and kill-switch checks still apply."}
                </p>
                {selectedProviderId === "groq-cloud" ? (
                  <div
                    className={styles.privateAlphaCloudApprovalNotice}
                    data-codexforge-private-alpha-cloud-boundary="manual-execution"
                  >
                    The request is persisted locally. Creating the request does
                    not contact Groq. Approving the request does not contact
                    Groq. Only the later explicit execute action sends the
                    approved prompt, the exact model remains fixed, and no
                    automatic routing occurs.
                  </div>
                ) : null}
              </div>

              <details className={styles.privateAlphaDetailsBlock}>
                <summary className={styles.privateAlphaDetailsSummary}>
                  Advanced settings
                </summary>
                <div className={styles.privateAlphaDetailsBody}>
                  <label
                    className={styles.privateAlphaField}
                    htmlFor={maximumOutputTokensFieldId}
                  >
                    <span className={styles.athenaInputLabel}>Maximum output tokens</span>
                    <input
                      id={maximumOutputTokensFieldId}
                      className={styles.privateAlphaInput}
                      type="number"
                      min={PRIVATE_ALPHA_MIN_OUTPUT_TOKENS}
                      max={PRIVATE_ALPHA_MAX_OUTPUT_TOKENS}
                      value={maximumOutputTokens}
                      onChange={(event) => setMaximumOutputTokens(event.target.value)}
                    />
                  </label>
                  <p className={styles.privateAlphaSecondaryText}>
                    Valid range {PRIVATE_ALPHA_MIN_OUTPUT_TOKENS}-
                    {PRIVATE_ALPHA_MAX_OUTPUT_TOKENS}. Current default is 512.
                    GPT-OSS reasoning effort is fixed to low and uses part of
                    the generation budget. Very small limits may finish without
                    visible final text.
                  </p>
                </div>
              </details>

              <div className={styles.privateAlphaButtonRow}>
                <button
                  className={styles.privateAlphaButton}
                  type="button"
                  onClick={() => void handleCreateRun()}
                  disabled={!canCreateBoundRun}
                  data-codexforge-private-alpha-bound-create="true"
                >
                  {actionInFlight === "create"
                    ? "Persisting approval request..."
                    : "Create approval request"}
                </button>
                <button
                  className={styles.privateAlphaButtonSecondary}
                  type="button"
                  onClick={() => void refreshPanel(currentRun?.runId)}
                  disabled={actionInFlight !== null}
                >
                  Refresh local state
                </button>
              </div>
              {selectedProviderId === "groq-cloud" && selectedTarget === null ? (
                <p className={styles.privateAlphaSecondaryText}>
                  Create approval request stays disabled until one exact Groq
                  model is selected.
                </p>
              ) : null}
            </div>
          </section>

          <section
            className={`${styles.summaryCard} ${styles.privateAlphaSection}`}
            data-codexforge-private-alpha-result="true"
          >
            <div className={styles.privateAlphaSectionHeader}>
              <div>
                <p className={styles.panelEyebrow}>Result</p>
                <h3 className={styles.privateAlphaSectionTitle}>
                  Persisted output and safe result details
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${
                  currentRun ? resolveStateClass(currentRun.state) : styles.metricStateSecondary
                }`}
              >
                {currentRun?.state ?? "No run selected"}
              </span>
            </div>

            {!currentRun ? (
              <p className={styles.privateAlphaSectionBody}>
                Select or create a run to review the latest persisted result.
              </p>
            ) : null}

            {currentRun ? (
              <div className={styles.privateAlphaStack}>
                {currentExecution?.promptEvalCount !== null &&
                currentExecution?.promptEvalCount !== undefined ? (
                  <div className={styles.privateAlphaResultMeta}>
                    <span className={styles.metaPill}>
                      {`Prompt tokens ${currentExecution.promptEvalCount}`}
                    </span>
                    {currentExecution.evalCount !== null &&
                    currentExecution.evalCount !== undefined ? (
                      <span className={styles.metaPill}>
                        {`Output tokens ${currentExecution.evalCount}`}
                      </span>
                    ) : null}
                    {executionDuration ? (
                      <span className={styles.metaPill}>{`Duration ${executionDuration}`}</span>
                    ) : null}
                  </div>
                ) : currentExecution?.evalCount !== null &&
                  currentExecution?.evalCount !== undefined ? (
                  <div className={styles.privateAlphaResultMeta}>
                    <span className={styles.metaPill}>
                      {`Output tokens ${currentExecution.evalCount}`}
                    </span>
                    {executionDuration ? (
                      <span className={styles.metaPill}>{`Duration ${executionDuration}`}</span>
                    ) : null}
                  </div>
                ) : executionDuration ? (
                  <div className={styles.privateAlphaResultMeta}>
                    <span className={styles.metaPill}>{`Duration ${executionDuration}`}</span>
                  </div>
                ) : null}

                {currentRun.state === "executing" ? (
                  <div className={styles.privateAlphaNotice}>
                    {cloudExecutableRun
                      ? "Generation is in progress for the exact approved Groq execution."
                      : "Execution was persisted as running before the local provider call."}
                  </div>
                ) : null}

                {currentRun.state === "succeeded" &&
                currentOutputText !== null &&
                currentOutputText.trim().length > 0 ? (
                  <div className={styles.privateAlphaResultPanel}>{currentOutputText}</div>
                ) : null}

                {currentRun.state === "succeeded" &&
                currentOutputText !== null &&
                currentOutputText.trim().length === 0 ? (
                  <div
                    className={`${styles.privateAlphaNotice} ${styles.privateAlphaNoticeWarning}`}
                  >
                    The model completed but returned no visible response text.
                  </div>
                ) : null}

                {(currentRun.state === "failed" || currentRun.state === "blocked") &&
                currentExecution?.safeErrorMessage ? (
                  <div
                    className={`${styles.privateAlphaNotice} ${styles.privateAlphaNoticeError}`}
                  >
                    {currentExecution.safeErrorMessage}
                  </div>
                ) : null}

                {(currentRun.state === "failed" || currentRun.state === "blocked") &&
                currentExecution?.errorCode ? (
                  <p className={styles.privateAlphaSecondaryText}>
                    {`Error code: ${currentExecution.errorCode}`}
                  </p>
                ) : null}

                {currentRun.state === "canceled" && currentRun.cancellation ? (
                  <div className={styles.privateAlphaNotice}>
                    {`Canceled: ${currentRun.cancellation.reason}`}
                  </div>
                ) : null}

                {currentRun.state === "awaiting_approval" ||
                currentRun.state === "approved" ? (
                  <p className={styles.privateAlphaSectionBody}>
                    {cloudExecutableRun
                      ? "No provider generation call has occurred."
                      : currentRunClassification?.kind === "historical"
                        ? "This historical record remains readable only. No provider call is available from Jarvis for it."
                        : "Result content will appear here after explicit local execution."}
                  </p>
                ) : null}
              </div>
            ) : null}
          </section>
        </div>

        <div className={styles.privateAlphaSideColumn}>
          <section className={`${styles.summaryCard} ${styles.privateAlphaSection}`}>
            <div className={styles.privateAlphaSectionHeader}>
              <div>
                <p className={styles.panelEyebrow}>Current run</p>
                <h3 className={styles.privateAlphaSectionTitle}>
                  Persisted workflow state
                </h3>
              </div>
              <span
                className={`${styles.panelBadge} ${
                  currentRun ? resolveStateClass(currentRun.state) : styles.metricStateSecondary
                }`}
              >
                {currentRun?.state ?? "No run selected"}
              </span>
            </div>

            <p className={styles.privateAlphaSectionBody}>{currentRunMessage}</p>

            {currentRun ? (
              <div className={styles.privateAlphaStack}>
                <p className={styles.privateAlphaPreview}>
                  {currentRun.request.redactedPreview}
                </p>
                <div className={styles.workspaceMeta}>
                  <span className={styles.metaPill}>
                    {`Capability ${currentRun.request.capability}`}
                  </span>
                  <span className={styles.metaPill}>
                    {`Revision ${currentRun.revision}`}
                  </span>
                  <span className={styles.metaPill}>
                    {`Updated ${formatTimestamp(currentRun.updatedAt)}`}
                  </span>
                </div>
                <div className={styles.privateAlphaTargetMeta}>
                  <div className={styles.privateAlphaStatusItem}>
                    <span className={styles.privateAlphaStatusLabel}>Provider</span>
                    <span className={styles.privateAlphaStatusValue}>
                      {currentRunProviderLabel}
                    </span>
                  </div>
                  <div className={styles.privateAlphaStatusItem}>
                    <span className={styles.privateAlphaStatusLabel}>Model</span>
                    <span className={styles.privateAlphaStatusValue}>
                      {currentRunModelLabel}
                    </span>
                  </div>
                  <div className={styles.privateAlphaStatusItem}>
                    <span className={styles.privateAlphaStatusLabel}>Data boundary</span>
                    <span className={styles.privateAlphaStatusValue}>
                      {currentRunDataBoundaryLabel}
                    </span>
                  </div>
                  <div className={styles.privateAlphaStatusItem}>
                    <span className={styles.privateAlphaStatusLabel}>Approval mode</span>
                    <span className={styles.privateAlphaStatusValue}>
                      {currentRunApprovalModeLabel}
                    </span>
                  </div>
                </div>
                {cloudExecutableRun ? (
                  <div className={styles.privateAlphaCloudExecutionNotice}>
                    Cloud-provider boundary. No prompt was sent to Groq yet.
                    The exact model remains fixed until one explicit execute
                    action is taken.
                  </div>
                ) : null}
                {currentRunClassification?.kind === "historical" ? (
                  <div className={styles.privateAlphaNotice}>
                    Historical records remain readable, but Jarvis does not
                    execute them.
                  </div>
                ) : null}
              </div>
            ) : null}

            <div
              className={styles.privateAlphaProgressBlock}
              data-codexforge-private-alpha-progress="true"
            >
              <div className={styles.privateAlphaProgressList}>
                {progress.steps.map((step) => (
                  <div key={step.id} className={styles.privateAlphaProgressItem}>
                    <span className={styles.privateAlphaStatusLabel}>{step.label}</span>
                    <span
                      className={`${styles.panelBadge} ${resolveProgressStateClass(
                        step.state
                      )}`}
                    >
                      {step.state === "complete"
                        ? "Complete"
                        : step.state === "current"
                          ? "Current"
                          : step.state === "success"
                            ? "Success"
                            : step.state === "failure"
                              ? "Failed"
                              : step.state === "blocked"
                                ? "Blocked"
                                : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
              {progress.terminalLabel && progress.terminalTone ? (
                <span
                  className={`${styles.panelBadge} ${
                    progress.terminalTone === "blocked"
                      ? styles.metricStateBlocked
                      : styles.metricStateSecondary
                  }`}
                >
                  {progress.terminalLabel}
                </span>
              ) : null}
            </div>
          </section>

          <section
            className={`${styles.summaryCard} ${styles.privateAlphaSection}`}
            data-codexforge-private-alpha-next-action="true"
          >
            <div className={styles.privateAlphaSectionHeader}>
              <div>
                <p className={styles.panelEyebrow}>Next required action</p>
                <h3 className={styles.privateAlphaSectionTitle}>One valid operator step</h3>
              </div>
            </div>

            {!currentRun ? (
              <p className={styles.privateAlphaSectionBody}>
                Create an approval request to persist the task and start the
                workflow.
              </p>
            ) : null}

            {currentRun ? (
              <div className={styles.privateAlphaStack}>
                <p className={styles.privateAlphaSectionBody}>{nextActionSummary}</p>

                {currentRun.state === "awaiting_approval" ? (
                  currentRunClassification?.kind === "historical" ? (
                    <div className={styles.privateAlphaStack}>
                      <div className={styles.privateAlphaNotice}>
                        Historical records remain readable only. Review this
                        run or cancel it locally.
                      </div>
                      {!showCancellationForm ? (
                        <div className={styles.privateAlphaButtonRow}>
                          <button
                            className={styles.privateAlphaButtonDanger}
                            type="button"
                            onClick={() => setShowCancellationForm(true)}
                            disabled={!canCancel || actionInFlight !== null}
                          >
                            Cancel run
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className={styles.privateAlphaStack}>
                      <label className={styles.privateAlphaToggle}>
                        <input
                          type="checkbox"
                          checked={approvalAcknowledged}
                          onChange={(event) =>
                            setApprovalAcknowledged(event.target.checked)
                          }
                          disabled={!canApprove || actionInFlight !== null}
                        />
                        <span className={styles.placeholderSummary}>
                          {`Manual approval records this exact ${currentRunProviderLabel} / ${currentRunModelLabel} scope. ${
                            cloudExecutableRun
                              ? "No prompt is sent to Groq by recording approval."
                              : "Execution still requires a separate explicit local action."
                          }`}
                        </span>
                      </label>
                      {cloudExecutableRun ? (
                        <label
                          className={`${styles.privateAlphaToggle} ${styles.privateAlphaCloudToggle}`}
                          data-codexforge-private-alpha-cloud-acknowledgement="required"
                        >
                          <input
                            type="checkbox"
                            checked={cloudDataTransferAcknowledged}
                            onChange={(event) =>
                              setCloudDataTransferAcknowledged(event.target.checked)
                            }
                            disabled={!canApprove || actionInFlight !== null}
                          />
                          <span className={styles.placeholderSummary}>
                            {`This exact request is bound to Groq Cloud / ${currentRunModelLabel}. Recording approval consents to this exact approved request being transferred only by a later explicit execute action. No transfer occurs now, the exact model remains fixed, and no automatic routing occurs.`}
                          </span>
                        </label>
                      ) : null}
                      <div className={styles.privateAlphaButtonRow}>
                        <button
                          className={styles.privateAlphaButton}
                          type="button"
                          onClick={() => void handleApprove()}
                          disabled={approvalButtonDisabled}
                        >
                          {actionInFlight === "approve"
                            ? "Recording manual approval..."
                            : "Record manual approval"}
                        </button>
                        {!showCancellationForm ? (
                          <button
                            className={styles.privateAlphaButtonDanger}
                            type="button"
                            onClick={() => setShowCancellationForm(true)}
                            disabled={!canCancel || actionInFlight !== null}
                          >
                            Cancel run
                          </button>
                        ) : null}
                      </div>
                    </div>
                  )
                ) : null}

                {currentRun.state === "approved" ? (
                  localExecutableRun ? (
                    <div className={styles.privateAlphaStack}>
                      <label className={styles.privateAlphaToggle}>
                        <input
                          type="checkbox"
                          checked={executionAcknowledged}
                          onChange={(event) =>
                            setExecutionAcknowledged(event.target.checked)
                          }
                          disabled={
                            currentRun.state !== "approved" ||
                            actionInFlight !== null ||
                            !localExecutableRun
                          }
                        />
                        <span className={styles.placeholderSummary}>
                          I acknowledge that the approved prompt is sent only to
                          local Ollama, no cloud provider is contacted, and
                          this run allows one execution attempt.
                        </span>
                      </label>
                      <div className={styles.privateAlphaButtonRow}>
                        <button
                          className={styles.privateAlphaButton}
                          type="button"
                          onClick={() => void handleExecute()}
                          disabled={!canExecuteLocal}
                        >
                          {actionInFlight === "execute"
                            ? "Executing once on local Ollama..."
                            : "Execute once on local Ollama"}
                        </button>
                        {!showCancellationForm ? (
                          <button
                            className={styles.privateAlphaButtonDanger}
                            type="button"
                            onClick={() => setShowCancellationForm(true)}
                            disabled={!canCancel || actionInFlight !== null}
                          >
                            Cancel run
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ) : cloudExecutableRun ? (
                    <div className={styles.privateAlphaStack}>
                      <div className={styles.privateAlphaCloudExecutionNotice}>
                        Availability and credential checks occur server-side
                        only after this explicit execute action.
                      </div>
                      <label
                        className={`${styles.privateAlphaToggle} ${styles.privateAlphaCloudExecutionToggle}`}
                        data-codexforge-private-alpha-cloud-execution-acknowledgement="required"
                      >
                        <input
                          type="checkbox"
                          checked={cloudExecutionAcknowledged}
                          onChange={(event) =>
                            setCloudExecutionAcknowledged(event.target.checked)
                          }
                          disabled={
                            currentRun.state !== "approved" ||
                            actionInFlight !== null ||
                            !cloudExecutableRun
                          }
                        />
                        <span className={styles.placeholderSummary}>
                          {`This one action will send the exact approved request to Groq Cloud on ${currentRunModelLabel}. One execution attempt is allowed, output will be persisted locally, and there is no automatic routing, retry, or fallback.`}
                        </span>
                      </label>
                      <div className={styles.privateAlphaCloudExecutionMeta}>
                        <span className={styles.metaPill}>Cloud provider</span>
                        <span className={styles.metaPill}>{currentRunModelLabel}</span>
                        <span className={styles.metaPill}>One attempt</span>
                      </div>
                      {!showCancellationForm ? (
                        <div className={styles.privateAlphaButtonRow}>
                          <button
                            className={styles.privateAlphaButton}
                            type="button"
                            onClick={() => void handleExecute()}
                            disabled={!canExecuteCloud}
                            data-codexforge-private-alpha-cloud-execute="manual"
                          >
                            {actionInFlight === "execute"
                              ? "Executing once on Groq Cloud..."
                              : "Execute once on Groq Cloud"}
                          </button>
                          <button
                            className={styles.privateAlphaButtonDanger}
                            type="button"
                            onClick={() => setShowCancellationForm(true)}
                            disabled={!canCancel || actionInFlight !== null}
                          >
                            Cancel run
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className={styles.privateAlphaStack}>
                      <div className={styles.privateAlphaNotice}>
                        Historical records remain readable only. Create a new
                        exact bound request for further work.
                      </div>
                      {!showCancellationForm ? (
                        <div className={styles.privateAlphaButtonRow}>
                          <button
                            className={styles.privateAlphaButtonDanger}
                            type="button"
                            onClick={() => setShowCancellationForm(true)}
                            disabled={!canCancel || actionInFlight !== null}
                          >
                            Cancel run
                          </button>
                        </div>
                      ) : null}
                    </div>
                  )
                ) : null}

                {currentRun.state === "executing" ? (
                  <div className={styles.privateAlphaStack}>
                    <div className={styles.privateAlphaNotice}>
                      Execution is in progress. Refresh local state to load the
                      terminal result.
                    </div>
                    <div className={styles.privateAlphaButtonRow}>
                      <button
                        className={styles.privateAlphaButtonSecondary}
                        type="button"
                        onClick={() => void refreshPanel(currentRun.runId)}
                        disabled={actionInFlight !== null}
                      >
                        Refresh local state
                      </button>
                    </div>
                  </div>
                ) : null}

                {(currentRun.state === "succeeded" ||
                  currentRun.state === "failed" ||
                  currentRun.state === "blocked" ||
                  currentRun.state === "canceled") ? (
                  <div className={styles.privateAlphaNotice}>
                    {currentRun.state === "succeeded"
                      ? "Execution completed successfully."
                      : currentRun.state === "failed"
                        ? "Execution finished with a safe persisted failure record."
                        : currentRun.state === "blocked"
                          ? "Execution remained blocked and a safe status was persisted."
                          : "This run is closed after cancellation."}
                  </div>
                ) : null}

                {showCancellationForm && canCancel ? (
                  <div className={styles.privateAlphaCancelBlock}>
                    <label
                      className={styles.privateAlphaField}
                      htmlFor={cancellationReasonFieldId}
                    >
                      <span className={styles.athenaInputLabel}>Cancellation reason</span>
                      <input
                        id={cancellationReasonFieldId}
                        className={styles.privateAlphaInput}
                        type="text"
                        value={cancellationReason}
                        onChange={(event) => setCancellationReason(event.target.value)}
                        placeholder="Why should this run be canceled?"
                      />
                    </label>
                    <div className={styles.privateAlphaButtonRow}>
                      <button
                        className={styles.privateAlphaButtonDanger}
                        type="button"
                        onClick={() => void handleCancel()}
                        disabled={!canCancel || actionInFlight !== null}
                      >
                        {actionInFlight === "cancel"
                          ? "Canceling run..."
                          : "Confirm cancellation"}
                      </button>
                      <button
                        className={styles.privateAlphaButtonSecondary}
                        type="button"
                        onClick={() => setShowCancellationForm(false)}
                        disabled={actionInFlight !== null}
                      >
                        Keep run
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </section>
        </div>
      </div>

      <section
        className={`${styles.summaryCard} ${styles.privateAlphaSection}`}
        data-codexforge-private-alpha-view-switcher="true"
      >
        <div className={styles.privateAlphaSectionHeader}>
          <div>
            <p className={styles.panelEyebrow}>Run views</p>
            <h3 className={styles.privateAlphaSectionTitle}>
              Current run, recent runs, and audit
            </h3>
          </div>
        </div>

        <div
          className={styles.privateAlphaTabList}
          role="tablist"
          aria-label="Private alpha run views"
        >
          {PRIVATE_ALPHA_PANEL_TABS.map((tab) => {
            const tabId = `${tabBaseId}-${tab.id}-tab`;
            const panelId = `${tabBaseId}-${tab.id}-panel`;
            const isSelected = activeView === tab.id;

            return (
              <button
                key={tab.id}
                id={tabId}
                className={styles.privateAlphaTab}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={panelId}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveView(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`${tabBaseId}-${activeView}-panel`}
          className={styles.privateAlphaTabPanel}
          role="tabpanel"
          aria-labelledby={`${tabBaseId}-${activeView}-tab`}
        >
          {selectedTab?.id === "current-run" ? (
            currentRun ? (
              <div className={styles.privateAlphaStack}>
                <div className={styles.privateAlphaCurrentRunCard}>
                  <p className={styles.privateAlphaPreview}>
                    {currentRun.request.redactedPreview}
                  </p>
                  <div className={styles.workspaceMeta}>
                    <span className={styles.metaPill}>{`Run ${currentRun.runId}`}</span>
                    <span className={styles.metaPill}>
                      {`State ${currentRun.state}`}
                    </span>
                    <span className={styles.metaPill}>
                      {`Created ${formatTimestamp(currentRun.createdAt)}`}
                    </span>
                  </div>
                </div>
                <div className={styles.privateAlphaMiniBlock}>
                  <p className={styles.panelEyebrow}>Progress</p>
                  <div className={styles.privateAlphaProgressList}>
                    {progress.steps.map((step) => (
                      <div key={`${step.id}-summary`} className={styles.privateAlphaProgressItem}>
                        <span className={styles.privateAlphaStatusLabel}>{step.label}</span>
                        <span
                          className={`${styles.panelBadge} ${resolveProgressStateClass(
                            step.state
                          )}`}
                        >
                          {step.state === "complete"
                            ? "Complete"
                            : step.state === "current"
                              ? "Current"
                              : step.state === "success"
                                ? "Success"
                                : step.state === "failure"
                                  ? "Failed"
                                  : step.state === "blocked"
                                    ? "Blocked"
                                    : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.privateAlphaMiniBlock}>
                  <p className={styles.panelEyebrow}>Next action</p>
                  <p className={styles.privateAlphaSectionBody}>{nextActionSummary}</p>
                </div>
                <div className={styles.privateAlphaMiniBlock}>
                  <p className={styles.panelEyebrow}>Result</p>
                  <p className={styles.privateAlphaSectionBody}>
                    {currentRunResultSummary}
                  </p>
                </div>
              </div>
            ) : (
              <p className={styles.privateAlphaSectionBody}>
                No persisted run is selected yet.
              </p>
            )
          ) : null}

          {selectedTab?.id === "recent-runs" ? (
            recentRuns.length > 0 ? (
              <div className={styles.privateAlphaRecentRuns}>
                {recentRuns.map((run) => {
                  const isSelected = currentRun?.runId === run.runId;

                  return (
                    <button
                      key={run.runId}
                      className={`${styles.privateAlphaRunRow} ${
                        isSelected ? styles.privateAlphaRunRowSelected : ""
                      }`}
                      type="button"
                      onClick={() => void refreshPanel(run.runId)}
                      disabled={actionInFlight !== null}
                      aria-pressed={isSelected}
                    >
                      <div className={styles.privateAlphaRunRowHeader}>
                        <div>
                          <p className={styles.panelEyebrow}>
                            {resolveManualProviderLabel(run.providerPreference)}
                          </p>
                          <p className={styles.privateAlphaRunRowTitle}>
                            {resolveRunModelLabel(run.modelPreferenceLabel)}
                          </p>
                        </div>
                        <span
                          className={`${styles.panelBadge} ${resolveStateClass(run.state)}`}
                        >
                          {run.state}
                        </span>
                      </div>
                      <p className={styles.privateAlphaRunRowPreview}>
                        {run.redactedPreview}
                      </p>
                      <p className={styles.privateAlphaRunRowMeta}>
                        {`Created ${formatTimestamp(run.createdAt)} | Run ${run.runId}`}
                      </p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className={styles.privateAlphaSectionBody}>
                No persisted private-alpha runs yet.
              </p>
            )
          ) : null}

          {selectedTab?.id === "audit" ? (
            currentRun ? (
              <div className={styles.privateAlphaAuditList}>
                {[...currentRun.auditEvents]
                  .sort(
                    (left, right) =>
                      left.occurredAt.localeCompare(right.occurredAt) ||
                      left.revision - right.revision
                  )
                  .map((event) => (
                    <article key={event.eventId} className={styles.privateAlphaAuditItem}>
                      <div className={styles.privateAlphaRunRowHeader}>
                        <div>
                          <p className={styles.panelEyebrow}>{event.eventType}</p>
                          <p className={styles.privateAlphaRunRowTitle}>{event.summary}</p>
                        </div>
                        <span
                          className={`${styles.panelBadge} ${resolveStateClass(
                            event.resultingState
                          )}`}
                        >
                          {event.resultingState}
                        </span>
                      </div>
                      <p className={styles.privateAlphaRunRowMeta}>
                        {`${event.previousState ?? "none"} -> ${event.resultingState} | ${formatTimestamp(
                          event.occurredAt
                        )}`}
                      </p>
                      <p className={styles.privateAlphaSecondaryText}>
                        {`Actor ${event.actor} | Revision ${event.revision}`}
                      </p>
                    </article>
                  ))}
              </div>
            ) : (
              <p className={styles.privateAlphaSectionBody}>
                Select a run to inspect the persisted audit timeline.
              </p>
            )
          ) : null}
        </div>
      </section>

      {currentRun ? (
        <details
          className={styles.privateAlphaTechnicalDetails}
          data-codexforge-private-alpha-technical-details="true"
        >
          <summary className={styles.privateAlphaDetailsSummary}>
            Technical details
          </summary>
          <div className={styles.privateAlphaDetailsBody}>
            <div className={styles.privateAlphaTechnicalGrid}>
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>runId</p>
                <p className={styles.privateAlphaTechnicalValue}>{currentRun.runId}</p>
              </div>
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>revision</p>
                <p className={styles.privateAlphaTechnicalValue}>
                  {String(currentRun.revision)}
                </p>
              </div>
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>providerPreference</p>
                <p className={styles.privateAlphaTechnicalValue}>
                  {currentRun.request.providerPreference}
                </p>
              </div>
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>modelPreferenceLabel</p>
                <p className={styles.privateAlphaTechnicalValue}>
                  {currentRun.request.modelPreferenceLabel ?? "none"}
                </p>
              </div>
              {currentRunBoundMetadata ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>modelKey</p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {currentRunBoundMetadata.modelKey}
                  </p>
                </div>
              ) : null}
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>capability</p>
                <p className={styles.privateAlphaTechnicalValue}>
                  {currentRun.request.capability}
                </p>
              </div>
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>execution mode</p>
                <p className={styles.privateAlphaTechnicalValue}>
                  {currentRun.request.executionMode}
                </p>
              </div>
              {currentRunBoundMetadata ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>dataBoundary</p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {currentRunBoundMetadata.dataBoundary}
                  </p>
                </div>
              ) : null}
              {currentRunBoundMetadata ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>
                    cloudDataTransferRequirement
                  </p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {currentRunBoundMetadata.cloudDataTransferRequirement}
                  </p>
                </div>
              ) : null}
              {currentRunBoundMetadata ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>bindingVersion</p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {String(currentRunBoundMetadata.bindingVersion)}
                  </p>
                </div>
              ) : null}
              {currentRunCloudAcknowledgement ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>
                    approval cloud acknowledgement
                  </p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {currentRunCloudAcknowledgement}
                  </p>
                </div>
              ) : null}
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>approvalScopeHash</p>
                <p className={styles.privateAlphaHashValue}>
                  {currentRun.approvalScopeHash}
                </p>
              </div>
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>normalizedRequestHash</p>
                <p className={styles.privateAlphaHashValue}>
                  {currentRun.approvalScope.normalizedRequestHash}
                </p>
              </div>
              {currentExecution?.executionId ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>execution id</p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {currentExecution.executionId}
                  </p>
                </div>
              ) : null}
              {currentExecution ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>execution provider</p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {currentExecution.provider}
                  </p>
                </div>
              ) : null}
              {currentExecution ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>execution model</p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {currentExecution.model}
                  </p>
                </div>
              ) : null}
              {currentExecutionModelKey ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>execution modelKey</p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {currentExecutionModelKey}
                  </p>
                </div>
              ) : null}
              {currentExecutionDataBoundary ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>execution dataBoundary</p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {currentExecutionDataBoundary}
                  </p>
                </div>
              ) : null}
              {currentExecutionCloudAcknowledgement ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>
                    execution cloud acknowledgement
                  </p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {currentExecutionCloudAcknowledgement}
                  </p>
                </div>
              ) : null}
              <div className={styles.privateAlphaTechnicalItem}>
                <p className={styles.privateAlphaStatusLabel}>idempotency key hash</p>
                <p className={styles.privateAlphaHashValue}>
                  {currentExecution?.idempotencyKeyHash ?? currentRun.idempotencyKeyHash}
                </p>
              </div>
              {currentExecution?.outputSha256 ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>outputSha256</p>
                  <p className={styles.privateAlphaHashValue}>
                    {currentExecution.outputSha256}
                  </p>
                </div>
              ) : null}
              {currentExecution?.doneReason ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>done reason</p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {currentExecution.doneReason}
                  </p>
                </div>
              ) : null}
              {currentExecution?.totalDurationNanoseconds !== null &&
              currentExecution?.totalDurationNanoseconds !== undefined ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>
                    totalDurationNanoseconds
                  </p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {String(currentExecution.totalDurationNanoseconds)}
                  </p>
                </div>
              ) : null}
              {currentExecution?.loadDurationNanoseconds !== null &&
              currentExecution?.loadDurationNanoseconds !== undefined ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>
                    loadDurationNanoseconds
                  </p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {String(currentExecution.loadDurationNanoseconds)}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </details>
      ) : null}
    </section>
  );
}
