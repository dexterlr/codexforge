param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3728 Jarvis Unified Workspace Avatar Shell Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-avatar-shell-wiring.ps1'
  Route = 'jarvis-unified-workspace-avatar-shell-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Avatar Shell Wiring'
  RouteHref = '/jarvis-unified-workspace-avatar-shell-wiring'
  Phase = '3728'
  Title = 'Jarvis Unified Workspace Avatar Shell Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
