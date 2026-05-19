param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-DirectoryExists { param([string]$Path) if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" } Write-Host "[PASS] directory exists: $Path" }
function Assert-Contains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotContains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host ""
Write-Host "=== CodexForge Validation Runner smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\validation-runner"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\validation\page.tsx"
$clientPath = "src\app\validation\page-client.tsx"
$approvedDir = "src\lib\codexforge\approved-patch-apply"
$regressionDir = "src\lib\codexforge\regression-triage"
$stabilizationDir = "src\lib\codexforge\stabilization-command-center"
$productDir = "src\lib\codexforge\product-readiness-audit"
$consolidationDir = "src\lib\codexforge\consolidation"
$commandDir = "src\lib\codexforge\command-palette"
$missionDir = "src\lib\codexforge\mission-control"
$runRoutePath = "src\app\api\operator\run\route.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "validation-runner-types.ts",
  "validation-command-catalog.ts",
  "validation-run-request.ts",
  "validation-run-approval.ts",
  "validation-run-policy.ts",
  "validation-run-preflight.ts",
  "validation-execution-bridge.ts",
  "validation-output-capture.ts",
  "validation-result-router.ts",
  "validation-runner-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "ValidationRunnerPanel.tsx",
  "ValidationCommandCatalogPanel.tsx",
  "ValidationRunRequestPanel.tsx",
  "ValidationRunApprovalPanel.tsx",
  "ValidationRunPolicyPanel.tsx",
  "ValidationRunPreflightPanel.tsx",
  "ValidationExecutionBridgePanel.tsx",
  "ValidationOutputCapturePanel.tsx",
  "ValidationResultRouterPanel.tsx",
  "ValidationRunnerSafetyNotice.tsx",
  "ValidationRunnerEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $clientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $clientPath)
$approvedSource = (Get-ChildItem $approvedDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$regressionSource = (Get-ChildItem $regressionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$stabilizationSource = (Get-ChildItem $stabilizationDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$productSource = (Get-ChildItem $productDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$consolidationSource = (Get-ChildItem $consolidationDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$commandSource = (Get-ChildItem $commandDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$runRouteSource = if (Test-Path $runRoutePath) { Get-Content -Raw $runRoutePath } else { "" }
$allSmoke = Get-Content -Raw $allSmokePath
$validationSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
$allIntegratedSource = $validationSource + "`n" + $approvedSource + "`n" + $regressionSource + "`n" + $stabilizationSource + "`n" + $productSource + "`n" + $consolidationSource + "`n" + $commandSource + "`n" + $missionSource

foreach ($export in @(
  "buildValidationCommandCatalog",
  "buildValidationCommandCatalogItem",
  "buildValidationRunRequest",
  "validateValidationRunRequest",
  "buildValidationRunApproval",
  "validateValidationRunApproval",
  "buildValidationRunPolicy",
  "isValidationRunAllowed",
  "buildValidationRunPreflight",
  "buildValidationRunPreflightCheck",
  "buildValidationExecutionBridge",
  "executeApprovedValidationRun",
  "buildValidationOutputCapture",
  "buildValidationOutputCaptureItem",
  "buildValidationResultRouter",
  "buildValidationResultRoute",
  "buildValidationRunnerSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "ValidationRunnerPanel renders",
  "ValidationCommandCatalogPanel renders",
  "ValidationRunRequestPanel renders",
  "ValidationRunApprovalPanel renders",
  "ValidationRunPolicyPanel renders",
  "ValidationRunPreflightPanel renders",
  "ValidationExecutionBridgePanel renders",
  "ValidationOutputCapturePanel renders",
  "ValidationResultRouterPanel renders",
  "ValidationRunnerSafetyNotice renders",
  "ValidationRunnerEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $routeSource "ValidationRunnerPanel" "/validation imports/renders ValidationRunnerPanel"

foreach ($text in @(
  "approval required",
  "no arbitrary shell",
  "no command execution without approval",
  "no file writes",
  "preserve latest-message authority"
)) { Assert-Contains $validationSource $text "UI says $text" }

Assert-Contains $domainSource "npm run build" "command catalog includes npm run build"
Assert-Contains $domainSource "npm run smoke:codexforge:server" "command catalog includes npm run smoke:codexforge:server"
Assert-Contains $domainSource "git diff --check" "command catalog includes git diff --check"
Assert-Contains $domainSource "smoke-codexforge-validation-runner.ps1" "command catalog includes smoke-codexforge-validation-runner.ps1"
Assert-Contains $domainSource "approved: args.approved === true" "approval defaults approved false"
Assert-Contains $domainSource "Policy blocks missing approval." "policy blocks missing approval"
Assert-Contains $domainSource "Policy blocks unknown command" "policy blocks unknown commands"
Assert-Contains $domainSource "Policy blocks arbitrary shell" "policy blocks arbitrary shell"
Assert-Contains $domainSource "Policy blocks broker execution." "policy blocks broker execution"
Assert-Contains $domainSource "Policy blocks apply-diff." "policy blocks apply-diff"
Assert-Contains $domainSource "Policy blocks write-file." "policy blocks write-file"
Assert-Contains $domainSource "preflight checks allowlisted commands" "preflight checks allowlisted commands"
Assert-Contains $domainSource "preflight checks destructive command tokens" "preflight checks destructive command tokens"
Assert-Contains $domainSource "request-ready" "execution bridge has request-ready or blocked/manual-only state"
Assert-Contains $domainSource "manual-only" "execution bridge has request-ready or blocked/manual-only state"
Assert-Contains $validationSource "execution bridge does not execute on render" "execution bridge does not execute on render"
Assert-Contains $domainSource "stdoutExcerpt" "output capture supports stdout excerpt"
Assert-Contains $domainSource "stderrExcerpt" "output capture supports stderr excerpt"
Assert-Contains $domainSource "MAX_EXCERPT_LENGTH" "output capture caps output length"
Assert-Contains $domainSource "failed build/smoke routes to Regression Triage" "result router maps failed build/smoke to Regression Triage"
Assert-Contains $domainSource "passing build/smoke routes to Verification Ingestion" "result router maps passing build/smoke to Verification Ingestion"

Assert-Contains $approvedSource "Validation Runner" "Approved Patch Apply references Validation Runner if integrated"
Assert-Contains $regressionSource "Validation Runner output capture handoff" "Verification Ingestion references Validation Runner if integrated"
Assert-Contains $regressionSource "validation-runner" "Regression Triage references Validation Runner if integrated"
Assert-Contains $stabilizationSource "Validation Runner readiness" "Stabilization references Validation Runner if integrated"
Assert-Contains $productSource "Validation Runner v1" "Product Readiness references Validation Runner v1 if integrated"
Assert-Contains $consolidationSource "Validation Runner v1" "Consolidation references Validation Runner v1 if integrated"
Assert-Contains $commandSource "Go to Validation Runner" "Command Palette includes Go to Validation Runner if integrated"
Assert-Contains $missionSource "Validation Runner readiness" "Mission Control includes Validation Runner readiness if integrated"

if ($runRouteSource.Trim().Length -gt 0) {
  Assert-Contains $runRouteSource "allowlist" "run API route includes allowlist text"
  Assert-Contains $runRouteSource "destructive command block" "run API route includes destructive command block text"
  Assert-Contains $runRouteSource "approval check" "run API route includes approval check text"
}

Assert-NotMatches $validationSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "\.nodes\s*\.\s*push|\.edges\s*\.\s*push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no arbitrary run-command call from UI"
Assert-NotMatches $validationSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $validationSource "Math.random" "no Math.random"
Assert-NotContains $validationSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $validationSource "d3-force" "no d3-force"
Assert-NotMatches $validationSource "https?://" "no external network dependency"
Assert-NotContains $validationSource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $validationSource "axios" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $validationSource $marker "no vector database dependency: $marker"
}
foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "from `"openai`"", "from 'openai'")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic validation-runner files: $marker"
}
Assert-Contains $validationSource "no auto-persistence" "no auto-persistence"
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allIntegratedSource $mojibakePattern "no mojibake"
Assert-Contains $validationSource "buildValidationRunnerStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-validation-runner\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Validation Runner exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Validation Runner" "managed smoke suite includes Validation Runner exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/validation" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /validation returned status $($response.StatusCode)" }
  Write-Host "[PASS] /validation route reachable"
} catch {
  Write-Host "[SKIP] /validation route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Validation Runner smoke passed."
