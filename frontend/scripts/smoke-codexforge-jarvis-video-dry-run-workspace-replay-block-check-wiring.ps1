param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3809 Jarvis Video Dry Run Workspace Replay Block Check Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-replay-block-check-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-replay-block-check-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Replay Block Check Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-replay-block-check-wiring' `
  -Phase 'Phase 3809' `
  -Title 'Jarvis Video Dry Run Workspace Replay Block Check Wiring'
