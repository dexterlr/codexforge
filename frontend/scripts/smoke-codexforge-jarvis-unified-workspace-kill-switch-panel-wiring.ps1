param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3743 Jarvis Unified Workspace Kill Switch Panel Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-kill-switch-panel-wiring.ps1'
  Route = 'jarvis-unified-workspace-kill-switch-panel-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Kill Switch Panel Wiring'
  RouteHref = '/jarvis-unified-workspace-kill-switch-panel-wiring'
  Phase = '3743'
  Title = 'Jarvis Unified Workspace Kill Switch Panel Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
