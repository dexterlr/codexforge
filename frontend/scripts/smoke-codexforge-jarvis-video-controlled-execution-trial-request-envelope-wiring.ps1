param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3957 Jarvis Video Controlled Execution Trial Request Envelope Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-request-envelope-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-request-envelope-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-request-envelope-wiring' -Phase 'Phase 3957' -Title 'Jarvis Video Controlled Execution Trial Request Envelope Wiring'
