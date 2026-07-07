param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3797 Jarvis Video Dry Run Workspace Cost Rate Timeout Guard Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-cost-rate-timeout-guard-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-cost-rate-timeout-guard-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Cost Rate Timeout Guard Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-cost-rate-timeout-guard-wiring' `
  -Phase 'Phase 3797' `
  -Title 'Jarvis Video Dry Run Workspace Cost Rate Timeout Guard Wiring'
