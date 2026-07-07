param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3752 Jarvis Unified Workspace Readiness Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-readiness-wiring.ps1'
  Route = 'jarvis-unified-workspace-readiness-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Readiness Wiring'
  RouteHref = '/jarvis-unified-workspace-readiness-wiring'
  Phase = '3752'
  Title = 'Jarvis Unified Workspace Readiness Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
