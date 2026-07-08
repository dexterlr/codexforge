param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3993 Jarvis Video Backend Trial Runner Contract Cost Rate Guard Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-cost-rate-guard-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-cost-rate-guard-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-cost-rate-guard-wiring' -Phase 'Phase 3993' -Title 'Jarvis Video Backend Trial Runner Contract Cost Rate Guard Wiring'
