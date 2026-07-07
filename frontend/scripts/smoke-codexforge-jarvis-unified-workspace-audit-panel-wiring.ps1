param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3740 Jarvis Unified Workspace Audit Panel Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-audit-panel-wiring.ps1'
  Route = 'jarvis-unified-workspace-audit-panel-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Audit Panel Wiring'
  RouteHref = '/jarvis-unified-workspace-audit-panel-wiring'
  Phase = '3740'
  Title = 'Jarvis Unified Workspace Audit Panel Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
