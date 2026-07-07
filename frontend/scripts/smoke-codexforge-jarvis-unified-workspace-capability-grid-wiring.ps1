param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3736 Jarvis Unified Workspace Capability Grid Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-capability-grid-wiring.ps1'
  Route = 'jarvis-unified-workspace-capability-grid-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Capability Grid Wiring'
  RouteHref = '/jarvis-unified-workspace-capability-grid-wiring'
  Phase = '3736'
  Title = 'Jarvis Unified Workspace Capability Grid Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
