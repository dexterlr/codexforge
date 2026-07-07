param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3959 Jarvis Video Controlled Execution Trial Error Envelope Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-error-envelope-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-error-envelope-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-error-envelope-wiring' -Phase 'Phase 3959' -Title 'Jarvis Video Controlled Execution Trial Error Envelope Wiring'
