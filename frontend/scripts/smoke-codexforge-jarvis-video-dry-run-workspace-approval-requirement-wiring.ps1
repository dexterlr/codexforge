param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3792 Jarvis Video Dry Run Workspace Approval Requirement Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-approval-requirement-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-approval-requirement-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Approval Requirement Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-approval-requirement-wiring' `
  -Phase 'Phase 3792' `
  -Title 'Jarvis Video Dry Run Workspace Approval Requirement Wiring'
