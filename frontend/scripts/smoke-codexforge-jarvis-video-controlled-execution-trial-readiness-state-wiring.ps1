param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3949 Jarvis Video Controlled Execution Trial Readiness State Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-readiness-state-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-readiness-state-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-readiness-state-wiring' -Phase 'Phase 3949' -Title 'Jarvis Video Controlled Execution Trial Readiness State Wiring'
