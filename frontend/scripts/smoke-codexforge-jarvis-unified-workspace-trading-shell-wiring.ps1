param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3730 Jarvis Unified Workspace Trading Shell Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-trading-shell-wiring.ps1'
  Route = 'jarvis-unified-workspace-trading-shell-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Trading Shell Wiring'
  RouteHref = '/jarvis-unified-workspace-trading-shell-wiring'
  Phase = '3730'
  Title = 'Jarvis Unified Workspace Trading Shell Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
