param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

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
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name marker: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name marker: $Needle" }
  Write-Host "[PASS] $Name"
}

Write-Host "=== CodexForge brain first-run onboarding smoke ==="
Write-Host "Base URL: $BaseUrl"

$seedingDir = "src\lib\codexforge\brain\runtime\seeding"
$seedingFiles = @(
  "seed-types.ts",
  "graph-seed-builder.ts",
  "onboarding-plan.ts",
  "seed-quality.ts",
  "seed-fixtures.ts",
  "index.ts"
)
$uiFiles = @(
  "src\lib\codexforge\brain\components\brain-first-run-onboarding.tsx",
  "src\lib\codexforge\brain\components\brain-seed-graph-panel.tsx",
  "src\lib\codexforge\brain\components\brain-seed-preview.tsx",
  "src\lib\codexforge\brain\components\brain-onboarding-checklist.tsx"
)
$runtimeIndexPath = "src\lib\codexforge\brain\runtime\index.ts"
$seedingIndexPath = Join-Path $seedingDir "index.ts"
$pageClientPath = "src\app\brain\page-client.tsx"
$commandRegistryPath = "src\lib\codexforge\brain\components\commands\brain-command-registry.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"
$graphViewPath = "src\lib\codexforge\brain\components\brain-graph-view.tsx"

Assert-DirectoryExists $seedingDir
foreach ($file in $seedingFiles) { Assert-FileExists (Join-Path $seedingDir $file) }
foreach ($file in $uiFiles) { Assert-FileExists $file }
Assert-FileExists $runtimeIndexPath
Assert-FileExists $pageClientPath
Assert-FileExists $commandRegistryPath
Assert-FileExists $allSmokePath

$seedingSource = ($seedingFiles | ForEach-Object { Get-Content -Raw (Join-Path $seedingDir $_) }) -join "`n"
$uiSource = ($uiFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$seedingIndexSource = Get-Content -Raw $seedingIndexPath
$runtimeIndexSource = Get-Content -Raw $runtimeIndexPath
$pageSource = Get-Content -Raw $pageClientPath
$commandRegistrySource = Get-Content -Raw $commandRegistryPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$graphViewSource = Get-Content -Raw $graphViewPath
$changedSource = $seedingSource + "`n" + $uiSource + "`n" + $pageSource + "`n" + $runtimeIndexSource

$requiredExports = @(
  "buildCodexForgeBrainSeedGraph",
  "buildCodexForgeBrainSeedNode",
  "buildCodexForgeBrainSeedEdge",
  "summarizeCodexForgeBrainSeedGraph",
  "buildBrainFirstRunOnboardingPlan",
  "buildBrainOnboardingStep",
  "summarizeBrainOnboardingPlan",
  "selectNextOnboardingStep",
  "evaluateBrainSeedQuality",
  "buildBrainSeedQualityGate",
  "validateBrainSeedGraphShape",
  "validateBrainSeedDoesNotOverwrite",
  "buildBrainSeedFixtureEmptyGraph",
  "buildBrainSeedFixtureExistingGraph",
  "buildBrainSeedFixtureSeedGraph",
  "buildBrainSeedFixtureOnboardingPlan",
  "buildBrainSeedFixtureQualityGates"
)

foreach ($exportName in $requiredExports) {
  Assert-Contains $seedingIndexSource $exportName "seeding index export $exportName"
  Assert-Contains $runtimeIndexSource $exportName "runtime index export $exportName"
}

foreach ($typeName in @(
  "CodexForgeBrainSeedKind",
  "CodexForgeBrainSeedStatus",
  "CodexForgeBrainSeedNodePlan",
  "CodexForgeBrainSeedEdgePlan",
  "CodexForgeBrainSeedGraphPlan",
  "CodexForgeBrainSeedQualityGate",
  "CodexForgeBrainSeedPreview",
  "CodexForgeBrainOnboardingStep",
  "CodexForgeBrainOnboardingPlan",
  "CodexForgeBrainSeedBuildInput",
  "CodexForgeBrainSeedSummary"
)) {
  Assert-Contains ($seedingIndexSource + $runtimeIndexSource) $typeName "exported type $typeName"
}

Assert-Contains $uiSource "export function BrainFirstRunOnboarding" "BrainFirstRunOnboarding is exported"
Assert-Contains $uiSource "export function BrainSeedGraphPanel" "BrainSeedGraphPanel is exported"
Assert-Contains $uiSource "export function BrainSeedPreview" "BrainSeedPreview is exported"
Assert-Contains $uiSource "export function BrainOnboardingChecklist" "BrainOnboardingChecklist is exported"

Assert-Contains $pageSource "BrainFirstRunOnboarding" "page-client imports/renders BrainFirstRunOnboarding"
Assert-Contains $pageSource "handleCreateStarterGraph" "page-client contains explicit create starter graph action"
Assert-Contains $pageSource "graph.nodes.length > 0 || graph.edges.length > 0" "page-client blocks non-empty starter graph creation"
Assert-Contains $pageSource "saveBrainGraph(firstRunSeedPlan.graph)" "page-client uses existing graph persistence helper for starter graph"
Assert-NotContains $pageSource "useEffect seed" "page-client does not create starter graph from effect"
Assert-NotContains $pageSource "seed on mount" "page-client does not create starter graph on mount"
Assert-NotContains $pageSource "auto create" "page-client does not auto create starter graph"

$refreshStart = $pageSource.IndexOf("const refreshGraph = useCallback")
$refreshEnd = $pageSource.IndexOf("useEffect(() =>", $refreshStart)
if ($refreshStart -lt 0 -or $refreshEnd -lt $refreshStart) {
  throw "[FAIL] Could not isolate refreshGraph block"
}
$refreshBlock = $pageSource.Substring($refreshStart, $refreshEnd - $refreshStart)
Assert-NotContains $refreshBlock "firstRunSeedPlan" "refreshGraph does not reference starter graph plan"
Assert-NotContains $refreshBlock "saveBrainGraph" "refreshGraph does not persist starter graph"

Assert-NotContains $commandRegistrySource "create-starter-graph" "command palette does not directly execute seed creation"
Assert-NotContains $commandRegistrySource "Create starter graph" "command palette has no mutation command for starter graph"

Assert-Contains $uiSource "data-codexforge-brain-seed-preview" "seed preview marker"
Assert-Contains $uiSource "data-codexforge-brain-no-silent-seed" "seed preview no-silent-seed marker"
Assert-Contains $uiSource "data-codexforge-brain-no-overwrite-seed" "seed preview no-overwrite marker"
Assert-Contains $uiSource "data-codexforge-brain-seed-quality-gate" "seed preview quality gate marker"
Assert-Contains $uiSource "data-codexforge-brain-seed-graph-panel" "seed graph panel marker"
Assert-Contains $uiSource "data-codexforge-brain-create-starter-graph" "seed graph panel create-starter-graph marker"
Assert-Contains $uiSource "data-codexforge-brain-empty-first-run" "onboarding empty-first-run marker"
Assert-Contains $uiSource "data-codexforge-brain-onboarding-checklist" "onboarding checklist marker"

Assert-Contains $seedingSource "from `"@/lib/codexforge/brain/graph/types`"" "seed graph builder imports canonical graph types"
Assert-NotContains $seedingSource 'from "@/lib/codexforge/brain/graph/brain-graph' "seed graph builder does not import legacy brain-graph"
Assert-NotContains $seedingSource 'from "./brain-graph"' "seed graph builder does not import legacy brain-graph relative path"
Assert-Contains $seedingSource "validateBrainSeedDoesNotOverwrite" "seed quality validates no overwrite"
Assert-Contains $seedingSource "seed-unique-node-ids" "seed quality validates unique node ids"
Assert-Contains $seedingSource "seed-edge-endpoints-exist" "seed quality validates edge endpoints"
Assert-Contains $seedingSource "CODEXFORGE_BRAIN_SEED_FIXTURE_TS = 1767225600000" "seed fixture file uses fixed timestamps"

foreach ($concept in @(
  "CodexForge runtime",
  "Cognitive memory",
  "Predictive context",
  "Files runtime",
  "Agent runtime",
  "Tool policy",
  "Approval boundary",
  "Starter health signal",
  "Live snapshot boundary",
  "Panel data integration",
  "Starter recommendation"
)) {
  Assert-Contains $seedingSource $concept "seed graph includes concept $concept"
}

Assert-NotContains $changedSource 'from "@/lib/codexforge/brain/graph/brain-graph' "legacy brain-graph import absent"
Assert-NotContains $changedSource 'from "./brain-graph"' "legacy brain-graph relative import absent"
Assert-NotContains $changedSource "from './brain-graph'" "legacy brain-graph single-quote import absent"
Assert-NotContains $changedSource "Math.random" "random behavior absent"
Assert-NotContains ($changedSource.Replace($graphViewSource, "")) "d3-force" "d3-force not added outside existing graph component"
Assert-NotContains $changedSource "vector database" "vector database dependency absent"
Assert-NotContains $changedSource "embedding" "embeddings dependency absent"

foreach ($needle in @("fetch(", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key", "apiKey", "api_key")) {
  Assert-NotContains $seedingSource $needle "external network/API dependency absent in seeding runtime: $needle"
}

foreach ($needle in @('from "fs"', "from 'fs'", 'from "path"', "from 'path'", "child_process")) {
  Assert-NotContains $seedingSource $needle "direct platform dependency absent in seeding runtime: $needle"
}

foreach ($needle in @("localStorage.setItem", "sessionStorage.setItem")) {
  Assert-NotContains $uiSource $needle "browser storage write dependency absent in seeding UI: $needle"
}

foreach ($needle in @("setInterval", "setTimeout")) {
  Assert-NotContains $uiSource $needle "timer/background-job dependency absent in seeding UI: $needle"
}

foreach ($needle in @("seed on mount", "auto create", "useEffect seed")) {
  Assert-NotContains $changedSource $needle "automatic seeding language absent: $needle"
}

$forbiddenMojibake = @(
  [string][char]0x00C3,
  [string][char]0x00C2,
  [string][char]0x00E2,
  [string][char]0xFFFD
)

foreach ($needle in $forbiddenMojibake) {
  Assert-NotContains $changedSource $needle "mojibake absent"
}

$suiteCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-first-run-onboarding\.ps1")).Count
if ($suiteCount -ne 1) {
  throw "[FAIL] Managed smoke suite should include Brain first-run onboarding exactly once; found $suiteCount"
}
Write-Host "[PASS] managed smoke suite includes Brain first-run onboarding exactly once"

foreach ($scriptName in @(
  "smoke-codexforge-brain-quality-gates.ps1",
  "smoke-codexforge-brain-panel-data-integration.ps1",
  "smoke-codexforge-brain-live-snapshot.ps1",
  "smoke-codexforge-brain-layout-polish.ps1",
  "smoke-codexforge-brain-command-palette.ps1",
  "smoke-codexforge-brain-focus-drilldown.ps1",
  "smoke-codexforge-brain-runtime-health-dashboard.ps1",
  "smoke-codexforge-brain-recommendations.ps1",
  "smoke-codexforge-brain-semantic-topology.ps1",
  "smoke-codexforge-brain-replay-lineage.ps1",
  "smoke-codexforge-brain-command-center.ps1",
  "smoke-codexforge-brain-graph-ui.ps1",
  "smoke-codexforge-brain-runtime.ps1"
)) {
  $count = ([regex]::Matches($allSmokeSource, [regex]::Escape($scriptName))).Count
  if ($count -gt 1) { throw "[FAIL] Smoke script duplicated: $scriptName found $count" }
  Write-Host "[PASS] smoke script not duplicated: $scriptName"
}

Write-Host "[OK] CodexForge brain first-run onboarding smoke passed."
