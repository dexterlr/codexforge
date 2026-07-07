param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3950 Jarvis Video Controlled Execution Trial Dry Run Reference Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-dry-run-reference-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-dry-run-reference-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-dry-run-reference-wiring' -Phase 'Phase 3950' -Title 'Jarvis Video Controlled Execution Trial Dry Run Reference Wiring'
