param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3741 Jarvis Unified Workspace Result Ledger Panel Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-result-ledger-panel-wiring.ps1'
  Route = 'jarvis-unified-workspace-result-ledger-panel-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Result Ledger Panel Wiring'
  RouteHref = '/jarvis-unified-workspace-result-ledger-panel-wiring'
  Phase = '3741'
  Title = 'Jarvis Unified Workspace Result Ledger Panel Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
