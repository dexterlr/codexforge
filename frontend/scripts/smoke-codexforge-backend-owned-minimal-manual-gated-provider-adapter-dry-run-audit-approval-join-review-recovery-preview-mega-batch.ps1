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

function Assert-PathExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing path: $Path"
  }
  Write-Host "[PASS] path exists: $Path"
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

function Invoke-ProviderAuditApprovalJoinReviewValidation {
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
  "6122-6153 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join Review and Recovery Preview";
const exactPreviousBatch =
  "6090-6121 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP";
const exactNextBatch =
  "6154-6185 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run End-to-End Packet MVP";
const exactReadiness =
  "minimal-provider-dry-run-audit-approval-join-review-only / backend-only / dry-run-fixture-only / credential-reference-only / in-memory-only / not-live-provider-executing / not persistent";
const exactAcceptanceState =
  "not accepted for live provider execution or persistence / provider adapter dry-run audit approval join fixture MVP accepted only";
const exactOutputReviewStatement =
  "Provider adapter dry-run audit approval join fixture only. No real output. No provider call. No persistence.";
const exactNoLiveGateStatement = "No live gate pass.";
const exactRecoveryStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No secret read. No persistence.";
const exactAcceptanceStatement =
  "Provider adapter dry-run audit approval join fixture accepted only. Live provider execution and persistence not accepted.";

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

const reviewModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-provider-aa-review",
  "index.ts"
));
const joinModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-provider-audit-join",
  "index.ts"
));
const captureReviewModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-provider-capture-review",
  "min-provider-capture-review-catalog.ts"
));
const selectionReviewModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-provider-review",
  "min-provider-review-catalog.ts"
));
const admissionReviewModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-provider-admit-review",
  "min-provider-admit-review-catalog.ts"
));
const manualDecisionModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview",
  "backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview-catalog.ts"
));
const manualFixtureModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-catalog.ts"
));

const requiredExports = [
  "buildStableMinimalProviderAdapterDryRunAuditApprovalJoinReviewKey",
  "buildStableProviderAdapterDryRunAuditApprovalJoinOutputReviewKey",
  "buildStableProviderAdapterDryRunAuditApprovalJoinGateFailureReviewKey",
  "buildStableProviderAdapterDryRunAuditApprovalJoinRecoveryPlanKey",
  "buildStableProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistKey",
  "buildStableProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaryKey",
  "buildStableProviderAdapterDryRunAuditApprovalJoinAcceptancePostureKey",
  "listBackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviews",
  "listProviderAdapterDryRunAuditApprovalJoinOutputReviewRecords",
  "listProviderAdapterDryRunAuditApprovalJoinGateFailureReviewRecords",
  "listProviderAdapterDryRunAuditApprovalJoinRecoveryPlanPreviews",
  "listProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistRecords",
  "listProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaries",
  "listProviderAdapterDryRunAuditApprovalJoinAcceptancePostureRecords",
  "groupProviderAdapterDryRunAuditApprovalJoinReviewsByCapabilityFamily",
  "groupProviderAdapterDryRunAuditApprovalJoinReviewsByWorkspaceTarget",
  "groupProviderAdapterDryRunAuditApprovalJoinReviewsByProviderSlot",
  "groupProviderAdapterDryRunAuditApprovalJoinReviewsByCredentialReference",
  "buildProviderAdapterDryRunAuditApprovalJoinReviewSummary",
  "buildProviderAdapterDryRunAuditApprovalJoinOutputReviewSummary",
  "buildProviderAdapterDryRunAuditApprovalJoinGateFailureSummary",
  "buildProviderAdapterDryRunAuditApprovalJoinRecoverySummary",
  "buildProviderAdapterDryRunEndToEndPacketMvpChecklist",
  "uniqueProviderAdapterDryRunAuditApprovalJoinReviewDisplayStrings"
];

for (const exportName of requiredExports) {
  if (typeof reviewModule[exportName] !== "function") {
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

function mapByKey(records) {
  return new Map(records.map((record) => [record.key, record]));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function findOne(records, predicate, label) {
  const matches = records.filter(predicate);
  if (matches.length !== 1) {
    throw new Error(`Expected 1 ${label} but found ${matches.length}.`);
  }
  return matches[0];
}

function requireKey(map, key, label) {
  const record = map.get(key);
  if (!record) {
    throw new Error(`Missing ${label}: ${key}`);
  }
  return record;
}

function ensureMutationIsolation(label, createValue) {
  const first = createValue();
  const before = JSON.stringify(first);
  if (Array.isArray(first)) {
    if (!first.length) {
      throw new Error(`${label} returned an empty array during mutation safety check.`);
    }
    const firstRecord = first[0];
    if (Array.isArray(firstRecord.reviewFindings)) {
      firstRecord.reviewFindings.push("__mutated__");
    }
    if (Array.isArray(firstRecord.summaryLines)) {
      firstRecord.summaryLines.push("__mutated__");
    }
    if (Array.isArray(firstRecord.credentialBoundary)) {
      firstRecord.credentialBoundary.push("__mutated__");
    }
    if (Object.prototype.hasOwnProperty.call(firstRecord, "label")) {
      firstRecord.label = "__mutated__";
    }
  } else {
    if (Array.isArray(first.summaryLines)) {
      first.summaryLines.push("__mutated__");
    }
    if (Object.prototype.hasOwnProperty.call(first, "currentBatch")) {
      first.currentBatch = "__mutated__";
    }
  }
  const second = createValue();
  const after = JSON.stringify(second);
  if (after === JSON.stringify(first)) {
    throw new Error(`${label} caller mutation leaked into the module-owned records.`);
  }
  if (before !== after && after.includes("__mutated__")) {
    throw new Error(`${label} caller mutation leaked into subsequent results.`);
  }
}

const reviews = ensureDeterministic(
  () =>
    reviewModule.listBackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviews(),
  "review records"
);
const outputReviews = ensureDeterministic(
  () => reviewModule.listProviderAdapterDryRunAuditApprovalJoinOutputReviewRecords(),
  "output review records"
);
const gateFailureReviews = ensureDeterministic(
  () => reviewModule.listProviderAdapterDryRunAuditApprovalJoinGateFailureReviewRecords(),
  "gate failure review records"
);
const recoveryPlans = ensureDeterministic(
  () => reviewModule.listProviderAdapterDryRunAuditApprovalJoinRecoveryPlanPreviews(),
  "recovery plan records"
);
const readinessChecks = ensureDeterministic(
  () =>
    reviewModule.listProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistRecords(),
  "recovery readiness records"
);
const auditSummaries = ensureDeterministic(
  () => reviewModule.listProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaries(),
  "review audit summaries"
);
const acceptancePostures = ensureDeterministic(
  () => reviewModule.listProviderAdapterDryRunAuditApprovalJoinAcceptancePostureRecords(),
  "acceptance posture records"
);
const capabilityGroups = ensureDeterministic(
  () => reviewModule.groupProviderAdapterDryRunAuditApprovalJoinReviewsByCapabilityFamily(),
  "capability groups"
);
const workspaceGroups = ensureDeterministic(
  () => reviewModule.groupProviderAdapterDryRunAuditApprovalJoinReviewsByWorkspaceTarget(),
  "workspace groups"
);
const providerSlotGroups = ensureDeterministic(
  () => reviewModule.groupProviderAdapterDryRunAuditApprovalJoinReviewsByProviderSlot(),
  "provider slot groups"
);
const credentialGroups = ensureDeterministic(
  () => reviewModule.groupProviderAdapterDryRunAuditApprovalJoinReviewsByCredentialReference(),
  "credential groups"
);
const reviewSummary = ensureDeterministic(
  () => reviewModule.buildProviderAdapterDryRunAuditApprovalJoinReviewSummary(),
  "review summary"
);
const outputReviewSummary = ensureDeterministic(
  () => reviewModule.buildProviderAdapterDryRunAuditApprovalJoinOutputReviewSummary(),
  "output review summary"
);
const gateFailureSummary = ensureDeterministic(
  () => reviewModule.buildProviderAdapterDryRunAuditApprovalJoinGateFailureSummary(),
  "gate failure summary"
);
const recoverySummary = ensureDeterministic(
  () => reviewModule.buildProviderAdapterDryRunAuditApprovalJoinRecoverySummary(),
  "recovery summary"
);
const nextChecklist = ensureDeterministic(
  () => reviewModule.buildProviderAdapterDryRunEndToEndPacketMvpChecklist(),
  "next checklist"
);
const displayStrings = ensureDeterministic(
  () => reviewModule.uniqueProviderAdapterDryRunAuditApprovalJoinReviewDisplayStrings(),
  "display strings"
);

ensureMutationIsolation(
  "review records",
  () =>
    reviewModule.listBackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviews()
);
ensureMutationIsolation(
  "output review records",
  () => reviewModule.listProviderAdapterDryRunAuditApprovalJoinOutputReviewRecords()
);
ensureMutationIsolation(
  "review summary",
  () => reviewModule.buildProviderAdapterDryRunAuditApprovalJoinReviewSummary()
);

for (const [label, records] of [
  ["review records", reviews],
  ["output review records", outputReviews],
  ["gate failure review records", gateFailureReviews],
  ["recovery plan records", recoveryPlans],
  ["readiness records", readinessChecks],
  ["review audit summaries", auditSummaries],
  ["acceptance posture records", acceptancePostures]
]) {
  ensureUniqueKeys(records, label);
}

assert(JSON.stringify(reviews.map((record) => record.id)) === JSON.stringify(expectedIds), "Review ids do not match expected deterministic ids.");
assert(reviews.length === expectedIds.length, `Expected ${expectedIds.length} review records but found ${reviews.length}.`);
assert(outputReviews.length === expectedIds.length, `Expected ${expectedIds.length} output review records but found ${outputReviews.length}.`);
assert(recoveryPlans.length === expectedIds.length, `Expected ${expectedIds.length} recovery plans but found ${recoveryPlans.length}.`);
assert(auditSummaries.length === expectedIds.length, `Expected ${expectedIds.length} review audit summaries but found ${auditSummaries.length}.`);
assert(acceptancePostures.length === expectedIds.length, `Expected ${expectedIds.length} acceptance posture records but found ${acceptancePostures.length}.`);
assert(gateFailureReviews.length === 468, `Expected 468 gate failure reviews but found ${gateFailureReviews.length}.`);
assert(readinessChecks.length === 297, `Expected 297 readiness checklist records but found ${readinessChecks.length}.`);

assert(new Set(displayStrings).size === displayStrings.length, "Display strings are not unique.");
assert(displayStrings.length > 20, "Display strings collection is unexpectedly small.");

assert(reviewSummary.highestDetectedPhase === 6153, `Expected phase 6153 but found ${reviewSummary.highestDetectedPhase}.`);
assert(reviewSummary.currentBatch === exactCurrentBatch, "Unexpected current batch.");
assert(reviewSummary.latestCompletedBatch === exactCurrentBatch, "Unexpected latest completed batch.");
assert(reviewSummary.previousCompletedBatch === exactPreviousBatch, "Unexpected previous completed batch.");
assert(reviewSummary.nextLikelyBatch === exactNextBatch, "Unexpected next likely batch.");
assert(reviewSummary.currentReadiness === exactReadiness, "Unexpected review summary readiness.");
assert(reviewSummary.acceptanceState === exactAcceptanceState, "Unexpected review summary acceptance state.");
assert(outputReviewSummary.outputReviewStatement === exactOutputReviewStatement, "Unexpected output review statement.");
assert(gateFailureSummary.noLiveGatePassStatement === exactNoLiveGateStatement, "Unexpected no-live-gate statement.");
assert(recoverySummary.recoveryStatement === exactRecoveryStatement, "Unexpected recovery statement.");
assert(recoverySummary.recoveryPosture === "manual review only", "Unexpected recovery posture.");
assert(recoverySummary.retryPosture === "disabled", "Unexpected retry posture.");
assert(recoverySummary.fallbackPosture === "disabled", "Unexpected fallback posture.");
assert(nextChecklist.includes(exactNextBatch), "Next checklist does not include the exact next batch.");

assert(
  capabilityGroups.map((group) => `${group.capabilityFamily}:${group.reviewCount}`).sort().join("|") ===
    "planning/reasoning:3|text/chat:6",
  "Unexpected capability family grouping."
);
assert(
  workspaceGroups.map((group) => `${group.workspaceTarget}:${group.reviewCount}`).join("|") ===
    "Athena Command Center:9",
  "Unexpected workspace grouping."
);
assert(
  providerSlotGroups
    .map((group) => `${group.providerSlotLabel}:${group.reviewCount}`)
    .sort()
    .join("|") ===
    [
      "Anthropic-compatible text provider dry-run capture slot:2",
      "Gemini-compatible text provider dry-run capture slot:2",
      "OpenAI-compatible text provider dry-run capture slot:2",
      "fallback disabled dry-run capture slot:1",
      "local/private text provider dry-run capture slot:2"
    ].join("|"),
  "Unexpected provider slot grouping."
);
assert(
  credentialGroups
    .map((group) => `${group.credentialReferenceLabel}:${group.reviewCount}`)
    .sort()
    .join("|") ===
    [
      "opaque credential reference label / athena dry-run result capture planning reasoning primary:3",
      "opaque credential reference label / athena dry-run result capture text chat primary:6"
    ].join("|"),
  "Unexpected credential grouping."
);

const sourceJoinRecords = ensureDeterministic(
  () => joinModule.listMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinMvpRecords(),
  "source join records"
);
const sourceJoinInputs = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinInputs(),
  "source join input records"
);
const sourceAdmissionChecks = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinAdmissionChecks(),
  "source admission checks"
);
const sourceAuditOutputs = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditJoinOutputs(),
  "source audit outputs"
);
const sourceApprovalOutputs = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunApprovalJoinOutputs(),
  "source approval outputs"
);
const sourceEnvelopes = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinEnvelopes(),
  "source envelopes"
);
const sourceAuditPreviews = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditPreviews(),
  "source audit previews"
);
const sourceApprovalPreviews = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunApprovalPreviews(),
  "source approval previews"
);
const sourceEvidencePreviews = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalEvidencePreviews(),
  "source evidence previews"
);
const sourceSafetySummaries = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaries(),
  "source safety summaries"
);
const sourceBlockedSummaries = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaries(),
  "source blocked summaries"
);
const sourceRequests = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinRequests(),
  "source requests"
);
const sourceResponses = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinResponses(),
  "source responses"
);
const sourceErrors = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinErrors(),
  "source preview errors"
);
const sourceGates = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinGates(),
  "source gate records"
);
const sourceReadiness = ensureDeterministic(
  () => joinModule.listProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecords(),
  "source readiness records"
);
const sourceCaptureReviews = ensureDeterministic(
  () => captureReviewModule.listBackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviews(),
  "source capture reviews"
);
const sourceCaptureOutputReviews = ensureDeterministic(
  () => captureReviewModule.listProviderDryRunResultCaptureOutputReviewRecords(),
  "source capture output reviews"
);
const sourceSelectionReviews = ensureDeterministic(
  () => selectionReviewModule.listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews(),
  "source selection reviews"
);
const sourceAdmissionReviews = ensureDeterministic(
  () => admissionReviewModule.listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews(),
  "source admission reviews"
);
const sourceManualDecisionReviews = ensureDeterministic(
  () => manualDecisionModule.listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews(),
  "source manual decision reviews"
);
const sourceManualFixtures = ensureDeterministic(
  () => manualFixtureModule.listSyntheticMvpManualApprovalFixtures(),
  "source manual approval fixtures"
);

const joinMap = mapByKey(sourceJoinRecords);
const inputMap = mapByKey(sourceJoinInputs);
const admissionCheckMap = mapByKey(sourceAdmissionChecks);
const auditOutputMap = mapByKey(sourceAuditOutputs);
const approvalOutputMap = mapByKey(sourceApprovalOutputs);
const envelopeMap = mapByKey(sourceEnvelopes);
const auditPreviewMap = mapByKey(sourceAuditPreviews);
const approvalPreviewMap = mapByKey(sourceApprovalPreviews);
const evidencePreviewMap = mapByKey(sourceEvidencePreviews);
const safetySummaryMap = mapByKey(sourceSafetySummaries);
const blockedSummaryMap = mapByKey(sourceBlockedSummaries);
const requestMap = mapByKey(sourceRequests);
const responseMap = mapByKey(sourceResponses);
const errorMap = mapByKey(sourceErrors);
const gateMap = mapByKey(sourceGates);
const readinessMap = mapByKey(sourceReadiness);
const captureReviewMap = mapByKey(sourceCaptureReviews);
const captureOutputReviewMap = mapByKey(sourceCaptureOutputReviews);
const selectionReviewMap = mapByKey(sourceSelectionReviews);
const admissionReviewMap = mapByKey(sourceAdmissionReviews);
const manualDecisionMap = mapByKey(sourceManualDecisionReviews);
const manualFixtureMap = mapByKey(sourceManualFixtures);

const gateIdsByReview = new Map();
const readinessIdsByReview = new Map();
for (const review of reviews) {
  const matchingGateReviews = gateFailureReviews.filter(
    (record) => record.providerAdapterDryRunAuditApprovalJoinReviewId === review.id
  );
  const matchingReadinessReviews = readinessChecks.filter(
    (record) => record.providerAdapterDryRunAuditApprovalJoinReviewId === review.id
  );
  const gateIds = new Set(matchingGateReviews.map((record) => record.sourceGateId));
  const readinessIds = new Set(matchingReadinessReviews.map((record) => record.sourceReadinessId));
  gateIdsByReview.set(review.id, gateIds);
  readinessIdsByReview.set(review.id, readinessIds);

  if (matchingGateReviews.length !== 52) {
    throw new Error(`Expected 52 gate reviews for ${review.id} but found ${matchingGateReviews.length}.`);
  }
  if (gateIds.size !== 52) {
    throw new Error(`Expected 52 unique gate ids for ${review.id} but found ${gateIds.size}.`);
  }
  if (matchingReadinessReviews.length !== 33) {
    throw new Error(`Expected 33 readiness reviews for ${review.id} but found ${matchingReadinessReviews.length}.`);
  }
  if (readinessIds.size !== 33) {
    throw new Error(`Expected 33 unique readiness ids for ${review.id} but found ${readinessIds.size}.`);
  }

  const outputReview = findOne(
    outputReviews,
    (record) => record.providerAdapterDryRunAuditApprovalJoinReviewId === review.id,
    `output review for ${review.id}`
  );
  const recoveryPlan = findOne(
    recoveryPlans,
    (record) => record.providerAdapterDryRunAuditApprovalJoinReviewId === review.id,
    `recovery plan for ${review.id}`
  );
  const auditSummary = findOne(
    auditSummaries,
    (record) => record.providerAdapterDryRunAuditApprovalJoinReviewId === review.id,
    `review audit summary for ${review.id}`
  );
  const acceptancePosture = findOne(
    acceptancePostures,
    (record) => record.providerAdapterDryRunAuditApprovalJoinReviewId === review.id,
    `acceptance posture for ${review.id}`
  );

  const joinRecord = requireKey(joinMap, review.sourceMinimalProviderAdapterDryRunAuditApprovalJoinMvpReference, `join record for ${review.id}`);
  const inputRecord = requireKey(inputMap, review.sourceProviderAdapterDryRunAuditApprovalJoinInputReference, `join input for ${review.id}`);
  const admissionCheck = requireKey(admissionCheckMap, review.sourceProviderAdapterDryRunAuditApprovalJoinAdmissionCheckReference, `admission check for ${review.id}`);
  const auditOutput = requireKey(auditOutputMap, review.sourceProviderAdapterDryRunAuditJoinOutputReference, `audit output for ${review.id}`);
  const approvalOutput = requireKey(approvalOutputMap, review.sourceProviderAdapterDryRunApprovalJoinOutputReference, `approval output for ${review.id}`);
  const envelope = requireKey(envelopeMap, review.sourceProviderAdapterDryRunAuditApprovalJoinEnvelopeReference, `envelope for ${review.id}`);
  const auditPreview = requireKey(auditPreviewMap, review.sourceProviderAdapterDryRunAuditPreviewReference, `audit preview for ${review.id}`);
  const approvalPreview = requireKey(approvalPreviewMap, review.sourceProviderAdapterDryRunApprovalPreviewReference, `approval preview for ${review.id}`);
  const evidencePreview = requireKey(evidencePreviewMap, review.sourceProviderAdapterDryRunAuditApprovalEvidencePreviewReference, `evidence preview for ${review.id}`);
  const safetySummary = requireKey(safetySummaryMap, review.sourceProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryReference, `safety summary for ${review.id}`);
  const blockedSummary = requireKey(blockedSummaryMap, review.sourceProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryReference, `blocked summary for ${review.id}`);
  const requestRecord = requireKey(requestMap, review.sourceProviderAdapterDryRunAuditApprovalJoinRequestReference, `request for ${review.id}`);
  const responseRecord = requireKey(responseMap, review.sourceProviderAdapterDryRunAuditApprovalJoinResponseReference, `response for ${review.id}`);
  const errorRecord = requireKey(errorMap, review.sourceProviderAdapterDryRunAuditApprovalJoinPreviewErrorReference, `preview error for ${review.id}`);
  const captureReview = requireKey(captureReviewMap, review.sourceProviderDryRunResultCaptureReviewReference, `capture review for ${review.id}`);
  const captureOutputReview = requireKey(captureOutputReviewMap, review.sourceProviderDryRunResultCaptureOutputReviewReference, `capture output review for ${review.id}`);
  const selectionReview = requireKey(selectionReviewMap, review.sourceProviderSelectionCredentialReferenceReviewReference, `selection review for ${review.id}`);
  const admissionReview = requireKey(admissionReviewMap, review.sourceProviderDryRunAdmissionReviewReference, `admission review for ${review.id}`);
  const manualDecisionReview = requireKey(manualDecisionMap, review.sourceManualApprovalDecisionReviewReference, `manual decision review for ${review.id}`);
  const manualApprovalFixture = requireKey(manualFixtureMap, review.sourceManualApprovalFixtureReference, `manual approval fixture for ${review.id}`);
  const manualConfirmationFixture = requireKey(manualFixtureMap, review.sourceManualConfirmationFixtureReference, `manual confirmation fixture for ${review.id}`);

  const joinedSourceRecords = [
    inputRecord,
    admissionCheck,
    auditOutput,
    approvalOutput,
    envelope,
    auditPreview,
    approvalPreview,
    evidencePreview,
    safetySummary,
    blockedSummary,
    requestRecord,
    responseRecord,
    errorRecord
  ];

  for (const record of joinedSourceRecords) {
    assert(record.stableId === joinRecord.stableId, `Stable id mismatch for ${review.id}.`);
    assert(record.requestIdentityId === joinRecord.requestIdentityId, `Request identity mismatch for ${review.id}.`);
    assert(record.capabilityFamily === joinRecord.capabilityFamily, `Capability family mismatch for ${review.id}.`);
    assert(record.workspaceTarget === joinRecord.workspaceTarget, `Workspace mismatch for ${review.id}.`);
    assert(record.providerSlotLabel === joinRecord.providerSlotLabel, `Provider slot mismatch for ${review.id}.`);
    assert(record.backupProviderSlotLabel === joinRecord.backupProviderSlotLabel, `Backup provider slot mismatch for ${review.id}.`);
    assert(record.localPrivateAlternativeLabel === joinRecord.localPrivateAlternativeLabel, `Local/private alternative mismatch for ${review.id}.`);
    assert(record.opaqueCredentialReferenceLabel === joinRecord.opaqueCredentialReferenceLabel, `Credential reference mismatch for ${review.id}.`);
  }

  assert(joinRecord.stableId === review.id, `Join record stable id mismatch for ${review.id}.`);
  assert(joinRecord.requestIdentityId === review.requestIdentityId, `Join request identity mismatch for ${review.id}.`);
  assert(joinRecord.capabilityFamily === review.capabilityFamily, `Join capability family mismatch for ${review.id}.`);
  assert(joinRecord.workspaceTarget === review.workspaceTarget, `Join workspace target mismatch for ${review.id}.`);
  assert(joinRecord.providerSlotLabel === review.providerSlotLabel, `Join provider slot mismatch for ${review.id}.`);
  assert(joinRecord.backupProviderSlotLabel === review.backupProviderSlotLabel, `Join backup slot mismatch for ${review.id}.`);
  assert(joinRecord.localPrivateAlternativeLabel === review.localPrivateAlternativeLabel, `Join local/private alternative mismatch for ${review.id}.`);
  assert(joinRecord.opaqueCredentialReferenceLabel === review.opaqueCredentialReferenceLabel, `Join credential reference mismatch for ${review.id}.`);

  assert(captureReview.reviewId === review.id, `Capture review id mismatch for ${review.id}.`);
  assert(captureOutputReview.providerDryRunResultCaptureReviewId === review.id, `Capture output review id mismatch for ${review.id}.`);
  assert(admissionReview.reviewId === review.requestIdentityId, `Admission review request identity mismatch for ${review.id}.`);
  assert(manualApprovalFixture.executionMvpId === manualDecisionReview.id, `Manual approval fixture identity mismatch for ${review.id}.`);
  assert(manualConfirmationFixture.executionMvpId === manualDecisionReview.id, `Manual confirmation fixture identity mismatch for ${review.id}.`);

  assert(outputReview.auditJoinId === review.auditJoinId, `Audit join id mismatch for ${review.id}.`);
  assert(outputReview.approvalJoinId === review.approvalJoinId, `Approval join id mismatch for ${review.id}.`);
  assert(outputReview.joinDigest === review.joinDigest, `Join digest mismatch for ${review.id}.`);
  assert(outputReview.resultReference === review.resultReference, `Result reference mismatch for ${review.id}.`);
  assert(outputReview.auditReference === review.auditReference, `Audit reference mismatch for ${review.id}.`);
  assert(outputReview.approvalReference === review.approvalReference, `Approval reference mismatch for ${review.id}.`);
  assert(outputReview.evidenceReference === review.evidenceReference, `Evidence reference mismatch for ${review.id}.`);
  assert(outputReview.explicitProviderAdapterDryRunAuditApprovalJoinFixtureOnlyNoRealOutputNoProviderCallNoPersistenceStatement === exactOutputReviewStatement, `Output review statement mismatch for ${review.id}.`);

  assert(recoveryPlan.recoveryPosture === "manual review only", `Recovery posture mismatch for ${review.id}.`);
  assert(recoveryPlan.retryPosture === "disabled", `Retry posture mismatch for ${review.id}.`);
  assert(recoveryPlan.fallbackPosture === "disabled", `Fallback posture mismatch for ${review.id}.`);
  assert(recoveryPlan.explicitNoRetryNoFallbackNoProviderNoPromptNoSecretNoPersistenceStatement === exactRecoveryStatement, `Recovery statement mismatch for ${review.id}.`);

  assert(auditSummary.auditPosture === "preview-only", `Audit posture mismatch for ${review.id}.`);
  assert(auditSummary.sourceProviderAdapterDryRunAuditApprovalJoinGateCount === 52, `Audit summary gate count mismatch for ${review.id}.`);
  assert(auditSummary.sourceProviderAdapterDryRunAuditApprovalJoinReadinessCount === 33, `Audit summary readiness count mismatch for ${review.id}.`);
  assert(auditSummary.nextProviderAdapterDryRunEndToEndPacketMvpRequirement === exactNextBatch, `Audit summary next batch mismatch for ${review.id}.`);

  assert(acceptancePosture.acceptanceState === exactAcceptanceState, `Acceptance state mismatch for ${review.id}.`);
  assert(acceptancePosture.explicitProviderAdapterDryRunAuditApprovalJoinFixtureAcceptedLiveProviderExecutionAndPersistenceNotAcceptedStatement === exactAcceptanceStatement, `Acceptance statement mismatch for ${review.id}.`);

  assert(review.previewOnlyStatement === "provider adapter dry-run audit and approval join review is preview-only", `Preview-only statement mismatch for ${review.id}.`);
  assert(review.reviewMode === "preview-only", `Review mode mismatch for ${review.id}.`);
  assert(review.currentReadiness === exactReadiness, `Current readiness mismatch for ${review.id}.`);
  assert(review.deterministicPreviewReferences.requestReference === review.sourceProviderAdapterDryRunAuditApprovalJoinRequestReference, `Deterministic request reference mismatch for ${review.id}.`);
  assert(review.deterministicPreviewReferences.responseReference === review.sourceProviderAdapterDryRunAuditApprovalJoinResponseReference, `Deterministic response reference mismatch for ${review.id}.`);
  assert(review.deterministicPreviewReferences.previewErrorReference === review.sourceProviderAdapterDryRunAuditApprovalJoinPreviewErrorReference, `Deterministic error reference mismatch for ${review.id}.`);
  assert(review.deterministicPreviewReferences.resultReference === review.resultReference, `Deterministic result reference mismatch for ${review.id}.`);
  assert(review.deterministicPreviewReferences.auditReference === review.auditReference, `Deterministic audit reference mismatch for ${review.id}.`);
  assert(review.deterministicPreviewReferences.approvalReference === review.approvalReference, `Deterministic approval reference mismatch for ${review.id}.`);
  assert(review.deterministicPreviewReferences.evidenceReference === review.evidenceReference, `Deterministic evidence reference mismatch for ${review.id}.`);
  assert(review.deterministicPreviewReferences.gateReferences.length === 52, `Deterministic gate reference count mismatch for ${review.id}.`);
  assert(review.deterministicPreviewReferences.readinessReferences.length === 33, `Deterministic readiness reference count mismatch for ${review.id}.`);

  for (const gateReference of review.sourceProviderAdapterDryRunAuditApprovalJoinGateReferences) {
    requireKey(gateMap, gateReference, `source gate reference for ${review.id}`);
  }
  for (const readinessReference of review.sourceProviderAdapterDryRunAuditApprovalJoinReadinessReferences) {
    requireKey(readinessMap, readinessReference, `source readiness reference for ${review.id}`);
  }

  assert(review.sourceProviderAdapterDryRunAuditApprovalJoinAggregateSummaryReference === "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-summary-v1", `Aggregate summary reference mismatch for ${review.id}.`);
  assert(review.sourceProviderAdapterDryRunAuditApprovalJoinAggregateGateSummaryReference === "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-gate-summary-v1", `Aggregate gate summary reference mismatch for ${review.id}.`);
  assert(review.sourceProviderAdapterDryRunAuditApprovalJoinAggregateReadinessSummaryReference === "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-readiness-summary-v1", `Aggregate readiness summary reference mismatch for ${review.id}.`);
}

assert(gateFailureReviews.length === reviews.length * 52, "Gate failure review multiplication count mismatch.");
assert(readinessChecks.length === reviews.length * 33, "Readiness review multiplication count mismatch.");

const requiredGateIds = [
  "provider-sdk-not-imported",
  "provider-response-not-received",
  "model-output-not-generated",
  "prompt-not-sent",
  "no-real-approval-request",
  "no-real-approval-recording",
  "no-approval-token-issuance",
  "no-approval-lease-issuance",
  "no-queue-dispatch",
  "no-worker-dispatch",
  "no-job-execution",
  "no-retry-execution",
  "no-fallback-execution",
  "no-result-persistence",
  "no-audit-persistence",
  "no-approval-persistence",
  "no-database-write",
  "no-file-write"
];
for (const gateId of requiredGateIds) {
  assert(gateFailureReviews.some((record) => record.sourceGateId === gateId), `Missing required gate review id ${gateId}.`);
}

const firstGateReview = gateFailureReviews[0];
const firstRecoveryPlan = recoveryPlans[0];
const firstAcceptance = acceptancePostures[0];

assert(firstGateReview.explicitNoLiveGatePassStatement === exactNoLiveGateStatement, "Unexpected first gate review statement.");
assert(firstRecoveryPlan.explicitNoRetryNoFallbackNoProviderNoPromptNoSecretNoPersistenceStatement === exactRecoveryStatement, "Unexpected first recovery statement.");
assert(firstAcceptance.explicitProviderAdapterDryRunAuditApprovalJoinFixtureAcceptedLiveProviderExecutionAndPersistenceNotAcceptedStatement === exactAcceptanceStatement, "Unexpected first acceptance statement.");

const stableReviewKeyOpenAi =
  reviewModule.buildStableMinimalProviderAdapterDryRunAuditApprovalJoinReviewKey(
    "openai-compatible-text-provider-dry-run-capture-slot"
  );
const stableReviewKeyCodeAssistance =
  reviewModule.buildStableMinimalProviderAdapterDryRunAuditApprovalJoinReviewKey(
    "code-assistance-request"
  );
const stableOutputKeyOpenAi =
  reviewModule.buildStableProviderAdapterDryRunAuditApprovalJoinOutputReviewKey(
    "openai-compatible-text-provider-dry-run-capture-slot"
  );
const stableOutputKeyCodeAssistance =
  reviewModule.buildStableProviderAdapterDryRunAuditApprovalJoinOutputReviewKey(
    "code-assistance-request"
  );

assert(
  stableReviewKeyOpenAi ===
    "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-review:openai-compatible-text-provider-dry-run-capture-slot",
  "Unexpected review key for openai slot."
);
assert(
  stableReviewKeyCodeAssistance ===
    "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-review:code-assistance-request",
  "Unexpected review key for code-assistance-request."
);
assert(
  stableOutputKeyOpenAi ===
    "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-output-review:openai-compatible-text-provider-dry-run-capture-slot",
  "Unexpected output review key for openai slot."
);
assert(
  stableOutputKeyCodeAssistance ===
    "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-output-review:code-assistance-request",
  "Unexpected output review key for code-assistance-request."
);

process.stdout.write(
  JSON.stringify({
    reviewCount: reviews.length,
    outputReviewCount: outputReviews.length,
    gateFailureCount: gateFailureReviews.length,
    recoveryPlanCount: recoveryPlans.length,
    readinessReviewCount: readinessChecks.length,
    reviewAuditSummaryCount: auditSummaries.length,
    acceptancePostureCount: acceptancePostures.length,
    uniqueGateCount: 52,
    uniqueReadinessCount: 33,
    phase: String(reviewSummary.highestDetectedPhase),
    currentBatch: reviewSummary.latestCompletedBatch,
    previousBatch: reviewSummary.previousCompletedBatch,
    nextBatch: reviewSummary.nextLikelyBatch,
    currentReadiness: reviewSummary.currentReadiness,
    acceptanceState: reviewSummary.acceptanceState,
    outputReviewStatement: outputReviewSummary.outputReviewStatement,
    noLiveGatePassStatement: gateFailureSummary.noLiveGatePassStatement,
    recoveryStatement: recoverySummary.recoveryStatement,
    acceptanceStatement:
      firstAcceptance.explicitProviderAdapterDryRunAuditApprovalJoinFixtureAcceptedLiveProviderExecutionAndPersistenceNotAcceptedStatement,
    recoveryPosture: recoverySummary.recoveryPosture,
    retryPosture: recoverySummary.retryPosture,
    fallbackPosture: recoverySummary.fallbackPosture,
    stableReviewKeyOpenAi,
    stableReviewKeyCodeAssistance,
    stableOutputKeyOpenAi,
    stableOutputKeyCodeAssistance,
    capabilityGroups:
      capabilityGroups.map((group) => `${group.capabilityFamily}:${group.reviewCount}`).sort().join("|"),
    workspaceGroups:
      workspaceGroups.map((group) => `${group.workspaceTarget}:${group.reviewCount}`).join("|"),
    providerSlotGroups:
      providerSlotGroups
        .map((group) => `${group.providerSlotLabel}:${group.reviewCount}`)
        .sort()
        .join("|"),
    credentialGroups:
      credentialGroups
        .map((group) => `${group.credentialReferenceLabel}:${group.reviewCount}`)
        .sort()
        .join("|"),
    displayStringCount: displayStrings.length
  })
);
'@

  $validationJson = $nodeScript | node - $RepoRootPath
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Unable to execute provider audit approval join review validation."
  }

  return $validationJson | ConvertFrom-Json
}

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join Review and Recovery Preview Mega Batch smoke ==="

$athenaAliasPath = Join-Path $root "src\app\athena\page.tsx"
$jarvisPageClientPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$providersPageClientPath = Join-Path $root "src\app\ai-providers\page-client.tsx"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$jarvisIaContentPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-content.ts"
$videoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$reviewModuleRootPath = Join-Path $root "src\lib\codexforge\min-provider-aa-review"
$reviewTypesPath = Join-Path $root "src\lib\codexforge\min-provider-aa-review\min-provider-aa-review-types.ts"
$reviewCatalogPath = Join-Path $root "src\lib\codexforge\min-provider-aa-review\min-provider-aa-review-catalog.ts"
$reviewIndexPath = Join-Path $root "src\lib\codexforge\min-provider-aa-review\index.ts"
$joinModuleRootPath = Join-Path $root "src\lib\codexforge\min-provider-audit-join"
$captureReviewRootPath = Join-Path $root "src\lib\codexforge\min-provider-capture-review"
$captureRootPath = Join-Path $root "src\lib\codexforge\min-provider-capture"
$admissionReviewRootPath = Join-Path $root "src\lib\codexforge\min-provider-admit-review"
$providerReviewRootPath = Join-Path $root "src\lib\codexforge\min-provider-review"
$textReviewRootPath = Join-Path $root "src\lib\codexforge\min-text-aa-review"
$synthReviewRootPath = Join-Path $root "src\lib\codexforge\min-synth-audit-join-review"
$joinHelperPath = Join-Path $root "src\lib\codexforge\min-provider-audit-join\min-provider-audit-join-helper.server.ts"
$checkpointCurrentPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$runbookPath = Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md"
$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$checkpointSmokePath = Join-Path $root "scripts\smoke-codexforge-checkpoint-docs.ps1"
$providerJoinMvpSmokePath = Join-Path $root "scripts\smoke-codexforge-backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-mvp-mega-batch.ps1"
$textReviewSmokePath = Join-Path $root "scripts\smoke-codexforge-backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-review-recovery-preview-mega-batch.ps1"
$synthReviewSmokePath = Join-Path $root "scripts\smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-review-recovery-preview-mega-batch.ps1"
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
  $reviewModuleRootPath,
  $reviewTypesPath,
  $reviewCatalogPath,
  $reviewIndexPath,
  $joinModuleRootPath,
  $captureReviewRootPath,
  $captureRootPath,
  $admissionReviewRootPath,
  $providerReviewRootPath,
  $textReviewRootPath,
  $synthReviewRootPath,
  $joinHelperPath,
  $checkpointCurrentPath,
  $runbookPath,
  $allSmokePath,
  $checkpointSmokePath,
  $providerJoinMvpSmokePath,
  $textReviewSmokePath,
  $synthReviewSmokePath,
  $selfPath
)

foreach ($path in $requiredPaths) {
  Assert-PathExists $path
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
$reviewModuleSource = Get-CombinedSourceText (Get-SourceFiles @(
  $reviewTypesPath,
  $reviewCatalogPath,
  $reviewIndexPath
))
$reviewModuleNormalized = Normalize-Whitespace $reviewModuleSource
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

Assert-Contains $athenaAliasSource 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Backend-owned minimal provider adapter dry-run audit and approval join review",
  "Provider adapter dry-run audit and approval join output review",
  "Provider adapter dry-run audit and approval join gate failure review",
  "Provider adapter dry-run audit and approval join recovery plan",
  "Provider adapter dry-run audit and approval join recovery readiness",
  "Provider adapter dry-run audit and approval join review audit summary",
  "Provider adapter dry-run audit and approval join acceptance posture",
  "Athena can review the backend-owned minimal manual-gated provider adapter dry-run audit and approval join MVP",
  "provider adapter dry-run audit and approval join review is preview-only",
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
  "current readiness: minimal-provider-dry-run-audit-approval-join-review-only / backend-only / dry-run-fixture-only / credential-reference-only / in-memory-only / not-live-provider-executing / not persistent",
  "acceptance state: not accepted for live provider execution or persistence / provider adapter dry-run audit approval join fixture MVP accepted only",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "provider adapter dry-run end-to-end packet MVP comes next"
)) {
  Assert-Contains $athenaSource $needle "Athena surface contains $needle"
}

foreach ($needle in @(
  "Athena is the main Jarvis control layer",
  "Athena can review the backend-owned minimal manual-gated provider adapter dry-run audit and approval join MVP",
  "provider adapter dry-run audit and approval join review is preview-only",
  "current readiness: minimal-provider-dry-run-audit-approval-join-review-only / backend-only / dry-run-fixture-only / credential-reference-only / in-memory-only / not-live-provider-executing / not persistent",
  "provider adapter dry-run end-to-end packet MVP comes next"
)) {
  Assert-Contains $homeSource $needle "home surface contains $needle"
}

foreach ($needle in @(
  "Backend-owned minimal provider adapter dry-run audit and approval join review",
  "Provider adapter dry-run audit and approval join output review",
  "Provider adapter dry-run audit and approval join gate failure review",
  "Provider adapter dry-run audit and approval join recovery plan",
  "Provider adapter dry-run audit and approval join recovery readiness",
  "Provider adapter dry-run audit and approval join review audit summary",
  "Provider adapter dry-run audit and approval join acceptance posture",
  "provider adapter dry-run audit and approval join review is preview-only",
  "acceptance state: not accepted for live provider execution or persistence / provider adapter dry-run audit approval join fixture MVP accepted only",
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

Assert-Contains $athenaPanelSource '"provider-dry-run-aa-review-capability"' "Athena panel uses scoped provider review capability key"
Assert-Contains $athenaPanelSource '"provider-dry-run-aa-review-workspace"' "Athena panel uses scoped provider review workspace key"
Assert-Contains $athenaPanelSource '"provider-dry-run-aa-review-provider-slot"' "Athena panel uses scoped provider review provider-slot key"
Assert-Contains $athenaPanelSource '"provider-dry-run-aa-review-credential-reference"' "Athena panel uses scoped provider review credential key"
Assert-Contains $athenaPanelSource '"provider-dry-run-aa-review-gate"' "Athena panel uses scoped provider review gate key"
Assert-Contains $athenaPanelSource '"provider-dry-run-aa-review-readiness"' "Athena panel uses scoped provider review readiness key"
Assert-Contains $athenaPanelSource "buildScopedItemKey(" "Athena panel uses scoped key helper"
Assert-NotMatches $athenaPanelSource 'key=\{group\.capabilityFamily\}' "Athena panel avoids raw capability family keys"
Assert-NotMatches $athenaPanelSource 'key=\{group\.workspaceTarget\}' "Athena panel avoids raw workspace keys"
Assert-NotMatches $athenaPanelSource 'key=\{group\.providerSlotLabel\}' "Athena panel avoids raw provider slot keys"
Assert-NotMatches $athenaPanelSource 'key=\{group\.credentialReferenceLabel\}' "Athena panel avoids raw credential reference keys"
Assert-NotMatches $athenaPanelSource 'key=\{record\.sourceGateId\}' "Athena panel avoids raw gate keys"
Assert-NotMatches $athenaPanelSource 'key=\{record\.sourceReadinessId\}' "Athena panel avoids raw readiness keys"

Assert-Contains $athenaModelPath "athena-control-plane-model.ts" "athena control plane model path is available"
Assert-NotMatches $navigationTypesSource 'type\s+CodexForgeNavigationRouteHref\s*=\s*string\b' "route href typing was not loosened to string"
Assert-NotMatches $navigationTypesSource 'commandDeckRole\s*:\s*string\b' "commandDeckRole typing was not loosened to string"
Assert-Contains (Get-Content -Raw $athenaModelPath) "href: CodexForgeNavigationRouteHref;" "route href typing remains Route-based through CodexForgeNavigationRouteHref"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains explicitly typed"

Assert-NotMatches $reviewModuleSource 'helper\.server' "review module excludes server helper imports"
Assert-NotMatches $reviewModuleSource 'import\s+["'']server-only["'']' "review module excludes direct server-only imports"
Assert-NotMatches $frontEndSource 'min-provider-audit-join-helper\.server' "frontend client files do not import the provider audit join server helper"
Assert-NotMatches $frontEndSource 'runMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinMvpForStaticFixture|joinMinimalManualGatedProviderAdapterDryRunAuditAndApprovalMvp' "frontend client files do not call the provider audit join server helper functions"

foreach ($patternSpec in @(
  @{ Pattern = '\bMath\.random\b'; Name = "Math.random in new provider review source" },
  @{ Pattern = '\bDate\.now\b'; Name = "Date.now in new provider review source" },
  @{ Pattern = '\bnew\s+Date\s*\('; Name = "new Date in new provider review source" },
  @{ Pattern = '\bcrypto\.randomUUID\s*\('; Name = "crypto.randomUUID in new provider review source" },
  @{ Pattern = '\bfetch\s*\('; Name = "fetch in new provider review source" },
  @{ Pattern = '\bXMLHttpRequest\b'; Name = "XMLHttpRequest in new provider review source" },
  @{ Pattern = '\baxios\b'; Name = "axios in new provider review source" },
  @{ Pattern = 'navigator\.sendBeacon'; Name = "navigator.sendBeacon in new provider review source" },
  @{ Pattern = 'process\.env'; Name = "process.env in new provider review source" },
  @{ Pattern = 'from\s+["''][^"'']*(openai|anthropic|replicate|fal-ai|elevenlabs|stability|together|groq)[^"'']*["'']'; Name = "provider SDK imports in new provider review source" },
  @{ Pattern = 'localStorage\.|sessionStorage\.|indexedDB\b'; Name = "browser storage in new provider review source" },
  @{ Pattern = 'document\.cookie|cookieStore\.'; Name = "cookies in new provider review source" },
  @{ Pattern = 'PrismaClient|mongoose|mongodb|supabase|drizzle'; Name = "database clients in new provider review source" },
  @{ Pattern = 'writeFile|appendFile|createWriteStream|Deno\.writeTextFile'; Name = "filesystem writes in new provider review source" }
)) {
  Assert-NotMatches $reviewModuleSource $patternSpec.Pattern $patternSpec.Name
}

Assert-NotMatches $reviewModuleSource 'sk-[A-Za-z0-9]+' "raw secret-like values in new provider review source"

foreach ($patternSpec in @(
  @{ Pattern = 'from\s+["''][^"'']*(openai|anthropic|replicate|fal-ai|elevenlabs|stability|together|groq)[^"'']*["'']'; Name = "provider SDK imports in frontend Athena/Jarvis files" },
  @{ Pattern = '\bfetch\s*\('; Name = "fetch/network calls in frontend Athena/Jarvis files" },
  @{ Pattern = '\blocalStorage\.|\bsessionStorage\.|\bindexedDB\b\s*[\.\(]'; Name = "browser secret storage in frontend Athena/Jarvis files" },
  @{ Pattern = 'document\.cookie|cookieStore\.'; Name = "cookie usage in frontend Athena/Jarvis files" },
  @{ Pattern = 'child_process|exec\s*\(|spawn\s*\(|powershell|cmd\.exe|process\.execPath'; Name = "shell/process execution in frontend Athena/Jarvis files" }
)) {
  Assert-NotMatches $frontEndSource $patternSpec.Pattern $patternSpec.Name
}

$newSourcePaths = @(
  (Resolve-Path $reviewTypesPath).Path,
  (Resolve-Path $reviewCatalogPath).Path,
  (Resolve-Path $reviewIndexPath).Path
)
$longestNewSourcePath = $newSourcePaths | Sort-Object Length -Descending | Select-Object -First 1
Assert-True ($longestNewSourcePath.Length -lt 220) "longest new source path remains below 220 characters"

$validation = Invoke-ProviderAuditApprovalJoinReviewValidation $repoRoot

Assert-Equal "$($validation.reviewCount)" "9" "provider audit approval join review count"
Assert-Equal "$($validation.outputReviewCount)" "9" "provider audit approval join output review count"
Assert-Equal "$($validation.recoveryPlanCount)" "9" "provider audit approval join recovery plan count"
Assert-Equal "$($validation.reviewAuditSummaryCount)" "9" "provider audit approval join review audit summary count"
Assert-Equal "$($validation.acceptancePostureCount)" "9" "provider audit approval join acceptance posture count"
Assert-Equal "$($validation.gateFailureCount)" "468" "provider audit approval join gate failure review count"
Assert-Equal "$($validation.readinessReviewCount)" "297" "provider audit approval join recovery readiness review count"
Assert-Equal "$($validation.uniqueGateCount)" "52" "provider audit approval join unique gate ids per example"
Assert-Equal "$($validation.uniqueReadinessCount)" "33" "provider audit approval join unique readiness ids per example"
Assert-Equal "$($validation.gateFailureCount)" "$([int]$validation.reviewCount * [int]$validation.uniqueGateCount)" "provider gate count derived from source count"
Assert-Equal "$($validation.readinessReviewCount)" "$([int]$validation.reviewCount * [int]$validation.uniqueReadinessCount)" "provider readiness count derived from source count"
Assert-Equal "$($validation.phase)" "6153" "provider audit approval join review highest phase"
Assert-Equal "$($validation.currentBatch)" "6122-6153 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join Review and Recovery Preview" "provider audit approval join review current batch"
Assert-Equal "$($validation.previousBatch)" "6090-6121 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP" "provider audit approval join review previous batch"
Assert-Equal "$($validation.nextBatch)" "6154-6185 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run End-to-End Packet MVP" "provider audit approval join review next batch"
Assert-Equal "$($validation.currentReadiness)" "minimal-provider-dry-run-audit-approval-join-review-only / backend-only / dry-run-fixture-only / credential-reference-only / in-memory-only / not-live-provider-executing / not persistent" "provider audit approval join review readiness string"
Assert-Equal "$($validation.acceptanceState)" "not accepted for live provider execution or persistence / provider adapter dry-run audit approval join fixture MVP accepted only" "provider audit approval join review acceptance state"
Assert-Equal "$($validation.outputReviewStatement)" "Provider adapter dry-run audit approval join fixture only. No real output. No provider call. No persistence." "provider audit approval join output review statement"
Assert-Equal "$($validation.noLiveGatePassStatement)" "No live gate pass." "provider audit approval join no-live-gate statement"
Assert-Equal "$($validation.recoveryStatement)" "No retry. No fallback. No provider execution. No prompt sending. No secret read. No persistence." "provider audit approval join recovery statement"
Assert-Equal "$($validation.acceptanceStatement)" "Provider adapter dry-run audit approval join fixture accepted only. Live provider execution and persistence not accepted." "provider audit approval join acceptance statement"
Assert-Equal "$($validation.recoveryPosture)" "manual review only" "provider audit approval join recovery posture"
Assert-Equal "$($validation.retryPosture)" "disabled" "provider audit approval join retry posture"
Assert-Equal "$($validation.fallbackPosture)" "disabled" "provider audit approval join fallback posture"
Assert-Equal "$($validation.stableReviewKeyOpenAi)" "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-review:openai-compatible-text-provider-dry-run-capture-slot" "stable review key for openai slot"
Assert-Equal "$($validation.stableReviewKeyCodeAssistance)" "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-review:code-assistance-request" "stable review key for code-assistance-request"
Assert-Equal "$($validation.stableOutputKeyOpenAi)" "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-output-review:openai-compatible-text-provider-dry-run-capture-slot" "stable output review key for openai slot"
Assert-Equal "$($validation.stableOutputKeyCodeAssistance)" "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-output-review:code-assistance-request" "stable output review key for code-assistance-request"
Assert-Equal "$($validation.capabilityGroups)" "planning/reasoning:3|text/chat:6" "capability family groups"
Assert-Equal "$($validation.workspaceGroups)" "Athena Command Center:9" "workspace groups"
Assert-Equal "$($validation.providerSlotGroups)" "Anthropic-compatible text provider dry-run capture slot:2|Gemini-compatible text provider dry-run capture slot:2|OpenAI-compatible text provider dry-run capture slot:2|fallback disabled dry-run capture slot:1|local/private text provider dry-run capture slot:2" "provider slot groups"
Assert-Equal "$($validation.credentialGroups)" "opaque credential reference label / athena dry-run result capture planning reasoning primary:3|opaque credential reference label / athena dry-run result capture text chat primary:6" "credential reference groups"
Assert-True ($validation.displayStringCount -gt 20) "provider review display strings exist"

Assert-Contains $allSmokeSource 'currentReleaseGateBatch = "6122-6153 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join Review and Recovery Preview"' "all-smoke updates current release gate batch"
Assert-Contains $allSmokeSource "Phase 6153 Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join Review and Recovery Preview" "all-smoke registers phase 6153"
Assert-Contains $allSmokeSource "smoke-codexforge-backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-review-recovery-preview-mega-batch.ps1" "all-smoke registers the dedicated provider review smoke"
Assert-Contains $allSmokeSource "Phase 6121 Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP" "all-smoke preserves phase 6121 coverage"
Assert-Contains $allSmokeSource "Phase 6089 Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview" "all-smoke preserves phase 6089 result capture review coverage"

foreach ($docSource in @($checkpointCurrentSource, $runbookSource)) {
  Assert-Contains $docSource "Highest detected phase: 6153" "checkpoint docs report phase 6153"
  Assert-Contains $docSource "Latest completed batch: 6122-6153 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join Review and Recovery Preview" "checkpoint docs report phase 6153 current batch"
  Assert-Contains $docSource "Previous completed batch: 6090-6121 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP" "checkpoint docs report phase 6153 previous batch"
  Assert-Contains $docSource "Next likely batch: 6154-6185 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run End-to-End Packet MVP" "checkpoint docs report phase 6153 next batch"
  Assert-Contains $docSource "Backend-owned minimal provider adapter dry-run audit and approval join review" "checkpoint docs include review section marker"
  Assert-Contains $docSource "Provider adapter dry-run audit and approval join output review" "checkpoint docs include output review section marker"
  Assert-Contains $docSource "Provider adapter dry-run audit and approval join gate failure review" "checkpoint docs include gate review section marker"
  Assert-Contains $docSource "Provider adapter dry-run audit and approval join recovery plan" "checkpoint docs include recovery plan section marker"
  Assert-Contains $docSource "Provider adapter dry-run audit and approval join recovery readiness" "checkpoint docs include recovery readiness section marker"
  Assert-Contains $docSource "Provider adapter dry-run audit and approval join review audit summary" "checkpoint docs include review audit section marker"
  Assert-Contains $docSource "Provider adapter dry-run audit and approval join acceptance posture" "checkpoint docs include acceptance posture section marker"
  Assert-Contains $docSource "current readiness: minimal-provider-dry-run-audit-approval-join-review-only / backend-only / dry-run-fixture-only / credential-reference-only / in-memory-only / not-live-provider-executing / not persistent" "checkpoint docs include current readiness marker"
  Assert-Contains $docSource "acceptance state: not accepted for live provider execution or persistence / provider adapter dry-run audit approval join fixture MVP accepted only" "checkpoint docs include acceptance state marker"
  Assert-Contains $docSource "recovery is manual review only" "checkpoint docs include recovery marker"
  Assert-Contains $docSource "retry disabled" "checkpoint docs include retry marker"
  Assert-Contains $docSource "fallback disabled" "checkpoint docs include fallback marker"
  Assert-Contains $docSource "Current checkpoint: Highest detected phase: 6121. Latest completed batch: 6090-6121 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP. Previous completed batch: 6058-6089 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview. Next likely batch: 6122-6153 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join Review and Recovery Preview." "checkpoint docs preserve phase 6121 historical marker"
}

Write-Host "PASS: provider adapter dry-run audit approval join review recovery preview smoke"
