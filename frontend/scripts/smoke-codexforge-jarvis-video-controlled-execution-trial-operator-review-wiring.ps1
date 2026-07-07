param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3975 Jarvis Video Controlled Execution Trial Operator Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-operator-review-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-operator-review-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-operator-review-wiring' -Phase 'Phase 3975' -Title 'Jarvis Video Controlled Execution Trial Operator Review Wiring'
