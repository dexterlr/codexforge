param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3746 Jarvis Unified Workspace Adapter Status Panel Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-adapter-status-panel-wiring.ps1'
  Route = 'jarvis-unified-workspace-adapter-status-panel-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Adapter Status Panel Wiring'
  RouteHref = '/jarvis-unified-workspace-adapter-status-panel-wiring'
  Phase = '3746'
  Title = 'Jarvis Unified Workspace Adapter Status Panel Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
