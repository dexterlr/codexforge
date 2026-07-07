param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3806 Jarvis Video Dry Run Workspace Kill Switch Check Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-kill-switch-check-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-kill-switch-check-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Kill Switch Check Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-kill-switch-check-wiring' `
  -Phase 'Phase 3806' `
  -Title 'Jarvis Video Dry Run Workspace Kill Switch Check Wiring'
