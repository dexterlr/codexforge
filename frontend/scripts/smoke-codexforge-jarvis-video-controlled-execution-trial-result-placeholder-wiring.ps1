param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3965 Jarvis Video Controlled Execution Trial Result Placeholder Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-result-placeholder-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-result-placeholder-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-result-placeholder-wiring' -Phase 'Phase 3965' -Title 'Jarvis Video Controlled Execution Trial Result Placeholder Wiring'
