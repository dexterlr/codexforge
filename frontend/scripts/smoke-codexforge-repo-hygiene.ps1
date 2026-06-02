param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$repoRoot = Resolve-Path (Join-Path $root "..")
Set-Location $root

function Assert-FileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-DirExists {
  param([string]$Path)
  if (-not (Test-Path $Path -PathType Container)) {
    throw "[FAIL] Missing directory: $Path"
  }
  Write-Host "[PASS] directory exists: $Path"
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

Write-Host "=== CodexForge Repo Hygiene smoke ==="

$domain = "src\lib\codexforge\repo-hygiene"
$components = Join-Path $domain "components"
Assert-DirExists $domain
Assert-DirExists $components

foreach ($file in @(
  "repo-hygiene-types.ts",
  "repo-hygiene-check.ts",
  "repo-hygiene-generated-file-policy.ts",
  "repo-hygiene-canonical-project.ts",
  "repo-hygiene-test-script.ts",
  "repo-hygiene-secret-policy.ts",
  "repo-hygiene-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domain $file)
}

foreach ($file in @(
  "RepoHygienePanel.tsx",
  "RepoHygieneCheckPanel.tsx",
  "GeneratedFilePolicyPanel.tsx",
  "CanonicalProjectPanel.tsx",
  "TestScriptPanel.tsx",
  "SecretPolicyPanel.tsx",
  "RepoHygieneSummaryPanel.tsx",
  "RepoHygieneSafetyStrip.tsx",
  "RepoHygieneEmptyState.tsx"
)) {
  Assert-FileExists (Join-Path $components $file)
}

Assert-FileExists "src\app\repo-hygiene\page.tsx"
Assert-FileExists "src\app\repo-hygiene\page-client.tsx"

$index = Get-Content -Raw (Join-Path $domain "index.ts")
foreach ($export in @(
  "buildRepoHygieneCheck",
  "buildGeneratedFilePolicy",
  "buildCanonicalProject",
  "buildRepoHygieneTestScript",
  "buildRepoHygieneSecretPolicy",
  "buildRepoHygieneSummary",
  "summarizeRepoHygiene"
)) {
  Assert-Contains $index $export "index exports $export"
}

$frontendReadme = Get-Content -Raw "README.md"
$rootReadme = Get-Content -Raw (Join-Path $repoRoot "README.md")
$readmeCombined = $frontendReadme + "`n" + $rootReadme
if ($readmeCombined -notmatch "repo hygiene|WORKSPACE_MAP") {
  throw "[FAIL] README references repo hygiene or workspace map"
}
Write-Host "[PASS] README references repo hygiene or workspace map"

if (-not ((Test-Path "WORKSPACE_MAP.md") -or (Test-Path "docs\WORKSPACE_MAP.md"))) {
  throw "[FAIL] WORKSPACE_MAP.md or docs/WORKSPACE_MAP.md exists"
}
Write-Host "[PASS] workspace map exists"

Assert-FileExists "docs\repo-hygiene-audit.md"
Assert-FileExists "docs\codexforge-structure-map.md"

$rootIgnore = Get-Content -Raw (Join-Path $repoRoot ".gitignore")
Assert-Contains $rootIgnore "node_modules/" "root ignore includes node_modules"
Assert-Contains $rootIgnore ".next/" "root ignore includes .next"
Assert-Contains $rootIgnore ".env" "root ignore includes env"
if (($rootIgnore -notmatch "\.codexforge/") -and ($rootIgnore -notmatch "\.operator/")) {
  throw "[FAIL] root ignore includes local runtime state"
}
Write-Host "[PASS] root ignore includes local runtime state"

$package = Get-Content -Raw "package.json" | ConvertFrom-Json
if ($package.scripts.test -eq "echo Operator test OK") {
  throw "[FAIL] frontend package test script is still placeholder"
}
Write-Host "[PASS] frontend package test script is real validation"

$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$runner = Get-Content -Raw "scripts\codexforge-smoke-runner.ps1"
Assert-Contains $allSmoke "[switch]`$Interactive" "all smoke exposes Interactive switch"
Assert-Contains $runner "non-interactive" "runner defaults to non-interactive mode"
$enterPrompt = "Press " + "Enter to continue"
Assert-NotContains ($allSmoke + "`n" + $runner) $enterPrompt "smoke runner has no enter prompt"
Assert-CountExactly $allSmoke "smoke-codexforge-repo-hygiene.ps1" 1 "managed smoke suite includes Repo Hygiene exactly once"
Assert-CountExactly $allSmoke "Repo Hygiene" 1 "managed smoke suite labels Repo Hygiene exactly once"

$newFiles = @(
  Get-ChildItem $domain -Recurse -File |
    Where-Object { $_.Extension -in @(".ts", ".tsx") } |
    ForEach-Object { $_.FullName }
)
$newSource = ($newFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$newUiSource = (Get-ChildItem $components -Recurse -File -Filter "*.tsx" | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$newUiSource += "`n" + (Get-Content -Raw "src\app\repo-hygiene\page-client.tsx")

Assert-NotMatches $newSource "sk-[A-Za-z0-9_-]{16,}|AIza[0-9A-Za-z_-]{20,}|xox[baprs]-[0-9A-Za-z-]{20,}" "no hardcoded API keys"
Assert-NotContains $newSource "localStorage" "no localStorage secret storage"
Assert-NotContains $newUiSource "process.env" "no server env values printed in UI"
foreach ($needle in @("appendEvent", "saveBrainGraph", "run-command", "write-file", "apply-diff")) {
  Assert-NotContains $newUiSource $needle "no direct $needle call from new UI"
}
Assert-NotContains $newSource "Math.random" "no Math.random"
Assert-NotContains $newSource "Date.now" "no Date.now"

$trackedFrontendGenerated = git -C $repoRoot ls-files --full-name |
  Select-String -Pattern "^frontend/(node_modules|\.next|\.codexforge|\.checkpoints|_codexforge-backups|unpushed-patches|dist|build|coverage)/"
if ($trackedFrontendGenerated) {
  throw "[FAIL] generated frontend folder is intentionally committed: $($trackedFrontendGenerated -join ', ')"
}
Write-Host "[PASS] no generated frontend folder is intentionally committed"

$badCharCodes = @(0x00C3, 0x0192, 0x00C2)
foreach ($code in $badCharCodes) {
  if ($newSource.Contains([string][char]$code)) {
    throw "[FAIL] Mojibake marker found in repo hygiene source"
  }
}
Write-Host "[PASS] no mojibake markers in repo hygiene source"

Write-Host "[OK] CodexForge Repo Hygiene smoke passed."
