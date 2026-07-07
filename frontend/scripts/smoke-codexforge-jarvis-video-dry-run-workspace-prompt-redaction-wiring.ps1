param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-dry-run-workspace-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke `
  -SmokeName 'Phase 3794 Jarvis Video Dry Run Workspace Prompt Redaction Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-video-dry-run-workspace-prompt-redaction-wiring.ps1' `
  -Route 'jarvis-video-dry-run-workspace-prompt-redaction-wiring' `
  -CommandLabel 'Go to Jarvis Video Dry Run Workspace Prompt Redaction Wiring' `
  -RouteHref '/jarvis-video-dry-run-workspace-prompt-redaction-wiring' `
  -Phase 'Phase 3794' `
  -Title 'Jarvis Video Dry Run Workspace Prompt Redaction Wiring'
