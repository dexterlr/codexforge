param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
. (Join-Path $scriptRoot "codexforge-smoke-runner.ps1")

Invoke-CodexForgeSmokeGroup -GroupName "Brain Suite" -BaseUrl $BaseUrl -ScriptRoot $scriptRoot -Scripts @(
  @{ Name = "Brain Graph UI"; File = "smoke-codexforge-brain-graph-ui.ps1"; Required = $true },
  @{ Name = "Brain Graph Real 3D"; File = "smoke-codexforge-brain-graph-real-3d.ps1"; Required = $true },
  @{ Name = "Brain Graph 3D Navigation"; File = "smoke-codexforge-brain-graph-3d-navigation.ps1"; Required = $false },
  @{ Name = "Brain Command Center"; File = "smoke-codexforge-brain-command-center.ps1"; Required = $true },
  @{ Name = "Brain Command Palette"; File = "smoke-codexforge-brain-command-palette.ps1"; Required = $true },
  @{ Name = "Brain Layout Polish"; File = "smoke-codexforge-brain-layout-polish.ps1"; Required = $true },
  @{ Name = "Brain Runtime"; File = "smoke-codexforge-brain-runtime.ps1"; Required = $true },
  @{ Name = "Brain Runtime Health Dashboard"; File = "smoke-codexforge-brain-runtime-health-dashboard.ps1"; Required = $true },
  @{ Name = "Brain Panel Data Integration"; File = "smoke-codexforge-brain-panel-data-integration.ps1"; Required = $true },
  @{ Name = "Brain Quality Gates"; File = "smoke-codexforge-brain-quality-gates.ps1"; Required = $true },
  @{ Name = "Brain Memory Ingestion"; File = "smoke-codexforge-brain-memory-ingestion.ps1"; Required = $true },
  @{ Name = "Brain Replay Lineage"; File = "smoke-codexforge-brain-replay-lineage.ps1"; Required = $true },
  @{ Name = "Brain Semantic Topology"; File = "smoke-codexforge-brain-semantic-topology.ps1"; Required = $true },
  @{ Name = "Brain Recommendations"; File = "smoke-codexforge-brain-recommendations.ps1"; Required = $true },
  @{ Name = "Brain Focus Drilldown"; File = "smoke-codexforge-brain-focus-drilldown.ps1"; Required = $true },
  @{ Name = "Brain First Run Onboarding"; File = "smoke-codexforge-brain-first-run-onboarding.ps1"; Required = $true },
  @{ Name = "Brain Merge"; File = "smoke-codexforge-brain-merge.ps1"; Required = $true },
  @{ Name = "Approved Brain Merge"; File = "smoke-codexforge-approved-brain-merge.ps1"; Required = $true },
  @{ Name = "Brain Recall"; File = "smoke-codexforge-brain-recall.ps1"; Required = $true },
  @{ Name = "Predictive Context"; File = "smoke-codexforge-predictive-context.ps1"; Required = $true }
)
