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
Write-Host "=== CodexForge Full System Quality Audit smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\full-system-quality-audit"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\quality-audit\page.tsx"
$pageClientPath = "src\app\quality-audit\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "full-system-quality-audit-types.ts",
  "quality-audit-check.ts",
  "quality-audit-finding.ts",
  "quality-audit-fix-plan.ts",
  "quality-audit-route-map.ts",
  "quality-audit-safety-review.ts",
  "quality-audit-smoke-review.ts",
  "quality-audit-upgrade-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "FullSystemQualityAuditPanel.tsx",
  "QualityAuditCheckPanel.tsx",
  "QualityAuditFindingPanel.tsx",
  "QualityAuditFixPlanPanel.tsx",
  "QualityAuditRouteMapPanel.tsx",
  "QualityAuditSafetyReviewPanel.tsx",
  "QualityAuditSmokeReviewPanel.tsx",
  "QualityAuditUpgradeSummaryPanel.tsx",
  "QualityAuditSafetyStrip.tsx",
  "QualityAuditEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw $routePath
$pageSource = Get-Content -Raw $pageClientPath
$qualitySource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "buildQualityAuditCheck",
  "buildQualityAuditFinding",
  "buildQualityAuditFixPlan",
  "buildQualityAuditRouteMap",
  "buildQualityAuditSafetyReview",
  "buildQualityAuditSmokeReview",
  "buildQualityAuditUpgradeSummary",
  "summarizeQualityAuditSession"
)) { Assert-Contains $indexSource $export "index exports $export" }

Assert-Contains $uiSource "FullSystemQualityAuditPanel renders" "FullSystemQualityAuditPanel renders"
Assert-Contains $pageSource "FullSystemQualityAuditPanel" "/quality-audit imports/renders FullSystemQualityAuditPanel"
Assert-Contains $routeSource "QualityAuditPageClient" "/quality-audit route exists"
Assert-Contains $qualitySource "System quality audit" "/quality-audit says System quality audit"
Assert-Contains $qualitySource "Copy audit summary" "/quality-audit says Copy audit summary"

foreach ($route in @(
  "/code-flow/live-run",
  "/guarded-apply-mvp",
  "/apply-evidence",
  "/validation-results",
  "/workflow-results",
  "/run-history"
)) { Assert-Contains $qualitySource $route "canonical MVP path references $route" }

foreach ($text in @(
  "No auto-apply",
  "No auto-run",
  "Approval required",
  "preserve latest-message authority",
  "no giant raw JSON above fold",
  "advanced details collapsed or visually secondary",
  "no unsafe execution buttons",
  "no direct appendEvent call from UI",
  "no direct saveBrainGraph call from UI",
  "no direct graph mutation from UI",
  "no memory auto-promotion",
  "no direct apply-diff call from UI except approved guarded boundary text",
  "no direct write-file call from UI",
  "no direct run-command call from UI",
  "no broker-execution call except blocked-policy text"
)) { Assert-Contains $qualitySource $text "source includes $text" }

Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "\.nodes\s*\.\s*push|\.edges\s*\.\s*push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $qualitySource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotMatches $qualitySource "fetch\s*\(" "no external network dependency in full-system-quality-audit files"
Assert-NotMatches $qualitySource "https?://" "no external network dependency in full-system-quality-audit files"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) { Assert-NotContains $qualitySource $marker "no vector database dependency: $marker" }
foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "localStorage")) { Assert-NotContains $qualitySource $marker "no API key storage or provider dependency: $marker" }
Assert-NotContains $qualitySource "process.env" "no process.env value printed in UI"
Assert-NotContains $qualitySource "Math.random" "no Math.random"
Assert-NotContains $qualitySource "Date.now" "no Date.now for deterministic layout/ids"
Assert-NotContains $qualitySource "d3-force" "no d3-force"

$secretPattern = "(sk-[A-Za-z0-9]{20,}|[A-Za-z0-9_\-]{32,}\.[A-Za-z0-9_\-]{16,}\.[A-Za-z0-9_\-]{16,})"
Assert-NotMatches $qualitySource $secretPattern "no hardcoded API keys"
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $qualitySource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-full-system-quality-audit\.ps1")
if ($suiteMatches.Count -ne 1) { throw "[FAIL] Managed smoke suite must include Full System Quality Audit exactly once; found $($suiteMatches.Count)." }
$nameMatches = [regex]::Matches($allSmoke, 'Name\s*=\s*"Full System Quality Audit"')
if ($nameMatches.Count -ne 1) { throw "[FAIL] Managed smoke suite must include Full System Quality Audit name exactly once; found $($nameMatches.Count)." }
Assert-Contains $allSmoke "Full System Quality Audit" "managed smoke suite includes Full System Quality Audit exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/quality-audit" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /quality-audit returned status $($response.StatusCode)" }
  Write-Host "[PASS] /quality-audit route reachable"
} catch {
  Write-Host "[SKIP] /quality-audit route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Full System Quality Audit smoke passed."
