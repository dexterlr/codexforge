param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3724 Jarvis Unified Workspace Home Shell Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-home-shell-wiring.ps1'
  Route = 'jarvis-unified-workspace-home-shell-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Home Shell Wiring'
  RouteHref = '/jarvis-unified-workspace-home-shell-wiring'
  Phase = '3724'
  Title = 'Jarvis Unified Workspace Home Shell Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
