param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3745 Jarvis Unified Workspace Dry Run Panel Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-dry-run-panel-wiring.ps1'
  Route = 'jarvis-unified-workspace-dry-run-panel-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Dry Run Panel Wiring'
  RouteHref = '/jarvis-unified-workspace-dry-run-panel-wiring'
  Phase = '3745'
  Title = 'Jarvis Unified Workspace Dry Run Panel Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
