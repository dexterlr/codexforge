param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3787 Jarvis Video Dry Run Workspace Intent Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-intent-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-intent-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Intent Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-intent-wiring' `
  -Phase 'Phase 3787' `
  -Title 'Jarvis Video Dry Run Workspace Intent Wiring'
