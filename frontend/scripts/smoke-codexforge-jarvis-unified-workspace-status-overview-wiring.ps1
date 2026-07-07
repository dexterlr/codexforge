param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3735 Jarvis Unified Workspace Status Overview Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-status-overview-wiring.ps1'
  Route = 'jarvis-unified-workspace-status-overview-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Status Overview Wiring'
  RouteHref = '/jarvis-unified-workspace-status-overview-wiring'
  Phase = '3735'
  Title = 'Jarvis Unified Workspace Status Overview Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
