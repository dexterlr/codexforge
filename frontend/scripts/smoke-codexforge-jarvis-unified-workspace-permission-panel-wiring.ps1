param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3738 Jarvis Unified Workspace Permission Panel Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-permission-panel-wiring.ps1'
  Route = 'jarvis-unified-workspace-permission-panel-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Permission Panel Wiring'
  RouteHref = '/jarvis-unified-workspace-permission-panel-wiring'
  Phase = '3738'
  Title = 'Jarvis Unified Workspace Permission Panel Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
