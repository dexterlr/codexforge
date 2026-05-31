param(
  [string]$BaseUrl = "http://localhost:3000",
  [switch]$Interactive,
  [switch]$ContinueOnMissingOptional,
  [switch]$StopOnFirstFailure
)

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
. (Join-Path $scriptRoot "codexforge-smoke-runner.ps1")

Invoke-CodexForgeSmokeGroup -GroupName "UI" -BaseUrl $BaseUrl -ScriptRoot $scriptRoot -Interactive:$Interactive -ContinueOnMissingOptional:$ContinueOnMissingOptional -StopOnFirstFailure:$StopOnFirstFailure -Scripts @(
  @{ Name = "Navigation Polish"; File = "smoke-codexforge-navigation.ps1"; Required = $false },
  @{ Name = "Agent Runtime UX"; File = "smoke-codexforge-agent-runtime-ux.ps1"; Required = $true },
  @{ Name = "Self Upgrade Console UI"; File = "smoke-codexforge-self-upgrade-console-ui.ps1"; Required = $true },
  @{ Name = "Predictive Context UX"; File = "smoke-codexforge-predictive-context-ux.ps1"; Required = $true },
  @{ Name = "Route Override Visible Meta"; File = "smoke-codexforge-route-override-visible-meta.ps1"; Required = $false }
)
