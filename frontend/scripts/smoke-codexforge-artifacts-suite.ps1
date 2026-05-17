param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
. (Join-Path $scriptRoot "codexforge-smoke-runner.ps1")

Invoke-CodexForgeSmokeGroup -GroupName "Artifacts Suite" -BaseUrl $BaseUrl -ScriptRoot $scriptRoot -Scripts @(
  @{ Name = "Artifact Executor"; File = "smoke-codexforge-artifact-executor.ps1"; Required = $true },
  @{ Name = "Artifact Workspace"; File = "smoke-codexforge-artifact-workspace.ps1"; Required = $true },
  @{ Name = "Artifact Export Flow"; File = "smoke-codexforge-artifact-export-flow.ps1"; Required = $true },
  @{ Name = "Artifact Ingestion"; File = "smoke-codexforge-artifact-ingestion.ps1"; Required = $true },
  @{ Name = "Production Pack"; File = "smoke-codexforge-production-pack.ps1"; Required = $true },
  @{ Name = "Apply Evidence Pack"; File = "smoke-codexforge-apply-evidence-pack.ps1"; Required = $true }
)
