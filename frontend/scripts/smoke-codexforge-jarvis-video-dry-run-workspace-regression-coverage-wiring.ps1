param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3814 Jarvis Video Dry Run Workspace Regression Coverage Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-regression-coverage-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-regression-coverage-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Regression Coverage Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-regression-coverage-wiring' `
  -Phase 'Phase 3814' `
  -Title 'Jarvis Video Dry Run Workspace Regression Coverage Wiring'
