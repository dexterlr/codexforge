param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3991 Jarvis Video Backend Trial Runner Contract Timeout Policy Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-timeout-policy-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-timeout-policy-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-timeout-policy-wiring' -Phase 'Phase 3991' -Title 'Jarvis Video Backend Trial Runner Contract Timeout Policy Wiring'
