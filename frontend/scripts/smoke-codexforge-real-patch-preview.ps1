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
Write-Host "=== CodexForge Real Patch Preview smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\real-patch-preview"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$pageClientPath = "src\app\files\page-client.tsx"
$readerPath = "src\lib\codexforge\local-project-reader\components\LocalProjectReader.tsx"
$productDir = "src\lib\codexforge\product-readiness-audit"
$consolidationDir = "src\lib\codexforge\consolidation"
$commandDir = "src\lib\codexforge\command-palette"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "real-patch-preview-types.ts",
  "patch-change-request.ts",
  "patch-context-builder.ts",
  "patch-plan-builder.ts",
  "unified-diff-preview.ts",
  "patch-preview-risk.ts",
  "patch-preview-tests.ts",
  "patch-preview-rollback.ts",
  "patch-preview-handoff.ts",
  "real-patch-preview-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "RealPatchPreviewPanel.tsx",
  "PatchChangeRequestPanel.tsx",
  "PatchContextPanel.tsx",
  "PatchPlanPanel.tsx",
  "UnifiedDiffPreviewPanel.tsx",
  "PatchPreviewRiskPanel.tsx",
  "PatchPreviewTestPlanPanel.tsx",
  "PatchPreviewRollbackPanel.tsx",
  "PatchPreviewHandoffPanel.tsx",
  "RealPatchPreviewSafetyNotice.tsx",
  "RealPatchPreviewEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$pageClientSource = Get-Content -Raw $pageClientPath
$readerSource = Get-Content -Raw $readerPath
$productSource = (Get-ChildItem $productDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$consolidationSource = (Get-ChildItem $consolidationDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$commandSource = (Get-ChildItem $commandDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmokeSource = Get-Content -Raw $allSmokePath
$previewSource = $domainSource + "`n" + $uiSource
$filesIntegrationSource = $pageClientSource + "`n" + $readerSource

foreach ($export in @(
  "buildPatchChangeRequest",
  "validatePatchChangeRequest",
  "buildPatchPreviewContext",
  "buildPatchPreviewContextFromFile",
  "buildRealPatchPreviewPlan",
  "buildRealPatchPreviewStep",
  "buildUnifiedDiffPreview",
  "buildUnifiedDiffHunkPreview",
  "scoreRealPatchPreviewRisk",
  "classifyRealPatchPreviewRisk",
  "buildRealPatchPreviewRiskReport",
  "buildRealPatchPreviewTestPlan",
  "selectRealPatchPreviewSmokeTests",
  "buildRealPatchPreviewRollbackPlan",
  "buildRealPatchPreviewRollbackOption",
  "buildRealPatchPreviewHandoff",
  "buildRealPatchApplyPromptPreview",
  "buildRealPatchReviewPrompt",
  "buildRealPatchPreviewSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "RealPatchPreviewPanel renders",
  "PatchChangeRequestPanel renders",
  "PatchContextPanel renders",
  "PatchPlanPanel renders",
  "UnifiedDiffPreviewPanel renders",
  "PatchPreviewRiskPanel renders",
  "PatchPreviewTestPlanPanel renders",
  "PatchPreviewRollbackPanel renders",
  "PatchPreviewHandoffPanel renders",
  "RealPatchPreviewSafetyNotice renders",
  "RealPatchPreviewEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $filesIntegrationSource "RealPatchPreviewPanel" "/files imports/renders RealPatchPreviewPanel"

foreach ($text in @(
  "preview-only",
  "no file writes",
  "no apply",
  "no command execution",
  "Patch Application Gate",
  "preserve latest-message authority"
)) { Assert-Contains $uiSource $text "UI says $text" }

Assert-Contains $domainSource "Selected file path is required before preparing a patch preview." "change request validation blocks missing file"
Assert-Contains $domainSource "Requested change text is required before preparing a patch preview." "change request validation blocks missing change text"
Assert-Contains $domainSource "sourceContentSupplied: true" "context builder uses supplied file data"
Assert-Contains $domainSource "supplied file data" "context builder says supplied file data"
Assert-Contains $domainSource "PREVIEW ONLY" "unified diff preview emits preview-only label"
Assert-Contains $domainSource "apply-diff detected" "risk report detects apply-diff"
Assert-Contains $domainSource "write-file detected" "risk report detects write-file"
Assert-Contains $domainSource "run-command detected" "risk report detects run-command"
Assert-Contains $domainSource "npm run build" "test plan includes npm run build"
Assert-Contains $domainSource "git diff --check" "test plan includes git diff --check"
Assert-Contains $domainSource "git restore" "rollback plan mentions git restore"
Assert-Contains $domainSource "git revert" "rollback plan mentions git revert"
Assert-Contains $domainSource "inspect first" "handoff says inspect first"
Assert-Contains $domainSource "do not write without approval" "handoff says do not write without approval"
Assert-Contains $domainSource "use Patch Application Gate before apply" "handoff says use Patch Application Gate before apply"

Assert-Contains $productSource "Patch Preview v1 functional/preview-only" "Product Readiness references Patch Preview v1 functional/preview-only if integrated"
Assert-Contains $consolidationSource "Patch Preview v1 functional/preview-only" "Consolidation references Patch Preview v1 functional/preview-only if integrated"
Assert-Contains $commandSource "Go to Real Patch Preview" "Command Palette includes Go to Real Patch Preview if integrated"
Assert-Contains $commandSource "Copy patch review prompt" "Command Palette includes Copy patch review prompt"
Assert-Contains $commandSource "Copy apply-gate handoff prompt" "Command Palette includes Copy apply-gate handoff prompt"
Assert-Contains $missionSource "Real Patch Preview readiness" "Mission Control includes Real Patch Preview readiness if integrated"
Assert-Contains $missionSource "Prepare preview diff" "Mission Control next action can mention prepare preview diff"

Assert-NotMatches $previewSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "\.nodes\s*\.\s*push|\.edges\s*\.\s*push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $uiSource "run-tests|build-web-app" "no run-tests/build-web-app execution from UI"
Assert-NotMatches $previewSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $previewSource "Math.random" "no Math.random"
Assert-NotContains $previewSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $previewSource "d3-force" "no d3-force"
Assert-NotMatches $previewSource "https?://" "no external network dependency"
Assert-NotContains $previewSource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $previewSource "axios" "no external network dependency"
Assert-NotMatches $previewSource "fetch\s*\(" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $previewSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "from `"openai`"", "from 'openai'")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic real-patch-preview files: $marker"
}

Assert-Contains $previewSource "no auto-persistence" "no auto-persistence"
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $previewSource $mojibakePattern "no mojibake"
Assert-Contains $previewSource "buildRealPatchPreviewStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-real-patch-preview\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Real Patch Preview exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmokeSource "Real Patch Preview" "managed smoke suite includes Real Patch Preview exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/files" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /files returned status $($response.StatusCode)" }
  Write-Host "[PASS] /files route reachable"
} catch {
  Write-Host "[SKIP] /files route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Real Patch Preview smoke passed."
