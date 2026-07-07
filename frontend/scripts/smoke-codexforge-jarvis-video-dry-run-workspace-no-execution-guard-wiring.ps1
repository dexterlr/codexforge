param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3816 Jarvis Video Dry Run Workspace No Execution Guard Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-no-execution-guard-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-no-execution-guard-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace No Execution Guard Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-no-execution-guard-wiring' `
  -Phase 'Phase 3816' `
  -Title 'Jarvis Video Dry Run Workspace No Execution Guard Wiring'
