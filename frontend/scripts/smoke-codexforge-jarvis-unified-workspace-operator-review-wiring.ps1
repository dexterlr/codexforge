param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-unified-workspace-shells-smoke-helper.ps1')

$smokeParams = @{
  SmokeName = 'Phase 3749 Jarvis Unified Workspace Operator Review Wiring'
  ScriptFile = 'smoke-codexforge-jarvis-unified-workspace-operator-review-wiring.ps1'
  Route = 'jarvis-unified-workspace-operator-review-wiring'
  CommandLabel = 'Go to Jarvis Unified Workspace Operator Review Wiring'
  RouteHref = '/jarvis-unified-workspace-operator-review-wiring'
  Phase = '3749'
  Title = 'Jarvis Unified Workspace Operator Review Wiring'
}

Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke @smokeParams
