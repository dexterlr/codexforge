param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3800 Jarvis Video Dry Run Workspace Result Placeholder Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-result-placeholder-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-result-placeholder-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Result Placeholder Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-result-placeholder-wiring' `
  -Phase 'Phase 3800' `
  -Title 'Jarvis Video Dry Run Workspace Result Placeholder Wiring'
