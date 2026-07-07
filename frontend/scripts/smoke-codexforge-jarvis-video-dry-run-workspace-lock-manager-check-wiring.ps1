param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3807 Jarvis Video Dry Run Workspace Lock Manager Check Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-lock-manager-check-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-lock-manager-check-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Lock Manager Check Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-lock-manager-check-wiring' `
  -Phase 'Phase 3807' `
  -Title 'Jarvis Video Dry Run Workspace Lock Manager Check Wiring'
