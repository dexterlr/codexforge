param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

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
  if (-not $Haystack.Contains($Needle)) {
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
  if ($Haystack.Contains($Needle)) {
    throw "[FAIL] Unexpected $Name`: $Needle"
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

function Assert-NoInputWaits {
  param(
    [string]$Source,
    [string]$Name
  )

  $readHostToken = "Read" + "-Host"
  $rawReadToken = '$Host' + ".UI.RawUI." + "Read" + "Key"
  $holdCommand = "pa" + "use"
  $cmdHoldToken = "cmd /c " + $holdCommand
  $enterToken = "Press " + "Enter to " + "continue"

  Assert-NotContains $Source $cmdHoldToken "$Name has no cmd shell hold"
  Assert-NotContains $Source $enterToken "$Name has no enter prompt"

  if (($Source.Contains($readHostToken) -or $Source.Contains($rawReadToken)) -and -not $Source.Contains("[switch]`$Interactive")) {
    throw "[FAIL] $Name uses input waits without Interactive guard"
  }

  Assert-NotMatches $Source "(?im)^\s*$holdCommand\s*$" "$Name has no bare hold command"
  Write-Host "[PASS] $Name has no unguarded input waits"
}

Write-Host "=== CodexForge Noninteractive Smoke Runner smoke ==="

$allSmokePath = "scripts\smoke-codexforge-all.ps1"
$runnerPath = "scripts\codexforge-smoke-runner.ps1"
Assert-FileExists $allSmokePath
Assert-FileExists $runnerPath

$allSmoke = Get-Content -Raw $allSmokePath
$runner = Get-Content -Raw $runnerPath
$combinedRunner = $allSmoke + "`n" + $runner

Assert-Contains $allSmoke "[switch]`$Interactive" "all smoke exposes Interactive switch"
Assert-Contains $allSmoke "[switch]`$ContinueOnMissingOptional" "all smoke exposes ContinueOnMissingOptional switch"
Assert-Contains $allSmoke "[switch]`$StopOnFirstFailure" "all smoke exposes StopOnFirstFailure switch"
Assert-Contains $allSmoke "-Interactive:`$Interactive" "all smoke forwards Interactive switch"
Assert-Contains $allSmoke "-StopOnFirstFailure:`$StopOnFirstFailure" "all smoke forwards StopOnFirstFailure switch"
Assert-Contains $allSmoke "Noninteractive Smoke Runner" "all smoke includes this smoke"
Assert-CountExactly $allSmoke "smoke-codexforge-noninteractive-smoke-runner.ps1" 1 "all smoke includes this smoke exactly once"

Assert-Contains $runner "Required" "runner supports Required flag handling"
Assert-Contains $runner "Test-Path `$path" "runner checks script path before running"
Assert-Contains $runner "MISSING_REQUIRED" "runner reports missing required scripts"
Assert-Contains $runner "MISSING_OPTIONAL" "runner reports missing optional scripts"
Assert-Contains $runner "powershell -NoProfile -ExecutionPolicy Bypass -File `$path" "runner invokes child scripts without profiles"
Assert-Contains $runner "throw `"[FAIL] Required smoke scripts failed or missing" "runner exits non-zero on required failure"
Assert-Contains $runner "non-interactive" "runner defaults to non-interactive mode"
Assert-Contains $runner "[switch]`$Interactive" "runner accepts Interactive switch"
Assert-Contains $runner "smoke-codexforge-real-product-run-fix.ps1" "runner guards missing Phase 101 smoke message"
Assert-Contains $runner "This smoke belongs to Phase 101 and has not been generated yet." "runner explains missing Phase 101 smoke"

Assert-NoInputWaits $combinedRunner "all smoke runner"

foreach ($suite in @(
  "scripts\smoke-codexforge-brain-suite.ps1",
  "scripts\smoke-codexforge-memory-suite.ps1",
  "scripts\smoke-codexforge-files-suite.ps1",
  "scripts\smoke-codexforge-execution-suite.ps1",
  "scripts\smoke-codexforge-artifacts-suite.ps1",
  "scripts\smoke-codexforge-creative-suite.ps1"
)) {
  Assert-FileExists $suite
  $suiteSource = Get-Content -Raw $suite
  Assert-Contains $suiteSource "[switch]`$Interactive" "$suite exposes Interactive switch"
  Assert-NoInputWaits $suiteSource "$suite"
}

$badCharCodes = @(0x00C3, 0x0192, 0x00C2)
$scriptFiles = Get-ChildItem "scripts" -Filter "*.ps1" -File
foreach ($scriptFile in $scriptFiles) {
  $source = Get-Content -Raw $scriptFile.FullName
  Assert-NoInputWaits $source $scriptFile.Name

  foreach ($code in $badCharCodes) {
    if ($source.Contains([string][char]$code)) {
      throw "[FAIL] Mojibake marker found in $($scriptFile.Name)"
    }
  }
}

Write-Host "[PASS] no mojibake markers found in scripts directory"
Write-Host "[OK] CodexForge Noninteractive Smoke Runner smoke passed."
