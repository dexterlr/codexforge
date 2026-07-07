param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3970 Jarvis Video Controlled Execution Trial Blocked Action Summary Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-blocked-action-summary-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-blocked-action-summary-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-blocked-action-summary-wiring' -Phase 'Phase 3970' -Title 'Jarvis Video Controlled Execution Trial Blocked Action Summary Wiring'
