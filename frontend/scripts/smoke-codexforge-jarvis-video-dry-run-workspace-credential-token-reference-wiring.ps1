param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3796 Jarvis Video Dry Run Workspace Credential Token Reference Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-credential-token-reference-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-credential-token-reference-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Credential Token Reference Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-credential-token-reference-wiring' `
  -Phase 'Phase 3796' `
  -Title 'Jarvis Video Dry Run Workspace Credential Token Reference Wiring'
