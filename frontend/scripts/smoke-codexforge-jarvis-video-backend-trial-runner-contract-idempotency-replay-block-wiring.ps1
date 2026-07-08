param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 4000 Jarvis Video Backend Trial Runner Contract Idempotency Replay Block Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-idempotency-replay-block-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-idempotency-replay-block-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-idempotency-replay-block-wiring' -Phase 'Phase 4000' -Title 'Jarvis Video Backend Trial Runner Contract Idempotency Replay Block Wiring'
