param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3748 Jarvis Unified Workspace Specialist Navigation Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-specialist-navigation-wiring.ps1'
  Route = 'jarvis-unified-workspace-specialist-navigation-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Specialist Navigation Wiring'
  RouteHref = '/jarvis-unified-workspace-specialist-navigation-wiring'
  Phase = '3748'
  Title = 'Jarvis Unified Workspace Specialist Navigation Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
