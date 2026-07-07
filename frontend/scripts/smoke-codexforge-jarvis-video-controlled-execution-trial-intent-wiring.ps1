param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3947 Jarvis Video Controlled Execution Trial Intent Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-intent-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-intent-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-intent-wiring' -Phase 'Phase 3947' -Title 'Jarvis Video Controlled Execution Trial Intent Wiring'
