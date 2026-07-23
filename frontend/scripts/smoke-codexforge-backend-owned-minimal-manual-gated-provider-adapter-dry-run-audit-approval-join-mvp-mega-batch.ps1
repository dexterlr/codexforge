param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
$root = Split-Path -Parent $scriptRoot
$repoRoot = Resolve-Path $root
if (-not (Test-Path (Join-Path $repoRoot "package.json"))) {
  $parentRoot = Resolve-Path (Join-Path $root "..")
  if (Test-Path (Join-Path $parentRoot "package.json")) {
    $repoRoot = $parentRoot
  }
}
Set-Location $root

function Assert-FileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [string]$Name
  )
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) {
    throw "[FAIL] Missing $Name`: $Needle"
  }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [string]$Name
  )
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    throw "[FAIL] Unexpected $Name with pattern $Pattern"
  }
  Write-Host "[PASS] $Name"
}

function Assert-Equal {
  param(
    [AllowEmptyString()][string]$Actual,
    [string]$Expected,
    [string]$Name
  )
  if ($Actual -ne $Expected) {
    throw "[FAIL] $Name expected '$Expected' found '$Actual'"
  }
  Write-Host "[PASS] $Name"
}

function Assert-True {
  param(
    [bool]$Condition,
    [string]$Name
  )
  if (-not $Condition) {
    throw "[FAIL] $Name"
  }
  Write-Host "[PASS] $Name"
}

function Get-SourceFiles {
  param([string[]]$Paths)

  $files = @()
  foreach ($path in $Paths) {
    if (-not (Test-Path $path)) {
      continue
    }

    $item = Get-Item $path
    if ($item.PSIsContainer) {
      $files += Get-ChildItem -Path $item.FullName -Recurse -File | Where-Object {
        @(".ts", ".tsx", ".js", ".jsx") -contains $_.Extension
      }
    } else {
      $files += $item
    }
  }

  return @($files | Sort-Object -Property FullName -Unique)
}

function Get-CombinedSourceText {
  param([System.IO.FileInfo[]]$Files)
  return ($Files | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
}

function Normalize-Whitespace {
  param([AllowEmptyString()][string]$Text)
  return ([regex]::Replace($Text, "\s+", " ")).Trim()
}

function Invoke-ProviderAuditApprovalJoinValidation {
  param([string]$RepoRootPath)

  $nodeScript = @'
const fs = require("fs");
const path = require("path");
const Module = require("module");
const ts = require("typescript");

const repoRoot = process.argv[2];
const expectedIds = [
  "openai-compatible-text-provider-dry-run-capture-slot",
  "anthropic-compatible-text-provider-dry-run-capture-slot",
  "gemini-compatible-text-provider-dry-run-capture-slot",
  "local-private-text-provider-dry-run-capture-slot",
  "fallback-disabled-dry-run-capture-slot",
  "conversational-planning-request",
  "code-assistance-request",
  "website-copy-code-request",
  "audit-recovery-explanation-request"
];
const exactCurrentBatch =
  "6090-6121 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP";
const exactPreviousBatch =
  "6058-6089 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview";
const exactNextBatch =
  "6122-6153 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join Review and Recovery Preview";
const exactReadiness =
  "minimal-provider-dry-run-audit-approval-join-mvp-only / backend-only / dry-run-fixture-only / credential-reference-only / in-memory-only / not-live-provider-executing / not persistent";

const originalLoad = Module._load;
Module._load = function(request, parent, isMain) {
  if (request === "server-only") {
    return {};
  }
  return originalLoad.apply(this, arguments);
};

const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function(request, parent, isMain, options) {
  if (request.startsWith("@/")) {
    request = path.join(repoRoot, "src", request.slice(2));
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};

const compileTypeScript = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX
    },
    fileName: filename
  });
  module._compile(result.outputText, filename);
};

require.extensions[".ts"] = compileTypeScript;
require.extensions[".tsx"] = compileTypeScript;

const joinModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-provider-audit-join",
  "index.ts"
));

const sourceReviewModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-provider-capture-review",
  "min-provider-capture-review-catalog.ts"
));

const requiredExports = [
  "buildStableMinimalProviderAdapterDryRunAuditApprovalJoinMvpKey",
  "listMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinMvpRecords",
  "listProviderAdapterDryRunAuditApprovalJoinInputs",
  "listProviderAdapterDryRunAuditApprovalJoinAdmissionChecks",
  "listProviderAdapterDryRunAuditJoinOutputs",
  "listProviderAdapterDryRunApprovalJoinOutputs",
  "listProviderAdapterDryRunAuditApprovalJoinEnvelopes",
  "listProviderAdapterDryRunAuditPreviews",
  "listProviderAdapterDryRunApprovalPreviews",
  "listProviderAdapterDryRunAuditApprovalEvidencePreviews",
  "listProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaries",
  "listProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaries",
  "listProviderAdapterDryRunAuditApprovalJoinRequests",
  "listProviderAdapterDryRunAuditApprovalJoinResponses",
  "listProviderAdapterDryRunAuditApprovalJoinErrors",
  "listProviderAdapterDryRunAuditApprovalJoinGates",
  "listProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecords",
  "buildProviderAdapterDryRunAuditApprovalJoinSummary",
  "buildProviderAdapterDryRunAuditApprovalJoinGateSummary",
  "buildProviderAdapterDryRunAuditApprovalJoinReadinessSummary",
  "buildNextProviderAdapterDryRunAuditApprovalJoinReviewRecoveryChecklist",
  "joinMinimalManualGatedProviderAdapterDryRunAuditAndApprovalMvp",
  "runMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinMvpForStaticFixture"
];

for (const exportName of requiredExports) {
  if (typeof joinModule[exportName] !== "function") {
    throw new Error(`Missing ${exportName} export.`);
  }
}

function ensureDeterministic(fn, label) {
  const a = fn();
  const b = fn();
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    throw new Error(`${label} is not deterministic.`);
  }
  return a;
}

function ensureUniqueKeys(records, label) {
  const keys = records.map((record) => record.key);
  if (new Set(keys).size !== keys.length) {
    throw new Error(`Duplicate keys found in ${label}.`);
  }
}

function findOne(records, predicate, label) {
  const matches = records.filter(predicate);
  if (matches.length !== 1) {
    throw new Error(`Expected 1 ${label} but found ${matches.length}.`);
  }
  return matches[0];
}

const sourceReviews =
  sourceReviewModule.listBackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviews();
const sourceOutputReviews =
  sourceReviewModule.listProviderDryRunResultCaptureOutputReviewRecords();

if (sourceReviews.length !== expectedIds.length) {
  throw new Error(
    `Expected ${expectedIds.length} provider review examples but found ${sourceReviews.length}.`
  );
}

const sourceIds = sourceReviews.map((record) => record.reviewId);
if (JSON.stringify(sourceIds) !== JSON.stringify(expectedIds)) {
  throw new Error(`Source review ids do not match expected ids: ${sourceIds.join(", ")}`);
}

const mvpRecords = ensureDeterministic(
  () => joinModule.listMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinMvpRecords(),
  "provider audit approval join MVP records"
);
const inputRecords = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinInputs(),
  "provider audit approval join input records"
);
const admissionChecks = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinAdmissionChecks(),
  "provider audit approval join admission check records"
);
const auditOutputs = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditJoinOutputs(),
  "provider audit join output records"
);
const approvalOutputs = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunApprovalJoinOutputs(),
  "provider approval join output records"
);
const envelopeRecords = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinEnvelopes(),
  "provider audit approval join envelope records"
);
const auditPreviewRecords = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditPreviews(),
  "provider audit preview records"
);
const approvalPreviewRecords = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunApprovalPreviews(),
  "provider approval preview records"
);
const evidencePreviewRecords = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalEvidencePreviews(),
  "provider audit approval evidence preview records"
);
const safetySummaries = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaries(),
  "provider audit approval join safety gate summaries"
);
const blockedPersistenceSummaries = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaries(),
  "provider audit approval join blocked persistence summaries"
);
const requestRecords = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinRequests(),
  "provider audit approval join request records"
);
const responseRecords = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinResponses(),
  "provider audit approval join response records"
);
const errorRecords = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinErrors(),
  "provider audit approval join error records"
);
const gateRecords = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinGates(),
  "provider audit approval join gate records"
);
const readinessRecords = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecords(),
  "provider audit approval join readiness records"
);
const summary = joinModule.buildProviderAdapterDryRunAuditApprovalJoinSummary();
const gateSummary = joinModule.buildProviderAdapterDryRunAuditApprovalJoinGateSummary();
const readinessSummary = joinModule.buildProviderAdapterDryRunAuditApprovalJoinReadinessSummary();
const checklist =
  joinModule.buildNextProviderAdapterDryRunAuditApprovalJoinReviewRecoveryChecklist();
const helperA =
  joinModule.runMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinMvpForStaticFixture();
const helperB =
  joinModule.runMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinMvpForStaticFixture();

if (JSON.stringify(helperA) !== JSON.stringify(helperB)) {
  throw new Error("Provider audit approval join helper output is not deterministic.");
}

if (helperA.serializedDeterministicResult !== helperB.serializedDeterministicResult) {
  throw new Error("Serialized deterministic helper output is not stable.");
}

if (helperA.mvpRecord.stableId !== "code-assistance-request") {
  throw new Error("Static fixture helper did not use code-assistance-request.");
}

for (const [label, records] of [
  ["MVP records", mvpRecords],
  ["input records", inputRecords],
  ["admission checks", admissionChecks],
  ["audit outputs", auditOutputs],
  ["approval outputs", approvalOutputs],
  ["envelopes", envelopeRecords],
  ["audit previews", auditPreviewRecords],
  ["approval previews", approvalPreviewRecords],
  ["evidence previews", evidencePreviewRecords],
  ["safety summaries", safetySummaries],
  ["blocked persistence summaries", blockedPersistenceSummaries],
  ["request records", requestRecords],
  ["response records", responseRecords],
  ["error records", errorRecords],
  ["gate records", gateRecords],
  ["readiness records", readinessRecords]
]) {
  ensureUniqueKeys(records, label);
}

if (
  mvpRecords.length !== expectedIds.length ||
  inputRecords.length !== expectedIds.length ||
  admissionChecks.length !== expectedIds.length ||
  auditOutputs.length !== expectedIds.length ||
  approvalOutputs.length !== expectedIds.length ||
  envelopeRecords.length !== expectedIds.length ||
  auditPreviewRecords.length !== expectedIds.length ||
  approvalPreviewRecords.length !== expectedIds.length ||
  evidencePreviewRecords.length !== expectedIds.length ||
  safetySummaries.length !== expectedIds.length ||
  blockedPersistenceSummaries.length !== expectedIds.length ||
  requestRecords.length !== expectedIds.length ||
  responseRecords.length !== expectedIds.length ||
  errorRecords.length !== expectedIds.length
) {
  throw new Error("One or more per-example collections do not align with the 9 source reviews.");
}

if (summary.highestDetectedPhase !== 6121) {
  throw new Error(`Expected summary phase 6121 but found ${summary.highestDetectedPhase}.`);
}
if (summary.latestCompletedBatch !== exactCurrentBatch) {
  throw new Error("Unexpected current batch string.");
}
if (summary.previousCompletedBatch !== exactPreviousBatch) {
  throw new Error("Unexpected previous batch string.");
}
if (summary.nextLikelyBatch !== exactNextBatch) {
  throw new Error("Unexpected next batch string.");
}
if (summary.currentReadiness !== exactReadiness) {
  throw new Error("Unexpected readiness string.");
}
if (
  summary.recordCount !== mvpRecords.length ||
  summary.auditOutputCount !== auditOutputs.length ||
  summary.approvalOutputCount !== approvalOutputs.length ||
  summary.envelopeCount !== envelopeRecords.length ||
  summary.evidencePreviewCount !== evidencePreviewRecords.length ||
  summary.gateCount !== gateRecords.length ||
  summary.readinessCount !== readinessRecords.length
) {
  throw new Error("Summary counts do not align with collection counts.");
}
if (gateSummary.recordCount !== gateRecords.length) {
  throw new Error("Gate summary count does not align.");
}
if (readinessSummary.recordCount !== readinessRecords.length) {
  throw new Error("Readiness summary count does not align.");
}
if (readinessSummary.currentReadiness !== exactReadiness) {
  throw new Error("Readiness summary string does not align.");
}
if (!Array.isArray(checklist) || checklist.length < 5 || !checklist.includes(exactNextBatch)) {
  throw new Error("Next review/recovery checklist is incomplete.");
}

const uniqueGateCount = gateSummary.uniqueGateCount;
const uniqueReadinessCount = readinessSummary.uniqueReadinessCount;
const sourceReviewById = new Map(sourceReviews.map((record) => [record.reviewId, record]));
const sourceOutputReviewById = new Map(
  sourceOutputReviews.map((record) => [record.providerDryRunResultCaptureReviewId, record])
);

for (const id of expectedIds) {
  const sourceReview = sourceReviewById.get(id);
  const sourceOutputReview = sourceOutputReviewById.get(id);

  if (!sourceReview) {
    throw new Error(`Missing source review for ${id}.`);
  }
  if (!sourceOutputReview) {
    throw new Error(`Missing source output review for ${id}.`);
  }

  const mvpRecord = findOne(mvpRecords, (record) => record.stableId === id, `MVP record for ${id}`);
  const inputRecord = findOne(inputRecords, (record) => record.stableId === id, `input record for ${id}`);
  const admissionCheck = findOne(admissionChecks, (record) => record.stableId === id, `admission check for ${id}`);
  const auditOutput = findOne(auditOutputs, (record) => record.stableId === id, `audit output for ${id}`);
  const approvalOutput = findOne(approvalOutputs, (record) => record.stableId === id, `approval output for ${id}`);
  const envelopeRecord = findOne(envelopeRecords, (record) => record.stableId === id, `envelope for ${id}`);
  const auditPreview = findOne(auditPreviewRecords, (record) => record.stableId === id, `audit preview for ${id}`);
  const approvalPreview = findOne(approvalPreviewRecords, (record) => record.stableId === id, `approval preview for ${id}`);
  const evidencePreview = findOne(evidencePreviewRecords, (record) => record.stableId === id, `evidence preview for ${id}`);
  const safetySummary = findOne(safetySummaries, (record) => record.stableId === id, `safety summary for ${id}`);
  const blockedPersistenceSummary = findOne(
    blockedPersistenceSummaries,
    (record) => record.stableId === id,
    `blocked persistence summary for ${id}`
  );
  const requestRecord = findOne(requestRecords, (record) => record.stableId === id, `request record for ${id}`);
  const responseRecord = findOne(responseRecords, (record) => record.stableId === id, `response record for ${id}`);
  const errorRecord = findOne(errorRecords, (record) => record.stableId === id, `error record for ${id}`);
  const gatesForId = gateRecords.filter((record) => record.stableId === id);
  const readinessForId = readinessRecords.filter((record) => record.stableId === id);

  if (gatesForId.length !== uniqueGateCount) {
    throw new Error(`Expected ${uniqueGateCount} gates for ${id} but found ${gatesForId.length}.`);
  }
  if (new Set(gatesForId.map((record) => record.id)).size !== uniqueGateCount) {
    throw new Error(`Gate ids are not unique for ${id}.`);
  }
  if (readinessForId.length !== uniqueReadinessCount) {
    throw new Error(
      `Expected ${uniqueReadinessCount} readiness rows for ${id} but found ${readinessForId.length}.`
    );
  }
  if (new Set(readinessForId.map((record) => record.id)).size !== uniqueReadinessCount) {
    throw new Error(`Readiness ids are not unique for ${id}.`);
  }

  const commonRecords = [
    mvpRecord,
    inputRecord,
    admissionCheck,
    auditOutput,
    approvalOutput,
    envelopeRecord,
    auditPreview,
    approvalPreview,
    evidencePreview,
    safetySummary,
    blockedPersistenceSummary,
    requestRecord,
    responseRecord,
    errorRecord
  ];

  for (const record of commonRecords) {
    if (record.sourceProviderDryRunResultCaptureReviewReference !== sourceReview.key) {
      throw new Error(`Source review reference mismatch for ${id}.`);
    }
    if (record.sourceProviderDryRunResultCaptureOutputReviewReference !== sourceOutputReview.key) {
      throw new Error(`Source output review reference mismatch for ${id}.`);
    }
    if (record.currentReadiness !== exactReadiness) {
      throw new Error(`Readiness mismatch on joined record for ${id}.`);
    }
  }

  if (mvpRecord.key !== joinModule.buildStableMinimalProviderAdapterDryRunAuditApprovalJoinMvpKey(id)) {
    throw new Error(`Stable MVP key mismatch for ${id}.`);
  }
  if (mvpRecord.auditJoinId !== auditOutput.auditJoinId) {
    throw new Error(`Audit join id mismatch for ${id}.`);
  }
  if (mvpRecord.approvalJoinId !== approvalOutput.approvalJoinId) {
    throw new Error(`Approval join id mismatch for ${id}.`);
  }
  if (
    mvpRecord.joinDigest !== auditOutput.joinDigest ||
    mvpRecord.joinDigest !== approvalOutput.joinDigest
  ) {
    throw new Error(`Join digest mismatch for ${id}.`);
  }
  if (
    mvpRecord.resultReference !== auditOutput.resultReference ||
    mvpRecord.resultReference !== approvalOutput.resultReference
  ) {
    throw new Error(`Result reference mismatch for ${id}.`);
  }
  if (mvpRecord.auditReference !== auditOutput.auditReference) {
    throw new Error(`Audit reference mismatch for ${id}.`);
  }
  if (mvpRecord.approvalReference !== approvalOutput.approvalReference) {
    throw new Error(`Approval reference mismatch for ${id}.`);
  }
  if (
    mvpRecord.evidenceReference !== auditOutput.evidenceReference ||
    mvpRecord.evidenceReference !== approvalOutput.evidenceReference ||
    mvpRecord.evidenceReference !== evidencePreview.evidenceReference
  ) {
    throw new Error(`Evidence reference mismatch for ${id}.`);
  }
  if (
    envelopeRecord.requestReference !== requestRecord.key ||
    envelopeRecord.responseReference !== responseRecord.key ||
    envelopeRecord.errorReference !== errorRecord.key ||
    envelopeRecord.inputReference !== inputRecord.key ||
    envelopeRecord.auditJoinOutputReference !== auditOutput.key ||
    envelopeRecord.approvalJoinOutputReference !== approvalOutput.key ||
    envelopeRecord.auditPreviewReference !== auditPreview.key ||
    envelopeRecord.approvalPreviewReference !== approvalPreview.key ||
    envelopeRecord.evidencePreviewReference !== evidencePreview.key
  ) {
    throw new Error(`Envelope references do not align for ${id}.`);
  }

  if (mvpRecord.credentialValueState !== "credential value not present and not read") {
    throw new Error(`Credential value state mismatch for ${id}.`);
  }
  if (mvpRecord.envVarState !== "environment variables not read") {
    throw new Error(`Environment variable state mismatch for ${id}.`);
  }
  if (mvpRecord.providerKeyState !== "provider key not read") {
    throw new Error(`Provider key state mismatch for ${id}.`);
  }
  if (mvpRecord.providerSdkImportState !== "provider SDK not imported") {
    throw new Error(`Provider SDK import state mismatch for ${id}.`);
  }
  if (mvpRecord.providerResponseState !== "provider response not received from provider") {
    throw new Error(`Provider response state mismatch for ${id}.`);
  }
  if (mvpRecord.modelOutputState !== "model output not generated by provider/model") {
    throw new Error(`Model output state mismatch for ${id}.`);
  }
  if (mvpRecord.promptTransmissionState !== "prompt transmission state is not sent") {
    throw new Error(`Prompt transmission state mismatch for ${id}.`);
  }
  if (mvpRecord.frontendRequestState !== "frontend request not created") {
    throw new Error(`Frontend request state mismatch for ${id}.`);
  }
  if (mvpRecord.apiRouteState !== "API route not created") {
    throw new Error(`API route state mismatch for ${id}.`);
  }
  if (mvpRecord.resultPersistenceState !== "result persistence not implemented") {
    throw new Error(`Result persistence state mismatch for ${id}.`);
  }
  if (mvpRecord.auditPersistenceState !== "audit persistence not implemented") {
    throw new Error(`Audit persistence state mismatch for ${id}.`);
  }
  if (mvpRecord.approvalPersistenceState !== "approval persistence not implemented") {
    throw new Error(`Approval persistence state mismatch for ${id}.`);
  }
  if (auditOutput.databaseWriteState !== "database write target none") {
    throw new Error(`Database write state mismatch for ${id}.`);
  }
  if (auditOutput.fileWriteState !== "file write target none") {
    throw new Error(`File write state mismatch for ${id}.`);
  }
  if (approvalOutput.approvalFixtureState !== "approval fixture preview-only") {
    throw new Error(`Approval fixture state mismatch for ${id}.`);
  }
  if (
    approvalOutput.manualConfirmationFixtureState !== "manual confirmation fixture preview-only"
  ) {
    throw new Error(`Manual confirmation fixture state mismatch for ${id}.`);
  }
  if (approvalOutput.realApprovalRequestState !== "real approval request absent") {
    throw new Error(`Real approval request state mismatch for ${id}.`);
  }
  if (approvalOutput.approvalRecordingState !== "approval recording not recorded") {
    throw new Error(`Approval recording state mismatch for ${id}.`);
  }
  if (approvalOutput.approvalTokenState !== "approval token not issued") {
    throw new Error(`Approval token state mismatch for ${id}.`);
  }
  if (approvalOutput.approvalLeaseState !== "approval lease not created") {
    throw new Error(`Approval lease state mismatch for ${id}.`);
  }
  if (requestRecord.frontendRequestState !== "frontend request not created") {
    throw new Error(`Request frontend state mismatch for ${id}.`);
  }
  if (requestRecord.apiRouteState !== "API route not created") {
    throw new Error(`Request API route state mismatch for ${id}.`);
  }
  if (responseRecord.providerResponseState !== "provider response not received from provider") {
    throw new Error(`Response provider state mismatch for ${id}.`);
  }
  if (responseRecord.modelOutputState !== "model output not generated by provider/model") {
    throw new Error(`Response model output state mismatch for ${id}.`);
  }
  if (responseRecord.resultPersistenceState !== "result persistence not implemented") {
    throw new Error(`Response result persistence state mismatch for ${id}.`);
  }
  if (responseRecord.auditPersistenceState !== "audit persistence not implemented") {
    throw new Error(`Response audit persistence state mismatch for ${id}.`);
  }
  if (responseRecord.approvalPersistenceState !== "approval persistence not implemented") {
    throw new Error(`Response approval persistence state mismatch for ${id}.`);
  }
  if (blockedPersistenceSummary.retryPosture !== "retry disabled") {
    throw new Error(`Retry posture mismatch for ${id}.`);
  }
  if (blockedPersistenceSummary.fallbackPosture !== "fallback disabled") {
    throw new Error(`Fallback posture mismatch for ${id}.`);
  }
}

process.stdout.write(
  JSON.stringify({
    reviewCount: sourceReviews.length,
    joinCount: mvpRecords.length,
    inputCount: inputRecords.length,
    auditOutputCount: auditOutputs.length,
    approvalOutputCount: approvalOutputs.length,
    envelopeCount: envelopeRecords.length,
    evidenceCount: evidencePreviewRecords.length,
    gateCount: gateRecords.length,
    readinessCount: readinessRecords.length,
    uniqueGateCount,
    uniqueReadinessCount,
    summaryPhase: String(summary.highestDetectedPhase),
    summaryCurrentBatch: summary.latestCompletedBatch,
    summaryPreviousBatch: summary.previousCompletedBatch,
    summaryNextBatch: summary.nextLikelyBatch,
    summaryReadiness: summary.currentReadiness,
    stableKeyOpenAi: joinModule.buildStableMinimalProviderAdapterDryRunAuditApprovalJoinMvpKey(
      "openai-compatible-text-provider-dry-run-capture-slot"
    ),
    stableKeyCodeAssistance:
      joinModule.buildStableMinimalProviderAdapterDryRunAuditApprovalJoinMvpKey(
        "code-assistance-request"
      ),
    helperStableId: helperA.mvpRecord.stableId,
    helperSerializedDeterministicResult: helperA.serializedDeterministicResult,
    helperJoinState: helperA.mvpRecord.joinState,
    helperAuditJoinState: helperA.mvpRecord.auditJoinState,
    helperApprovalJoinState: helperA.mvpRecord.approvalJoinState,
    helperCredentialValueState: helperA.mvpRecord.credentialValueState,
    helperEnvVarState: helperA.mvpRecord.envVarState,
    helperProviderKeyState: helperA.mvpRecord.providerKeyState,
    helperProviderSdkImportState: helperA.mvpRecord.providerSdkImportState,
    helperProviderResponseState: helperA.mvpRecord.providerResponseState,
    helperModelOutputState: helperA.mvpRecord.modelOutputState,
    helperPromptTransmissionState: helperA.mvpRecord.promptTransmissionState,
    helperRequestState: helperA.requestRecord.frontendRequestState,
    helperApiRouteState: helperA.requestRecord.apiRouteState,
    helperRealApprovalRequestState:
      helperA.approvalJoinOutputRecord.realApprovalRequestState,
    helperApprovalRecordingState:
      helperA.approvalJoinOutputRecord.approvalRecordingState,
    helperApprovalTokenState:
      helperA.approvalJoinOutputRecord.approvalTokenState,
    helperApprovalLeaseState:
      helperA.approvalJoinOutputRecord.approvalLeaseState,
    helperResultPersistenceState: helperA.responseRecord.resultPersistenceState,
    helperAuditPersistenceState: helperA.responseRecord.auditPersistenceState,
    helperApprovalPersistenceState:
      helperA.responseRecord.approvalPersistenceState
  })
);
'@

  $validationJson = $nodeScript | node - $RepoRootPath
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Unable to execute provider audit approval join validation."
  }

  return $validationJson | ConvertFrom-Json
}

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP Mega Batch smoke ==="

$athenaAliasPath = Join-Path $root "src\app\athena\page.tsx"
$jarvisPageClientPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$providersPageClientPath = Join-Path $root "src\app\ai-providers\page-client.tsx"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$jarvisIaContentPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-content.ts"
$videoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$joinTypesPath = Join-Path $root "src\lib\codexforge\min-provider-audit-join\min-provider-audit-join-types.ts"
$joinCatalogPath = Join-Path $root "src\lib\codexforge\min-provider-audit-join\min-provider-audit-join-catalog.ts"
$joinIndexPath = Join-Path $root "src\lib\codexforge\min-provider-audit-join\index.ts"
$joinHelperPath = Join-Path $root "src\lib\codexforge\min-provider-audit-join\min-provider-audit-join-helper.server.ts"
$checkpointCurrentPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$runbookPath = Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md"
$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$selfPath = $MyInvocation.MyCommand.Path

$requiredPaths = @(
  $athenaAliasPath,
  $jarvisPageClientPath,
  $homePageClientPath,
  $providersPageClientPath,
  $athenaPanelPath,
  $athenaModelPath,
  $jarvisIaContentPath,
  $videoPanelPath,
  $navigationTypesPath,
  $joinTypesPath,
  $joinCatalogPath,
  $joinIndexPath,
  $joinHelperPath,
  $checkpointCurrentPath,
  $runbookPath,
  $allSmokePath,
  $selfPath
)

foreach ($path in $requiredPaths) {
  Assert-FileExists $path
}

$athenaSource = Normalize-Whitespace (Get-CombinedSourceText (Get-SourceFiles @(
  $athenaPanelPath,
  $athenaModelPath,
  $jarvisIaContentPath
)))
$homeSource = Normalize-Whitespace (Get-CombinedSourceText (Get-SourceFiles @(
  $homePageClientPath,
  $jarvisIaContentPath,
  $athenaModelPath
)))
$providersSource = Normalize-Whitespace (Get-CombinedSourceText (Get-SourceFiles @(
  $providersPageClientPath
)))
$videoSource = Normalize-Whitespace (Get-CombinedSourceText (Get-SourceFiles @(
  $videoPanelPath
)))
$newModuleSource = Get-CombinedSourceText (Get-SourceFiles @(
  $joinTypesPath,
  $joinCatalogPath,
  $joinIndexPath,
  $joinHelperPath
))
$newModuleNormalized = Normalize-Whitespace $newModuleSource
$helperSource = Get-Content -Raw $joinHelperPath
$frontEndSource = Get-CombinedSourceText (Get-SourceFiles @(
  $jarvisPageClientPath,
  $athenaAliasPath,
  $homePageClientPath,
  $providersPageClientPath,
  $athenaPanelPath,
  $athenaModelPath,
  $jarvisIaContentPath,
  $navigationTypesPath
))
$athenaAliasSource = Get-Content -Raw $athenaAliasPath
$navigationTypesSource = Get-Content -Raw $navigationTypesPath
$athenaPanelSource = Get-Content -Raw $athenaPanelPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$runbookSource = Get-Content -Raw $runbookPath

Assert-Contains $helperSource 'import "server-only";' "server-only helper starts with server-only import"
Assert-Contains $athenaAliasSource 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Backend-owned minimal manual-gated provider adapter dry-run audit and approval join MVP",
  "Provider adapter dry-run audit and approval join input",
  "Provider adapter dry-run audit join output",
  "Provider adapter dry-run approval join output",
  "Provider adapter dry-run audit and approval join envelope",
  "Provider adapter dry-run audit and approval join gates",
  "Provider adapter dry-run audit and approval join readiness matrix",
  "Provider adapter dry-run audit and approval join evidence preview",
  "provider adapter dry-run audit and approval join MVP is backend-only",
  "server-only provider adapter dry-run audit and approval join helper exists",
  "provider adapter dry-run audit and approval join is produced in memory only",
  "deterministic provider adapter dry-run audit and approval join only",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "live provider execution is blocked",
  "provider response is not received from provider",
  "model output is not generated by provider/model",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "no real approval request",
  "no real approval recording",
  "approval fixture is preview-only",
  "manual confirmation fixture is preview-only",
  "approval token is not issued",
  "approval lease is not created",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no retry execution",
  "no fallback execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database writes",
  "no file writes",
  "provider adapter dry-run end-to-end packet MVP comes next"
)) {
  Assert-Contains $athenaSource $needle "Athena surface contains $needle"
}

foreach ($needle in @(
  "Athena is the main Jarvis control layer",
  "backend-owned minimal manual-gated provider adapter dry-run audit and approval join MVP",
  "server-only provider adapter dry-run audit and approval join helper exists",
  "provider adapter dry-run audit and approval join is produced in memory only",
  "Athena can review the backend-owned minimal manual-gated provider adapter dry-run audit and approval join MVP",
  "provider adapter dry-run audit and approval join review is preview-only",
  "provider adapter dry-run end-to-end packet MVP comes next"
)) {
  Assert-Contains $homeSource $needle "home surface contains $needle"
}

foreach ($needle in @(
  "Athena can review the backend-owned minimal manual-gated provider adapter dry-run audit and approval join MVP",
  "Backend-owned minimal provider adapter dry-run audit and approval join review",
  "Provider adapter dry-run audit and approval join output review",
  "Provider adapter dry-run audit and approval join gate failure review",
  "Provider adapter dry-run audit and approval join recovery plan",
  "Provider adapter dry-run audit and approval join recovery readiness",
  "Provider adapter dry-run audit and approval join review audit summary",
  "Provider adapter dry-run audit and approval join acceptance posture",
  "provider adapter dry-run audit and approval join review is preview-only",
  "server-only provider adapter dry-run audit and approval join helper exists",
  "provider adapter dry-run audit and approval join is produced in memory only",
  "provider adapter dry-run end-to-end packet MVP comes next"
)) {
  Assert-Contains $providersSource $needle "AI provider surface contains $needle"
}

foreach ($needle in @(
  "Video generation control",
  "Prompt / concept",
  "Output preview",
  "Generate video - locked"
)) {
  Assert-Contains $videoSource $needle "/jarvis-video control marker contains $needle"
}

Assert-Contains $athenaPanelSource '"provider-dry-run-audit-approval-join-capability"' "Athena panel uses scoped provider audit approval join capability key"
Assert-Contains $athenaPanelSource '"provider-dry-run-audit-approval-join-workspace"' "Athena panel uses scoped provider audit approval join workspace key"
Assert-Contains $athenaPanelSource "buildScopedItemKey(" "Athena panel uses scoped key helper"
Assert-NotMatches $athenaPanelSource 'key=\{group\.capabilityFamilyId\}' "Athena panel avoids raw capability ids as sibling keys"
Assert-NotMatches $athenaPanelSource 'key=\{group\.workspaceTarget\}' "Athena panel avoids raw workspace ids as sibling keys"

Assert-NotMatches $navigationTypesSource 'type\s+CodexForgeNavigationRouteHref\s*=\s*string\b' "route href types were not loosened to string"
Assert-NotMatches $navigationTypesSource 'commandDeckRole\s*:\s*string\b' "commandDeckRole type was not loosened to string"

Assert-NotMatches $frontEndSource 'min-provider-audit-join-helper\.server' "frontend client files do not import the provider audit join server helper"
Assert-NotMatches $frontEndSource 'from\s+["''][^"'']*min-provider-audit-join["'']' "frontend client files do not import the provider audit join root index"
Assert-NotMatches $frontEndSource 'runMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinMvpForStaticFixture|joinMinimalManualGatedProviderAdapterDryRunAuditAndApprovalMvp' "frontend client files do not call the provider audit join server helper functions"

foreach ($patternSpec in @(
  @{ Pattern = '\bMath\.random\b'; Name = "Math.random in new provider audit join source" },
  @{ Pattern = '\bDate\.now\b'; Name = "Date.now in new provider audit join source" },
  @{ Pattern = '\bnew\s+Date\s*\('; Name = "new Date in new provider audit join source" },
  @{ Pattern = '\bcrypto\.randomUUID\s*\('; Name = "crypto.randomUUID in new provider audit join source" },
  @{ Pattern = '\bfetch\s*\('; Name = "fetch in new provider audit join source" },
  @{ Pattern = '\bXMLHttpRequest\b'; Name = "XMLHttpRequest in new provider audit join source" },
  @{ Pattern = '\baxios\b'; Name = "axios in new provider audit join source" },
  @{ Pattern = 'navigator\.sendBeacon'; Name = "navigator.sendBeacon in new provider audit join source" },
  @{ Pattern = 'process\.env'; Name = "process.env in new provider audit join source" },
  @{ Pattern = 'from\s+["''][^"'']*(openai|anthropic|replicate|fal-ai|elevenlabs|stability|together|groq)[^"'']*["'']'; Name = "provider SDK imports in new provider audit join source" },
  @{ Pattern = 'localStorage\.|sessionStorage\.|indexedDB\b'; Name = "browser persistence in new provider audit join source" },
  @{ Pattern = 'document\.cookie|cookieStore\.'; Name = "cookies in new provider audit join source" },
  @{ Pattern = 'PrismaClient|mongoose|mongodb|supabase|drizzle'; Name = "database clients in new provider audit join source" },
  @{ Pattern = 'writeFile|appendFile|createWriteStream|Deno\.writeTextFile'; Name = "filesystem writes in new provider audit join source" }
)) {
  Assert-NotMatches $newModuleSource $patternSpec.Pattern $patternSpec.Name
}

Assert-NotMatches $newModuleSource 'sk-[A-Za-z0-9]+' "raw secret-like values in new provider audit join source"

Assert-NotMatches $frontEndSource 'from\s+["''][^"'']*(openai|anthropic|replicate|fal-ai|elevenlabs|stability|together|groq)[^"'']*["'']' "provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource '\bfetch\s*\(' "fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource '\blocalStorage\.|\bsessionStorage\.|\bindexedDB\b\s*[\.\(]|\bIndexedDB\b\s*[\.\(]' "browser secret storage in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource 'document\.cookie|cookieStore\.' "cookie usage in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource 'child_process|exec\s*\(|spawn\s*\(|powershell|cmd\.exe|process\.execPath' "shell or process execution in frontend Athena/Jarvis files"

$newSourcePaths = @(
  (Resolve-Path $joinTypesPath).Path,
  (Resolve-Path $joinCatalogPath).Path,
  (Resolve-Path $joinHelperPath).Path,
  (Resolve-Path $joinIndexPath).Path
)
$longestNewSourcePath = $newSourcePaths | Sort-Object Length -Descending | Select-Object -First 1
Assert-True ($longestNewSourcePath.Length -lt 220) "longest new source path remains below 220 characters"

$validation = Invoke-ProviderAuditApprovalJoinValidation $repoRoot

Assert-Equal "$($validation.reviewCount)" "9" "provider review example count"
Assert-Equal "$($validation.joinCount)" "9" "provider audit approval join MVP record count"
Assert-Equal "$($validation.inputCount)" "9" "provider audit approval join input count"
Assert-Equal "$($validation.auditOutputCount)" "9" "provider audit join output count"
Assert-Equal "$($validation.approvalOutputCount)" "9" "provider approval join output count"
Assert-Equal "$($validation.envelopeCount)" "9" "provider audit approval join envelope count"
Assert-Equal "$($validation.evidenceCount)" "9" "provider audit approval evidence preview count"
Assert-Equal "$($validation.gateCount)" "$([int]$validation.reviewCount * [int]$validation.uniqueGateCount)" "provider gate count derived from 9 examples"
Assert-Equal "$($validation.readinessCount)" "$([int]$validation.reviewCount * [int]$validation.uniqueReadinessCount)" "provider readiness count derived from 9 examples"
Assert-Equal "$($validation.summaryPhase)" "6121" "summary highest detected phase"
Assert-Equal "$($validation.summaryCurrentBatch)" "6090-6121 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP" "summary latest completed batch"
Assert-Equal "$($validation.summaryPreviousBatch)" "6058-6089 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview" "summary previous completed batch"
Assert-Equal "$($validation.summaryNextBatch)" "6122-6153 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join Review and Recovery Preview" "summary next likely batch"
Assert-Equal "$($validation.summaryReadiness)" "minimal-provider-dry-run-audit-approval-join-mvp-only / backend-only / dry-run-fixture-only / credential-reference-only / in-memory-only / not-live-provider-executing / not persistent" "summary readiness string"
Assert-Equal "$($validation.stableKeyOpenAi)" "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-mvp:openai-compatible-text-provider-dry-run-capture-slot" "stable key for openai-compatible-text-provider-dry-run-capture-slot"
Assert-Equal "$($validation.stableKeyCodeAssistance)" "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-mvp:code-assistance-request" "stable key for code-assistance-request"
Assert-Equal "$($validation.helperStableId)" "code-assistance-request" "static fixture helper stable id"
Assert-Equal "$($validation.helperJoinState)" "joined-provider-dry-run-fixture-in-memory-only" "helper join state"
Assert-Equal "$($validation.helperAuditJoinState)" "deterministic provider dry-run audit join in memory only" "helper audit join state"
Assert-Equal "$($validation.helperApprovalJoinState)" "deterministic provider dry-run approval join in memory only" "helper approval join state"
Assert-Equal "$($validation.helperCredentialValueState)" "credential value not present and not read" "helper credential value state"
Assert-Equal "$($validation.helperEnvVarState)" "environment variables not read" "helper environment variable state"
Assert-Equal "$($validation.helperProviderKeyState)" "provider key not read" "helper provider key state"
Assert-Equal "$($validation.helperProviderSdkImportState)" "provider SDK not imported" "helper provider SDK import state"
Assert-Equal "$($validation.helperProviderResponseState)" "provider response not received from provider" "helper provider response state"
Assert-Equal "$($validation.helperModelOutputState)" "model output not generated by provider/model" "helper model output state"
Assert-Equal "$($validation.helperPromptTransmissionState)" "prompt transmission state is not sent" "helper prompt transmission state"
Assert-Equal "$($validation.helperRequestState)" "frontend request not created" "helper frontend request state"
Assert-Equal "$($validation.helperApiRouteState)" "API route not created" "helper API route state"
Assert-Equal "$($validation.helperRealApprovalRequestState)" "real approval request absent" "helper real approval request state"
Assert-Equal "$($validation.helperApprovalRecordingState)" "approval recording not recorded" "helper approval recording state"
Assert-Equal "$($validation.helperApprovalTokenState)" "approval token not issued" "helper approval token state"
Assert-Equal "$($validation.helperApprovalLeaseState)" "approval lease not created" "helper approval lease state"
Assert-Equal "$($validation.helperResultPersistenceState)" "result persistence not implemented" "helper result persistence state"
Assert-Equal "$($validation.helperAuditPersistenceState)" "audit persistence not implemented" "helper audit persistence state"
Assert-Equal "$($validation.helperApprovalPersistenceState)" "approval persistence not implemented" "helper approval persistence state"
Assert-True ($validation.helperSerializedDeterministicResult.Length -gt 0) "helper serialized deterministic result is populated"

Assert-Contains $allSmokeSource 'currentReleaseGateBatch = "6090-6121 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP"' "all-smoke updates current release gate batch"
Assert-Contains $allSmokeSource "Phase 6121 Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP" "all-smoke registers phase 6121"
Assert-Contains $allSmokeSource "smoke-codexforge-backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-mvp-mega-batch.ps1" "all-smoke registers the dedicated provider audit approval join smoke"
Assert-Contains $allSmokeSource "Phase 6089 Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview" "all-smoke preserves phase 6089 result capture review coverage"

foreach ($docSource in @($checkpointCurrentSource, $runbookSource)) {
  Assert-Contains $docSource "Highest detected phase: 6121" "checkpoint docs report phase 6121"
  Assert-Contains $docSource "Latest completed batch: 6090-6121 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP" "checkpoint docs report current provider audit approval join batch"
  Assert-Contains $docSource "Previous completed batch: 6058-6089 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview" "checkpoint docs report previous provider result capture review batch"
  Assert-Contains $docSource "Next likely batch: 6122-6153 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join Review and Recovery Preview" "checkpoint docs report next provider audit approval join review batch"
  Assert-Contains $docSource "current readiness is minimal-provider-dry-run-audit-approval-join-mvp-only / backend-only / dry-run-fixture-only / credential-reference-only / in-memory-only / not-live-provider-executing / not persistent" "checkpoint docs include current readiness marker"
  Assert-Contains $docSource "provider adapter dry-run audit and approval join review and recovery preview comes next" "checkpoint docs include next batch marker"
}

Write-Host "PASS: provider adapter dry-run audit and approval join MVP smoke"
