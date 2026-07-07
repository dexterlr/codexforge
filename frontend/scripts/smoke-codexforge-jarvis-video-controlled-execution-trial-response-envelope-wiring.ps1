param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3958 Jarvis Video Controlled Execution Trial Response Envelope Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-response-envelope-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-response-envelope-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-response-envelope-wiring' -Phase 'Phase 3958' -Title 'Jarvis Video Controlled Execution Trial Response Envelope Wiring'
