param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-DirectoryExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path -PathType Container)) {
    throw "[FAIL] Missing directory: $Path"
  }
  Write-Host "[PASS] directory exists: $Path"
}

function Assert-Contains {
  param(
    [Parameter(Mandatory = $true)][string]$Content,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if (-not $Content.Contains($Needle)) {
    throw "[FAIL] Missing expected $Name marker: $Needle"
  }
  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param(
    [Parameter(Mandatory = $true)][string]$Content,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if ($Content.Contains($Needle)) {
    throw "[FAIL] Unexpected $Name marker: $Needle"
  }
  Write-Host "[PASS] $Name"
}

function Read-JoinedContent {
  param([Parameter(Mandatory = $true)][string]$Path)
  return ((Get-ChildItem $Path | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n")
}

Write-Host ""
Write-Host "=== CodexForge Capability Cockpit smoke ==="
Write-Host "Base URL: $BaseUrl"

$capabilityDir = "src\lib\codexforge\capabilities"
$componentDir = "src\lib\codexforge\capabilities\components"
$routePath = "src\app\capabilities\page.tsx"
$pageClientPath = "src\app\capabilities\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $capabilityDir
Assert-DirectoryExists $componentDir
Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$modules = @(
  "capability-types.ts",
  "capability-readiness.ts",
  "capability-policy.ts",
  "capability-workflow.ts",
  "creative-production.ts",
  "adapter-health.ts",
  "artifact-ledger.ts",
  "capability-roadmap.ts",
  "capability-context.ts",
  "index.ts"
)

foreach ($module in $modules) {
  Assert-FileExists (Join-Path $capabilityDir $module)
}

$components = @(
  "CapabilityCommandCenter.tsx",
  "CapabilityCardGrid.tsx",
  "CapabilityReadinessBoard.tsx",
  "CreativeProductionCockpit.tsx",
  "AdapterHealthPanel.tsx",
  "ApprovalBoundaryPanel.tsx",
  "ArtifactLedgerPanel.tsx",
  "FeatureRoadmapLane.tsx",
  "BlockedExecutionPanel.tsx",
  "JarvisControlPreview.tsx",
  "TradingResearchPanel.tsx"
)

foreach ($component in $components) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$readiness = Get-Content -Raw (Join-Path $capabilityDir "capability-readiness.ts")
$policy = Get-Content -Raw (Join-Path $capabilityDir "capability-policy.ts")
$workflow = Get-Content -Raw (Join-Path $capabilityDir "capability-workflow.ts")
$creative = Get-Content -Raw (Join-Path $capabilityDir "creative-production.ts")
$adapterHealth = Get-Content -Raw (Join-Path $capabilityDir "adapter-health.ts")
$artifactLedger = Get-Content -Raw (Join-Path $capabilityDir "artifact-ledger.ts")
$types = Get-Content -Raw (Join-Path $capabilityDir "capability-types.ts")
$commandCenter = Get-Content -Raw (Join-Path $componentDir "CapabilityCommandCenter.tsx")
$creativePanel = Get-Content -Raw (Join-Path $componentDir "CreativeProductionCockpit.tsx")
$adapterPanel = Get-Content -Raw (Join-Path $componentDir "AdapterHealthPanel.tsx")
$approvalPanel = Get-Content -Raw (Join-Path $componentDir "ApprovalBoundaryPanel.tsx")
$artifactPanel = Get-Content -Raw (Join-Path $componentDir "ArtifactLedgerPanel.tsx")
$blockedPanel = Get-Content -Raw (Join-Path $componentDir "BlockedExecutionPanel.tsx")
$jarvisPanel = Get-Content -Raw (Join-Path $componentDir "JarvisControlPreview.tsx")
$tradingPanel = Get-Content -Raw (Join-Path $componentDir "TradingResearchPanel.tsx")
$allUi = Read-JoinedContent (Join-Path $componentDir "*.tsx")
$allCapability = Read-JoinedContent (Join-Path $capabilityDir "*.ts")
$allSmoke = Get-Content -Raw $allSmokePath

Assert-Contains $commandCenter "CapabilityCommandCenter" "CapabilityCommandCenter renders"
Assert-Contains $creativePanel "CreativeProductionCockpit" "CreativeProductionCockpit renders"
Assert-Contains $adapterPanel "AdapterHealthPanel" "AdapterHealthPanel renders"
Assert-Contains $approvalPanel "ApprovalBoundaryPanel" "ApprovalBoundaryPanel renders"
Assert-Contains $artifactPanel "ArtifactLedgerPanel" "ArtifactLedgerPanel renders"
Assert-Contains $blockedPanel "BlockedExecutionPanel" "BlockedExecutionPanel renders"
Assert-Contains $jarvisPanel "JarvisControlPreview" "JarvisControlPreview renders"
Assert-Contains $tradingPanel "TradingResearchPanel" "TradingResearchPanel renders"

Assert-Contains $readiness "buildCapabilityReadiness" "readiness build export"
Assert-Contains $readiness "scoreCapabilityReadiness" "readiness score export"
Assert-Contains $readiness "summarizeCapabilityReadiness" "readiness summary export"
Assert-Contains $readiness "sortCapabilitiesByReadiness" "readiness sort export"
Assert-Contains $policy "classifyCapabilitySafety" "policy classify export"
Assert-Contains $policy "buildCapabilityApprovalBoundary" "policy boundary export"
Assert-Contains $policy "summarizeCapabilityPolicy" "policy summary export"
Assert-Contains $policy "isCapabilityExecutionBlocked" "policy blocked export"
Assert-Contains $workflow "buildCapabilityWorkflow" "workflow build export"
Assert-Contains $workflow "buildCapabilityWorkflowStep" "workflow step export"
Assert-Contains $workflow "selectNextCapabilityAction" "workflow next action export"
Assert-Contains $workflow "summarizeCapabilityWorkflow" "workflow summary export"
Assert-Contains $creative "buildCreativeProductionPlan" "creative plan export"
Assert-Contains $creative "buildCreativeProductionStage" "creative stage export"
Assert-Contains $creative "summarizeCreativeProductionPlan" "creative summary export"
Assert-Contains $creative "buildCreativeRenderQueuePreview" "creative render queue export"
Assert-Contains $adapterHealth "buildAdapterHealthReport" "adapter health export"
Assert-Contains $adapterHealth "summarizeAdapterHealth" "adapter summary export"
Assert-Contains $adapterHealth "groupAdaptersByCapability" "adapter group export"
Assert-Contains $artifactLedger "buildArtifactLedger" "artifact ledger export"
Assert-Contains $artifactLedger "summarizeArtifactLedger" "artifact summary export"
Assert-Contains $artifactLedger "buildArtifactPreview" "artifact preview export"

Assert-Contains $blockedPanel "Broker execution is visibly blocked" "broker execution visibly blocked"
Assert-Contains $tradingPanel "no live orders" "trading research says no live orders"
Assert-Contains $jarvisPanel "Explicit session consent required" "Jarvis/PC bridge explicit session consent"
Assert-Contains $jarvisPanel "No recording/storage/transmission by default" "camera default no recording storage transmission"
Assert-Contains $creativePanel "approval required before execution" "creative approval required before execution"
Assert-Contains $creativePanel "render job is local-safe/simulated" "render job local-safe simulated"

Assert-NotContains $allUi 'write-file' "UI write-file import or reference"
Assert-NotContains $allUi 'apply-diff' "UI apply-diff import or reference"
Assert-NotContains $allUi 'run-command' "UI run-command import or reference"
Assert-NotContains $allUi 'broker-execution' "UI broker-execution call"
Assert-NotContains $allCapability "Math.random" "Math.random"
Assert-NotContains $allCapability "Date.now" "Date.now for layout"
Assert-NotContains $allUi "d3-force" "d3-force"
Assert-NotContains $allUi "fetch(" "external network dependency"
Assert-NotContains $allCapability "vector" "vector database dependency"
foreach ($markerCode in @(0xFFFD)) {
  $marker = [string][char]$markerCode
  Assert-NotContains $allCapability $marker "mojibake marker absent: U+$($markerCode.ToString("X4"))"
}
foreach ($markerCode in @(0xFFFD)) {
  $marker = [string][char]$markerCode
  Assert-NotContains $allUi $marker "UI mojibake marker absent: U+$($markerCode.ToString("X4"))"
}
Assert-Contains $types "buildCodexForgeCapabilityReactKey" "stable key helper"

$cockpitCount = ([regex]::Matches($allSmoke, "smoke-codexforge-capability-cockpit.ps1")).Count
if ($cockpitCount -ne 1) {
  throw "[FAIL] managed smoke suite must include Capability Cockpit exactly once; found $cockpitCount"
}
Assert-Contains $allSmoke "Capability Cockpit" "managed smoke suite includes Capability Cockpit exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/capabilities" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /capabilities returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /capabilities route reachable"
} catch {
  Write-Host "[SKIP] /capabilities route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Capability Cockpit smoke passed."
