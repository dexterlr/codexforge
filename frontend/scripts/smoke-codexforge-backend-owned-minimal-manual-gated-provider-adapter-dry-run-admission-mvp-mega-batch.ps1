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

function Invoke-ProviderDryRunAdmissionValidation {
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

const admissionModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-provider-admit",
  "index.ts"
));

const requiredExports = [
  "buildStableProviderDryRunAdmissionMvpKey",
  "listMinimalManualGatedProviderAdapterDryRunAdmissionMvpRecords",
  "listProviderDryRunAdmissionInputs",
  "listProviderDryRunAdmissionChecks",
  "listProviderDryRunAdmissionOutputs",
  "listProviderDryRunAdmissionEnvelopes",
  "listProviderDryRunIntentPreviews",
  "listProviderDryRunBlockedExecutionSummaries",
  "listProviderDryRunAdmissionGates",
  "listProviderDryRunAdmissionReadinessMatrixRecords",
  "runMinimalManualGatedProviderAdapterDryRunAdmissionMvpForStaticFixture",
  "buildProviderDryRunAdmissionSummary",
  "buildProviderDryRunAdmissionGateSummary",
  "buildProviderDryRunAdmissionReadinessSummary",
  "buildNextProviderDryRunAdmissionReviewRecoveryChecklist",
  "admitMinimalManualGatedProviderAdapterDryRunMvp"
];

for (const exportName of requiredExports) {
  if (typeof admissionModule[exportName] !== "function") {
    throw new Error(`Missing ${exportName} export.`);
  }
}

const mvpRecordsA = admissionModule.listMinimalManualGatedProviderAdapterDryRunAdmissionMvpRecords();
const mvpRecordsB = admissionModule.listMinimalManualGatedProviderAdapterDryRunAdmissionMvpRecords();
if (JSON.stringify(mvpRecordsA) !== JSON.stringify(mvpRecordsB)) {
  throw new Error("Provider dry-run admission MVP records are not deterministic.");
}

const inputs = admissionModule.listProviderDryRunAdmissionInputs();
const checks = admissionModule.listProviderDryRunAdmissionChecks();
const outputs = admissionModule.listProviderDryRunAdmissionOutputs();
const envelopes = admissionModule.listProviderDryRunAdmissionEnvelopes();
const intentPreviews = admissionModule.listProviderDryRunIntentPreviews();
const blockedExecution = admissionModule.listProviderDryRunBlockedExecutionSummaries();
const evidencePreviews = admissionModule.listProviderDryRunEvidencePreviews();
const auditPreviews = admissionModule.listProviderDryRunAuditPreviews();
const approvalPreviews = admissionModule.listProviderDryRunApprovalPreviews();
const gates = admissionModule.listProviderDryRunAdmissionGates();
const readiness = admissionModule.listProviderDryRunAdmissionReadinessMatrixRecords();
const requests = admissionModule.listProviderDryRunAdmissionRequestRecords();
const responses = admissionModule.listProviderDryRunAdmissionResponseRecords();
const errors = admissionModule.listProviderDryRunAdmissionErrorRecords();
const summary = admissionModule.buildProviderDryRunAdmissionSummary();
const gateSummary = admissionModule.buildProviderDryRunAdmissionGateSummary();
const readinessSummary = admissionModule.buildProviderDryRunAdmissionReadinessSummary();
const checklist = admissionModule.buildNextProviderDryRunAdmissionReviewRecoveryChecklist();
const helperA = admissionModule.runMinimalManualGatedProviderAdapterDryRunAdmissionMvpForStaticFixture();
const helperB = admissionModule.runMinimalManualGatedProviderAdapterDryRunAdmissionMvpForStaticFixture();
const helperFromInput = admissionModule.admitMinimalManualGatedProviderAdapterDryRunMvp(inputs[0]);
const blockedHelper = admissionModule.admitMinimalManualGatedProviderAdapterDryRunMvp(inputs[1]);

if (JSON.stringify(helperA) !== JSON.stringify(helperB)) {
  throw new Error("Provider dry-run admission helper output is not deterministic.");
}
if (JSON.stringify(helperA) !== JSON.stringify(helperFromInput)) {
  throw new Error("Provider dry-run admission helper input and fixture outputs diverge.");
}

process.stdout.write(JSON.stringify({
  mvpCount: mvpRecordsA.length,
  inputCount: inputs.length,
  checkCount: checks.length,
  outputCount: outputs.length,
  envelopeCount: envelopes.length,
  intentCount: intentPreviews.length,
  blockedExecutionCount: blockedExecution.length,
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
  gateSummaryCount: String(gateSummary.gateCount),
  readinessSummaryCount: String(readinessSummary.readinessCount),
  stableKey: admissionModule.buildStableProviderDryRunAdmissionMvpKey("text-chat-provider-dry-run-admission"),
  helperAdmissionState: helperA.admissionState,
  helperAdmissionId: helperA.providerDryRunAdmissionId,
  helperProviderSlotId: helperA.providerSlotId,
  helperCredentialReferenceId: helperA.credentialReferenceId,
  helperAdmissionDigest: helperA.admissionDigest,
  helperProviderSlotLabel: helperA.providerSlotLabel,
  helperBackupProviderSlotLabel: helperA.backupProviderSlotLabel,
  helperOpaqueCredentialReferenceLabel: helperA.opaqueCredentialReferenceLabel,
  helperCredentialValueState: helperA.credentialValueState,
  helperEnvVarState: helperA.envVarState,
  helperProviderKeyState: helperA.providerKeyState,
  helperProviderSdkImportState: helperA.providerSdkImportState,
  helperProviderExecutionState: helperA.providerExecutionState,
  helperPromptTransmissionState: helperA.promptTransmissionState,
  helperProviderResponseState: helperA.providerResponseState,
  helperModelOutputState: helperA.modelOutputState,
  helperPersistenceState: helperA.persistenceState,
  helperNoFrontendRequestStatement: helperA.noFrontendRequestStatement,
  helperNoApiRouteStatement: helperA.noApiRouteStatement,
  helperNoProviderCallStatement: helperA.noProviderCallStatement,
  helperNoModelCallStatement: helperA.noModelCallStatement,
  helperNoRealApprovalRequestStatement: helperA.noRealApprovalRequestStatement,
  helperNoRealApprovalRecordingStatement: helperA.noRealApprovalRecordingStatement,
  helperNoApprovalTokenStatement: helperA.noApprovalTokenStatement,
  helperNoApprovalLeaseStatement: helperA.noApprovalLeaseStatement,
  blockedAdmissionState: blockedHelper.admissionState
}));
'@

  $json = $nodeScript | node - $RepoRootPath
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Unable to execute provider dry-run admission validation."
  }

  return $json | ConvertFrom-Json
}

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission MVP Mega Batch smoke ==="

$jarvisPagePath = Join-Path $root "src\app\jarvis\page.tsx"
$jarvisPageClientPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$athenaPagePath = Join-Path $root "src\app\athena\page.tsx"
$homePagePath = Join-Path $root "src\app\page.tsx"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$videoPagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$videoPageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$videoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$homeShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$admissionTypesPath = Join-Path $root "src\lib\codexforge\min-provider-admit\min-provider-admit-types.ts"
$admissionCatalogPath = Join-Path $root "src\lib\codexforge\min-provider-admit\min-provider-admit-catalog.ts"
$admissionHelperPath = Join-Path $root "src\lib\codexforge\min-provider-admit\min-provider-admit-helper.server.ts"
$admissionIndexPath = Join-Path $root "src\lib\codexforge\min-provider-admit\index.ts"
$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$checkpointCurrentPath = Join-Path $root "docs\codexforge-checkpoint-current.md"

$requiredPaths = @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $homePagePath,
  $homePageClientPath,
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath,
  $athenaPanelPath,
  $homeShellPath,
  $athenaModelPath,
  $navigationTypesPath,
  $admissionTypesPath,
  $admissionCatalogPath,
  $admissionHelperPath,
  $admissionIndexPath,
  $allSmokePath,
  $checkpointCurrentPath
)

foreach ($path in $requiredPaths) {
  Assert-FileExists $path
}

$jarvisSource = Get-CombinedFileText @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $athenaPanelPath,
  $homeShellPath,
  $athenaModelPath
)
$homeSource = Get-CombinedFileText @(
  $homePagePath,
  $homePageClientPath,
  $homeShellPath,
  $athenaModelPath
)
$videoSource = Get-CombinedFileText @(
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath
)
$typedModelSource = Get-CombinedFileText @(
  $admissionTypesPath,
  $admissionCatalogPath,
  $admissionHelperPath,
  $admissionIndexPath
)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$navigationTypesText = Get-Content -Raw $navigationTypesPath
$athenaPanelText = Get-Content -Raw $athenaPanelPath
$frontEndSource = Get-CombinedSourceText (Get-SourceFiles @(
  (Join-Path $root "src\app\athena"),
  (Join-Path $root "src\app\jarvis"),
  (Join-Path $root "src\app\jarvis-video"),
  (Join-Path $root "src\app\page.tsx"),
  (Join-Path $root "src\app\page-client.tsx"),
  (Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map"),
  (Join-Path $root "src\lib\codexforge\navigation-shell")
))

$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$videoNormalized = Normalize-Whitespace $videoSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$allSmokeNormalized = Normalize-Whitespace $allSmokeSource
$checkpointNormalized = Normalize-Whitespace $checkpointCurrentSource

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "5898-5929",
  "5929",
  "Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission MVP"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $checkpointNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal provider adapter selection and credential reference review",
  "Provider adapter selection acceptance posture",
  "Backend-owned minimal manual-gated provider adapter dry-run admission MVP",
  "Provider adapter dry-run admission input",
  "Provider adapter dry-run admission check",
  "Provider adapter dry-run admission output",
  "Provider adapter dry-run admission envelope",
  "Provider adapter dry-run intent preview",
  "Provider adapter dry-run blocked execution summary",
  "Provider adapter dry-run admission gates",
  "Provider adapter dry-run admission readiness matrix",
  "Provider adapter dry-run admission evidence preview",
  "Athena can preview the backend-owned minimal manual-gated provider adapter dry-run admission MVP",
  "provider adapter dry-run admission is backend-only",
  "server-only provider dry-run admission helper exists",
  "provider dry-run admission is deterministic fixture-only",
  "dry-run intent is preview-only",
  "dry-run execution is blocked",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "provider adapter dry-run admission is not provider-executing yet",
  "no frontend request is created",
  "no API route is created",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "no provider execution",
  "provider adapter dry-run admission review and recovery preview comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now preview the backend-owned minimal manual-gated provider adapter dry-run admission MVP",
  "provider adapter dry-run admission is backend-only",
  "server-only provider dry-run admission helper exists",
  "provider dry-run admission is deterministic fixture-only",
  "credential reference is opaque label only",
  "credential value is not read",
  "env vars are not read",
  "provider adapter dry-run admission review and recovery preview comes next"
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
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-mvp-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-input-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-check-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-output-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-envelope-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-intent-preview-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-blocked-execution-summary-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-gate-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-readiness-matrix-v1",
  "Backend-owned minimal manual-gated provider adapter dry-run admission MVP",
  "Provider adapter dry-run admission input",
  "Provider adapter dry-run admission check",
  "Provider adapter dry-run admission output",
  "Provider adapter dry-run admission envelope",
  "Provider adapter dry-run intent preview",
  "Provider adapter dry-run blocked execution summary",
  "Provider adapter dry-run admission gates",
  "Provider adapter dry-run admission readiness matrix",
  "provider dry-run admission is deterministic fixture-only",
  "credential reference is opaque label only",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "dry-run execution is blocked",
  "no model calls",
  "no prompt sending",
  "no provider SDK imports",
  "no provider execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database writes",
  "no file writes"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'import "server-only";',
  "admitMinimalManualGatedProviderAdapterDryRunMvp",
  "runMinimalManualGatedProviderAdapterDryRunAdmissionMvpForStaticFixture",
  "deterministic-fixture-only",
  "opaque credential reference label"
)) {
  Assert-Contains $typedModelNormalized $needle "server-only provider dry-run admission helper marker contains $needle"
}

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-mvp-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"
Assert-Contains $checkpointNormalized "Highest detected phase: 5929" "checkpoint current doc reports Highest detected phase: 5929"
Assert-Contains $checkpointNormalized "Latest completed batch: 5898-5929 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission MVP" "checkpoint current doc reports latest completed batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5930-5961 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission Review and Recovery Preview" "checkpoint current doc reports next likely batch"

Assert-NotMatches $frontEndSource '(?s)import.{0,200}(openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "fetch\s*\(|axios\.|XMLHttpRequest|navigator\.sendBeacon|new\s+Request\s*\(" "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "localStorage\.(getItem|setItem|removeItem|clear)|sessionStorage\.(getItem|setItem|removeItem|clear)|indexedDB(\.open|\s*\()|document\.cookie|cookies\s*\(" "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource "child_process|execSync|spawn\s*\(|Start-Process|cmd\.exe|powershell\.exe|shelljs|Deno\.Command|Bun\.spawn" "no command/process/shell execution from app code"
Assert-Contains $navigationTypesText "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesText "CodexForgeNavigationRouteHref\s*=\s*string" "no route href loosening to string"
Assert-Contains $navigationTypesText "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesText "commandDeckRole\s*:\s*string" "no commandDeckRole loosening to string"
Assert-NotMatches $typedModelSource "process\.env\." "no env var reads in provider dry-run admission module"
Assert-NotMatches $typedModelSource "\bproviderKey\b(?!State)" "no provider key reads in provider dry-run admission module"
Assert-NotMatches $typedModelSource "\bcredentialValue\b(?!State|Posture|DetectedExample)" "no credential value reads in provider dry-run admission module"
Assert-Contains $athenaPanelText "provider-dry-run-admission-gates" "Athena provider dry-run admission list uses scoped key context"
Assert-Contains $athenaPanelText "provider-dry-run-admission-readiness" "Athena provider dry-run readiness list uses scoped key context"
Assert-NotMatches $athenaPanelText 'key=\{record\.providerSlotId\}' "Athena provider dry-run admission rendering does not use raw provider ids as keys"
Assert-NotMatches $athenaPanelText 'key=\{record\.credentialReferenceId\}' "Athena provider dry-run admission rendering does not use raw credential ids as keys"

$validation = Invoke-ProviderDryRunAdmissionValidation $root

if ([int]$validation.mvpCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run admission MVP records, found $($validation.mvpCount)" }
if ([int]$validation.inputCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run admission inputs, found $($validation.inputCount)" }
if ([int]$validation.checkCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run admission checks, found $($validation.checkCount)" }
if ([int]$validation.outputCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run admission outputs, found $($validation.outputCount)" }
if ([int]$validation.envelopeCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run admission envelopes, found $($validation.envelopeCount)" }
if ([int]$validation.intentCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run intent previews, found $($validation.intentCount)" }
if ([int]$validation.blockedExecutionCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run blocked execution summaries, found $($validation.blockedExecutionCount)" }
if ([int]$validation.evidenceCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run evidence previews, found $($validation.evidenceCount)" }
if ([int]$validation.auditCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run audit previews, found $($validation.auditCount)" }
if ([int]$validation.approvalCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run approval previews, found $($validation.approvalCount)" }
if ([int]$validation.gateCount -lt 100) { throw "[FAIL] Expected at least 100 provider dry-run admission gate records, found $($validation.gateCount)" }
if ([int]$validation.readinessCount -lt 56) { throw "[FAIL] Expected at least 56 provider dry-run readiness records, found $($validation.readinessCount)" }
if ([int]$validation.requestCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run request records, found $($validation.requestCount)" }
if ([int]$validation.responseCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run response records, found $($validation.responseCount)" }
if ([int]$validation.errorCount -lt 2) { throw "[FAIL] Expected at least 2 provider dry-run error records, found $($validation.errorCount)" }

Assert-Equal ([string]$validation.highestDetectedPhase) "5929" "validated highest detected phase"
Assert-Equal ([string]$validation.latestCompletedBatch) "5898-5929 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission MVP" "validated latest completed batch"
Assert-Equal ([string]$validation.previousCompletedBatch) "5866-5897 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference Review and Recovery Preview" "validated previous completed batch"
Assert-Equal ([string]$validation.nextLikelyBatch) "5930-5961 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission Review and Recovery Preview" "validated next likely batch"
Assert-Equal ([string]$validation.currentReadiness) "minimal-provider-dry-run-admission-mvp-only / backend-only / admission-only / credential-reference-only / fixture-only / not-provider-executing / not persistent" "validated current readiness"
Assert-Equal ([string]$validation.stableKey) "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-mvp:text-chat-provider-dry-run-admission" "validated stable key"
Assert-Equal ([string]$validation.helperAdmissionState) "admitted-for-backend-dry-run-preview-only" "validated helper admission state"
Assert-Equal ([string]$validation.helperCredentialValueState) "not present / not read" "validated helper credential value state"
Assert-Equal ([string]$validation.helperEnvVarState) "not read" "validated helper env var state"
Assert-Equal ([string]$validation.helperProviderKeyState) "not read" "validated helper provider key state"
Assert-Equal ([string]$validation.helperProviderSdkImportState) "not imported" "validated helper provider SDK import state"
Assert-Equal ([string]$validation.helperProviderExecutionState) "blocked" "validated helper provider execution state"
Assert-Equal ([string]$validation.helperPromptTransmissionState) "not sent" "validated helper prompt transmission state"
Assert-Equal ([string]$validation.helperProviderResponseState) "not received" "validated helper provider response state"
Assert-Equal ([string]$validation.helperModelOutputState) "not generated" "validated helper model output state"
Assert-Equal ([string]$validation.helperPersistenceState) "not implemented" "validated helper persistence state"
Assert-Equal ([string]$validation.helperNoFrontendRequestStatement) "no frontend request is created" "validated helper no frontend request statement"
Assert-Equal ([string]$validation.helperNoApiRouteStatement) "no API route is created" "validated helper no api route statement"
Assert-Equal ([string]$validation.helperNoProviderCallStatement) "no provider call exists" "validated helper no provider call statement"
Assert-Equal ([string]$validation.helperNoModelCallStatement) "no model call exists" "validated helper no model call statement"
Assert-Equal ([string]$validation.helperNoRealApprovalRequestStatement) "no real approval request exists" "validated helper no real approval request statement"
Assert-Equal ([string]$validation.helperNoRealApprovalRecordingStatement) "no real approval recording exists" "validated helper no real approval recording statement"
Assert-Equal ([string]$validation.helperNoApprovalTokenStatement) "no approval token exists" "validated helper no approval token statement"
Assert-Equal ([string]$validation.helperNoApprovalLeaseStatement) "no approval lease exists" "validated helper no approval lease statement"
Assert-Equal ([string]$validation.blockedAdmissionState) "blocked-for-backend-dry-run-preview-only" "validated blocked fixture admission state"

Write-Host "[PASS] Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission MVP smoke completed"
