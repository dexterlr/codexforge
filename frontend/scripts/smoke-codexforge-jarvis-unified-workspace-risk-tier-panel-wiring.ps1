param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3747 Jarvis Unified Workspace Risk Tier Panel Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-risk-tier-panel-wiring.ps1'
  Route = 'jarvis-unified-workspace-risk-tier-panel-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Risk Tier Panel Wiring'
  RouteHref = '/jarvis-unified-workspace-risk-tier-panel-wiring'
  Phase = '3747'
  Title = 'Jarvis Unified Workspace Risk Tier Panel Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
