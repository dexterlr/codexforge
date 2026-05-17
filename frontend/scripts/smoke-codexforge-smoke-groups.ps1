param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
$repoRoot = Split-Path -Parent $scriptRoot
Set-Location $repoRoot

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

Write-Host ""
Write-Host "=== CodexForge smoke group structure smoke ==="
Write-Host "Base URL: $BaseUrl"

$groupFiles = @(
  "smoke-codexforge-core.ps1",
  "smoke-codexforge-ui.ps1",
  "smoke-codexforge-brain-suite.ps1",
  "smoke-codexforge-memory-suite.ps1",
  "smoke-codexforge-files-suite.ps1",
  "smoke-codexforge-execution-suite.ps1",
  "smoke-codexforge-artifacts-suite.ps1",
  "smoke-codexforge-creative-suite.ps1"
)

$allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
Assert-FileExists $allSmokePath
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($groupFile in $groupFiles) {
  $path = Join-Path $scriptRoot $groupFile
  Assert-FileExists $path
  $source = Get-Content -Raw $path
  Assert-Contains $source '$BaseUrl' "$groupFile accepts BaseUrl"

  $matches = [regex]::Matches($allSmoke, [regex]::Escape($groupFile))
  if ($matches.Count -ne 1) {
    throw "[FAIL] all-smoke must reference $groupFile exactly once; found $($matches.Count)."
  }
  Write-Host "[PASS] all-smoke references $groupFile exactly once"
}

$groupSources = ($groupFiles | ForEach-Object { Get-Content -Raw (Join-Path $scriptRoot $_) }) -join "`n"

$allGroupMatches = foreach ($groupFile in $groupFiles) {
  [regex]::Matches($allSmoke, [regex]::Escape($groupFile)) | ForEach-Object { $_.Value }
}
$duplicateGroups = $allGroupMatches | Group-Object | Where-Object { $_.Count -gt 1 }
if ($duplicateGroups.Count -gt 0) {
  throw "[FAIL] Duplicate grouped runner references in all-smoke: $($duplicateGroups.Name -join ', ')"
}
Write-Host "[PASS] no duplicate references inside all-smoke group list"

$keyScripts = @(
  "smoke-codexforge-global-navigation.ps1",
  "smoke-codexforge-brain-runtime.ps1",
  "smoke-codexforge-brain-graph-ui.ps1",
  "smoke-codexforge-brain-memory-ingestion.ps1",
  "smoke-codexforge-files-command-center.ps1",
  "smoke-codexforge-file-workflow.ps1",
  "smoke-codexforge-patch-preview.ps1",
  "smoke-codexforge-memory-review.ps1",
  "smoke-codexforge-artifact-ingestion.ps1",
  "smoke-codexforge-operator-run-center.ps1",
  "smoke-codexforge-capability-cockpit.ps1",
  "smoke-codexforge-creative-production-studio.ps1",
  "smoke-codexforge-brand-clean.ps1"
)

foreach ($optionalScript in @(
  "smoke-codexforge-brain-graph-real-3d.ps1",
  "smoke-codexforge-patch-preview-queue.ps1",
  "smoke-codexforge-preview-diff-composer.ps1",
  "smoke-codexforge-patch-application-gate.ps1",
  "smoke-codexforge-memory-persistence.ps1"
)) {
  if (Test-Path (Join-Path $scriptRoot $optionalScript)) {
    $keyScripts += $optionalScript
  }
}

foreach ($keyScript in $keyScripts) {
  Assert-Contains $groupSources $keyScript "group references key smoke $keyScript"
}

foreach ($groupFile in $groupFiles) {
  $source = Get-Content -Raw (Join-Path $scriptRoot $groupFile)
  $refs = [regex]::Matches($source, 'smoke-codexforge-[a-z0-9-]+\.ps1') | ForEach-Object { $_.Value }
  $dupes = $refs | Group-Object | Where-Object { $_.Count -gt 1 }
  if ($dupes.Count -gt 0) {
    throw "[FAIL] Duplicate smoke script reference inside $groupFile`: $($dupes.Name -join ', ')"
  }
  Write-Host "[PASS] no duplicate script references inside $groupFile"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0x00E2) + "|" + [string]([char]0xFFFD)
$newGroupSource = $allSmoke + "`n" + $groupSources + "`n" + (Get-Content -Raw (Join-Path $scriptRoot "codexforge-smoke-runner.ps1"))
Assert-NotMatches $newGroupSource $mojibakePattern "no mojibake in grouped smoke runners"

Write-Host "[OK] CodexForge smoke group structure passed."
