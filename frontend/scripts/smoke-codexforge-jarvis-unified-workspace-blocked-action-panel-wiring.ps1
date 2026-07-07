param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3744 Jarvis Unified Workspace Blocked Action Panel Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-blocked-action-panel-wiring.ps1'
  Route = 'jarvis-unified-workspace-blocked-action-panel-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Blocked Action Panel Wiring'
  RouteHref = '/jarvis-unified-workspace-blocked-action-panel-wiring'
  Phase = '3744'
  Title = 'Jarvis Unified Workspace Blocked Action Panel Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
