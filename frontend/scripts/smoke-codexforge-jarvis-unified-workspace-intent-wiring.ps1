param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3723 Jarvis Unified Workspace Intent Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-intent-wiring.ps1'
  Route = 'jarvis-unified-workspace-intent-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Intent Wiring'
  RouteHref = '/jarvis-unified-workspace-intent-wiring'
  Phase = '3723'
  Title = 'Jarvis Unified Workspace Intent Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
