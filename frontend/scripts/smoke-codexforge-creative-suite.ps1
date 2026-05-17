param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
. (Join-Path $scriptRoot "codexforge-smoke-runner.ps1")

Invoke-CodexForgeSmokeGroup -GroupName "Creative Suite" -BaseUrl $BaseUrl -ScriptRoot $scriptRoot -Scripts @(
  @{ Name = "Creative Production Studio"; File = "smoke-codexforge-creative-production-studio.ps1"; Required = $true }
)
