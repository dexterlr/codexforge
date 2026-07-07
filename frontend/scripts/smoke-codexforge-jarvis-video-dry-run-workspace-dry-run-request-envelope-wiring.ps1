param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3793 Jarvis Video Dry Run Workspace Dry Run Request Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-dry-run-request-envelope-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-dry-run-request-envelope-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Dry Run Request Envelope Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-dry-run-request-envelope-wiring' `
  -Phase 'Phase 3793' `
  -Title 'Jarvis Video Dry Run Workspace Dry Run Request Envelope Wiring'
