param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3954 Jarvis Video Controlled Execution Trial Operator Preflight Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-operator-preflight-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-operator-preflight-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-operator-preflight-wiring' -Phase 'Phase 3954' -Title 'Jarvis Video Controlled Execution Trial Operator Preflight Wiring'
