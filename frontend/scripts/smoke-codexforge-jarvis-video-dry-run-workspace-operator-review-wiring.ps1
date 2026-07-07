param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3811 Jarvis Video Dry Run Workspace Operator Review Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-operator-review-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-operator-review-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Operator Review Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-operator-review-wiring' `
  -Phase 'Phase 3811' `
  -Title 'Jarvis Video Dry Run Workspace Operator Review Wiring'
