param(
  [string]$Root = "."
)

$ErrorActionPreference = "Stop"

function Assert-True {
  param(
    [Parameter(Mandatory = $true)][bool]$Condition,
    [Parameter(Mandatory = $true)][string]$Message
  )

  if (-not $Condition) {
    throw "[FAIL] $Message"
  }

  Write-Host "[PASS] $Message"
}

function Read-Text {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path -LiteralPath $Path)) {
    return ""
  }

  return [IO.File]::ReadAllText((Resolve-Path -LiteralPath $Path).Path, [Text.Encoding]::UTF8)
}

function Add-Files {
  param(
    [Parameter(Mandatory = $true)]
    [AllowEmptyCollection()]
    [System.Collections.Generic.List[System.IO.FileInfo]]$Target,
    [Parameter(Mandatory = $true)][string]$Path,
    [string[]]$Extensions
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    return
  }

  $item = Get-Item -LiteralPath $Path
  if (-not $item.PSIsContainer) {
    $Target.Add($item)
    return
  }

  $files = Get-ChildItem -LiteralPath $Path -Recurse -File
  if ($Extensions.Count -gt 0) {
    $files = $files | Where-Object { $Extensions -contains $_.Extension.ToLowerInvariant() }
  }

  foreach ($file in $files) {
    $Target.Add($file)
  }
}

function Assert-ContentMissing {
  param(
    [Parameter(Mandatory = $true)][string]$Content,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Label
  )

  $found = $Content.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -ge 0
  if ($found) {
    throw "[FAIL] $Label"
  }
}

$repoRoot = Resolve-Path -LiteralPath $Root
Push-Location $repoRoot
try {
  Write-Host "=== CodexForge no retired harness smoke ==="

  $selfPath = (Resolve-Path -LiteralPath $PSCommandPath).Path
  $scanFiles = [System.Collections.Generic.List[System.IO.FileInfo]]::new()

  Add-Files $scanFiles (Join-Path $repoRoot "src\app") @(".ts", ".tsx")
  Add-Files $scanFiles (Join-Path $repoRoot "src\lib") @(".ts", ".tsx")

  foreach ($path in @(
    (Join-Path $repoRoot "README.md"),
    (Join-Path (Split-Path -Parent $repoRoot) "README.md")
  )) {
    if (Test-Path -LiteralPath $path) {
      Add-Files $scanFiles $path @()
    }
  }

  foreach ($file in Get-ChildItem -LiteralPath $repoRoot -File -Filter "CODEXFORGE*.md") {
    $scanFiles.Add($file)
  }

  Add-Files $scanFiles (Join-Path $repoRoot "docs") @(".md")

  if (Test-Path -LiteralPath (Join-Path $repoRoot "scripts")) {
    foreach ($file in Get-ChildItem -LiteralPath (Join-Path $repoRoot "scripts") -File -Filter "*.ps1") {
      if ($file.FullName -ne $selfPath) {
        $scanFiles.Add($file)
      }
    }
  }

  $uniqueFiles = $scanFiles |
    Sort-Object FullName -Unique |
    Where-Object { $_.FullName -ne $selfPath }

  $forbidden = @(
    "Health Tracker",
    "health tracker",
    "health-tracker",
    "health_tracker",
    "healthEntries",
    "health_tracker_entries_v1",
    "health-tracker-entries",
    "legacy metric",
    "legacy-metric",
    "LegacySignals",
    "LegacyStats",
    "computeLegacyStats",
    "getLegacySignals"
  )

  foreach ($file in $uniqueFiles) {
    $relative = Resolve-Path -Relative -LiteralPath $file.FullName
    $content = Read-Text $file.FullName

    foreach ($needle in $forbidden) {
      Assert-ContentMissing $content $needle "$relative excludes retired harness marker"
    }
  }
  Write-Host "[PASS] retired harness markers absent from scanned source, docs, and scripts"

  $historyPath = Join-Path $repoRoot "src\app\history\page.tsx"
  Assert-True (Test-Path -LiteralPath $historyPath) "history page exists"
  $history = Read-Text $historyPath

  foreach ($needle in @("weight", "steps", "water", "sleep", "health", "legacy")) {
    Assert-ContentMissing $history $needle "history excludes retired metric token '$needle'"
  }
  Write-Host "[PASS] history excludes retired metric tokens"

  $storage = Read-Text (Join-Path $repoRoot "src\lib\storage.ts")
  $insights = Read-Text (Join-Path $repoRoot "src\app\api\insights\route.ts")

  foreach ($needle in @("Date.now", "Math.random")) {
    Assert-ContentMissing $storage $needle "storage excludes nondeterministic $needle"
    Assert-ContentMissing $insights $needle "insights excludes nondeterministic $needle"
  }
  Write-Host "[PASS] storage and insights deterministic fallback IDs"

  $mojibake = @(
    [string][char]0x00C3,
    [string][char]0x00C2,
    [string][char]0x00E2,
    [string][char]0xFFFD
  )

  $mojibakeFiles = $uniqueFiles | Where-Object { $_.Extension.ToLowerInvariant() -ne ".ps1" }
  foreach ($file in $mojibakeFiles) {
    $relative = Resolve-Path -Relative -LiteralPath $file.FullName
    $content = Read-Text $file.FullName

    foreach ($needle in $mojibake) {
      Assert-ContentMissing $content $needle "$relative has no mojibake"
    }
  }
  Write-Host "[PASS] mojibake markers absent from scanned non-script files"

  $homeContent = Read-Text (Join-Path $repoRoot "src\app\page.tsx")
  $layout = Read-Text (Join-Path $repoRoot "src\app\layout.tsx")
  $readme = Read-Text (Join-Path $repoRoot "README.md")

  Assert-True ($homeContent.Contains("CodexForge")) "CodexForge branding remains on home"
  Assert-True ($layout.Contains("CodexForge")) "CodexForge branding remains in layout metadata"
  Assert-True ($readme.Contains("CodexForge")) "CodexForge branding remains in README"
  Assert-True ($storage.Contains("codexforge_activity_entries_v1")) "current CodexForge activity storage key remains"

  Write-Host "[OK] CodexForge no retired harness smoke passed."
} finally {
  Pop-Location
}
