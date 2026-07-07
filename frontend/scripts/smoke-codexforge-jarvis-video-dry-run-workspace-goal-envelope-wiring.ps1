param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3788 Jarvis Video Dry Run Workspace Goal Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-goal-envelope-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-goal-envelope-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Goal Envelope Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-goal-envelope-wiring' `
  -Phase 'Phase 3788' `
  -Title 'Jarvis Video Dry Run Workspace Goal Envelope Wiring'
