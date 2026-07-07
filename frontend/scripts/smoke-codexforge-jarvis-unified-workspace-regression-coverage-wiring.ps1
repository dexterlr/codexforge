param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3751 Jarvis Unified Workspace Regression Coverage Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-regression-coverage-wiring.ps1'
  Route = 'jarvis-unified-workspace-regression-coverage-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Regression Coverage Wiring'
  RouteHref = '/jarvis-unified-workspace-regression-coverage-wiring'
  Phase = '3751'
  Title = 'Jarvis Unified Workspace Regression Coverage Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
