param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3799 Jarvis Video Dry Run Workspace Privacy Safety Guard Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-privacy-safety-guard-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-privacy-safety-guard-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Privacy Safety Guard Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-privacy-safety-guard-wiring' `
  -Phase 'Phase 3799' `
  -Title 'Jarvis Video Dry Run Workspace Privacy Safety Guard Wiring'
