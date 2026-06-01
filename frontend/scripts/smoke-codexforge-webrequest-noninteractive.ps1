param([string]$BaseUrl = "http://localhost:3000")
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) } Write-Host ("[PASS] " + $Name) }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw ("[FAIL] Unexpected " + $Name + ": " + $Pattern) } Write-Host ("[PASS] " + $Name) }
Write-Host "=== CodexForge WebRequest Noninteractive smoke ==="
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$smokeFiles = Get-ChildItem -Path "scripts" -Filter "smoke-codexforge*.ps1" -File
$violations = @()
foreach ($file in $smokeFiles) {
  $text = Get-Content -Raw $file.FullName
  if ($text -match "Invoke-WebRequest" -and $text -notmatch "Invoke-CodexForgeSmokeWebRequest") {
    $lines = $text -split "`r?`n"
    for ($i = 0; $i -lt $lines.Count; $i++) {
      if ($lines[$i] -match "Invoke-WebRequest") {
        $window = ($lines[$i..([Math]::Min($i + 8, $lines.Count - 1))] -join "`n")
        if ($window -notmatch "UseBasicParsing") { $violations += ($file.Name + ":" + ($i + 1) + " missing -UseBasicParsing") }
      }
    }
  }
  $readHostToken = "Read" + "-Host"
  $pauseToken = "Pa" + "use"
  $readKeyToken = "Read" + "Key"
  $promptChoiceToken = "Prompt" + "ForChoice"
  $shouldContinueToken = "Should" + "Continue"
  foreach ($pattern in @($readHostToken, $pauseToken, $readKeyToken, $promptChoiceToken, $shouldContinueToken)) {
    if ($text -match $pattern -and $text -notmatch "param") { $violations += ($file.Name + " has unguarded " + $pattern) }
  }
}
if ($violations.Count -gt 0) { throw ("[FAIL] Noninteractive smoke violations:`n" + ($violations -join "`n")) }
foreach ($name in @("smoke-codexforge-provider-setup-wizard.ps1", "smoke-codexforge-token-efficiency-router.ps1")) { $script = Get-Content -Raw (Join-Path "scripts" $name); Assert-Contains $script "-UseBasicParsing" ($name + " no PowerShell security prompt") }
if (([regex]::Matches($allSmoke, "smoke-codexforge-webrequest-noninteractive\.ps1")).Count -ne 1) { throw "[FAIL] all-smoke includes WebRequest Noninteractive exactly once" }
$allSource = ($smokeFiles | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$mojibakePattern = "$([char]0x00C3)|$([char]0x00C2)|$([char]0x00E2)"
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Write-Host "[OK] CodexForge WebRequest Noninteractive smoke passed."
