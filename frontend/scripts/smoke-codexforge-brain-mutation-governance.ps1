param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-DirectoryExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" }
  Write-Host "[PASS] directory exists: $Path"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

Write-Host ""
Write-Host "=== CodexForge Brain Mutation Governance smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\brain-mutation-governance"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\brain-governance\page.tsx"
$pageClientPath = "src\app\brain-governance\page-client.tsx"
$journalDir = "src\lib\codexforge\runtime-event-journal"
$executorDir = "src\lib\codexforge\runtime-event-executor"
$gateDir = "src\lib\codexforge\memory-promotion-gate"
$brainPage = "src\app\brain\page-client.tsx"
$activityPage = "src\app\activity\page-client.tsx"
$activityDir = "src\lib\codexforge\global-activity"
$stabilizationDir = "src\lib\codexforge\stabilization-command-center"
$navigationDir = "src\lib\codexforge\navigation-shell"
$paletteDir = "src\lib\codexforge\command-palette"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "brain-mutation-governance-types.ts",
  "mutation-boundary-registry.ts",
  "mutation-policy-model.ts",
  "direct-mutation-detector.ts",
  "reducer-impact-governance.ts",
  "mutation-integrity-report.ts",
  "mutation-risk-board.ts",
  "governance-next-action.ts",
  "governance-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "BrainMutationGovernanceConsole.tsx",
  "MutationBoundaryRegistryPanel.tsx",
  "MutationPolicyPanel.tsx",
  "DirectMutationDetectorPanel.tsx",
  "ReducerImpactGovernancePanel.tsx",
  "MutationIntegrityReportPanel.tsx",
  "MutationRiskBoardPanel.tsx",
  "GovernanceNextActionPanel.tsx",
  "BrainMutationGovernanceSafetyNotice.tsx",
  "BrainMutationGovernanceEmptyState.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw $indexPath
$routeSource = Get-Content -Raw $routePath
$pageSource = Get-Content -Raw $pageClientPath
$journalSource = (Get-ChildItem $journalDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$executorSource = (Get-ChildItem $executorDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$gateSource = (Get-ChildItem $gateDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$brainSource = Get-Content -Raw $brainPage
$activitySource = (Get-Content -Raw $activityPage) + "`n" + ((Get-ChildItem $activityDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n")
$stabilizationSource = (Get-ChildItem $stabilizationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$navigationSource = (Get-ChildItem $navigationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$paletteSource = (Get-ChildItem $paletteDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$missionSource = (Get-ChildItem $missionDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$governanceSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource
$integratedSource = $governanceSource + "`n" + $journalSource + "`n" + $executorSource + "`n" + $gateSource + "`n" + $brainSource + "`n" + $activitySource + "`n" + $stabilizationSource + "`n" + $navigationSource + "`n" + $paletteSource + "`n" + $missionSource

foreach ($export in @(
  "buildBrainMutationBoundaryRegistry",
  "buildBrainMutationBoundary",
  "buildBrainMutationPolicy",
  "isBrainMutationPolicySatisfied",
  "buildDirectMutationDetectorReport",
  "buildDirectMutationSignal",
  "buildReducerImpactGovernance",
  "buildReducerImpactGovernanceItem",
  "buildBrainMutationIntegrityReport",
  "buildBrainMutationIntegrityCheck",
  "buildBrainMutationRiskBoard",
  "buildBrainMutationRiskItem",
  "selectBrainMutationGovernanceNextAction",
  "buildBrainMutationGovernanceNextActionPlan",
  "buildBrainMutationGovernanceSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($marker in @(
  "BrainMutationGovernanceConsole renders",
  "MutationBoundaryRegistryPanel renders",
  "MutationPolicyPanel renders",
  "DirectMutationDetectorPanel renders",
  "ReducerImpactGovernancePanel renders",
  "MutationIntegrityReportPanel renders",
  "MutationRiskBoardPanel renders",
  "GovernanceNextActionPanel renders",
  "BrainMutationGovernanceSafetyNotice renders",
  "BrainMutationGovernanceEmptyState renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

Assert-Contains $pageSource "BrainMutationGovernanceConsole" "/brain-governance imports/renders BrainMutationGovernanceConsole"
Assert-Contains $journalSource "Brain Mutation Governance" "Runtime Event Journal references Brain Mutation Governance if integrated"
Assert-Contains $executorSource "Brain Mutation Governance" "Runtime Event Executor references Brain Mutation Governance if integrated"
Assert-Contains $gateSource "Brain Mutation Governance" "Memory Promotion Gate references Brain Mutation Governance if integrated"
Assert-Contains $brainSource "Brain Mutation Governance" "/brain references Brain Mutation Governance if integrated"
Assert-Contains $activitySource "Brain Mutation Governance" "/activity references Brain Mutation Governance if integrated"
Assert-Contains $stabilizationSource "Brain Mutation Governance readiness" "Stabilization references Brain Mutation Governance if integrated"
Assert-Contains $navigationSource "Brain Governance" "Navigation Shell references Brain Governance if integrated"
Assert-Contains $paletteSource "Go to Brain Mutation Governance" "Command Palette includes Go to Brain Mutation Governance if integrated"
Assert-Contains $paletteSource "Copy brain mutation governance prompt" "Command Palette includes Copy brain mutation governance prompt"
Assert-Contains $missionSource "Brain Mutation Governance readiness" "Mission Control includes Brain Mutation Governance readiness if integrated"

foreach ($text in @(
  "read-only",
  "no direct UI graph mutation",
  "appendEvent is executor-domain-only",
  "no auto-promotion",
  "no graph mutation from UI",
  "evidence is context, not authority",
  "preserve latest-message authority"
)) {
  Assert-Contains $uiSource $text "UI says $text"
}

foreach ($text in @(
  "canonical graph schema required",
  "legacy brain-graph import blocked",
  "direct UI graph mutation blocked",
  "appendEvent from UI blocked",
  "runtime event executor required",
  "reducer preview required"
)) {
  Assert-Contains $domainSource $text "policy $text"
}

foreach ($text in @(
  "Runtime Event Executor",
  "Memory Promotion Gate",
  "Runtime Event Journal",
  "Direct UI mutation block"
)) {
  Assert-Contains $domainSource $text "boundary registry includes $text"
}

foreach ($text in @(
  "appendEvent in UI",
  "brain-graph import",
  "saveBrainGraph from UI"
)) {
  Assert-Contains $domainSource $text "direct mutation detector recognizes $text"
}

foreach ($text in @(
  "memory.promoted",
  "concept.synthesized",
  "failure.detected"
)) {
  Assert-Contains $domainSource $text "reducer governance includes $text"
}

foreach ($text in @(
  "canonical graph schema path",
  "direct UI mutation blocked",
  "smoke coverage present"
)) {
  Assert-Contains $domainSource $text "integrity report checks $text"
}

foreach ($text in @(
  "direct-ui-graph-mutation",
  "silent-memory-promotion",
  "legacy-schema-import"
)) {
  Assert-Contains $domainSource $text "risk board includes $text"
}

Assert-Contains $domainSource "review runtime event journal" "next action can recommend review runtime event journal"
Assert-Contains $domainSource "commit clean checkpoint" "next action can recommend commit clean checkpoint"

Assert-NotMatches $governanceSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "reduceGraph\s*\(|saveBrainGraph\s*\(|loadBrainGraph\s*\(|graph\.nodes\.push|graph\.edges\.push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*apply-diff["'']|applyDiff\s*\(' "no direct apply-diff call from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*write-file["'']|writeFile\s*\(' "no direct write-file call from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*run-command["'']|runCommand\s*\(' "no direct run-command call from UI"
Assert-NotMatches $governanceSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $governanceSource "Math.random" "no Math.random"
Assert-NotContains $governanceSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $governanceSource "d3-force" "no d3-force"
Assert-NotMatches $governanceSource "https?://" "no external network dependency"
Assert-NotMatches $governanceSource "fetch\s*\(" "no external network dependency"
Assert-NotContains $governanceSource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $governanceSource "axios" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $governanceSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'", "openai.chat")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic brain-mutation-governance files: $marker"
}

Assert-NotMatches $governanceSource "localStorage\.setItem\s*\(|sessionStorage\.setItem\s*\(|indexedDB\.open\s*\(|persistGovernance|saveGovernance" "no auto-persistence"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $integratedSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildBrainMutationGovernanceStableKey" "stable key helper exists"
Assert-Contains $uiSource "buildBrainMutationGovernanceReactKey" "stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-brain-mutation-governance\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Brain Mutation Governance exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Brain Mutation Governance" "managed smoke suite includes Brain Mutation Governance exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/brain-governance" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /brain-governance returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /brain-governance route reachable"
} catch {
  Write-Host "[SKIP] /brain-governance route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Brain Mutation Governance smoke passed."
