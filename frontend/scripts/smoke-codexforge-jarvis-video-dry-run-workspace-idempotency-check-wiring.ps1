param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3808 Jarvis Video Dry Run Workspace Idempotency Check Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-idempotency-check-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-idempotency-check-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Idempotency Check Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-idempotency-check-wiring' `
  -Phase 'Phase 3808' `
  -Title 'Jarvis Video Dry Run Workspace Idempotency Check Wiring'
