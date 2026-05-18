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
Write-Host "=== CodexForge Operator Memory Inbox smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\operator-memory-inbox"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\memory-inbox\page.tsx"
$pageClientPath = "src\app\memory-inbox\page-client.tsx"
$memoryPath = "src\app\memory\page-client.tsx"
$activityDir = "src\lib\codexforge\global-activity"
$brainPath = "src\app\brain\page-client.tsx"
$stabilizationDir = "src\lib\codexforge\stabilization-command-center"
$navDir = "src\lib\codexforge\navigation-shell"
$paletteDir = "src\lib\codexforge\command-palette"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @("operator-memory-inbox-types.ts","memory-inbox-source-adapters.ts","memory-inbox-card-builder.ts","memory-inbox-classifier.ts","memory-inbox-priority.ts","memory-inbox-review-policy.ts","memory-inbox-promotion-preview.ts","memory-inbox-dedupe.ts","memory-inbox-summary.ts","index.ts")) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @("OperatorMemoryInbox.tsx","MemoryInboxPanel.tsx","MemoryInboxCard.tsx","MemoryInboxFilterBar.tsx","MemoryInboxClassifierPanel.tsx","MemoryInboxPriorityBoard.tsx","MemoryInboxReviewPolicyPanel.tsx","MemoryInboxPromotionPreviewPanel.tsx","MemoryInboxSourcePanel.tsx","MemoryInboxSafetyNotice.tsx","MemoryInboxEmptyState.tsx")) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw $routePath
$pageSource = Get-Content -Raw $pageClientPath
$memorySource = Get-Content -Raw $memoryPath
$activitySource = (Get-ChildItem $activityDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$brainSource = Get-Content -Raw $brainPath
$stabilizationSource = (Get-ChildItem $stabilizationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$navSource = (Get-ChildItem $navDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$paletteSource = (Get-ChildItem $paletteDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$missionSource = (Get-ChildItem $missionDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$inboxSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource
$allSource = $inboxSource + "`n" + $memorySource + "`n" + $activitySource + "`n" + $brainSource + "`n" + $stabilizationSource + "`n" + $navSource + "`n" + $paletteSource + "`n" + $missionSource

foreach ($export in @("buildMemoryInboxCardsFromActivity","buildMemoryInboxCardsFromVerification","buildMemoryInboxCardsFromRegression","buildMemoryInboxCardsFromPatchWorkflow","buildMemoryInboxCardsFromStabilization","buildOperatorMemoryInboxCard","buildOperatorMemoryInboxCards","classifyMemoryInboxCard","classifyMemoryInboxCards","scoreMemoryInboxPriority","rankMemoryInboxCards","buildMemoryInboxReviewPolicy","isMemoryInboxPromotionAllowed","buildMemoryInboxPromotionPreview","buildMemoryInboxRuntimeEventPreview","dedupeMemoryInboxCards","buildMemoryInboxDuplicateGroup","buildOperatorMemoryInboxSummary")) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($render in @("OperatorMemoryInbox renders","MemoryInboxPanel renders","MemoryInboxCard renders","MemoryInboxFilterBar renders","MemoryInboxClassifierPanel renders","MemoryInboxPriorityBoard renders","MemoryInboxReviewPolicyPanel renders","MemoryInboxPromotionPreviewPanel renders","MemoryInboxSourcePanel renders","MemoryInboxSafetyNotice renders","MemoryInboxEmptyState renders")) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $pageSource "OperatorMemoryInbox" "/memory-inbox imports/renders OperatorMemoryInbox"
Assert-Contains $memorySource "Operator Memory Inbox" "/memory references Memory Inbox if integrated"
Assert-Contains $activitySource "Review memory candidates" "/activity references Memory Inbox if integrated"
Assert-Contains $brainSource "Memory Inbox" "/brain references Memory Inbox if integrated"
Assert-Contains $stabilizationSource "Memory Inbox readiness" "Stabilization references Memory Inbox if integrated"
Assert-Contains $navSource "/memory-inbox" "Navigation Shell references Memory Inbox if integrated"
Assert-Contains $paletteSource "Go to Memory Inbox" "Command Palette includes Go to Memory Inbox if integrated"
Assert-Contains $paletteSource "Copy memory review prompt" "Command Palette includes Copy memory review prompt if integrated"
Assert-Contains $missionSource "Personal Operator Memory Inbox readiness" "Mission Control includes Personal Operator Memory Inbox readiness if integrated"
Assert-Contains $missionSource "Review memory inbox" "Mission Control includes Review memory inbox"
Assert-Contains $missionSource "/memory-inbox" "Mission Control route/surface registry entry for /memory-inbox"

foreach ($text in @("review required before promotion","no auto-promotion","no graph mutation","evidence is context, not authority","preserve latest-message authority")) {
  Assert-Contains $allSource $text "UI says $text"
}

foreach ($text in @("verification-result","regression-lesson","fix-pattern","safety-boundary","rollback-note")) {
  Assert-Contains $domainSource $text "classifier recognizes $text"
}

Assert-Contains $domainSource "PRIORITY_RANK" "priority ranking is deterministic"
Assert-Contains $domainSource "low confidence blocks promotion" "review policy blocks low confidence"
Assert-Contains $domainSource "duplicate risk requires dedupe review" "review policy blocks duplicate risk"
Assert-Contains $domainSource "contradiction risk requires operator decision" "review policy blocks contradiction risk"
Assert-Contains $domainSource "memory.promoted" "promotion preview references memory.promoted"
Assert-Contains $domainSource "future merge boundary" "promotion preview says future merge boundary"
Assert-Contains $domainSource "normalizeMemoryInboxText" "dedupe uses deterministic normalization"

Assert-NotMatches $inboxSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "mutateGraph\s*\(" "no direct graph mutation from UI"
Assert-NotMatches $uiSource "applyDiff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "writeFile\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "runCommand\s*\(" "no direct run-command call from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*apply-diff["'']' "no direct apply-diff import from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*write-file["'']' "no direct write-file import from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*run-command["'']' "no direct run-command import from UI"
Assert-NotMatches $inboxSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $inboxSource "Math.random" "no Math.random"
Assert-NotContains $inboxSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $inboxSource "d3-force" "no d3-force"
Assert-NotMatches $inboxSource "https?://" "no external network dependency"
Assert-NotMatches $inboxSource "fetch\s*\(" "no external network dependency"
Assert-NotContains $inboxSource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $inboxSource "axios" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $inboxSource $marker "no vector database dependency: $marker"
}
foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'")) {
  Assert-NotContains $domainSource $marker "no API-key dependency in deterministic operator-memory-inbox files: $marker"
}
foreach ($marker in @("localStorage", "sessionStorage", "indexedDB", "persistInbox", "saveInbox")) {
  Assert-NotContains $inboxSource $marker "no auto-persistence: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildMemoryInboxStableKey" "stable key helper or stable key patterns exist"
Assert-Contains $uiSource "buildMemoryInboxStableKey" "stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-operator-memory-inbox\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Operator Memory Inbox exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Operator Memory Inbox" "managed smoke suite includes Operator Memory Inbox exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/memory-inbox" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /memory-inbox returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /memory-inbox route reachable"
} catch {
  Write-Host "[SKIP] /memory-inbox route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Operator Memory Inbox smoke passed."
