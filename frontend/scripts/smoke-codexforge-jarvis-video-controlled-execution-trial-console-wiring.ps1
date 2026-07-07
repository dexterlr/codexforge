param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3948 Jarvis Video Controlled Execution Trial Console Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-console-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-console-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-console-wiring' -Phase 'Phase 3948' -Title 'Jarvis Video Controlled Execution Trial Console Wiring'
