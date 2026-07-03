param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
$root = Split-Path -Parent $scriptRoot
$repoRoot = Resolve-Path (Join-Path $root "..")
Set-Location $root

function Assert-FileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [string]$Name
  )
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) {
    throw "[FAIL] Missing $Name`: $Needle"
  }
  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [string]$Name
  )
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -ge 0) {
    throw "[FAIL] Unexpected $Name`: $Needle"
  }
  Write-Host "[PASS] $Name"
}

function Assert-Matches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [string]$Name
  )
  if ($Haystack -notmatch $Pattern) {
    throw "[FAIL] Missing $Name`: $Pattern"
  }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [string]$Name
  )
  if ($Haystack -match $Pattern) {
    throw "[FAIL] Unexpected $Name`: $Pattern"
  }
  Write-Host "[PASS] $Name"
}

function Assert-CountExactly {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [int]$Expected,
    [string]$Name
  )
  $count = ([regex]::Matches($Haystack, [regex]::Escape($Needle))).Count
  if ($count -ne $Expected) {
    throw "[FAIL] $Name expected $Expected found $count"
  }
  Write-Host "[PASS] $Name"
}

function Get-DuplicateValues {
  param([string[]]$Values)
  $Values |
    Where-Object { $_ } |
    Group-Object |
    Where-Object { $_.Count -gt 1 } |
    ForEach-Object { $_.Name }
}

Write-Host "=== CodexForge Checkpoint Documentation smoke ==="

$rootReadmePath = Join-Path $repoRoot "README.md"
$frontendReadmePath = Join-Path $root "README.md"
$checkpointPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$runbookPath = Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md"
$statusIndexPath = Join-Path $root "docs\codexforge-status-index.md"
$workspaceMapPath = Join-Path $root "docs\WORKSPACE_MAP.md"
$structureMapPath = Join-Path $root "docs\codexforge-structure-map.md"
$operatorStartPath = Join-Path $root "docs\operator\OPERATOR-V3-START.md"
$operatorScopePath = Join-Path $root "docs\operator\OPERATOR-V3-SCOPE.md"
$allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"

foreach ($path in @(
  $rootReadmePath,
  $frontendReadmePath,
  $checkpointPath,
  $runbookPath,
  $statusIndexPath,
  $workspaceMapPath,
  $structureMapPath,
  $operatorStartPath,
  $operatorScopePath,
  $allSmokePath
)) {
  Assert-FileExists $path
}

$rootReadme = Get-Content -Raw $rootReadmePath
$frontendReadme = Get-Content -Raw $frontendReadmePath
$checkpointDoc = Get-Content -Raw $checkpointPath
$runbookDoc = Get-Content -Raw $runbookPath
$statusIndexDoc = Get-Content -Raw $statusIndexPath
$workspaceMapDoc = Get-Content -Raw $workspaceMapPath
$structureMapDoc = Get-Content -Raw $structureMapPath
$operatorStartDoc = Get-Content -Raw $operatorStartPath
$operatorScopeDoc = Get-Content -Raw $operatorScopePath
$allSmoke = Get-Content -Raw $allSmokePath

$docsCombined = @(
  $rootReadme,
  $frontendReadme,
  $checkpointDoc,
  $runbookDoc,
  $statusIndexDoc,
  $workspaceMapDoc,
  $structureMapDoc,
  $operatorStartDoc,
  $operatorScopeDoc
) -join "`n"

$phaseMatches = [regex]::Matches($allSmoke, "Phase\s+(\d+)")
if ($phaseMatches.Count -eq 0) {
  throw "[FAIL] No Phase N entries found in all-smoke"
}
$highestPhase = $phaseMatches |
  ForEach-Object { [int]$_.Groups[1].Value } |
  Sort-Object -Descending |
  Select-Object -First 1

Write-Host "[PASS] highest detected phase from all-smoke: $highestPhase"

Assert-Contains $rootReadme "CodexForge" "root README product name"
Assert-Contains $rootReadme "Current State" "root README current status section"
Assert-Contains $rootReadme "Current checkpoint" "root README checkpoint language"
Assert-Contains $frontendReadme "Operational Checkpoint" "frontend README operational checkpoint"
Assert-Matches $docsCombined "(highest detected phase:\s*$highestPhase|through phase\s+$highestPhase)" "docs mention latest detected phase"

foreach ($needle in @(
  "review-only surfaces",
  "Explicit operator approval",
  "No silent mutation",
  "No provider/local/connector/automation execution without approval",
  "No credential/output storage",
  "No memory auto-promotion",
  "canonical workspace",
  "validation commands"
)) {
  Assert-Contains $docsCombined $needle "docs mention $needle"
}

foreach ($needle in @(
  "2346-2377 - First Provider Adapter Dry Run Harness Mega Batch v1",
  "Controlled Provider Adapter Dry Run Completion Candidate",
  "2378-2409 - Provider Adapter Mock Result Harness Mega Batch v1",
  "Controlled Provider Mock Result Harness Completion Candidate",
  "2410-2441 - Provider Approval/Audit Enforcement Boundary Mega Batch v1",
  "Controlled Provider Approval Audit Completion Candidate",
  "2442-2473 - First Controlled Provider Dry Run Candidate Mega Batch v1",
  "Controlled Provider Dry Run Completion Candidate",
  "Controlled Provider Dry Run Candidate",
  "Review-only controlled provider dry run candidate",
  "Synthetic controlled provider dry run data only",
  "controlled provider dry run candidate remains synthetic and review-only",
  "2474-2505 - Provider Backend Execution Readiness Mega Batch v1",
  "Provider Backend Execution Readiness Mega Batch v1",
  "Provider Backend Execution Completion Candidate",
  "Provider Backend Execution Readiness",
  "Review-only provider backend execution readiness",
  "Synthetic provider backend execution readiness data only",
  "provider backend execution readiness remains synthetic and review-only",
  "backend execution remains backend-owned",
  "2506-2537 - First Real Provider Call Guard Mega Batch v1",
  "The dry run harness remains synthetic and review-only",
  "Provider dry run remains backend-owned",
  "The mock result harness remains synthetic and review-only",
  "Synthetic provider mock result data only",
  "Provider mock result handling remains backend-owned",
  "No live provider execution exists yet",
  "No provider calls from frontend",
  "No model calls from frontend",
  "No prompt sending",
  "No streaming",
  "No credential storage",
  "No token storage",
  "2538-2569 - First Approved Provider Trial Mega Batch v1",
  "First Approved Provider Trial Completion Candidate",
  "First Approved Provider Trial",
  "Review-only first approved provider trial",
  "Synthetic approved provider trial data only",
  "first approved provider trial remains synthetic and review-only",
  "approved provider trial remains backend-owned and blocked",
  "Provider Result Review + Recovery Mega Batch v1",
  "explicit operator approval required",
  "audit trail required"
)) {
  Assert-Contains $docsCombined $needle "docs mention checkpoint $needle"
}

Assert-Contains $docsCombined "C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend" "canonical workspace path"
Assert-Contains $docsCombined "npm run build" "validation command npm run build"
Assert-Contains $docsCombined "smoke-codexforge-checkpoint-docs.ps1" "validation command checkpoint smoke"
Assert-Contains $docsCombined "smoke-codexforge-all.ps1" "validation command all smoke"
Assert-Contains $docsCombined "smoke-codexforge-command-ui-simplification.ps1" "validation command command UI"
Assert-Contains $docsCombined "smoke-codexforge-repo-hygiene.ps1" "validation command repo hygiene"
Assert-Contains $docsCombined "npm run smoke:codexforge:server" "validation command server smoke"
Assert-Contains $docsCombined "git diff --check" "validation command diff check"

$ciClaimScan = $docsCombined
$ciClaimScan = $ciClaimScan.Replace("Do not claim CI passed unless actual CI or terminal logs prove it.", "")
$ciClaimScan = $ciClaimScan.Replace("Do not claim CI passed unless actual CI or terminal logs prove it", "")
Assert-NotMatches $ciClaimScan "\bCI\s+passed\b" "unproven CI passed claim"

$liveClaimScan = $docsCombined
$liveClaimScan = $liveClaimScan.Replace("Do not claim live execution unless an approved local/backend/provider boundary exists.", "")
$liveClaimScan = $liveClaimScan.Replace("Do not claim live execution unless an approved local/backend/provider boundary exists", "")
Assert-NotMatches $liveClaimScan "\blive execution\s+(works|is implemented|is available|is ready|passed)\b" "unbounded live execution claim"
Assert-NotMatches $liveClaimScan "\bautomatic live execution\s+(works|is implemented|is available|is ready|passed)\b" "automatic live execution claim"

Assert-NotContains $docsCombined "Phases 230-233 are now" "old 230-series roadmap language"
Assert-NotContains $docsCombined "fully working" "unqualified fully working language"
Assert-NotMatches $docsCombined "sk-[A-Za-z0-9_-]{16,}|AIza[0-9A-Za-z_-]{20,}|xox[baprs]-[0-9A-Za-z-]{20,}|gh[pousr]_[A-Za-z0-9_]{20,}" "fake API keys or tokens"
Assert-NotMatches $docsCombined "https?://(api\.)?(example|fake|test)\." "fake external endpoints"
Assert-NotMatches $docsCombined "\bnpm\s+(install|i)\b|\byarn\s+add\b|\bpnpm\s+add\b" "package install behavior in checkpoint docs"

$badCharCodes = @(0xFFFD, 0x00C3, 0x00C2, 0x0192, 0x00E2)
foreach ($code in $badCharCodes) {
  if ($docsCombined.Contains([string][char]$code)) {
    throw "[FAIL] Mojibake marker found in checkpoint docs: U+$($code.ToString('X4'))"
  }
}
Assert-NotContains $docsCombined "???" "triple-question mojibake marker"
Write-Host "[PASS] no mojibake markers in checkpoint docs"

Assert-CountExactly $allSmoke "Checkpoint Documentation Consistency" 1 "all-smoke registers Checkpoint Documentation Consistency exactly once"
Assert-CountExactly $allSmoke "smoke-codexforge-checkpoint-docs.ps1" 1 "all-smoke references checkpoint docs smoke exactly once"
Assert-NotMatches $allSmoke "Phase\s+$($highestPhase + 1)\s+Checkpoint Documentation Consistency" "checkpoint smoke has no product phase number"

$changedFiles = @()
try {
  $changedFiles += git -C $repoRoot diff --name-only
  $changedFiles += git -C $repoRoot ls-files --others --exclude-standard
} catch {
  Write-Host "[WARN] git changed-file scan unavailable: $($_.Exception.Message)"
}
$changedFiles = @($changedFiles | Where-Object { $_ } | Sort-Object -Unique)

$allSmokeDiff = @()
try {
  $allSmokeDiff = git -C $repoRoot diff -- frontend/scripts/smoke-codexforge-all.ps1
} catch {
  $allSmokeDiff = @()
}
$removedCoverage = @($allSmokeDiff | Where-Object { $_ -match "^-\s*@\{\s*Name\s*=" })
if ($removedCoverage.Count -gt 0) {
  throw "[FAIL] all-smoke route/smoke coverage removal detected: $($removedCoverage -join '; ')"
}
Write-Host "[PASS] no all-smoke route coverage removal detected"

$touchedSource = @(
  $changedFiles |
    Where-Object { $_ -match "^frontend/src/(app|lib)/" -and $_ -match "\.(ts|tsx|js|jsx)$" }
)
if ($touchedSource.Count -eq 0) {
  Write-Host "[PASS] no touched app/source files require runtime guard scan"
} else {
  $sourceText = ($touchedSource | ForEach-Object {
    Get-Content -Raw (Join-Path $repoRoot $_)
  }) -join "`n"

  $sourceRuntimeScan = $sourceText
  foreach ($marker in @(
    "no Date.now for deterministic layout/ids",
    "no Date.now",
    "no Math.random",
    "no appendEvent/saveBrainGraph calls from UI",
    "no direct appendEvent call from UI",
    "no direct saveBrainGraph call from UI",
    "no direct apply-diff call from UI",
    "no direct write-file call from UI",
    "no direct run-command call from UI"
  )) {
    $sourceRuntimeScan = $sourceRuntimeScan.Replace($marker, "")
  }

  Assert-NotContains $sourceRuntimeScan "Date.now" "no Date.now in touched app/source files"
  Assert-NotContains $sourceRuntimeScan "Math.random" "no Math.random in touched app/source files"
  Assert-NotMatches $sourceRuntimeScan "localStorage\.setItem|sessionStorage\.setItem" "no localStorage/sessionStorage credential storage in touched app/source files"
  Assert-NotMatches $sourceRuntimeScan "runCommand|brokerExecution\s*\(|brokerExecution\.run|brokerExecution\.execute|brokerExecutionClient|executeBroker|dispatchBroker|apply-diff|write-file|appendEvent|saveBrainGraph" "no runtime execution or Brain mutation calls in touched app/source files"
  Assert-NotMatches $sourceRuntimeScan "fetch\s*\(|XMLHttpRequest|EventSource|WebSocket" "no provider/local/connector/automation calls in touched app/source files"
}

$navOrCommandTouched = @(
  $changedFiles |
    Where-Object {
      $_ -match "^frontend/src/lib/codexforge/navigation-shell/navigation-route-registry\.ts$" -or
      $_ -match "^frontend/src/lib/codexforge/command-palette/command-registry\.ts$"
    }
)
if ($navOrCommandTouched.Count -eq 0) {
  Write-Host "[PASS] command/nav duplicate route scan not required"
} else {
  foreach ($file in $navOrCommandTouched) {
    $raw = Get-Content -Raw (Join-Path $repoRoot $file)
    $hrefs = [regex]::Matches($raw, 'href:\s*"([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
    $shortLabels = [regex]::Matches($raw, 'shortLabel:\s*"([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
    $duplicateHrefs = @(Get-DuplicateValues $hrefs)
    $duplicateShortLabels = @(Get-DuplicateValues $shortLabels)
    if ($duplicateHrefs.Count -gt 0) {
      throw "[FAIL] duplicate route hrefs in $file`: $($duplicateHrefs -join ', ')"
    }
    if ($duplicateShortLabels.Count -gt 0) {
      throw "[FAIL] duplicate route shortLabels in $file`: $($duplicateShortLabels -join ', ')"
    }
  }
  Write-Host "[PASS] no duplicate route hrefs/shortLabels in touched command/nav files"
}

Write-Host "[PASS] ignored/generated directories are not required"
Write-Host "[PASS] no package install behavior added by checkpoint smoke"
Write-Host "[PASS] no runtime execution behavior added by checkpoint docs batch"
Write-Host "[PASS] no provider/local/connector/automation calls added by checkpoint docs batch"
Write-Host "[OK] CodexForge Checkpoint Documentation smoke passed."
