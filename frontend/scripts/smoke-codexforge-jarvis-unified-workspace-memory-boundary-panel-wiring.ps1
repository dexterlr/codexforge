param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3742 Jarvis Unified Workspace Memory Boundary Panel Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-memory-boundary-panel-wiring.ps1'
  Route = 'jarvis-unified-workspace-memory-boundary-panel-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Memory Boundary Panel Wiring'
  RouteHref = '/jarvis-unified-workspace-memory-boundary-panel-wiring'
  Phase = '3742'
  Title = 'Jarvis Unified Workspace Memory Boundary Panel Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
