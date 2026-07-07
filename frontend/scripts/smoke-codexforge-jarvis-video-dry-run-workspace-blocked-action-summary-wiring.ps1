param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3810 Jarvis Video Dry Run Workspace Blocked Action Summary Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-blocked-action-summary-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-blocked-action-summary-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Blocked Action Summary Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-blocked-action-summary-wiring' `
  -Phase 'Phase 3810' `
  -Title 'Jarvis Video Dry Run Workspace Blocked Action Summary Wiring'
