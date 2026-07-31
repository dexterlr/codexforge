"use client";

import { useEffect, useId, useRef, useState } from "react";
import type {
  PrivateAlphaApprovalBindingVersion,
  PrivateAlphaBoundApprovalRecord,
  PrivateAlphaBoundDataBoundary,
  PrivateAlphaCapability,
  PrivateAlphaFreeFirstRoutingInput,
  PrivateAlphaFreeFirstRoutingResult,
  PrivateAlphaFreeFirstRoutingSelectedModelKey,
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
  PRIVATE_ALPHA_GROQ_MAX_OUTPUT_TOKENS,
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
  isPrivateAlphaFreeFirstRoutingResultSafeForCreate,
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
  routePrivateAlphaFreeFirst,
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

type PrivateAlphaRequestMode = "manual" | "free-first-automatic";
type PrivateAlphaManualProviderId = "ollama-local" | "groq-cloud";
type PrivateAlphaAutomaticCloudRoutingState =
  | "disallowed"
  | "allowed-free-tier-only";

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

type PrivateAlphaCapturedAutomaticDraft = Readonly<{
  requestText: string;
  capability: "text";
  maximumOutputTokens: number;
  cloudRouting: PrivateAlphaFreeFirstRoutingInput["cloudRouting"];
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
const PRIVATE_ALPHA_REQUEST_MODES = [
  {
    id: "manual",
    label: "Manual exact selection",
    body: "Default behavior. Choose one exact provider and model before creating the approval request.",
  },
  {
    id: "free-first-automatic",
    label: "Free-first automatic",
    body: "Opt in to server-owned selection. Local Ollama is evaluated first, and Groq 20B is only probed after explicit Free-tier metadata permission.",
  },
] as const satisfies readonly Readonly<{
  id: PrivateAlphaRequestMode;
  label: string;
  body: string;
}>[];

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

function resolveAutomaticSelectedTarget(
  modelKey: PrivateAlphaFreeFirstRoutingSelectedModelKey
): PrivateAlphaManualTargetConfiguration {
  switch (modelKey) {
    case PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY:
      return PRIVATE_ALPHA_LOCAL_TARGET;
    case PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY:
      return PRIVATE_ALPHA_GROQ_20B_TARGET;
  }
}

function parseMaximumOutputTokensValue(value: string): number | null {
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
}

function resolveAutomaticCloudRoutingInput(
  state: PrivateAlphaAutomaticCloudRoutingState,
  metadataProbeAcknowledged: boolean,
  freeTierConfirmed: boolean
): PrivateAlphaFreeFirstRoutingInput["cloudRouting"] | null {
  if (state === "disallowed") {
    return Object.freeze({
      state: "disallowed",
    });
  }

  if (metadataProbeAcknowledged && freeTierConfirmed) {
    return Object.freeze({
      state: "allowed-free-tier-only",
      metadataProbeAcknowledgement: true,
      freeTierConfirmation: true,
    });
  }

  return null;
}

function formatRoutingCodes(values: readonly string[]): string {
  return values.length > 0 ? values.join(", ") : "None";
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
  const [requestMode, setRequestMode] =
    useState<PrivateAlphaRequestMode>("manual");
  const [selectedProviderId, setSelectedProviderId] =
    useState<PrivateAlphaManualProviderId>(PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID);
  const [selectedModelKey, setSelectedModelKey] =
    useState<PrivateAlphaRuntimeModelKey | null>(
      PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY
    );
  const [requestText, setRequestText] = useState("");
  const [workspaceConfirmed, setWorkspaceConfirmed] = useState(false);
  const [capability, setCapability] = useState<PrivateAlphaCapability>("text");
  const [maximumOutputTokens, setMaximumOutputTokens] = useState("512");
  const [approvalAcknowledged, setApprovalAcknowledged] = useState(false);
  const [cloudDataTransferAcknowledged, setCloudDataTransferAcknowledged] =
    useState(false);
  const [cloudExecutionAcknowledged, setCloudExecutionAcknowledged] =
    useState(false);
  const [
    groqFreeTierExecutionAcknowledged,
    setGroqFreeTierExecutionAcknowledged,
  ] = useState(false);
  const [automaticCloudRoutingState, setAutomaticCloudRoutingState] =
    useState<PrivateAlphaAutomaticCloudRoutingState>("disallowed");
  const [
    automaticMetadataProbeAcknowledged,
    setAutomaticMetadataProbeAcknowledged,
  ] = useState(false);
  const [automaticFreeTierConfirmed, setAutomaticFreeTierConfirmed] =
    useState(false);
  const [automaticRoutingResult, setAutomaticRoutingResult] =
    useState<PrivateAlphaFreeFirstRoutingResult | null>(null);
  const [executionAcknowledged, setExecutionAcknowledged] = useState(false);
  const [cancellationReason, setCancellationReason] = useState(
    "Operator canceled this private-alpha run before execution."
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actionInFlight, setActionInFlight] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<PrivateAlphaPanelView>("current-run");
  const [showCancellationForm, setShowCancellationForm] = useState(false);
  const actionLockRef = useRef(false);

  const workspaceFieldId = useId();
  const requestFieldId = useId();
  const requestModeFieldId = useId();
  const providerFieldId = useId();
  const modelFieldId = useId();
  const capabilityFieldId = useId();
  const maximumOutputTokensFieldId = useId();
  const cancellationReasonFieldId = useId();
  const tabBaseId = useId();

  function beginOperatorAction(action: string): boolean {
    if (actionLockRef.current) {
      return false;
    }

    actionLockRef.current = true;
    setActionInFlight(action);
    return true;
  }

  function completeOperatorAction(): void {
    actionLockRef.current = false;
    setActionInFlight(null);
  }

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
    setGroqFreeTierExecutionAcknowledged(false);
    setExecutionAcknowledged(false);
    setShowCancellationForm(false);
  }, [currentRun?.runId]);

  useEffect(() => {
    if (requestMode === "free-first-automatic") {
      setCapability("text");
    }
  }, [requestMode]);

  useEffect(() => {
    if (automaticCloudRoutingState === "disallowed") {
      setAutomaticMetadataProbeAcknowledged(false);
      setAutomaticFreeTierConfirmed(false);
    }
  }, [automaticCloudRoutingState]);

  useEffect(() => {
    setAutomaticRoutingResult(null);
  }, [
    requestMode,
    requestText,
    capability,
    maximumOutputTokens,
    selectedProviderId,
    selectedModelKey,
    automaticCloudRoutingState,
    automaticMetadataProbeAcknowledged,
    automaticFreeTierConfirmed,
  ]);

  function handleRequestModeChange(value: string): void {
    if (value !== "manual" && value !== "free-first-automatic") {
      setErrorMessage("Select either manual exact selection or free-first automatic.");
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setRequestMode(value);
  }

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

  function handleRequestTextChange(value: string): void {
    setRequestText(value);
    setErrorMessage(null);
    setSuccessMessage(null);
  }

  function handleStartAnotherTask(): void {
    if (
      actionLockRef.current ||
      !currentRun ||
      !["succeeded", "failed", "blocked", "canceled"].includes(currentRun.state)
    ) {
      return;
    }

    setCurrentRun(null);
    setRequestMode("manual");
    setSelectedProviderId(PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID);
    setSelectedModelKey(PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY);
    setWorkspaceConfirmed(false);
    setRequestText("");
    setCapability("text");
    setMaximumOutputTokens("512");
    setApprovalAcknowledged(false);
    setCloudDataTransferAcknowledged(false);
    setCloudExecutionAcknowledged(false);
    setGroqFreeTierExecutionAcknowledged(false);
    setAutomaticCloudRoutingState("disallowed");
    setAutomaticMetadataProbeAcknowledged(false);
    setAutomaticFreeTierConfirmed(false);
    setAutomaticRoutingResult(null);
    setExecutionAcknowledged(false);
    setCancellationReason(
      "Operator canceled this private-alpha run before execution."
    );
    setErrorMessage(null);
    setSuccessMessage(null);
    setShowCancellationForm(false);
    setActiveView("current-run");
  }

  async function handleCreateRun(): Promise<void> {
    if (currentRun !== null) {
      setErrorMessage(
        "Finish or cancel the current run before starting another task. Terminal runs provide a separate Start another task action."
      );
      return;
    }

    if (!workspaceConfirmed) {
      setErrorMessage(
        "Confirm the current local project/workspace before creating an approval request."
      );
      return;
    }

    if (requestMode === "free-first-automatic") {
      const automaticCloudRouting = resolveAutomaticCloudRoutingInput(
        automaticCloudRoutingState,
        automaticMetadataProbeAcknowledged,
        automaticFreeTierConfirmed
      );
      const parsedMaximumOutputTokens = parseMaximumOutputTokensValue(
        maximumOutputTokens
      );
      if (
        requestText.trim().length === 0 ||
        parsedMaximumOutputTokens === null ||
        parsedMaximumOutputTokens < PRIVATE_ALPHA_MIN_OUTPUT_TOKENS ||
        parsedMaximumOutputTokens > PRIVATE_ALPHA_MAX_OUTPUT_TOKENS
      ) {
        setErrorMessage(
          `Enter a task and a whole-number maximum output token value from ${PRIVATE_ALPHA_MIN_OUTPUT_TOKENS} to ${PRIVATE_ALPHA_MAX_OUTPUT_TOKENS}.`
        );
        return;
      }

      if (automaticCloudRouting === null) {
        setErrorMessage(
          "Automatic cloud routing requires both the metadata-probe acknowledgement and the Free-tier confirmation."
        );
        return;
      }

      const capturedDraft: PrivateAlphaCapturedAutomaticDraft = Object.freeze({
        requestText,
        capability: "text",
        maximumOutputTokens: parsedMaximumOutputTokens,
        cloudRouting: automaticCloudRouting,
      });

      if (!beginOperatorAction("route-create")) {
        return;
      }

      setAutomaticRoutingResult(null);
      setErrorMessage(null);
      setSuccessMessage(null);

      try {
        const routingResult = await routePrivateAlphaFreeFirst({
          routingMode: "free-first",
          capability: capturedDraft.capability,
          maximumOutputTokens: capturedDraft.maximumOutputTokens,
          cloudRouting: capturedDraft.cloudRouting,
        });
        setAutomaticRoutingResult(routingResult);

        if (routingResult.status !== "selected-for-approval") {
          return;
        }

        if (!isPrivateAlphaFreeFirstRoutingResultSafeForCreate(routingResult)) {
          setErrorMessage(
            "Automatic routing returned an unsafe selected result."
          );
          return;
        }

        const selectedModelKey = routingResult.selectedModelKey;
        if (selectedModelKey === null) {
          setErrorMessage(
            "Automatic routing returned an unsafe selected result."
          );
          return;
        }

        const exactTarget = resolveAutomaticSelectedTarget(selectedModelKey);
        const result = await createPrivateAlphaRun({
          requestText: capturedDraft.requestText,
          capability: "text",
          modelKey: exactTarget.modelKey,
          modelPreferenceLabel: exactTarget.modelLabel,
          maximumOutputTokens: capturedDraft.maximumOutputTokens,
        });

        await refreshPanel(result.run.runId);
        setActiveView("current-run");

        if (result.run.state !== "awaiting_approval") {
          setErrorMessage(
            "Automatic selection must persist a run in awaiting_approval state."
          );
          return;
        }

        setSuccessMessage(
          result.created
            ? exactTarget.providerId === "groq-cloud"
              ? "Free-first automatic selected Groq 20B for approval. The approval request was persisted locally with no prompt transfer and no generation."
              : "Free-first automatic selected local Ollama for approval. The approval request was persisted locally."
            : "Existing private-alpha run returned from idempotency protection."
        );
      } catch (error) {
        setErrorMessage(
          error instanceof Error && error.message
            ? error.message
            : "Unable to route and create the private-alpha approval request."
        );
      } finally {
        completeOperatorAction();
      }

      return;
    }

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

    const parsedMaximumOutputTokens = parseMaximumOutputTokensValue(
      maximumOutputTokens
    );
    const exactMaximumOutputTokens =
      exactTarget.providerId === "groq-cloud"
        ? PRIVATE_ALPHA_GROQ_MAX_OUTPUT_TOKENS
        : PRIVATE_ALPHA_MAX_OUTPUT_TOKENS;
    if (
      requestText.trim().length === 0 ||
      parsedMaximumOutputTokens === null ||
      parsedMaximumOutputTokens < PRIVATE_ALPHA_MIN_OUTPUT_TOKENS ||
      parsedMaximumOutputTokens > exactMaximumOutputTokens
    ) {
      setErrorMessage(
        `Enter a task and a whole-number maximum output token value from ${PRIVATE_ALPHA_MIN_OUTPUT_TOKENS} to ${exactMaximumOutputTokens}.`
      );
      return;
    }

    if (!beginOperatorAction("create")) {
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await createPrivateAlphaRun({
        requestText,
        capability: exactTarget.supportsCode ? capability : "text",
        modelKey: exactTarget.modelKey,
        modelPreferenceLabel: exactTarget.modelLabel,
        maximumOutputTokens: parsedMaximumOutputTokens,
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
      completeOperatorAction();
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

    if (
      !approvalAcknowledged ||
      (classification.kind === "cloud-executable" &&
        !cloudDataTransferAcknowledged)
    ) {
      setErrorMessage("Confirm the exact approval scope before recording approval.");
      return;
    }

    if (!beginOperatorAction("approve")) {
      return;
    }

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
      completeOperatorAction();
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

    if (
      currentRun.state !== "approved" ||
      (classification.kind === "local-executable"
        ? !executionAcknowledged || status?.executionAllowed !== true
        : !cloudExecutionAcknowledged ||
          !groqFreeTierExecutionAcknowledged ||
          status?.killSwitchEngaged !== false)
    ) {
      setErrorMessage(
        "Execution remains disabled until this exact approved run, its acknowledgements, runtime availability, and kill switch are all valid."
      );
      return;
    }

    if (!beginOperatorAction("execute")) {
      return;
    }

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
              groqFreeTierExecutionConfirmation: true,
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
      completeOperatorAction();
    }
  }

  async function handleCancel(): Promise<void> {
    if (
      !currentRun ||
      (currentRun.state !== "awaiting_approval" && currentRun.state !== "approved")
    ) {
      return;
    }

    if (!beginOperatorAction("cancel")) {
      return;
    }

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
      completeOperatorAction();
    }
  }

  const currentExecution = currentRun?.execution ?? null;
  const currentRunClassification = classifyPrivateAlphaRun(currentRun);
  const automaticModeSelected = requestMode === "free-first-automatic";
  const parsedMaximumOutputTokens = parseMaximumOutputTokensValue(maximumOutputTokens);
  const automaticCloudRouting = resolveAutomaticCloudRoutingInput(
    automaticCloudRoutingState,
    automaticMetadataProbeAcknowledged,
    automaticFreeTierConfirmed
  );
  const selectedTargetCandidate =
    selectedModelKey === null
      ? null
      : resolveManualTargetConfiguration(selectedModelKey);
  const selectedTarget =
    selectedTargetCandidate !== null &&
    selectedTargetCandidate.providerId === selectedProviderId
      ? selectedTargetCandidate
      : null;
  const selectedTargetBadge = automaticModeSelected
    ? {
        label: "free-first automatic",
        className: styles.metricStateApproval,
      }
    : buildSelectedTargetBadge(status, selectedProviderId);
  const selectedProviderLabel = automaticModeSelected
    ? "Auto (server-owned)"
    : resolveManualProviderLabel(selectedProviderId);
  const selectedModelLabel = automaticModeSelected
    ? "Local gpt-oss:20b first, Groq 20B by explicit Free-tier probe only"
    : selectedTarget?.modelLabel ??
      (selectedProviderId === "groq-cloud"
        ? "Select a Groq model"
        : PRIVATE_ALPHA_LOCAL_TARGET.modelLabel);
  const selectedDataBoundaryLabel = automaticModeSelected
    ? automaticCloudRoutingState === "allowed-free-tier-only"
      ? "Local first, authenticated cloud metadata probe permitted"
      : "Local machine required"
    : selectedProviderId === "groq-cloud"
      ? PRIVATE_ALPHA_GROQ_20B_TARGET.dataBoundaryLabel
      : PRIVATE_ALPHA_LOCAL_TARGET.dataBoundaryLabel;
  const selectedApprovalModeLabel = automaticModeSelected
    ? "Selection only"
    : selectedProviderId === "groq-cloud"
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
    groqFreeTierExecutionAcknowledged &&
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
  const maximumOutputTokensLimit =
    automaticModeSelected || selectedProviderId === "ollama-local"
      ? PRIVATE_ALPHA_MAX_OUTPUT_TOKENS
      : PRIVATE_ALPHA_GROQ_MAX_OUTPUT_TOKENS;
  const maximumOutputTokensHelperText = automaticModeSelected
    ? `Valid range ${PRIVATE_ALPHA_MIN_OUTPUT_TOKENS}-${PRIVATE_ALPHA_MAX_OUTPUT_TOKENS}. Automatic free-first routing remains text-only. At 513-${PRIVATE_ALPHA_MAX_OUTPUT_TOKENS}, local Ollama may still be selected, but Groq automatic metadata inspection is not permitted.`
    : selectedProviderId === "groq-cloud"
      ? `Valid range ${PRIVATE_ALPHA_MIN_OUTPUT_TOKENS}-${PRIVATE_ALPHA_GROQ_MAX_OUTPUT_TOKENS}. New Groq approval requests above 512 are rejected before persistence or provider work.`
      : `Valid range ${PRIVATE_ALPHA_MIN_OUTPUT_TOKENS}-${PRIVATE_ALPHA_MAX_OUTPUT_TOKENS}. Current default is 512. GPT-OSS reasoning effort is fixed to low and uses part of the generation budget. Very small limits may finish without visible final text.`;
  const composerUnavailable = actionInFlight !== null || currentRun !== null;
  const canCreateBoundRun = automaticModeSelected
    ? currentRun === null &&
      workspaceConfirmed &&
      requestText.trim().length > 0 &&
      parsedMaximumOutputTokens !== null &&
      parsedMaximumOutputTokens >= PRIVATE_ALPHA_MIN_OUTPUT_TOKENS &&
      parsedMaximumOutputTokens <= PRIVATE_ALPHA_MAX_OUTPUT_TOKENS &&
      automaticCloudRouting !== null &&
      actionInFlight === null
    : currentRun === null &&
      workspaceConfirmed &&
      requestText.trim().length > 0 &&
      parsedMaximumOutputTokens !== null &&
      parsedMaximumOutputTokens >= PRIVATE_ALPHA_MIN_OUTPUT_TOKENS &&
      parsedMaximumOutputTokens <= maximumOutputTokensLimit &&
      selectedTarget !== null &&
      actionInFlight === null;
  const approvalButtonDisabled =
    !canApprove ||
    actionInFlight !== null ||
    !approvalAcknowledged ||
    (cloudExecutableRun && !cloudDataTransferAcknowledged);
  const selectedTab = PRIVATE_ALPHA_PANEL_TABS.find((tab) => tab.id === activeView);

  return (
    <section
      className={`${styles.panel} ${styles.privateAlphaPanel}`}
      aria-label="Private alpha exact-model approval"
      aria-busy={loadState === "loading" || actionInFlight !== null}
      data-codexforge-private-alpha-layout="focused"
    >
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.panelEyebrow}>Private Alpha</p>
          <h2 className={styles.panelTitle}>Exact-model approval and free-first routing</h2>
        </div>
        <span className={`${styles.panelBadge} ${selectedTargetBadge.className}`}>
          {selectedTargetBadge.label}
        </span>
      </div>

      <p className={styles.panelBody}>
        Manual exact-model selection remains the default path. The optional
        free-first automatic path is selection-only: it evaluates local Ollama
        first, may inspect Groq 20B metadata only after explicit permission,
        and never approves or executes a run by itself.
      </p>

      <div className={styles.privateAlphaStatusStrip}>
        <div className={styles.privateAlphaStatusItem}>
          <span className={styles.privateAlphaStatusLabel}>Current workspace</span>
          <span className={styles.privateAlphaStatusValue}>
            Current CodexForge project
          </span>
        </div>
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
            {automaticModeSelected
              ? automaticCloudRoutingState === "allowed-free-tier-only"
                ? "Local first, cloud metadata only if needed"
                : "Local only"
              : selectedProviderId === "groq-cloud"
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
        only after the explicit execute action. Automatic routing never sends
        request text to the routing endpoint, never persists a run by itself,
        never approves a run, and never performs generation.{" "}
        {formatKillSwitchSources(status)}
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
          <p>{errorMessage}</p>
          <p>
            Nothing retries or reroutes automatically. Review local runtime and
            kill-switch status, refresh local state, or start a clean task after
            the current run reaches a terminal state.
          </p>
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
                {automaticModeSelected
                  ? "selection only"
                  : selectedProviderId === "groq-cloud"
                    ? "manual cloud execution"
                    : "local execution"}
              </span>
            </div>

            <p className={styles.privateAlphaSectionBody}>
              {automaticModeSelected
                ? "Automatic free-first mode keeps the request text in the browser during routing. The server returns a safe selection decision first, and only a valid selected-for-approval result can hand off to the normal create-run path."
                : "Use one real request textarea to choose a local or cloud approval target, then persist the exact provider and model scope for manual review."}
            </p>

            <div className={styles.privateAlphaForm}>
              <div
                className={styles.privateAlphaField}
                data-codexforge-jarvis-workspace-confirmation="required"
              >
                <label htmlFor={workspaceFieldId}>
                  <span className={styles.athenaInputLabel}>
                    Local project/workspace
                  </span>
                  <select
                    id={workspaceFieldId}
                    className={styles.privateAlphaSelect}
                    defaultValue="current-codexforge-project"
                    disabled={composerUnavailable}
                    aria-describedby={`${workspaceFieldId}-boundary`}
                  >
                    <option value="current-codexforge-project">
                      Current CodexForge project (server-owned workspace root)
                    </option>
                  </select>
                </label>
                <label className={styles.privateAlphaToggle}>
                  <input
                    type="checkbox"
                    checked={workspaceConfirmed}
                    onChange={(event) => {
                      setWorkspaceConfirmed(event.target.checked);
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    disabled={composerUnavailable}
                  />
                  <span className={styles.placeholderSummary}>
                    I confirm this local workspace for the task. Only the task
                    text enters this run; project files are not attached or
                    modified automatically.
                  </span>
                </label>
                <p
                  id={`${workspaceFieldId}-boundary`}
                  className={styles.privateAlphaSecondaryText}
                >
                  File reading, patch review and approved apply, and allowlisted
                  validation remain separate guarded actions.
                </p>
              </div>

              <div
                className={styles.privateAlphaField}
                role="radiogroup"
                aria-labelledby={requestModeFieldId}
              >
                <span id={requestModeFieldId} className={styles.athenaInputLabel}>
                  Request mode
                </span>
                <div className={styles.privateAlphaRequestModeGrid}>
                  {PRIVATE_ALPHA_REQUEST_MODES.map((mode) => (
                    <label
                      key={mode.id}
                      className={`${styles.privateAlphaToggle} ${
                        requestMode === mode.id
                          ? styles.privateAlphaRequestModeSelected
                          : ""
                      }`}
                      data-codexforge-private-alpha-request-mode={mode.id}
                    >
                      <input
                        type="radio"
                        name={`${requestModeFieldId}-selection`}
                        checked={requestMode === mode.id}
                        onChange={(event) =>
                          handleRequestModeChange(event.target.value)
                        }
                        value={mode.id}
                        disabled={composerUnavailable}
                      />
                      <span className={styles.placeholderSummary}>
                        <strong>{mode.label}</strong>
                        <br />
                        {mode.body}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <label className={styles.privateAlphaField} htmlFor={requestFieldId}>
                <span className={styles.athenaInputLabel}>Request</span>
                <textarea
                  id={requestFieldId}
                  className={styles.privateAlphaTextarea}
                  value={requestText}
                  onChange={(event) => handleRequestTextChange(event.target.value)}
                  rows={7}
                  disabled={composerUnavailable}
                  placeholder={
                    automaticModeSelected
                      ? "Describe the text request for free-first automatic routing. This text is captured locally and is not sent to the routing endpoint."
                      : "Describe the text or code task for manual provider and model approval."
                  }
                />
              </label>

              {automaticModeSelected ? (
                <>
                  <div className={styles.privateAlphaField}>
                    <span className={styles.athenaInputLabel}>Capability</span>
                    <div className={styles.privateAlphaFixedModel}>Text only</div>
                  </div>
                  <p className={styles.privateAlphaSecondaryText}>
                    Free-first automatic routing supports text requests only.
                    The routing endpoint never receives the request text,
                    budgets, paid approval, candidate lists, retry policy,
                    fallback policy, or substitution policy from the browser.
                  </p>

                  <div className={styles.privateAlphaTargetSelectorGrid}>
                    <label
                      className={styles.privateAlphaField}
                      htmlFor={providerFieldId}
                    >
                      <span className={styles.athenaInputLabel}>
                        Cloud metadata policy
                      </span>
                      <select
                        id={providerFieldId}
                        className={styles.privateAlphaSelect}
                        data-codexforge-private-alpha-automatic-cloud-routing="free-first"
                        value={automaticCloudRoutingState}
                        onChange={(event) =>
                          setAutomaticCloudRoutingState(
                            event.target.value as PrivateAlphaAutomaticCloudRoutingState
                          )
                        }
                        disabled={composerUnavailable}
                      >
                        <option value="disallowed">
                          Disallow cloud routing and cloud metadata probes
                        </option>
                        <option value="allowed-free-tier-only">
                          Allow a Free-tier-only Groq metadata probe after local
                          unavailability
                        </option>
                      </select>
                    </label>

                    <div className={styles.privateAlphaField}>
                      <span className={styles.athenaInputLabel}>
                        Automatic candidates
                      </span>
                      <div className={styles.privateAlphaFixedModel}>
                        <span>{PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY}</span>
                        <span className={styles.metaPill}>then</span>
                        <span>{PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY}</span>
                      </div>
                    </div>
                  </div>

                  <p className={styles.privateAlphaSecondaryText}>
                    {automaticCloudRoutingState === "allowed-free-tier-only"
                      ? "A Groq models discovery call is an authenticated metadata request only. It does not transfer the prompt and it does not authorize later cloud execution."
                      : "When cloud routing is disallowed, local Ollama is still inspected first and Groq receives zero credential, configuration, or metadata-discovery calls."}
                  </p>

                  {automaticCloudRoutingState === "allowed-free-tier-only" ? (
                    <div className={styles.privateAlphaStack}>
                      <label
                        className={`${styles.privateAlphaToggle} ${styles.privateAlphaCloudToggle}`}
                        data-codexforge-private-alpha-cloud-metadata-probe="required"
                      >
                        <input
                          type="checkbox"
                          checked={automaticMetadataProbeAcknowledged}
                          onChange={(event) =>
                            setAutomaticMetadataProbeAcknowledged(
                              event.target.checked
                            )
                          }
                          disabled={composerUnavailable}
                        />
                        <span className={styles.placeholderSummary}>
                          I permit one authenticated Groq metadata probe for
                          automatic routing only if local Ollama is
                          affirmatively unavailable. This is not prompt
                          transfer, does not approve the run, and does not
                          execute the run.
                        </span>
                      </label>
                      <label
                        className={`${styles.privateAlphaToggle} ${styles.privateAlphaCloudToggle}`}
                        data-codexforge-private-alpha-free-tier-confirmation="required"
                      >
                        <input
                          type="checkbox"
                          checked={automaticFreeTierConfirmed}
                          onChange={(event) =>
                            setAutomaticFreeTierConfirmed(event.target.checked)
                          }
                          disabled={composerUnavailable}
                        />
                        <span className={styles.placeholderSummary}>
                          I separately confirm that the current Groq account
                          remains Free tier for this request-scoped routing
                          decision. This is operator attestation only and is
                          not provider-verified.
                        </span>
                      </label>
                    </div>
                  ) : null}

                  <div
                    className={`${styles.privateAlphaTargetSummary} ${
                      automaticCloudRoutingState === "allowed-free-tier-only"
                        ? styles.privateAlphaTargetCloud
                        : styles.privateAlphaTargetLocal
                    }`}
                    data-codexforge-private-alpha-target-summary="automatic"
                  >
                    <div className={styles.privateAlphaTargetMeta}>
                      <div className={styles.privateAlphaStatusItem}>
                        <span className={styles.privateAlphaStatusLabel}>Provider</span>
                        <span className={styles.privateAlphaStatusValue}>
                          Auto (server-owned)
                        </span>
                      </div>
                      <div className={styles.privateAlphaStatusItem}>
                        <span className={styles.privateAlphaStatusLabel}>Model set</span>
                        <span className={styles.privateAlphaStatusValue}>
                          Local 20B first, Groq 20B only if admitted
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
                          Selection only
                        </span>
                      </div>
                    </div>
                    <p className={styles.privateAlphaSectionBody}>
                      Automatic routing evaluates local Ollama first. If a safe
                      exact model key is selected, the browser creates a normal
                      awaiting-approval run with that exact key and no routing
                      metadata in the create payload.
                    </p>
                    <div className={styles.privateAlphaCloudApprovalNotice}>
                      Later cloud-transfer approval, later cloud-execution
                      acknowledgement, and the separate execution-time Groq
                      Free-tier confirmation remain mandatory for Groq runs.
                    </div>
                  </div>
                </>
              ) : (
                <>
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
                        disabled={composerUnavailable}
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
                        onChange={(event) =>
                          handleModelSelectionChange(event.target.value)
                        }
                        disabled={composerUnavailable}
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

                  <label
                    className={styles.privateAlphaField}
                    htmlFor={capabilityFieldId}
                  >
                    <span className={styles.athenaInputLabel}>Capability</span>
                    <select
                      id={capabilityFieldId}
                      className={styles.privateAlphaSelect}
                      value={selectedProviderId === "groq-cloud" ? "text" : capability}
                      onChange={(event) => handleCapabilityChange(event.target.value)}
                      disabled={
                        selectedProviderId === "groq-cloud" ||
                        composerUnavailable
                      }
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
                        The request is persisted locally. Creating the request
                        does not contact Groq. Approving the request does not
                        contact Groq. Only the later explicit execute action
                        sends the approved prompt, the exact model remains
                        fixed, and no automatic routing occurs.
                      </div>
                    ) : null}
                  </div>
                </>
              )}

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
                      max={maximumOutputTokensLimit}
                      value={maximumOutputTokens}
                      onChange={(event) => setMaximumOutputTokens(event.target.value)}
                      disabled={composerUnavailable}
                    />
                  </label>
                  <p className={styles.privateAlphaSecondaryText}>
                    {maximumOutputTokensHelperText}
                  </p>
                </div>
              </details>

              <div className={styles.privateAlphaButtonRow}>
                <button
                  className={styles.privateAlphaButton}
                  type="button"
                  onClick={() => void handleCreateRun()}
                  disabled={!canCreateBoundRun}
                  data-codexforge-private-alpha-bound-create={
                    automaticModeSelected ? "automatic" : "true"
                  }
                >
                  {actionInFlight === "create"
                    ? "Persisting approval request..."
                    : actionInFlight === "route-create"
                      ? "Routing and creating approval request..."
                      : automaticModeSelected
                        ? "Route then create approval request"
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
              {currentRun !== null ? (
                <p className={styles.privateAlphaSecondaryText}>
                  The composer is locked to prevent a second task from sharing
                  this run&apos;s approval or result. Complete or cancel the current
                  run, then use Start another task.
                </p>
              ) : null}
              {!automaticModeSelected &&
              selectedProviderId === "groq-cloud" &&
              selectedTarget === null ? (
                <p className={styles.privateAlphaSecondaryText}>
                  Create approval request stays disabled until one exact Groq
                  model is selected.
                </p>
              ) : null}
              {automaticModeSelected &&
              automaticCloudRoutingState === "allowed-free-tier-only" &&
              automaticCloudRouting === null ? (
                <p className={styles.privateAlphaSecondaryText}>
                  Free-first automatic routing stays disabled until both the
                  authenticated metadata-probe permission and the request-scoped
                  Groq Free-tier confirmation are checked.
                </p>
              ) : null}
              {automaticModeSelected && automaticRoutingResult ? (
                <div
                  className={styles.privateAlphaStack}
                  data-codexforge-private-alpha-routing-result="free-first"
                >
                  <div
                    className={`${styles.privateAlphaTargetSummary} ${
                      automaticRoutingResult.status === "selected-for-approval"
                        ? automaticRoutingResult.selectedModelKey ===
                          PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY
                          ? styles.privateAlphaTargetCloud
                          : styles.privateAlphaTargetLocal
                        : styles.privateAlphaTargetCloud
                    }`}
                  >
                    <div className={styles.privateAlphaTargetMeta}>
                      <div className={styles.privateAlphaStatusItem}>
                        <span className={styles.privateAlphaStatusLabel}>Status</span>
                        <span className={styles.privateAlphaStatusValue}>
                          {automaticRoutingResult.status}
                        </span>
                      </div>
                      <div className={styles.privateAlphaStatusItem}>
                        <span className={styles.privateAlphaStatusLabel}>
                          Selected model
                        </span>
                        <span className={styles.privateAlphaStatusValue}>
                          {automaticRoutingResult.selectedModelKey
                            ? resolveAutomaticSelectedTarget(
                                automaticRoutingResult.selectedModelKey
                              ).modelLabel
                            : "None"}
                        </span>
                      </div>
                      <div className={styles.privateAlphaStatusItem}>
                        <span className={styles.privateAlphaStatusLabel}>
                          Cloud metadata inspected
                        </span>
                        <span className={styles.privateAlphaStatusValue}>
                          {automaticRoutingResult.cloudProviderInspected
                            ? "Yes"
                            : "No"}
                        </span>
                      </div>
                      <div className={styles.privateAlphaStatusItem}>
                        <span className={styles.privateAlphaStatusLabel}>
                          Prompt transferred to cloud
                        </span>
                        <span className={styles.privateAlphaStatusValue}>False</span>
                      </div>
                      <div className={styles.privateAlphaStatusItem}>
                        <span className={styles.privateAlphaStatusLabel}>
                          Provider generation performed
                        </span>
                        <span className={styles.privateAlphaStatusValue}>False</span>
                      </div>
                    </div>
                    <p className={styles.privateAlphaSectionBody}>
                      {automaticRoutingResult.decision.explanation}
                    </p>
                    <p className={styles.privateAlphaSecondaryText}>
                      {`Decision reason codes: ${formatRoutingCodes(
                        automaticRoutingResult.decision.reasonCodes
                      )}`}
                    </p>
                  </div>

                  <div className={styles.privateAlphaTargetSelectorGrid}>
                    {automaticRoutingResult.decision.candidates.map((candidate) => (
                      <div
                        key={`candidate-${candidate.modelKey}`}
                        className={styles.privateAlphaMiniBlock}
                      >
                        <p className={styles.panelEyebrow}>{candidate.modelKey}</p>
                        <p className={styles.privateAlphaSectionBody}>
                          {candidate.eligible
                            ? "Eligible"
                            : "Not eligible"}
                        </p>
                        <p className={styles.privateAlphaSecondaryText}>
                          {`Reason codes: ${formatRoutingCodes(
                            candidate.reasonCodes
                          )}`}
                        </p>
                        <p className={styles.privateAlphaSecondaryText}>
                          {`Rejection codes: ${formatRoutingCodes(
                            candidate.rejectionCodes
                          )}`}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className={styles.privateAlphaStack}>
                    <p className={styles.panelEyebrow}>Runtime snapshots</p>
                    {automaticRoutingResult.runtimeSnapshots.map((snapshot) => (
                      <div
                        key={`snapshot-${snapshot.modelKey}`}
                        className={styles.privateAlphaAuditItem}
                      >
                        <div className={styles.privateAlphaRunRowHeader}>
                          <div>
                            <p className={styles.panelEyebrow}>Runtime snapshot</p>
                            <p className={styles.privateAlphaRunRowTitle}>
                              {snapshot.modelKey}
                            </p>
                          </div>
                          <span
                            className={`${styles.panelBadge} ${
                              snapshot.availability === "available"
                                ? styles.metricStateReady
                                : styles.metricStateBlocked
                            }`}
                          >
                            {snapshot.availability}
                          </span>
                        </div>
                        <p className={styles.privateAlphaSecondaryText}>
                          {`Quota ${snapshot.quotaState} | Observed latency ${
                            snapshot.observedLatencyMs === null
                              ? "none"
                              : `${snapshot.observedLatencyMs}ms`
                          } | Observed at ${snapshot.observedAt ?? "none"}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
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
                          {`Manual approval records this exact ${currentRunProviderLabel} / ${currentRunModelLabel} / ${currentRunDataBoundaryLabel} scope. ${
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
                          {`I acknowledge that this exact ${currentRunProviderLabel} / ${currentRunModelLabel} request stays inside the local-machine data boundary, no cloud provider is contacted, and this run allows one execution attempt.`}
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
                        only after this explicit execute action. This
                        acknowledgement is separate from the earlier
                        cloud-transfer approval and from the separate
                        execution-time Groq Free-tier confirmation below.
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
                      <label
                        className={`${styles.privateAlphaToggle} ${styles.privateAlphaCloudExecutionToggle}`}
                        data-codexforge-private-alpha-groq-free-tier-execution-confirmation="required"
                      >
                        <input
                          type="checkbox"
                          checked={groqFreeTierExecutionAcknowledged}
                          onChange={(event) =>
                            setGroqFreeTierExecutionAcknowledged(
                              event.target.checked
                            )
                          }
                          disabled={
                            currentRun.state !== "approved" ||
                            actionInFlight !== null ||
                            !cloudExecutableRun
                          }
                        />
                        <span className={styles.placeholderSummary}>
                          I separately confirm that the current Groq account
                          remains Free tier for this execute-once action. This
                          is operator attestation only, is not provider
                          verified, and is distinct from both approval and
                          cloud-execution acknowledgement.
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
                  <div className={styles.privateAlphaStack}>
                    <div className={styles.privateAlphaNotice}>
                      {currentRun.state === "succeeded"
                        ? "Execution completed successfully."
                        : currentRun.state === "failed"
                          ? "Execution finished with a safe persisted failure record."
                          : currentRun.state === "blocked"
                            ? "Execution remained blocked and a safe status was persisted."
                            : "This run is closed after cancellation."}
                    </div>
                    <div className={styles.privateAlphaButtonRow}>
                      <button
                        className={styles.privateAlphaButtonSecondary}
                        type="button"
                        onClick={handleStartAnotherTask}
                        disabled={actionInFlight !== null}
                        data-codexforge-jarvis-start-another-task="isolated-reset"
                      >
                        Start another task
                      </button>
                    </div>
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
              {currentExecution?.provider === "groq-cloud" &&
              currentExecution.groqFreeTierExecutionConfirmation ? (
                <div className={styles.privateAlphaTechnicalItem}>
                  <p className={styles.privateAlphaStatusLabel}>
                    groq Free-tier execution confirmation
                  </p>
                  <p className={styles.privateAlphaTechnicalValue}>
                    {currentExecution.groqFreeTierExecutionConfirmation}
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
