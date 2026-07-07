param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3727 Jarvis Unified Workspace Website Shell Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-website-shell-wiring.ps1'
  Route = 'jarvis-unified-workspace-website-shell-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Website Shell Wiring'
  RouteHref = '/jarvis-unified-workspace-website-shell-wiring'
  Phase = '3727'
  Title = 'Jarvis Unified Workspace Website Shell Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
