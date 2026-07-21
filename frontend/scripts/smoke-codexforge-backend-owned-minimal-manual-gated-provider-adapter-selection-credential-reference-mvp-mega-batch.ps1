param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
$root = Split-Path -Parent $scriptRoot
$parentRoot = Resolve-Path (Join-Path $root "..")
if (Test-Path (Join-Path $parentRoot "README.md")) {
  $repoRoot = $parentRoot
} else {
  $repoRoot = Resolve-Path $root
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

function Invoke-ProviderSelectionValidation {
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

const providerSelectionModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-provider-select",
  "index.ts"
));

const requiredExports = [
  "buildStableProviderSelectionCredentialReferenceMvpKey",
  "listMinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecords",
  "listProviderAdapterSelectionInputs",
  "listProviderAdapterSelectionAdmissionChecks",
  "listProviderSlotMatrixRecords",
  "listProviderAdapterSelectionOutputs",
  "listOpaqueCredentialReferenceInputs",
  "listOpaqueCredentialReferenceOutputs",
  "listProviderAdapterSelectionEnvelopes",
  "listProviderAdapterSelectionEvidencePreviews",
  "listProviderAdapterSelectionApprovalPreviews",
  "listProviderAdapterSelectionGates",
  "listProviderAdapterSelectionReadinessMatrixRecords",
  "buildProviderAdapterSelectionSummary",
  "buildProviderAdapterSelectionGateSummary",
  "buildProviderAdapterSelectionReadinessSummary",
  "buildNextProviderSelectionCredentialReferenceReviewRecoveryChecklist",
  "selectMinimalManualGatedProviderAdapterAndCredentialReferenceMvp",
  "runMinimalManualGatedProviderSelectionCredentialReferenceMvpForStaticFixture"
];

for (const exportName of requiredExports) {
  if (typeof providerSelectionModule[exportName] !== "function") {
    throw new Error(`Missing ${exportName} export.`);
  }
}

const mvpRecordsA = providerSelectionModule.listMinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecords();
const mvpRecordsB = providerSelectionModule.listMinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecords();
if (JSON.stringify(mvpRecordsA) !== JSON.stringify(mvpRecordsB)) {
  throw new Error("Provider adapter selection MVP records are not deterministic.");
}

const inputs = providerSelectionModule.listProviderAdapterSelectionInputs();
const admissions = providerSelectionModule.listProviderAdapterSelectionAdmissionChecks();
const slotMatrices = providerSelectionModule.listProviderSlotMatrixRecords();
const outputs = providerSelectionModule.listProviderAdapterSelectionOutputs();
const opaqueInputs = providerSelectionModule.listOpaqueCredentialReferenceInputs();
const opaqueOutputs = providerSelectionModule.listOpaqueCredentialReferenceOutputs();
const envelopes = providerSelectionModule.listProviderAdapterSelectionEnvelopes();
const evidencePreviews = providerSelectionModule.listProviderAdapterSelectionEvidencePreviews();
const approvalPreviews = providerSelectionModule.listProviderAdapterSelectionApprovalPreviews();
const gates = providerSelectionModule.listProviderAdapterSelectionGates();
const readiness = providerSelectionModule.listProviderAdapterSelectionReadinessMatrixRecords();
const summary = providerSelectionModule.buildProviderAdapterSelectionSummary();
const gateSummary = providerSelectionModule.buildProviderAdapterSelectionGateSummary();
const readinessSummary = providerSelectionModule.buildProviderAdapterSelectionReadinessSummary();
const checklist = providerSelectionModule.buildNextProviderSelectionCredentialReferenceReviewRecoveryChecklist();
const helperA = providerSelectionModule.runMinimalManualGatedProviderSelectionCredentialReferenceMvpForStaticFixture();
const helperB = providerSelectionModule.runMinimalManualGatedProviderSelectionCredentialReferenceMvpForStaticFixture();
const helperFromInput = providerSelectionModule.selectMinimalManualGatedProviderAdapterAndCredentialReferenceMvp(inputs[0]);

if (JSON.stringify(helperA) !== JSON.stringify(helperB)) {
  throw new Error("Provider adapter selection helper output is not deterministic.");
}
if (JSON.stringify(helperA) !== JSON.stringify(helperFromInput)) {
  throw new Error("Provider adapter selection helper input and fixture outputs diverge.");
}

process.stdout.write(JSON.stringify({
  mvpCount: mvpRecordsA.length,
  inputCount: inputs.length,
  admissionCount: admissions.length,
  slotMatrixCount: slotMatrices.length,
  outputCount: outputs.length,
  opaqueInputCount: opaqueInputs.length,
  opaqueOutputCount: opaqueOutputs.length,
  envelopeCount: envelopes.length,
  evidenceCount: evidencePreviews.length,
  approvalCount: approvalPreviews.length,
  gateCount: gates.length,
  readinessCount: readiness.length,
  checklistCount: checklist.length,
  highestDetectedPhase: String(summary.highestDetectedPhase),
  latestCompletedBatch: summary.latestCompletedBatch,
  previousCompletedBatch: summary.previousCompletedBatch,
  nextLikelyBatch: summary.nextLikelyBatch,
  currentReadiness: summary.currentReadiness,
  gateSummaryCount: String(gateSummary.gateCount),
  readinessSummaryCount: String(readinessSummary.readinessCount),
  stableKey: providerSelectionModule.buildStableProviderSelectionCredentialReferenceMvpKey("text-chat-provider-selection"),
  helperSelectionState: helperA.selectionState,
  helperProviderSelectionId: helperA.providerSelectionId,
  helperProviderSlotId: helperA.providerSlotId,
  helperCredentialReferenceId: helperA.credentialReferenceId,
  helperSelectionDigest: helperA.selectionDigest,
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
  helperNoModelCallStatement: helperA.noModelCallStatement
}));
'@

  $json = $nodeScript | node - $RepoRootPath
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Unable to execute provider adapter selection validation."
  }

  return $json | ConvertFrom-Json
}

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference MVP Mega Batch smoke ==="

$jarvisPagePath = Join-Path $root "src\app\jarvis\page.tsx"
$jarvisPageClientPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$athenaPagePath = Join-Path $root "src\app\athena\page.tsx"
$homePagePath = Join-Path $root "src\app\page.tsx"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$providersPagePath = Join-Path $root "src\app\ai-providers\page.tsx"
$providersPageClientPath = Join-Path $root "src\app\ai-providers\page-client.tsx"
$videoPagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$videoPageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$videoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$homeShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$providerTypesPath = Join-Path $root "src\lib\codexforge\min-provider-select\min-provider-select-types.ts"
$providerCatalogPath = Join-Path $root "src\lib\codexforge\min-provider-select\min-provider-select-catalog.ts"
$providerHelperPath = Join-Path $root "src\lib\codexforge\min-provider-select\min-provider-select-helper.server.ts"
$providerIndexPath = Join-Path $root "src\lib\codexforge\min-provider-select\index.ts"
$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$checkpointCurrentPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$runbookPath = Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md"

$requiredPaths = @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $homePagePath,
  $homePageClientPath,
  $providersPagePath,
  $providersPageClientPath,
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath,
  $athenaPanelPath,
  $homeShellPath,
  $athenaModelPath,
  $navigationTypesPath,
  $providerTypesPath,
  $providerCatalogPath,
  $providerHelperPath,
  $providerIndexPath,
  $allSmokePath,
  $checkpointCurrentPath,
  $runbookPath
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
$providersSource = Get-CombinedFileText @(
  $providersPagePath,
  $providersPageClientPath
)
$videoSource = Get-CombinedFileText @(
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath
)
$typedModelSource = Get-CombinedFileText @(
  $providerTypesPath,
  $providerCatalogPath,
  $providerHelperPath,
  $providerIndexPath,
  $athenaModelPath,
  $athenaPanelPath
)
$providerModuleSource = Get-CombinedFileText @(
  $providerTypesPath,
  $providerCatalogPath,
  $providerHelperPath,
  $providerIndexPath
)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$runbookSource = Get-Content -Raw $runbookPath
$navigationTypesText = Get-Content -Raw $navigationTypesPath
$athenaPanelText = Get-Content -Raw $athenaPanelPath

$frontEndSourceFiles = Get-SourceFiles @(
  (Join-Path $root "src\app\athena"),
  (Join-Path $root "src\app\jarvis"),
  (Join-Path $root "src\app\jarvis-video"),
  (Join-Path $root "src\app\ai-providers"),
  (Join-Path $root "src\app\page.tsx"),
  (Join-Path $root "src\app\page-client.tsx"),
  (Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map"),
  (Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map"),
  (Join-Path $root "src\lib\codexforge\navigation-shell")
)
$frontEndSource = Get-CombinedSourceText $frontEndSourceFiles

$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$providersNormalized = Normalize-Whitespace $providersSource
$videoNormalized = Normalize-Whitespace $videoSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$providerModuleNormalized = Normalize-Whitespace $providerModuleSource
$allSmokeNormalized = Normalize-Whitespace $allSmokeSource
$checkpointNormalized = Normalize-Whitespace $checkpointCurrentSource

foreach ($needle in @(
  "5834-5865 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference MVP",
  "5865",
  "Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference MVP"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $checkpointNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal text adapter audit and approval join review",
  "Text adapter audit and approval join acceptance posture",
  "Backend-owned minimal manual-gated provider adapter selection and credential reference MVP",
  "Provider adapter selection input",
  "Provider slot matrix",
  "Opaque credential reference",
  "Provider adapter selection output",
  "Provider adapter selection envelope",
  "Provider adapter selection gates",
  "Provider adapter selection readiness matrix",
  "Provider adapter selection evidence preview",
  "Athena can review the backend-owned minimal manual-gated provider adapter selection and credential reference MVP",
  "provider adapter selection review is preview-only",
  "provider adapter selection is backend-only",
  "server-only provider selection helper exists",
  "provider slot selection is deterministic fixture-only",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "provider adapter selection is not provider-capable yet",
  "no frontend request is created",
  "no API route is created",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "no provider execution",
  "provider adapter dry-run admission MVP comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now review the backend-owned minimal manual-gated provider adapter selection and credential reference MVP",
  "provider adapter selection review is preview-only",
  "provider adapter selection is backend-only",
  "server-only provider selection helper exists",
  "credential reference is opaque label only",
  "credential value is not read",
  "env vars are not read",
  "provider adapter dry-run admission MVP comes next"
)) {
  Assert-Contains $homeNormalized $needle "home contains $needle"
}

foreach ($needle in @(
  "Backend-owned minimal manual-gated provider adapter selection and credential reference MVP",
  "Provider adapter selection input",
  "Provider slot matrix",
  "Opaque credential reference",
  "Provider adapter selection output",
  "Provider adapter selection gates",
  "Provider adapter selection readiness matrix",
  "provider adapter selection is backend-only",
  "provider adapter selection review is preview-only",
  "credential reference is opaque label only",
  "credential value is not read",
  "env vars are not read",
  "no provider execution",
  "no model calls",
  "no persistence",
  "provider adapter dry-run admission MVP comes next"
)) {
  Assert-Contains $providersNormalized $needle "/ai-providers contains $needle"
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
  "backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-mvp-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-selection-input-v1",
  "backend-owned-minimal-manual-gated-provider-slot-matrix-v1",
  "backend-owned-minimal-manual-gated-opaque-credential-reference-input-v1",
  "backend-owned-minimal-manual-gated-opaque-credential-reference-output-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-selection-output-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-selection-gate-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-selection-readiness-matrix-v1",
  "Backend-owned minimal manual-gated provider adapter selection and credential reference MVP",
  "Provider adapter selection input",
  "Provider slot matrix",
  "Opaque credential reference",
  "Provider adapter selection output",
  "Provider adapter selection gates",
  "Provider adapter selection readiness matrix",
  "server-only provider selection helper exists",
  "provider slot selection is deterministic fixture-only",
  "credential reference is opaque label only",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
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
  "selectMinimalManualGatedProviderAdapterAndCredentialReferenceMvp",
  "runMinimalManualGatedProviderSelectionCredentialReferenceMvpForStaticFixture",
  "selected-provider-slot-and-opaque-credential-reference-fixture-only",
  "provider slot selection is deterministic fixture-only",
  "credential reference is opaque label only"
)) {
  Assert-Contains $providerModuleNormalized $needle "server-only provider selection helper marker contains $needle"
}

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-mvp-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"
Assert-Contains $checkpointNormalized "Highest detected phase: 5865" "checkpoint current doc reports Highest detected phase: 5865"
Assert-Contains $checkpointNormalized "Latest completed batch: 5834-5865 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference MVP" "checkpoint current doc reports latest completed batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5866-5897 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference Review and Recovery Preview" "checkpoint current doc reports next likely batch"

Assert-NotMatches $frontEndSource '(?s)import.{0,200}(openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "fetch\s*\(|axios\.|XMLHttpRequest|navigator\.sendBeacon|new\s+Request\s*\(" "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "localStorage\.(getItem|setItem|removeItem|clear)|sessionStorage\.(getItem|setItem|removeItem|clear)|indexedDB(\.open|\s*\()|document\.cookie|cookies\s*\(" "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource "child_process|execSync|spawn\s*\(|Start-Process|cmd\.exe|powershell\.exe|shelljs|Deno\.Command|Bun\.spawn" "no command/process/shell execution from app code"
Assert-Contains $navigationTypesText "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesText "CodexForgeNavigationRouteHref\s*=\s*string" "no route href loosening to string"
Assert-Contains $navigationTypesText "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesText "commandDeckRole\s*:\s*string" "no commandDeckRole loosening to string"

foreach ($source in @($providerModuleSource, $providerHelperPath)) {
  if ($source -is [string]) {
    $sourceText = $source
  } else {
    $sourceText = Get-Content -Raw $source
  }
  Assert-NotMatches $sourceText "Math\.random|Date\.now|crypto\.randomUUID" "provider selection module excludes nondeterministic generators"
  Assert-NotMatches $sourceText "fetch\s*\(|XMLHttpRequest|axios\.|navigator\.sendBeacon" "provider selection module excludes network calls"
  Assert-NotMatches $sourceText "process\.env\." "provider selection module excludes env var reads"
  Assert-NotMatches $sourceText "localStorage|sessionStorage|indexedDB|document\.cookie" "provider selection module excludes browser storage"
}

Assert-Contains $athenaPanelText "provider-selection-slot" "Athena provider slot list uses scoped key context"
Assert-Contains $athenaPanelText "provider-selection-gate" "Athena provider gate list uses scoped key context"
Assert-Contains $athenaPanelText "provider-selection-readiness" "Athena provider readiness list uses scoped key context"
Assert-Contains $athenaPanelText "buildScopedItemKey(" "Athena panel uses scoped keys"
Assert-NotMatches $athenaPanelText 'key=\{slot\.slotId\}' "Athena provider slot list does not use raw provider slot id keys"
Assert-NotMatches $athenaPanelText 'key=\{slot\.slotLabel\}' "Athena provider slot list does not use raw provider slot label keys"
Assert-NotMatches $athenaPanelText 'key=\{[^}]*credentialReferenceId[^}]*\}' "Athena provider selection lists do not use raw credential reference ids as keys"

$validation = Invoke-ProviderSelectionValidation $root

if ([int]$validation.mvpCount -lt 2) {
  throw "[FAIL] Expected at least 2 provider selection MVP records, found $($validation.mvpCount)"
}
Write-Host "[PASS] provider selection MVP record count is $($validation.mvpCount)"

if ([int]$validation.inputCount -lt 2) {
  throw "[FAIL] Expected at least 2 provider selection input records, found $($validation.inputCount)"
}
Write-Host "[PASS] provider selection input record count is $($validation.inputCount)"

if ([int]$validation.admissionCount -lt 2) {
  throw "[FAIL] Expected at least 2 provider selection admission check records, found $($validation.admissionCount)"
}
Write-Host "[PASS] provider selection admission check count is $($validation.admissionCount)"

if ([int]$validation.slotMatrixCount -lt 2) {
  throw "[FAIL] Expected at least 2 provider slot matrix records, found $($validation.slotMatrixCount)"
}
Write-Host "[PASS] provider slot matrix count is $($validation.slotMatrixCount)"

if ([int]$validation.outputCount -lt 2) {
  throw "[FAIL] Expected at least 2 provider selection output records, found $($validation.outputCount)"
}
Write-Host "[PASS] provider selection output record count is $($validation.outputCount)"

if ([int]$validation.opaqueInputCount -lt 2) {
  throw "[FAIL] Expected at least 2 opaque credential reference input records, found $($validation.opaqueInputCount)"
}
Write-Host "[PASS] opaque credential reference input count is $($validation.opaqueInputCount)"

if ([int]$validation.opaqueOutputCount -lt 2) {
  throw "[FAIL] Expected at least 2 opaque credential reference output records, found $($validation.opaqueOutputCount)"
}
Write-Host "[PASS] opaque credential reference output count is $($validation.opaqueOutputCount)"

if ([int]$validation.envelopeCount -lt 2) {
  throw "[FAIL] Expected at least 2 provider selection envelope records, found $($validation.envelopeCount)"
}
Write-Host "[PASS] provider selection envelope count is $($validation.envelopeCount)"

if ([int]$validation.evidenceCount -lt 2) {
  throw "[FAIL] Expected at least 2 provider selection evidence previews, found $($validation.evidenceCount)"
}
Write-Host "[PASS] provider selection evidence preview count is $($validation.evidenceCount)"

if ([int]$validation.approvalCount -lt 2) {
  throw "[FAIL] Expected at least 2 provider selection approval previews, found $($validation.approvalCount)"
}
Write-Host "[PASS] provider selection approval preview count is $($validation.approvalCount)"

if ([int]$validation.gateCount -lt 40) {
  throw "[FAIL] Expected at least 40 provider selection gate records, found $($validation.gateCount)"
}
Write-Host "[PASS] provider selection gate count is $($validation.gateCount)"

if ([int]$validation.readinessCount -lt 20) {
  throw "[FAIL] Expected at least 20 provider selection readiness records, found $($validation.readinessCount)"
}
Write-Host "[PASS] provider selection readiness record count is $($validation.readinessCount)"

if ([int]$validation.checklistCount -lt 4) {
  throw "[FAIL] Expected at least 4 provider selection review and recovery checklist items, found $($validation.checklistCount)"
}
Write-Host "[PASS] provider selection review and recovery checklist count is $($validation.checklistCount)"

Assert-Equal ([string]$validation.highestDetectedPhase) "5865" "validated highest detected phase"
Assert-Equal ([string]$validation.latestCompletedBatch) "5834-5865 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference MVP" "validated latest completed batch"
Assert-Equal ([string]$validation.previousCompletedBatch) "5802-5833 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join Review and Recovery Preview" "validated previous completed batch"
Assert-Equal ([string]$validation.nextLikelyBatch) "5866-5897 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference Review and Recovery Preview" "validated next likely batch"
Assert-Equal ([string]$validation.currentReadiness) "minimal-provider-selection-credential-reference-mvp-only / backend-only / credential-reference-only / fixture-only / not provider-capable / not persistent" "validated current readiness"
Assert-Equal ([string]$validation.stableKey) "backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-mvp:text-chat-provider-selection" "validated stable provider selection key"
Assert-Equal ([string]$validation.helperSelectionState) "selected-provider-slot-and-opaque-credential-reference-fixture-only" "validated helper selection state"
Assert-Equal ([string]$validation.helperProviderSelectionId) "provider-selection-preview:text-chat-provider-selection" "validated helper provider selection id"
Assert-Equal ([string]$validation.helperProviderSlotId) "provider-slot-preview:text-chat-provider-selection:primary" "validated helper provider slot id"
Assert-Equal ([string]$validation.helperCredentialReferenceId) "credential-reference-preview:text-chat-provider-selection" "validated helper credential reference id"
Assert-Equal ([string]$validation.helperSelectionDigest) "provider-selection-digest-preview:text-chat-provider-selection:fixture-only" "validated helper selection digest"
Assert-Equal ([string]$validation.helperProviderSlotLabel) "OpenAI-compatible text provider slot" "validated helper provider slot label"
Assert-Equal ([string]$validation.helperBackupProviderSlotLabel) "Anthropic-compatible text provider slot" "validated helper backup provider slot label"
Assert-Equal ([string]$validation.helperOpaqueCredentialReferenceLabel) "opaque credential reference label / athena text chat primary" "validated helper opaque credential reference label"
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
Assert-Equal ([string]$validation.helperNoApiRouteStatement) "no API route is created" "validated helper no API route statement"
Assert-Equal ([string]$validation.helperNoProviderCallStatement) "no provider call exists" "validated helper no provider call statement"
Assert-Equal ([string]$validation.helperNoModelCallStatement) "no model call exists" "validated helper no model call statement"

Write-Host "[PASS] Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference MVP smoke completed"
