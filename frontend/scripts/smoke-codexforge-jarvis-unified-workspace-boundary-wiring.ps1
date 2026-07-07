param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3722 Jarvis Unified Workspace Boundary Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-boundary-wiring.ps1'
  Route = 'jarvis-unified-workspace-boundary-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Boundary Wiring'
  RouteHref = '/jarvis-unified-workspace-boundary-wiring'
  Phase = '3722'
  Title = 'Jarvis Unified Workspace Boundary Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
