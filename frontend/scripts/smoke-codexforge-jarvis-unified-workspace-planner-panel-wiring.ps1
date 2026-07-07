param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3737 Jarvis Unified Workspace Planner Panel Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-planner-panel-wiring.ps1'
  Route = 'jarvis-unified-workspace-planner-panel-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Planner Panel Wiring'
  RouteHref = '/jarvis-unified-workspace-planner-panel-wiring'
  Phase = '3737'
  Title = 'Jarvis Unified Workspace Planner Panel Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
