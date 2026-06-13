param(
  [string]$Root = "."
)

$ErrorActionPreference = "Stop"

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
}

function Assert-NotContains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if ($Haystack.Contains($Needle)) {
    throw "[FAIL] Unexpected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

function Remove-AllowedCanonicalWorkspaceRefs {
  param([AllowEmptyString()][string]$Content)

  $result = $Content
  foreach ($allowed in @(
    "C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend",
    "C:\ai-lab\projects\tools\health-tracker"
  )) {
    $result = $result.Replace($allowed, "")
  }
  return $result
}

Write-Host "=== CodexForge brand cleanup smoke ==="

$scanPaths = @(
  "src",
  "docs",
  "CODEXFORGE-HANDOFF.md",
  "CODEXFORGE-TREE.md"
)

$forbidden = @(
  ("health" + "-tracker"),
  ("Health" + " Tracker"),
  ("Health" + "Tracker"),
  ("health" + " tracker"),
  ("health" + "_tracker")
)

foreach ($path in $scanPaths) {
  if (-not (Test-Path $path)) {
    continue
  }

  if ((Get-Item $path).PSIsContainer) {
    $files = Get-ChildItem $path -Recurse -File
  } else {
    $files = @(Get-Item $path)
  }

  foreach ($file in $files) {
    $relative = Resolve-Path -Relative $file.FullName
    $content = Remove-AllowedCanonicalWorkspaceRefs (Get-Content -Raw $file.FullName)

    foreach ($needle in $forbidden) {
      Assert-NotContains $content $needle "$relative excludes legacy brand"
    }
  }
}

Assert-FileExists "src\app\brain\page-client.tsx"
Assert-FileExists "src\lib\codexforge\brain\components\brain-graph-view.tsx"
Assert-FileExists "src\lib\storage.ts"
Assert-FileExists "src\app\history\page.tsx"
Assert-FileExists "scripts\smoke-codexforge-no-health-harness.ps1"

$brainPage = Get-Content -Raw "src\app\brain\page-client.tsx"
$chatHook = Get-Content -Raw "src\lib\codexforge\chat\use-codexforge-chat.ts"
$storage = Get-Content -Raw "src\lib\storage.ts"
$history = Get-Content -Raw "src\app\history\page.tsx"
$insights = Get-Content -Raw "src\app\api\insights\route.ts"

$forbiddenMojibake = @(
  [string][char]0x00C3,
  [string][char]0x00C2,
  [string][char]0x00E2,
  [string][char]0xFFFD
)

foreach ($needle in $forbiddenMojibake) {
  Assert-NotContains $brainPage $needle "brain page mojibake"
}

Assert-NotContains $chatHook ([string][char]0x00C3) "chat hook mojibake join"

$hardForbidden = @(
  ("Health" + " Tracker"),
  ("health" + "-tracker"),
  ("health" + "_tracker"),
  ("health" + "Entries"),
  ("health" + "_tracker_entries_v1"),
  ("health" + "-tracker-entries"),
  ("legacy" + "-metric"),
  ("legacy" + " metric"),
  ("Legacy" + "Signals"),
  ("Legacy" + "Stats"),
  ("compute" + "Legacy" + "Stats"),
  ("get" + "Legacy" + "Signals"),
  ("health" + " metric")
)

foreach ($needle in $hardForbidden) {
  Assert-NotContains $storage $needle "storage excludes retired harness marker"
  Assert-NotContains $history $needle "history excludes retired harness marker"
  Assert-NotContains $insights $needle "insights excludes retired harness marker"
}

Assert-NotContains $storage "Date.now" "storage excludes nondeterministic Date.now fallback"
Assert-NotContains $storage "Math.random" "storage excludes nondeterministic Math.random fallback"
Assert-NotContains $insights "Date.now" "insights excludes nondeterministic Date.now fallback"
Assert-NotContains $insights "Math.random" "insights excludes nondeterministic Math.random fallback"

Write-Host "[OK] CodexForge brand cleanup smoke passed."
