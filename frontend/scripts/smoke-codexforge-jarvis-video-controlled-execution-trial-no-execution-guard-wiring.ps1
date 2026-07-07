param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3973 Jarvis Video Controlled Execution Trial No Execution Guard Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-no-execution-guard-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-no-execution-guard-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-no-execution-guard-wiring' -Phase 'Phase 3973' -Title 'Jarvis Video Controlled Execution Trial No Execution Guard Wiring'
