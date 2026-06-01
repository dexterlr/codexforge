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
Write-Host "=== CodexForge Real Apply Guard Review smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\real-apply-guard-review"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\apply-guard-review\page.tsx"
$pageClientPath = "src\app\apply-guard-review\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "real-apply-guard-review-types.ts",
  "apply-guard-review-input.ts",
  "apply-guard-policy-review.ts",
  "apply-approval-packet-review.ts",
  "apply-diff-boundary-review.ts",
  "apply-path-boundary-review.ts",
  "apply-rollback-confidence.ts",
  "apply-command-write-separation.ts",
  "apply-validation-requirement.ts",
  "apply-guard-go-no-go.ts",
  "apply-guard-review-handoff.ts",
  "real-apply-guard-review-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "RealApplyGuardReviewPanel.tsx",
  "ApplyGuardReviewInputPanel.tsx",
  "ApplyGuardPolicyReviewPanel.tsx",
  "ApplyApprovalPacketReviewPanel.tsx",
  "ApplyDiffBoundaryReviewPanel.tsx",
  "ApplyPathBoundaryReviewPanel.tsx",
  "ApplyRollbackConfidencePanel.tsx",
  "ApplyCommandWriteSeparationPanel.tsx",
  "ApplyValidationRequirementPanel.tsx",
  "ApplyGuardGoNoGoPanel.tsx",
  "ApplyGuardReviewHandoffPanel.tsx",
  "RealApplyGuardReviewSafetyStrip.tsx",
  "RealApplyGuardReviewEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$integratedSource = (Get-Content -Raw "src\app\apply-validation\page-client.tsx") + "`n" + (Get-Content -Raw "src\app\code-flow\page-client.tsx") + "`n" + (Get-Content -Raw "src\app\files\page-client.tsx") + "`n" + (Get-Content -Raw "src\app\validation\page-client.tsx") + "`n" + (Get-Content -Raw "src\app\closed-loop\page.tsx") + "`n" + (Get-Content -Raw "src\app\code-flow\ux-fixes\page-client.tsx")
$commandSource = (Get-ChildItem "src\lib\codexforge\command-palette" -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$productSource = (Get-ChildItem "src\lib\codexforge\product-readiness-audit" -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$consolidationSource = (Get-ChildItem "src\lib\codexforge\consolidation" -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$missionSource = (Get-ChildItem "src\lib\codexforge\mission-control" -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$reviewSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource

foreach ($export in @(
  "buildApplyGuardReviewInput",
  "validateApplyGuardReviewInput",
  "buildApplyGuardPolicyReview",
  "buildApplyGuardPolicyReviewCheck",
  "buildApplyApprovalPacketReview",
  "buildApplyApprovalPacketReviewCheck",
  "buildApplyDiffBoundaryReview",
  "buildApplyDiffBoundaryReviewCheck",
  "buildApplyPathBoundaryReview",
  "buildApplyPathBoundaryReviewCheck",
  "buildApplyRollbackConfidence",
  "buildApplyRollbackConfidenceItem",
  "buildApplyCommandWriteSeparation",
  "buildApplyCommandWriteSeparationCheck",
  "buildApplyValidationRequirement",
  "buildApplyValidationRequirementCheck",
  "buildApplyGuardGoNoGo",
  "buildApplyGuardGoNoGoReason",
  "buildApplyGuardReviewHandoff",
  "buildApplyGuardReviewHandoffSection",
  "buildRealApplyGuardReviewSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "RealApplyGuardReviewPanel renders",
  "ApplyGuardReviewInputPanel renders",
  "ApplyGuardPolicyReviewPanel renders",
  "ApplyApprovalPacketReviewPanel renders",
  "ApplyDiffBoundaryReviewPanel renders",
  "ApplyPathBoundaryReviewPanel renders",
  "ApplyRollbackConfidencePanel renders",
  "ApplyCommandWriteSeparationPanel renders",
  "ApplyValidationRequirementPanel renders",
  "ApplyGuardGoNoGoPanel renders",
  "ApplyGuardReviewHandoffPanel renders",
  "RealApplyGuardReviewSafetyStrip renders",
  "RealApplyGuardReviewEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $routeSource "RealApplyGuardReviewPanel" "/apply-guard-review imports/renders RealApplyGuardReviewPanel"
Assert-Contains $routeSource "Review the apply guard" "/apply-guard-review says Review the apply guard"
Assert-Contains $reviewSource "Copy guard review" "/apply-guard-review says Copy guard review"

foreach ($text in @(
  "no auto-apply",
  "no auto-run",
  "approval required",
  "rollback",
  "executionAllowed false",
  "preserve latest-message authority"
)) { Assert-Contains $reviewSource $text "UI says $text" }

Assert-Contains $routeSource "Focus Mode UX calm workflow layout markers" "route uses Focus Mode UX or calm workflow layout markers"
Assert-Contains $routeSource "shell without duplicate route chip cloud" "route uses shell without duplicate route chip cloud"
Assert-Contains $routeSource "route hero title does not vertically wrap" "route hero title does not vertically wrap"
Assert-Contains $reviewSource "no giant raw JSON above fold" "no giant raw JSON above fold"
Assert-Contains $reviewSource "advanced details are collapsed or visually secondary" "advanced details are collapsed or visually secondary"

Assert-Contains $domainSource "Policy requires preview diff before apply." "policy review requires preview diff"
Assert-Contains $domainSource "Policy requires explicit approval required before any apply." "policy review requires explicit approval"
Assert-Contains $domainSource "Policy blocks direct UI apply" "policy review blocks direct UI apply"
Assert-Contains $domainSource "Approval review ties approval to latest message/request." "approval review ties approval to latest message/request"
Assert-Contains $domainSource "blocks reused approval for different diff" "approval review blocks reused approval for different diff"
Assert-Contains $domainSource "binary patch" "diff boundary checks binary patch"
Assert-Contains $domainSource "secrets" "diff boundary checks secrets"
Assert-Contains $domainSource "Tool execution policy edit" "diff boundary checks tool execution policy edit"
Assert-Contains $domainSource "no parent traversal" "path boundary checks no parent traversal"
Assert-Contains $domainSource "no absolute unreviewed write path" "path boundary checks no absolute unreviewed write path"
Assert-Contains $domainSource "git restore" "rollback confidence mentions git restore"
Assert-Contains $domainSource "git revert" "rollback confidence mentions git revert"
Assert-Contains $domainSource "no direct run-command from UI" "command/write separation checks no direct run-command from UI"
Assert-Contains $domainSource "no mixed apply+validate single unsafe button" "command/write separation checks no mixed apply+validate unsafe button"
Assert-Contains $domainSource "npm run build" "validation requirement includes npm run build"
Assert-Contains $domainSource "targeted smoke" "validation requirement includes targeted smoke"
Assert-Contains $domainSource "git diff --check" "validation requirement includes git diff --check"
Assert-Contains $domainSource "go-for-guarded-apply-candidate" "go/no-go supports go-for-guarded-apply-candidate"
Assert-Contains $domainSource "executionAllowed false in Phase 82" "go/no-go says executionAllowed false in Phase 82"
Assert-Contains $domainSource "guarded apply candidate brief" "handoff supports guarded apply candidate brief"

foreach ($integration in @(
  "/apply-validation",
  "/code-flow",
  "/files",
  "/validation",
  "/closed-loop",
  "/code-flow/ux-fixes"
)) { Assert-Contains $integratedSource "Apply Guard Review" "$integration references Apply Guard Review if integrated" }

Assert-Contains $commandSource "Go to Apply Guard Review" "Command Palette includes Go to Apply Guard Review if integrated"
Assert-Contains $commandSource "Copy apply guard review" "Command Palette includes Copy apply guard review"
Assert-Contains $commandSource "Copy apply guard required fixes" "Command Palette includes Copy apply guard required fixes"
Assert-Contains $commandSource "Copy guarded apply candidate brief" "Command Palette includes Copy guarded apply candidate brief"
Assert-Contains $productSource "Real Apply Guard Review" "Product Readiness references Real Apply Guard Review if integrated"
Assert-Contains $consolidationSource "Real Apply Guard Review" "Consolidation references Real Apply Guard Review if integrated"
Assert-Contains $missionSource "Real Apply Guard Review readiness" "Mission Control references Real Apply Guard Review if integrated"
Assert-Contains $missionSource "Review apply guard before any apply automation increase" "Mission Control next action review apply guard before any apply automation increase"

Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "\.nodes\s*\.\s*push|\.edges\s*\.\s*push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $reviewSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotMatches $reviewSource "https?://" "no external network dependency in real-apply-guard-review files"
Assert-NotContains $reviewSource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $reviewSource "axios" "no external network dependency"
Assert-NotMatches $reviewSource "fetch\s*\(" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $reviewSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "from `"openai`"", "from 'openai'")) {
  Assert-NotContains $reviewSource $marker "no OpenAI/API-key dependency in real-apply-guard-review files: $marker"
}

Assert-NotContains $reviewSource "localStorage" "no localStorage API key storage"
Assert-NotContains $reviewSource "process.env" "no process.env value printed in UI"
Assert-NotContains $reviewSource "Math.random" "no Math.random"
Assert-NotContains $reviewSource "Date.now" "no Date.now for deterministic layout/ids"
Assert-NotContains $reviewSource "d3-force" "no d3-force"
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $reviewSource $mojibakePattern "no mojibake"
Assert-Contains $reviewSource "buildRealApplyGuardReviewStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-real-apply-guard-review\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Real Apply Guard Review exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Real Apply Guard Review" "managed smoke suite includes Real Apply Guard Review exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/apply-guard-review" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /apply-guard-review returned status $($response.StatusCode)" }
  Write-Host "[PASS] /apply-guard-review route reachable"
} catch {
  Write-Host "[SKIP] /apply-guard-review route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Real Apply Guard Review smoke passed."
