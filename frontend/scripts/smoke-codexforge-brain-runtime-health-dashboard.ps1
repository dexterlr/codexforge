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

Write-Host "=== CodexForge brain runtime health dashboard smoke ==="
Write-Host "Base URL: $BaseUrl"

$runtimeDir = "src\lib\codexforge\brain\runtime\health"
$runtimeFiles = @(
  "$runtimeDir\health-types.ts",
  "$runtimeDir\health-dashboard.ts",
  "$runtimeDir\subsystem-readiness.ts",
  "$runtimeDir\smoke-coverage.ts",
  "$runtimeDir\safety-posture.ts",
  "$runtimeDir\health-summarizer.ts",
  "$runtimeDir\health-fixtures.ts",
  "$runtimeDir\index.ts"
)
$uiFiles = @(
  "src\lib\codexforge\brain\components\brain-runtime-health-panel.tsx",
  "src\lib\codexforge\brain\components\brain-system-status-panel.tsx",
  "src\lib\codexforge\brain\components\brain-health-inspector.tsx",
  "src\lib\codexforge\brain\components\brain-subsystem-status-card.tsx"
)

if (-not (Test-Path $runtimeDir)) { throw "[FAIL] Missing health runtime directory: $runtimeDir" }
Write-Host "[PASS] health runtime directory exists"
foreach ($file in $runtimeFiles + $uiFiles) { Assert-FileExists $file }

$runtimeIndex = Get-Content -Raw "$runtimeDir\index.ts"
$mainRuntimeIndex = Get-Content -Raw "src\lib\codexforge\brain\runtime\index.ts"
$dashboardSource = Get-Content -Raw "$runtimeDir\health-dashboard.ts"
$readinessSource = Get-Content -Raw "$runtimeDir\subsystem-readiness.ts"
$smokeSource = Get-Content -Raw "$runtimeDir\smoke-coverage.ts"
$safetySource = Get-Content -Raw "$runtimeDir\safety-posture.ts"
$fixtureSource = Get-Content -Raw "$runtimeDir\health-fixtures.ts"
$commandSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-command-center.tsx"
$tabsSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-mode-tabs.tsx"
$typesSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-command-center-types.ts"
$allSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$combinedRuntimeSource = ($runtimeFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$combinedUiSource = ($uiFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$combinedNewSource = "$combinedRuntimeSource`n$combinedUiSource"

$requiredApis = @(
  "buildRuntimeHealthDashboard",
  "buildRuntimeHealthSignal",
  "buildRuntimeHealthSection",
  "normalizeRuntimeHealthSeverity",
  "buildSubsystemReadiness",
  "scoreSubsystemReadiness",
  "summarizeSubsystemReadiness",
  "sortSubsystemReadiness",
  "buildSmokeCoverageMap",
  "summarizeSmokeCoverage",
  "scoreSmokeCoverage",
  "buildRuntimeSafetyPosture",
  "classifyRuntimeSafetySignal",
  "summarizeRuntimeSafetyPosture",
  "summarizeRuntimeHealthDashboard",
  "selectRuntimeHealthHotspots",
  "recommendRuntimeHealthNextSafeAction",
  "summarizeCognitiveSystemStatus",
  "buildRuntimeHealthFixtureDashboard",
  "buildRuntimeHealthFixtureSignals",
  "buildRuntimeHealthFixtureSubsystems",
  "buildRuntimeHealthFixtureSmokeCoverage",
  "buildRuntimeHealthFixtureSafetyPosture"
)

foreach ($api in $requiredApis) {
  Assert-Contains $runtimeIndex $api "health index exports $api"
  Assert-Contains $mainRuntimeIndex $api "main runtime index exports $api"
}

Assert-Contains (Get-Content -Raw $uiFiles[0]) "export function BrainRuntimeHealthPanel" "BrainRuntimeHealthPanel export"
Assert-Contains (Get-Content -Raw $uiFiles[1]) "export function BrainSystemStatusPanel" "BrainSystemStatusPanel export"
Assert-Contains (Get-Content -Raw $uiFiles[2]) "export function BrainHealthInspector" "BrainHealthInspector export"
Assert-Contains (Get-Content -Raw $uiFiles[3]) "export function BrainSubsystemStatusCard" "BrainSubsystemStatusCard export"

Assert-Contains $commandSource "brain-runtime-health-panel" "command center imports BrainRuntimeHealthPanel"
Assert-Contains $commandSource "brain-system-status-panel" "command center imports BrainSystemStatusPanel"
Assert-Contains $commandSource "<BrainRuntimeHealthPanel" "command center renders BrainRuntimeHealthPanel"
Assert-Contains $commandSource "<BrainSystemStatusPanel" "command center renders BrainSystemStatusPanel"
Assert-Contains $tabsSource "id: `"runtime-health`"" "mode tabs include runtime-health"
Assert-Contains $tabsSource "id: `"system-status`"" "mode tabs include system-status"
Assert-Contains $typesSource '| "runtime-health"' "types include runtime-health"
Assert-Contains $typesSource '| "system-status"' "types include system-status"

$markers = @(
  "data-codexforge-brain-subsystem-status-card",
  "data-codexforge-brain-subsystem-status",
  "data-codexforge-brain-subsystem-readiness",
  "data-codexforge-brain-subsystem-next-action",
  "data-codexforge-brain-health-inspector",
  "data-codexforge-brain-runtime-health-panel",
  "data-codexforge-brain-runtime-health-score",
  "data-codexforge-brain-runtime-health-signal",
  "data-codexforge-brain-runtime-contract-status",
  "data-codexforge-brain-runtime-diagnostic-status",
  "data-codexforge-brain-runtime-health-next-action",
  "data-codexforge-brain-system-status-panel",
  "data-codexforge-brain-subsystem-grid",
  "data-codexforge-brain-smoke-coverage",
  "data-codexforge-brain-safety-posture",
  "data-codexforge-brain-cognition-pipeline",
  "data-codexforge-brain-approval-boundary-status"
)
foreach ($marker in $markers) { Assert-Contains ($combinedNewSource + $commandSource) $marker "marker $marker" }

Assert-Contains $fixtureSource "CODEXFORGE_RUNTIME_HEALTH_FIXTURE_TS = 1735689600000" "fixture fixed timestamp constant"
Assert-NotContains $fixtureSource "Date.now" "fixture Date.now absent"
Assert-Contains $readinessSource "Math.min(1, Math.max(0, value))" "readiness scoring clamps between 0 and 1"
Assert-Contains $smokeSource "descriptors" "smoke coverage accepts descriptors as input"
Assert-NotContains $smokeSource "Invoke-Expression" "smoke coverage does not execute scripts"
Assert-NotContains $smokeSource "child_process" "smoke coverage does not execute scripts via child process"
foreach ($needle in @('"read-only"', '"approval-required"', '"blocked"', '"mutation"', '"command"', '"render"', '"external"')) {
  Assert-Contains $safetySource $needle "safety posture includes $needle"
}
foreach ($needle in @("runtimeHealth", "runtimeDiagnostics", "runtimeContract", "recommendationSummary", "smokeCoverage", "subsystemReadiness", "safetyPosture")) {
  Assert-Contains $dashboardSource $needle "health dashboard references $needle"
}
Assert-Contains (Get-Content -Raw $uiFiles[1]) "data-codexforge-brain-cognition-pipeline" "system status panel includes cognition pipeline marker"

Assert-NotContains $combinedNewSource "brain-graph" "legacy brain-graph import absent"
Assert-NotContains $combinedNewSource "Math.random" "random behavior absent"
Assert-NotContains $combinedNewSource "d3-force" "d3-force not added outside graph component"
Assert-NotContains $combinedNewSource "vector database" "vector database dependency absent"
Assert-NotContains $combinedNewSource "embeddings" "embeddings dependency absent"
foreach ($needle in @("fetch(", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key")) {
  Assert-NotContains $combinedNewSource $needle "external network dependency absent: $needle"
}
foreach ($needle in @("from `"fs", "from `"path", "child_process")) {
  Assert-NotContains $combinedRuntimeSource $needle "runtime dependency absent: $needle"
}
foreach ($needle in @("localStorage", "sessionStorage", "setInterval", "setTimeout")) {
  Assert-NotContains $combinedUiSource $needle "UI dependency absent: $needle"
}

$forbiddenMojibake = @([string][char]0x00C3, [string][char]0x00C2, [string][char]0x00E2, [string][char]0xFFFD)
foreach ($needle in $forbiddenMojibake) { Assert-NotContains $combinedNewSource $needle "mojibake absent" }

$suiteCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-runtime-health-dashboard\.ps1")).Count
if ($suiteCount -ne 1) { throw "[FAIL] Managed smoke suite should include Brain runtime health dashboard exactly once; found $suiteCount" }
Write-Host "[PASS] managed smoke suite includes Brain runtime health dashboard exactly once"

foreach ($suite in @("smoke-codexforge-brain-recommendations\.ps1", "smoke-codexforge-brain-semantic-topology\.ps1", "smoke-codexforge-brain-replay-lineage\.ps1", "smoke-codexforge-brain-command-center\.ps1", "smoke-codexforge-brain-graph-ui\.ps1", "smoke-codexforge-brain-runtime\.ps1")) {
  $count = ([regex]::Matches($allSmokeSource, $suite)).Count
  if ($count -ne 1) { throw "[FAIL] Existing brain smoke should remain exactly once: $suite found $count" }
  Write-Host "[PASS] existing brain smoke remains exactly once: $suite"
}

Write-Host "[OK] CodexForge brain runtime health dashboard smoke passed."
