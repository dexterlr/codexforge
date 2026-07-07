param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3953 Jarvis Video Controlled Execution Trial Backend Readiness Reference Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-backend-readiness-reference-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-backend-readiness-reference-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-backend-readiness-reference-wiring' -Phase 'Phase 3953' -Title 'Jarvis Video Controlled Execution Trial Backend Readiness Reference Wiring'
