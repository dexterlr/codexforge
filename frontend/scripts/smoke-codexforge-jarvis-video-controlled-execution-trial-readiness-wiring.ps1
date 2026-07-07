param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3976 Jarvis Video Controlled Execution Trial Readiness Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-readiness-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-readiness-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-readiness-wiring' -Phase 'Phase 3976' -Title 'Jarvis Video Controlled Execution Trial Readiness Wiring'
