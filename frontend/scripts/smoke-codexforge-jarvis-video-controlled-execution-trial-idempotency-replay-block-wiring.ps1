param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3968 Jarvis Video Controlled Execution Trial Idempotency Replay Block Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-idempotency-replay-block-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-idempotency-replay-block-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-idempotency-replay-block-wiring' -Phase 'Phase 3968' -Title 'Jarvis Video Controlled Execution Trial Idempotency Replay Block Wiring'
