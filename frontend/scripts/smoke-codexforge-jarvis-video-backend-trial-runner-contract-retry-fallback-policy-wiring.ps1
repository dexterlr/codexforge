param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3992 Jarvis Video Backend Trial Runner Contract Retry Fallback Policy Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-retry-fallback-policy-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-retry-fallback-policy-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-retry-fallback-policy-wiring' -Phase 'Phase 3992' -Title 'Jarvis Video Backend Trial Runner Contract Retry Fallback Policy Wiring'
