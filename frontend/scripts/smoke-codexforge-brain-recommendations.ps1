param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing expected $Name marker: $Needle" }
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

Write-Host "=== CodexForge brain recommendations smoke ==="
Write-Host "Base URL: $BaseUrl"

$runtimeDir = "src\lib\codexforge\brain\runtime\recommendations"
$runtimeFiles = @(
  "$runtimeDir\recommendation-types.ts",
  "$runtimeDir\recommendation-engine.ts",
  "$runtimeDir\insight-queue.ts",
  "$runtimeDir\recommendation-prioritizer.ts",
  "$runtimeDir\action-safety.ts",
  "$runtimeDir\recommendation-summarizer.ts",
  "$runtimeDir\recommendation-fixtures.ts",
  "$runtimeDir\index.ts"
)
$uiFiles = @(
  "src\lib\codexforge\brain\components\brain-recommendations-panel.tsx",
  "src\lib\codexforge\brain\components\brain-insight-queue-panel.tsx",
  "src\lib\codexforge\brain\components\brain-insight-inspector.tsx",
  "src\lib\codexforge\brain\components\brain-recommendation-card.tsx"
)

if (-not (Test-Path $runtimeDir)) { throw "[FAIL] Missing recommendations runtime directory: $runtimeDir" }
Write-Host "[PASS] recommendations runtime directory exists"
foreach ($file in $runtimeFiles + $uiFiles) { Assert-FileExists $file }

$runtimeIndex = Get-Content -Raw "$runtimeDir\index.ts"
$mainRuntimeIndex = Get-Content -Raw "src\lib\codexforge\brain\runtime\index.ts"
$engineSource = Get-Content -Raw "$runtimeDir\recommendation-engine.ts"
$queueSource = Get-Content -Raw "$runtimeDir\insight-queue.ts"
$prioritizerSource = Get-Content -Raw "$runtimeDir\recommendation-prioritizer.ts"
$actionSafetySource = Get-Content -Raw "$runtimeDir\action-safety.ts"
$fixtureSource = Get-Content -Raw "$runtimeDir\recommendation-fixtures.ts"
$typesSourceRuntime = Get-Content -Raw "$runtimeDir\recommendation-types.ts"
$commandSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-command-center.tsx"
$tabsSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-mode-tabs.tsx"
$typesSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-command-center-types.ts"
$allSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$combinedRuntimeSource = ($runtimeFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$combinedUiSource = ($uiFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$combinedNewSource = "$combinedRuntimeSource`n$combinedUiSource"

$requiredApis = @(
  "buildRuntimeRecommendations",
  "buildRiskRecommendations",
  "buildMemoryRecommendations",
  "buildTopologyRecommendations",
  "buildAgentRecommendations",
  "buildContextRecommendations",
  "buildInsightQueue",
  "buildRuntimeInsight",
  "groupInsightsByKind",
  "filterResolvedInsights",
  "prioritizeRuntimeRecommendations",
  "scoreRuntimeRecommendation",
  "normalizeRecommendationScore",
  "getRecommendationSeverityWeight",
  "classifyRecommendationActionSafety",
  "buildReadOnlyRecommendationAction",
  "buildApprovalRequiredRecommendationAction",
  "summarizeRecommendationActionSafety",
  "summarizeRuntimeRecommendations",
  "summarizeInsightQueue",
  "selectTopRuntimeInsights",
  "recommendNextSafeBrainAction",
  "buildRecommendationFixtureGraph",
  "buildRecommendationFixtureEvents",
  "buildRecommendationFixtureMemory",
  "buildRecommendationFixtureContext",
  "buildRecommendationFixtureTopology",
  "buildRecommendationFixtureAgents",
  "buildRecommendationFixtureQueue"
)

foreach ($api in $requiredApis) {
  Assert-Contains $runtimeIndex $api "recommendations index exports $api"
  Assert-Contains $mainRuntimeIndex $api "main runtime index exports $api"
}

Assert-Contains (Get-Content -Raw $uiFiles[0]) "export function BrainRecommendationsPanel" "BrainRecommendationsPanel export"
Assert-Contains (Get-Content -Raw $uiFiles[1]) "export function BrainInsightQueuePanel" "BrainInsightQueuePanel export"
Assert-Contains (Get-Content -Raw $uiFiles[2]) "export function BrainInsightInspector" "BrainInsightInspector export"
Assert-Contains (Get-Content -Raw $uiFiles[3]) "export function BrainRecommendationCard" "BrainRecommendationCard export"

Assert-Contains $commandSource "brain-recommendations-panel" "command center imports BrainRecommendationsPanel"
Assert-Contains $commandSource "brain-insight-queue-panel" "command center imports BrainInsightQueuePanel"
Assert-Contains $commandSource "<BrainRecommendationsPanel" "command center renders BrainRecommendationsPanel"
Assert-Contains $commandSource "<BrainInsightQueuePanel" "command center renders BrainInsightQueuePanel"
Assert-Contains $tabsSource "id: `"recommendations`"" "mode tabs include recommendations"
Assert-Contains $tabsSource "id: `"insight-queue`"" "mode tabs include insight-queue"
Assert-Contains $typesSource '| "recommendations"' "types include recommendations"
Assert-Contains $typesSource '| "insight-queue"' "types include insight-queue"

$markers = @(
  "data-codexforge-brain-recommendation-card",
  "data-codexforge-brain-recommendation-severity",
  "data-codexforge-brain-recommendation-action",
  "data-codexforge-brain-recommendation-evidence",
  "data-codexforge-brain-insight-inspector",
  "data-codexforge-brain-recommendations-panel",
  "data-codexforge-brain-recommendations-summary",
  "data-codexforge-brain-recommendation-next-action",
  "data-codexforge-brain-approval-boundary",
  "data-codexforge-brain-insight-queue-panel",
  "data-codexforge-brain-insight-queue-group",
  "data-codexforge-brain-insight-queue-item",
  "data-codexforge-brain-insight-queue-summary",
  "data-codexforge-brain-autonomous-insight-queue"
)
foreach ($marker in $markers) { Assert-Contains ($combinedNewSource + $commandSource) $marker "marker $marker" }

Assert-Contains $fixtureSource "CODEXFORGE_RECOMMENDATION_FIXTURE_TS" "fixture fixed timestamp constant"
Assert-NotContains $fixtureSource "Date.now" "fixture Date.now absent"
Assert-Contains $prioritizerSource "Math.min(1, Math.max(0, value))" "prioritizer clamps score between 0 and 1"
foreach ($needle in @('"read-only"', '"approval-required"', '"blocked"', '"deferred"')) {
  Assert-Contains $actionSafetySource $needle "action safety includes $needle"
}
foreach ($needle in @("byKind", "byStatus", "bySeverity")) {
  Assert-Contains $queueSource $needle "insight queue includes $needle grouping"
}
foreach ($needle in @("buildRiskRecommendations(input)", "buildMemoryRecommendations(input)", "buildTopologyRecommendations(input)", "buildAgentRecommendations(input)", "buildContextRecommendations(input)")) {
  Assert-Contains $engineSource $needle "engine references $needle"
}
foreach ($kind in @(
  "inspect-risk",
  "stabilize-runtime",
  "curate-memory",
  "resolve-contradiction",
  "review-architecture",
  "inspect-file-hotspot",
  "verify-execution",
  "review-agent-handoff",
  "promote-concept",
  "refresh-context",
  "protect-approval-boundary",
  "plan-next-step"
)) {
  Assert-Contains $typesSourceRuntime $kind "recommendation kind $kind"
  Assert-Contains $combinedRuntimeSource $kind "runtime emits or fixtures include $kind"
}

Assert-NotContains $combinedNewSource "brain-graph" "legacy brain-graph import absent"
Assert-NotContains $combinedNewSource "Math.random" "random behavior absent"
Assert-NotContains $combinedNewSource "d3-force" "d3-force not added outside graph component"
Assert-NotContains $combinedNewSource "vector database" "vector database dependency absent"
Assert-NotContains $combinedNewSource "embedding" "dependency absent: embedding"
foreach ($needle in @("fetch(", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key", "from `"fs", "from `"path", "child_process")) {
  Assert-NotContains $combinedNewSource $needle "forbidden dependency absent: $needle"
}
foreach ($needle in @("localStorage", "sessionStorage", "setInterval", "setTimeout")) {
  Assert-NotContains $combinedUiSource $needle "UI dependency absent: $needle"
}

$forbiddenMojibake = @([string][char]0x00C3, [string][char]0x00C2, [string][char]0x00E2, [string][char]0xFFFD)
foreach ($needle in $forbiddenMojibake) { Assert-NotContains $combinedNewSource $needle "mojibake absent" }

$suiteCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-recommendations\.ps1")).Count
if ($suiteCount -ne 1) { throw "[FAIL] Managed smoke suite should include Brain recommendations exactly once; found $suiteCount" }
Write-Host "[PASS] managed smoke suite includes Brain recommendations exactly once"

foreach ($suite in @("smoke-codexforge-brain-semantic-topology\.ps1", "smoke-codexforge-brain-replay-lineage\.ps1", "smoke-codexforge-brain-command-center\.ps1", "smoke-codexforge-brain-graph-ui\.ps1", "smoke-codexforge-brain-runtime\.ps1")) {
  $count = ([regex]::Matches($allSmokeSource, $suite)).Count
  if ($count -ne 1) { throw "[FAIL] Existing brain smoke should remain exactly once: $suite found $count" }
  Write-Host "[PASS] existing brain smoke remains exactly once: $suite"
}

Write-Host "[OK] CodexForge brain recommendations smoke passed."
