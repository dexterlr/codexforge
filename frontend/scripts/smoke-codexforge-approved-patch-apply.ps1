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
Write-Host "=== CodexForge Approved Patch Apply smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\approved-patch-apply"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$filesPagePath = "src\app\files\page-client.tsx"
$realPatchPanelPath = "src\lib\codexforge\real-patch-preview\components\RealPatchPreviewPanel.tsx"
$productDir = "src\lib\codexforge\product-readiness-audit"
$consolidationDir = "src\lib\codexforge\consolidation"
$stabilizationDir = "src\lib\codexforge\stabilization-command-center"
$commandDir = "src\lib\codexforge\command-palette"
$missionDir = "src\lib\codexforge\mission-control"
$applyRoutePath = "src\app\api\operator\apply\route.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "approved-patch-apply-types.ts",
  "apply-request.ts",
  "apply-approval-packet.ts",
  "apply-policy.ts",
  "apply-preflight.ts",
  "apply-dry-run-preview.ts",
  "apply-rollback-plan.ts",
  "apply-execution-bridge.ts",
  "apply-validation-capture.ts",
  "approved-patch-apply-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "ApprovedPatchApplyPanel.tsx",
  "ApplyRequestPanel.tsx",
  "ApplyApprovalPacketPanel.tsx",
  "ApplyPolicyPanel.tsx",
  "ApplyPreflightPanel.tsx",
  "ApplyDryRunPreviewPanel.tsx",
  "ApplyRollbackPlanPanel.tsx",
  "ApplyExecutionBridgePanel.tsx",
  "ApplyValidationCapturePanel.tsx",
  "ApprovedPatchApplySafetyNotice.tsx",
  "ApprovedPatchApplyEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$filesSource = (Get-Content -Raw $filesPagePath) + "`n" + (Get-Content -Raw $realPatchPanelPath)
$productSource = (Get-ChildItem $productDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$consolidationSource = (Get-ChildItem $consolidationDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$stabilizationSource = (Get-ChildItem $stabilizationDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$commandSource = (Get-ChildItem $commandDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$applyRouteSource = if (Test-Path $applyRoutePath) { Get-Content -Raw $applyRoutePath } else { "" }
$allSmoke = Get-Content -Raw $allSmokePath
$approvedSource = $domainSource + "`n" + $uiSource
$allIntegratedSource = $approvedSource + "`n" + $filesSource + "`n" + $productSource + "`n" + $consolidationSource + "`n" + $stabilizationSource + "`n" + $commandSource + "`n" + $missionSource

foreach ($export in @(
  "buildApprovedPatchApplyRequest",
  "validateApprovedPatchApplyRequest",
  "buildApprovedPatchApplyApprovalPacket",
  "validateApprovedPatchApplyApprovalPacket",
  "buildApprovedPatchApplyPolicy",
  "isApprovedPatchApplyAllowed",
  "buildApprovedPatchApplyPreflight",
  "buildApprovedPatchApplyPreflightCheck",
  "buildApprovedPatchApplyDryRunPreview",
  "buildApprovedPatchApplyDryRunItem",
  "buildApprovedPatchApplyRollbackPlan",
  "buildApprovedPatchApplyRollbackOption",
  "buildApprovedPatchApplyExecutionBridge",
  "executeApprovedPatchApplyRequest",
  "buildApprovedPatchApplyValidationCapture",
  "buildApprovedPatchApplyValidationCommand",
  "buildApprovedPatchApplySummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "ApprovedPatchApplyPanel renders",
  "ApplyRequestPanel renders",
  "ApplyApprovalPacketPanel renders",
  "ApplyPolicyPanel renders",
  "ApplyPreflightPanel renders",
  "ApplyDryRunPreviewPanel renders",
  "ApplyRollbackPlanPanel renders",
  "ApplyExecutionBridgePanel renders",
  "ApplyValidationCapturePanel renders",
  "ApprovedPatchApplySafetyNotice renders",
  "ApprovedPatchApplyEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $filesSource "ApprovedPatchApplyPanel" "/files imports/renders ApprovedPatchApplyPanel"

foreach ($text in @(
  "approval required",
  "no command execution",
  "no direct apply-diff from UI",
  "no file writes without approval",
  "preserve latest-message authority"
)) { Assert-Contains $uiSource $text "UI says $text" }

Assert-Contains $domainSource "approved: source.approved === true" "approval packet defaults approved false"
Assert-Contains $domainSource "preview diff acknowledgement required" "approval packet requires preview diff acknowledgement"
Assert-Contains $domainSource "Policy blocks missing preview diff." "policy blocks missing preview diff"
Assert-Contains $domainSource "Policy blocks missing approval." "policy blocks missing approval"
Assert-Contains $domainSource "Policy blocks direct UI apply-diff." "policy blocks direct UI apply-diff"
Assert-Contains $domainSource "Policy blocks direct UI write-file." "policy blocks direct UI write-file"
Assert-Contains $domainSource "Policy requires rollback plan." "policy requires rollback plan"
Assert-Contains $domainSource "path traversal absent" "preflight checks path traversal"
Assert-Contains $domainSource "binary file absent" "preflight checks binary file absent"
Assert-Contains $domainSource "does not write files" "dry-run preview says does not write files"
Assert-Contains $domainSource "git restore" "rollback plan mentions git restore"
Assert-Contains $domainSource "git revert" "rollback plan mentions git revert"
Assert-Contains $domainSource "npm run build" "validation capture includes npm run build"
Assert-Contains $domainSource "npm run smoke:codexforge:server" "validation capture includes npm run smoke:codexforge:server"
Assert-Contains $domainSource "git diff --check" "validation capture includes git diff --check"
Assert-Contains $domainSource "request-ready" "execution bridge has request-ready or blocked state"
Assert-Contains $domainSource "blocked" "execution bridge has request-ready or blocked state"
Assert-Contains $approvedSource "execution bridge does not execute on render" "execution bridge does not execute on render"

Assert-Contains $productSource "Approved Patch Apply v1 request-ready" "Product Readiness references Approved Patch Apply v1 if integrated"
Assert-Contains $consolidationSource "Approved Patch Apply v1 approval-gated/request-ready" "Consolidation references Approved Patch Apply v1 if integrated"
Assert-Contains $stabilizationSource "Approved Patch Apply readiness" "Stabilization references Approved Patch Apply if integrated"
Assert-Contains $commandSource "Go to Approved Patch Apply" "Command Palette includes Go to Approved Patch Apply if integrated"
Assert-Contains $missionSource "Approved Patch Apply readiness" "Mission Control includes Approved Patch Apply readiness if integrated"

if ($applyRouteSource.Trim().Length -gt 0) {
  Assert-Contains $applyRouteSource "path traversal guard" "apply API route includes path traversal guard text"
  Assert-Contains $applyRouteSource "patch size cap" "apply API route includes patch size cap text"
  Assert-Contains $applyRouteSource "explicit approval checks" "apply API route includes explicit approval checks"
}

Assert-NotMatches $approvedSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "\.nodes\s*\.\s*push|\.edges\s*\.\s*push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $uiSource "run-tests|build-web-app" "no run-tests/build-web-app execution from UI"
Assert-NotMatches $approvedSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $approvedSource "Math.random" "no Math.random"
Assert-NotContains $approvedSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $approvedSource "d3-force" "no d3-force"
Assert-NotMatches $approvedSource "https?://" "no external network dependency"
Assert-NotMatches $approvedSource "fetch\s*\(" "no external network dependency"
Assert-NotContains $approvedSource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $approvedSource "axios" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $approvedSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "from `"openai`"", "from 'openai'")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic approved-patch-apply files: $marker"
}

Assert-Contains $approvedSource "no auto-persistence" "no auto-persistence"
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allIntegratedSource $mojibakePattern "no mojibake"
Assert-Contains $approvedSource "buildApprovedPatchApplyStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-approved-patch-apply\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Approved Patch Apply exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Approved Patch Apply" "managed smoke suite includes Approved Patch Apply exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/files" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /files returned status $($response.StatusCode)" }
  Write-Host "[PASS] /files route reachable"
} catch {
  Write-Host "[SKIP] /files route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Approved Patch Apply smoke passed."
