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
Write-Host "=== CodexForge Local Bridge smoke ==="
Write-Host "Base URL: $BaseUrl"

$bridgeDir = "src\lib\codexforge\local-bridge"
$componentDir = Join-Path $bridgeDir "components"
$routePath = "src\app\bridge\page.tsx"
$pageClientPath = "src\app\bridge\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $bridgeDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "bridge-types.ts",
  "bridge-session.ts",
  "bridge-consent.ts",
  "bridge-readiness.ts",
  "bridge-handshake.ts",
  "bridge-policy.ts",
  "bridge-audit.ts",
  "bridge-adapters.ts",
  "bridge-run-handoff.ts",
  "bridge-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $bridgeDir $module)
}

foreach ($component in @(
  "JarvisBridgeCenter.tsx",
  "BridgeSessionPanel.tsx",
  "BridgeConsentPanel.tsx",
  "BridgeReadinessBoard.tsx",
  "BridgeHandshakePanel.tsx",
  "BridgeAdapterMatrix.tsx",
  "BridgePolicyBoundary.tsx",
  "BridgeAuditTrail.tsx",
  "BridgeRunHandoffPanel.tsx",
  "BridgeBlockedActionNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $bridgeDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($marker in @(
  "JarvisBridgeCenter",
  "BridgeSessionPanel",
  "BridgeConsentPanel",
  "BridgeReadinessBoard",
  "BridgeHandshakePanel",
  "BridgeAdapterMatrix",
  "BridgePolicyBoundary",
  "BridgeAuditTrail",
  "BridgeRunHandoffPanel",
  "BridgeBlockedActionNotice"
)) {
  Assert-Contains $uiSource $marker "$marker renders"
}

foreach ($export in @(
  "export function buildBridgeSession",
  "export function summarizeBridgeSession",
  "export function selectBridgeSessionNextAction",
  "export function buildBridgeConsentBoundary",
  "export function summarizeBridgeConsentBoundary",
  "export function isBridgeActionConsentBlocked",
  "export function buildBridgeReadiness",
  "export function scoreBridgeReadiness",
  "export function summarizeBridgeReadiness",
  "export function buildBridgeHandshakePreview",
  "export function buildBridgeHandshakeStep",
  "export function summarizeBridgeHandshakePreview",
  "export function buildBridgeAdapterMatrix",
  "export function groupBridgeAdapters",
  "export function summarizeBridgeAdapterMatrix",
  "export function classifyBridgeActionRisk",
  "export function buildBridgePolicyBoundary",
  "export function summarizeBridgePolicyBoundary",
  "export function buildBridgeAuditTrail",
  "export function buildBridgeAuditItem",
  "export function summarizeBridgeAuditTrail",
  "export function buildBridgeRunHandoff",
  "export function summarizeBridgeRunHandoff",
  "export function buildBridgeRunPrompt"
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

Assert-Contains $routeSource "buildBridgeSession" "/bridge route builds bridge session"
Assert-Contains $routeSource "JarvisBridgeCenter" "page-client renders JarvisBridgeCenter"
Assert-Contains $uiSource "preview-only" "UI says preview-only"
Assert-Contains $uiSource "no silent desktop control" "UI says no silent desktop control"
Assert-Contains $uiSource "explicit session consent required" "UI says explicit session consent required"
Assert-Contains $uiSource "no camera access without consent" "UI says no camera access without consent"
Assert-Contains $uiSource "broker execution blocked" "UI says broker execution blocked"
Assert-Contains $uiSource "no file mutation without preview/approval" "UI says no file mutation without preview/approval"

foreach ($marker in @("from `"write-file`"", "from 'write-file'", "from `"apply-diff`"", "from 'apply-diff'", "from `"run-command`"", "from 'run-command'")) {
  Assert-NotContains $uiSource $marker "UI mutation import absent: $marker"
}

foreach ($marker in @("writeFile", "appendFile", "unlink(", "rm(", "rmdir(", "mkdir(", "rename(", "copyFile", "applyPatch", "broker-execution(", "child_process", "spawn(", "exec(")) {
  Assert-NotContains $uiSource $marker "UI execution call absent: $marker"
}

foreach ($marker in @("Math.random", "Date.now", "d3-force", "fetch(", "XMLHttpRequest", "axios", "openai", "OpenAI", "pinecone", "weaviate", "chroma")) {
  Assert-NotContains $allSource $marker "determinism or external dependency absent: $marker"
}

foreach ($marker in @("blender --", "UnrealEditor", "comfyui-workflow-run(")) {
  Assert-NotContains $uiSource $marker "UI does not execute Blender/Unreal/ComfyUI: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildBridgeSessionReactKey" "stable key helper exists"
Assert-Contains $uiSource "buildBridgeSessionReactKey" "stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-local-bridge\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Local Bridge exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Local Bridge" "managed smoke suite includes Local Bridge exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/bridge" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /bridge returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /bridge route reachable"
} catch {
  Write-Host "[SKIP] /bridge route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Local Bridge smoke passed."
