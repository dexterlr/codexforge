param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3961 Jarvis Video Controlled Execution Trial Cost Rate Timeout Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-cost-rate-timeout-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-cost-rate-timeout-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-cost-rate-timeout-wiring' -Phase 'Phase 3961' -Title 'Jarvis Video Controlled Execution Trial Cost Rate Timeout Wiring'
