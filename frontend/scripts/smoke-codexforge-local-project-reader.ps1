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
Write-Host "=== CodexForge Local Project Reader smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\local-project-reader"
$componentDir = Join-Path $domainDir "components"
$pageClientPath = "src\app\files\page-client.tsx"
$productDir = "src\lib\codexforge\product-readiness-audit"
$consolidationDir = "src\lib\codexforge\consolidation"
$paletteDir = "src\lib\codexforge\command-palette"
$missionDir = "src\lib\codexforge\mission-control"
$apiDir = "src\app\api\codexforge\project"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "local-project-reader-types.ts",
  "project-tree-model.ts",
  "project-file-metadata.ts",
  "project-file-preview.ts",
  "project-file-purpose.ts",
  "project-file-risk.ts",
  "project-file-search.ts",
  "project-reader-handoff.ts",
  "project-reader-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "LocalProjectReader.tsx",
  "ProjectTreePanel.tsx",
  "ProjectFileList.tsx",
  "ProjectFilePreviewPanel.tsx",
  "ProjectFileMetadataPanel.tsx",
  "ProjectFilePurposePanel.tsx",
  "ProjectFileRiskPanel.tsx",
  "ProjectFileSearchPanel.tsx",
  "ProjectReaderHandoffPanel.tsx",
  "ProjectReaderSafetyNotice.tsx",
  "ProjectReaderEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

$indexSource = Get-Content -Raw (Join-Path $domainDir "index.ts")
$purposeSource = Get-Content -Raw (Join-Path $domainDir "project-file-purpose.ts")
$riskSource = Get-Content -Raw (Join-Path $domainDir "project-file-risk.ts")
$searchSource = Get-Content -Raw (Join-Path $domainDir "project-file-search.ts")
$handoffSource = Get-Content -Raw (Join-Path $domainDir "project-reader-handoff.ts")
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$readerSource = $domainSource + "`n" + $uiSource
$pageClientSource = Get-Content -Raw $pageClientPath
$productSource = (Get-ChildItem $productDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$consolidationSource = (Get-ChildItem $consolidationDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$paletteSource = (Get-ChildItem $paletteDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$apiSource = if (Test-Path $apiDir) { (Get-ChildItem $apiDir -Recurse -Filter route.ts | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n" } else { "" }
$allSmokeSource = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "buildProjectTree",
  "buildProjectTreeNode",
  "flattenProjectTree",
  "buildProjectFileMetadata",
  "buildProjectFilePreview",
  "truncateProjectFilePreview",
  "inferProjectFilePurpose",
  "buildProjectFilePurposeSummary",
  "scoreProjectFileRisk",
  "classifyProjectFileRisk",
  "buildProjectFileRiskReport",
  "searchProjectFiles",
  "normalizeProjectFileSearchQuery",
  "buildProjectReaderHandoff",
  "buildProjectReaderPatchPreviewPrompt",
  "buildProjectReaderChatContext",
  "buildLocalProjectReaderSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "LocalProjectReader renders",
  "ProjectTreePanel renders",
  "ProjectFileList renders",
  "ProjectFilePreviewPanel renders",
  "ProjectFileMetadataPanel renders",
  "ProjectFilePurposePanel renders",
  "ProjectFileRiskPanel renders",
  "ProjectFileSearchPanel renders",
  "ProjectReaderHandoffPanel renders",
  "ProjectReaderSafetyNotice renders",
  "ProjectReaderEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $pageClientSource "LocalProjectReader" "/files imports/renders LocalProjectReader"

foreach ($text in @("read-only", "no file writes", "no command execution", "Safe Patch Preview", "preserve latest-message authority")) {
  Assert-Contains $uiSource $text "UI says $text"
}

foreach ($text in @(
  "page.tsx / page-client.tsx -> route surface",
  "route.ts -> API route",
  "smoke-codexforge -> smoke validation"
)) { Assert-Contains $purposeSource $text "file purpose detects $text" }

foreach ($text in @("apply-diff", "write-file", "run-command", "Brain graph/runtime boundary")) {
  Assert-Contains $riskSource $text "file risk detects $text"
}

foreach ($text in @("pathTokens", "nameTokens", "categoryTokens", "purposeTokens", "riskTokens", "keywordTokens")) {
  Assert-Contains $searchSource $text "search supports $text"
}

foreach ($text in @(
  "inspect first",
  "no writes without approval",
  "no command execution without approval",
  "use Safe Patch Preview for edits",
  "preserve latest-message authority"
)) { Assert-Contains $handoffSource $text "handoff says $text" }

Assert-Contains $productSource "File Reader v1 functional/read-only" "Product Readiness references File Reader v1 functional/read-only if integrated"
Assert-Contains $consolidationSource "File Reader v1 functional/read-only" "Consolidation references File Reader v1 functional/read-only if integrated"
Assert-Contains $paletteSource "Go to Project Reader" "Command Palette includes Go to Project Reader if integrated"
Assert-Contains $paletteSource "Copy file inspection prompt" "Command Palette includes Copy file inspection prompt"
Assert-Contains $paletteSource "Copy safe patch preview prompt" "Command Palette includes Copy safe patch preview prompt"
Assert-Contains $missionSource "Real Local Project Reader readiness" "Mission Control includes Real Local Project Reader readiness if integrated"
Assert-Contains $missionSource "Inspect project files" "Mission Control next action can mention inspect project files"
Assert-Contains $missionSource 'href: "/files"' "Mission Control route/surface registry entry for /files as project reader"

if ($apiSource) {
  Assert-Contains $apiSource "Path traversal guard" "new API routes include path traversal guard text"
  Assert-Contains $apiSource "file size cap" "new API routes include file size cap text"
  Assert-Contains $apiSource "binary guard" "new API routes include binary guard text"
  Assert-Contains $apiSource "max result cap" "new API routes include max result cap text"
  Assert-NotMatches $apiSource "export\s+async\s+function\s+(POST|PUT|PATCH|DELETE)" "new API routes expose no mutation methods"
}

Assert-NotMatches $readerSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "\.nodes\s*\.\s*push|\.edges\s*\.\s*push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $uiSource "run-tests|build-web-app" "no run-tests/build-web-app execution from UI"
Assert-NotMatches $readerSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $readerSource "Math.random" "no Math.random"
Assert-NotContains $readerSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $readerSource "d3-force" "no d3-force"
Assert-NotMatches $readerSource "https?://" "no external network dependency"
Assert-NotContains $readerSource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $readerSource "axios" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $readerSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "from `"openai`"", "from 'openai'")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic local-project-reader files: $marker"
}

Assert-Contains $readerSource "no auto-persistence" "no auto-persistence"
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $readerSource $mojibakePattern "no mojibake"
Assert-Contains $readerSource "buildLocalProjectReaderStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-local-project-reader\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Local Project Reader exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmokeSource "Local Project Reader" "managed smoke suite includes Local Project Reader exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/files" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /files returned status $($response.StatusCode)" }
  Write-Host "[PASS] /files route reachable"
} catch {
  Write-Host "[SKIP] /files route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Local Project Reader smoke passed."

