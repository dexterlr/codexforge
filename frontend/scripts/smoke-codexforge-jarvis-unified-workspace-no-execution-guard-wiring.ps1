param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3750 Jarvis Unified Workspace No Execution Guard Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-no-execution-guard-wiring.ps1'
  Route = 'jarvis-unified-workspace-no-execution-guard-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace No Execution Guard Wiring'
  RouteHref = '/jarvis-unified-workspace-no-execution-guard-wiring'
  Phase = '3750'
  Title = 'Jarvis Unified Workspace No Execution Guard Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
