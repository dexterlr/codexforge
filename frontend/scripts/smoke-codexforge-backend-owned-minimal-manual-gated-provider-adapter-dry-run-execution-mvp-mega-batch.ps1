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
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Multiline)) {
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

function Get-CombinedFileText {
  param([string[]]$Paths)
  return ($Paths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
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

function Invoke-ProviderDryRunExecutionValidation {
  param([string]$RepoRootPath)

  $nodeScript = @'
const fs = require("fs");
const path = require("path");
const Module = require("module");
const ts = require("typescript");

const repoRoot = process.argv[2];

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

const executionModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-provider-exec",
  "index.ts"
));

const requiredExports = [
  "buildStableProviderDryRunExecutionMvpKey",
  "listMinimalManualGatedProviderAdapterDryRunExecutionMvpRecords",
  "listProviderDryRunExecutionInputs",
  "listProviderDryRunExecutionPlans",
  "listProviderDryRunExecutionOutputs",
  "listProviderDryRunExecutionEnvelopes",
  "listProviderDryRunFixtureResponses",
  "listProviderDryRunBlockedLiveExecutionSummaries",
  "listProviderDryRunExecutionGates",
  "listProviderDryRunExecutionReadinessMatrixRecords",
  "runMinimalManualGatedProviderDryRunExecutionMvpForStaticFixture",
  "buildProviderDryRunExecutionSummary",
  "buildProviderDryRunExecutionGateSummary",
  "buildProviderDryRunExecutionReadinessSummary",
  "buildNextProviderDryRunExecutionReviewRecoveryChecklist",
  "executeMinimalManualGatedProviderAdapterDryRunMvp"
];

for (const exportName of requiredExports) {
  if (typeof executionModule[exportName] !== "function") {
    throw new Error(`Missing ${exportName} export.`);
  }
}

const mvpRecordsA = executionModule.listMinimalManualGatedProviderAdapterDryRunExecutionMvpRecords();
const mvpRecordsB = executionModule.listMinimalManualGatedProviderAdapterDryRunExecutionMvpRecords();
if (JSON.stringify(mvpRecordsA) !== JSON.stringify(mvpRecordsB)) {
  throw new Error("Provider dry-run execution MVP records are not deterministic.");
}

const inputs = executionModule.listProviderDryRunExecutionInputs();
const plans = executionModule.listProviderDryRunExecutionPlans();
const outputs = executionModule.listProviderDryRunExecutionOutputs();
const envelopes = executionModule.listProviderDryRunExecutionEnvelopes();
const fixtureResponses = executionModule.listProviderDryRunFixtureResponses();
const blockedSummaries = executionModule.listProviderDryRunBlockedLiveExecutionSummaries();
const evidencePreviews = executionModule.listProviderDryRunEvidencePreviews();
const auditPreviews = executionModule.listProviderDryRunAuditPreviews();
const approvalPreviews = executionModule.listProviderDryRunApprovalPreviews();
const gates = executionModule.listProviderDryRunExecutionGates();
const readiness = executionModule.listProviderDryRunExecutionReadinessMatrixRecords();
const requests = executionModule.listProviderDryRunExecutionRequestRecords();
const responses = executionModule.listProviderDryRunExecutionResponseRecords();
const errors = executionModule.listProviderDryRunExecutionErrorRecords();
const summary = executionModule.buildProviderDryRunExecutionSummary();
const gateSummary = executionModule.buildProviderDryRunExecutionGateSummary();
const readinessSummary = executionModule.buildProviderDryRunExecutionReadinessSummary();
const checklist = executionModule.buildNextProviderDryRunExecutionReviewRecoveryChecklist();
const helperA = executionModule.runMinimalManualGatedProviderDryRunExecutionMvpForStaticFixture();
const helperB = executionModule.runMinimalManualGatedProviderDryRunExecutionMvpForStaticFixture();
const helperFromInput = executionModule.executeMinimalManualGatedProviderAdapterDryRunMvp(inputs[0]);

if (JSON.stringify(helperA) !== JSON.stringify(helperB)) {
  throw new Error("Provider dry-run execution helper output is not deterministic.");
}
if (JSON.stringify(helperA) !== JSON.stringify(helperFromInput)) {
  throw new Error("Provider dry-run execution helper input and fixture outputs diverge.");
}

process.stdout.write(JSON.stringify({
  mvpCount: mvpRecordsA.length,
  inputCount: inputs.length,
  planCount: plans.length,
  outputCount: outputs.length,
  envelopeCount: envelopes.length,
  fixtureResponseCount: fixtureResponses.length,
  blockedSummaryCount: blockedSummaries.length,
  evidenceCount: evidencePreviews.length,
  auditCount: auditPreviews.length,
  approvalCount: approvalPreviews.length,
  gateCount: gates.length,
  readinessCount: readiness.length,
  requestCount: requests.length,
  responseCount: responses.length,
  errorCount: errors.length,
  checklistCount: checklist.length,
  highestDetectedPhase: String(summary.highestDetectedPhase),
  latestCompletedBatch: summary.latestCompletedBatch,
  previousCompletedBatch: summary.previousCompletedBatch,
  nextLikelyBatch: summary.nextLikelyBatch,
  currentReadiness: summary.currentReadiness,
  stableKey: executionModule.buildStableProviderDryRunExecutionMvpKey("text-chat-provider-dry-run-execution"),
  helperExecutionState: helperA.executionState,
  helperExecutionId: helperA.providerDryRunExecutionId,
  helperAdmissionId: helperA.providerDryRunAdmissionId,
  helperProviderSlotId: helperA.providerSlotId,
  helperCredentialReferenceId: helperA.credentialReferenceId,
  helperExecutionDigest: helperA.executionDigest,
  helperProviderSlotLabel: helperA.providerSlotLabel,
  helperBackupProviderSlotLabel: helperA.backupProviderSlotLabel,
  helperLocalPrivateAlternativeLabel: helperA.localPrivateAlternativeLabel,
  helperOpaqueCredentialReferenceLabel: helperA.opaqueCredentialReferenceLabel,
  helperCredentialValueState: helperA.credentialValueState,
  helperEnvVarState: helperA.envVarState,
  helperProviderKeyState: helperA.providerKeyState,
  helperProviderSdkImportState: helperA.providerSdkImportState,
  helperLiveProviderExecutionState: helperA.liveProviderExecutionState,
  helperProviderResponseState: helperA.providerResponseState,
  helperModelOutputState: helperA.modelOutputState,
  helperFixtureProviderResponse: helperA.fixtureProviderResponse,
  helperPersistenceState: helperA.persistenceState,
  helperNoFrontendRequestStatement: helperA.noFrontendRequestStatement,
  helperNoApiRouteStatement: helperA.noApiRouteStatement,
  helperNoProviderCallStatement: helperA.noProviderCallStatement,
  helperNoModelCallStatement: helperA.noModelCallStatement,
  helperNoRealApprovalRequestStatement: helperA.noRealApprovalRequestStatement,
  helperNoRealApprovalRecordingStatement: helperA.noRealApprovalRecordingStatement,
  helperNoApprovalTokenStatement: helperA.noApprovalTokenStatement,
  helperNoApprovalLeaseStatement: helperA.noApprovalLeaseStatement
}));
'@

  $validationRaw = $nodeScript | node - $RepoRootPath
  return $validationRaw | ConvertFrom-Json
}

Write-Host "=== Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution MVP smoke ==="

$jarvisPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$homePath = Join-Path $root "src\app\page-client.tsx"
$providersPath = Join-Path $root "src\app\ai-providers\page-client.tsx"
$athenaContentPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-content.ts"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$athenaShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$jarvisVideoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$executionModuleDir = Join-Path $root "src\lib\codexforge\min-provider-exec"
$checkpointPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"

foreach ($path in @(
  $jarvisPath,
  $homePath,
  $providersPath,
  $athenaContentPath,
  $athenaPanelPath,
  $athenaShellPath,
  $athenaModelPath,
  $jarvisVideoPanelPath,
  $navigationTypesPath,
  $checkpointPath,
  $allSmokePath
)) {
  Assert-FileExists $path
}

$jarvisSource = Get-CombinedSourceText (Get-SourceFiles @(
  $jarvisPath,
  $athenaContentPath,
  $athenaPanelPath,
  $athenaShellPath,
  $athenaModelPath
))
$homeSource = Get-CombinedSourceText (Get-SourceFiles @(
  $homePath,
  $athenaContentPath,
  $athenaShellPath,
  $athenaModelPath
))
$videoSource = Get-CombinedSourceText (Get-SourceFiles @($jarvisVideoPanelPath))
$executionModuleSource = Get-CombinedSourceText (Get-SourceFiles @($executionModuleDir))
$frontEndSource = Get-CombinedSourceText (Get-SourceFiles @(
  $jarvisPath,
  $homePath,
  $providersPath,
  $athenaContentPath,
  $athenaPanelPath,
  $athenaShellPath,
  $athenaModelPath
))
$navigationTypesText = Get-Content -Raw $navigationTypesPath
$checkpointText = Get-Content -Raw $checkpointPath
$allSmokeText = Get-Content -Raw $allSmokePath

$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$videoNormalized = Normalize-Whitespace $videoSource
$typedModelNormalized = Normalize-Whitespace $executionModuleSource
$checkpointNormalized = Normalize-Whitespace $checkpointText
$allSmokeNormalized = Normalize-Whitespace $allSmokeText
$athenaPanelText = Get-Content -Raw $athenaPanelPath

foreach ($needle in @(
  "5962-5993",
  "5993",
  "Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution MVP"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal provider adapter dry-run admission review",
  "Provider adapter dry-run admission acceptance posture",
  "Backend-owned minimal manual-gated provider adapter dry-run execution MVP",
  "Provider adapter dry-run execution input",
  "Provider adapter dry-run execution plan",
  "Provider adapter dry-run execution output",
  "Provider adapter dry-run execution envelope",
  "Provider adapter dry-run fixture response",
  "Provider adapter dry-run blocked live execution summary",
  "Provider adapter dry-run execution gates",
  "Provider adapter dry-run execution readiness matrix",
  "Provider adapter dry-run execution evidence preview",
  "Athena can preview the backend-owned minimal manual-gated provider adapter dry-run execution MVP",
  "provider adapter dry-run execution is backend-only",
  "server-only provider dry-run execution helper exists",
  "provider dry-run execution is deterministic fixture-only",
  "dry-run fixture response is produced in memory only",
  "live provider execution is blocked",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "provider adapter dry-run execution is not live provider execution",
  "no frontend request is created",
  "no API route is created",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "no live provider execution",
  "provider adapter dry-run execution review and recovery preview comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now preview the backend-owned minimal manual-gated provider adapter dry-run execution MVP",
  "provider adapter dry-run execution is backend-only",
  "server-only provider dry-run execution helper exists",
  "provider dry-run execution is deterministic fixture-only",
  "dry-run fixture response is produced in memory only",
  "live provider execution is blocked",
  "credential reference is opaque label only",
  "credential value is not read",
  "env vars are not read",
  "provider adapter dry-run execution review and recovery preview comes next"
)) {
  Assert-Contains $homeNormalized $needle "home contains $needle"
}

foreach ($needle in @(
  "Video generation control",
  "Prompt / concept",
  "Output preview",
  "Generate video - locked"
)) {
  Assert-Contains $videoNormalized $needle "/jarvis-video still contains $needle"
}

foreach ($needle in @(
  "Backend-owned minimal manual-gated provider adapter dry-run execution MVP",
  "Provider adapter dry-run execution input",
  "Provider adapter dry-run execution plan",
  "Provider adapter dry-run execution output",
  "Provider adapter dry-run execution envelope",
  "Provider adapter dry-run fixture response",
  "Provider adapter dry-run blocked live execution summary",
  "Provider adapter dry-run execution gates",
  "Provider adapter dry-run execution readiness matrix",
  "server-only provider dry-run execution helper exists",
  "provider dry-run execution is deterministic fixture-only",
  "credential reference is opaque label only",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "live provider execution is blocked",
  "no model calls",
  "no prompt sending",
  "no provider SDK import",
  "no live provider execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database writes",
  "no file writes"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-mvp-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"
Assert-Contains $checkpointNormalized "Highest detected phase: 5993" "checkpoint current doc reports Highest detected phase: 5993"
Assert-Contains $checkpointNormalized "Latest completed batch: 5962-5993 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution MVP" "checkpoint current doc reports latest completed batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5994-6025 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution Review and Recovery Preview" "checkpoint current doc reports next likely batch"

Assert-NotMatches $frontEndSource '(?s)import.{0,200}(openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "fetch\s*\(|axios\.|XMLHttpRequest|navigator\.sendBeacon|new\s+Request\s*\(" "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "localStorage\.(getItem|setItem|removeItem|clear)|sessionStorage\.(getItem|setItem|removeItem|clear)|indexedDB(\.open|\s*\()|document\.cookie|cookies\s*\(" "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource "child_process|execSync|spawn\s*\(|Start-Process|cmd\.exe|powershell\.exe|shelljs|Deno\.Command|Bun\.spawn" "no command/process/shell execution from app code"
Assert-Contains $navigationTypesText "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesText "CodexForgeNavigationRouteHref\s*=\s*string" "no route href loosening to string"
Assert-Contains $navigationTypesText "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesText "commandDeckRole\s*:\s*string" "no commandDeckRole loosening to string"
Assert-NotMatches $executionModuleSource "process\.env\." "no env var reads in provider dry-run execution module"
Assert-NotMatches $executionModuleSource "\bproviderKey\b(?!State)" "no provider key reads in provider dry-run execution module"
Assert-NotMatches $executionModuleSource "\bcredentialValue\b(?!State|Posture)" "no credential value reads in provider dry-run execution module"
Assert-Contains $athenaPanelText "provider-dry-run-execution-summary" "Athena execution summary list uses scoped key context"
Assert-Contains $athenaPanelText "provider-dry-run-execution-gates" "Athena execution gates list uses scoped key context"
Assert-Contains $athenaPanelText "provider-dry-run-execution-readiness" "Athena execution readiness list uses scoped key context"
Assert-NotMatches $athenaPanelText 'key=\{record\.providerSlotId\}' "Athena provider dry-run execution rendering does not use raw provider ids as keys"
Assert-NotMatches $athenaPanelText 'key=\{record\.credentialReferenceId\}' "Athena provider dry-run execution rendering does not use raw credential ids as keys"
Assert-NotMatches $athenaPanelText 'key=\{record\.providerDryRunExecutionId\}' "Athena provider dry-run execution rendering does not use raw execution ids as keys"

$validation = Invoke-ProviderDryRunExecutionValidation $root

if ([int]$validation.mvpCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run execution MVP records, found $($validation.mvpCount)" }
if ([int]$validation.inputCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run execution inputs, found $($validation.inputCount)" }
if ([int]$validation.planCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run execution plans, found $($validation.planCount)" }
if ([int]$validation.outputCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run execution outputs, found $($validation.outputCount)" }
if ([int]$validation.envelopeCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run execution envelopes, found $($validation.envelopeCount)" }
if ([int]$validation.fixtureResponseCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run fixture responses, found $($validation.fixtureResponseCount)" }
if ([int]$validation.blockedSummaryCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run blocked live execution summaries, found $($validation.blockedSummaryCount)" }
if ([int]$validation.evidenceCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run evidence previews, found $($validation.evidenceCount)" }
if ([int]$validation.auditCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run audit previews, found $($validation.auditCount)" }
if ([int]$validation.approvalCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run approval previews, found $($validation.approvalCount)" }
if ([int]$validation.gateCount -lt 100) { throw "[FAIL] Expected at least 100 provider dry-run execution gate records, found $($validation.gateCount)" }
if ([int]$validation.readinessCount -lt 56) { throw "[FAIL] Expected at least 56 provider dry-run execution readiness records, found $($validation.readinessCount)" }
if ([int]$validation.requestCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run request records, found $($validation.requestCount)" }
if ([int]$validation.responseCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run response records, found $($validation.responseCount)" }
if ([int]$validation.errorCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run error records, found $($validation.errorCount)" }

Assert-Equal ([string]$validation.highestDetectedPhase) "5993" "validated highest detected phase"
Assert-Equal ([string]$validation.latestCompletedBatch) "5962-5993 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution MVP" "validated latest completed batch"
Assert-Equal ([string]$validation.previousCompletedBatch) "5930-5961 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission Review and Recovery Preview" "validated previous completed batch"
Assert-Equal ([string]$validation.nextLikelyBatch) "5994-6025 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution Review and Recovery Preview" "validated next likely batch"
Assert-Equal ([string]$validation.currentReadiness) "minimal-provider-dry-run-execution-mvp-only / backend-only / dry-run-fixture-only / credential-reference-only / not-live-provider-executing / not persistent" "validated current readiness"
Assert-Equal ([string]$validation.stableKey) "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-mvp:text-chat-provider-dry-run-execution" "validated stable key"
Assert-Equal ([string]$validation.helperExecutionState) "executed-provider-dry-run-fixture-in-memory-only" "validated helper execution state"
Assert-Equal ([string]$validation.helperCredentialValueState) "not present / not read" "validated helper credential value state"
Assert-Equal ([string]$validation.helperEnvVarState) "not read" "validated helper env var state"
Assert-Equal ([string]$validation.helperProviderKeyState) "not read" "validated helper provider key state"
Assert-Equal ([string]$validation.helperProviderSdkImportState) "not imported" "validated helper provider SDK import state"
Assert-Equal ([string]$validation.helperLiveProviderExecutionState) "blocked" "validated helper live provider execution state"
Assert-Equal ([string]$validation.helperProviderResponseState) "not received from provider" "validated helper provider response state"
Assert-Equal ([string]$validation.helperModelOutputState) "not generated by provider/model" "validated helper model output state"
Assert-Equal ([string]$validation.helperPersistenceState) "not implemented" "validated helper persistence state"
Assert-Equal ([string]$validation.helperNoFrontendRequestStatement) "no frontend request is created" "validated helper no frontend request statement"
Assert-Equal ([string]$validation.helperNoApiRouteStatement) "no API route is created" "validated helper no API route statement"
Assert-Equal ([string]$validation.helperNoProviderCallStatement) "no provider call exists" "validated helper no provider call statement"
Assert-Equal ([string]$validation.helperNoModelCallStatement) "no model call exists" "validated helper no model call statement"
Assert-Equal ([string]$validation.helperNoRealApprovalRequestStatement) "no real approval request exists" "validated helper no real approval request statement"
Assert-Equal ([string]$validation.helperNoRealApprovalRecordingStatement) "no real approval recording exists" "validated helper no real approval recording statement"
Assert-Equal ([string]$validation.helperNoApprovalTokenStatement) "no approval token exists" "validated helper no approval token statement"
Assert-Equal ([string]$validation.helperNoApprovalLeaseStatement) "no approval lease exists" "validated helper no approval lease statement"

Write-Host "[PASS] Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution MVP smoke completed"
