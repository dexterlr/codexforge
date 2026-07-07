param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3734 Jarvis Unified Workspace Safety Shell Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-safety-shell-wiring.ps1'
  Route = 'jarvis-unified-workspace-safety-shell-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Safety Shell Wiring'
  RouteHref = '/jarvis-unified-workspace-safety-shell-wiring'
  Phase = '3734'
  Title = 'Jarvis Unified Workspace Safety Shell Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
