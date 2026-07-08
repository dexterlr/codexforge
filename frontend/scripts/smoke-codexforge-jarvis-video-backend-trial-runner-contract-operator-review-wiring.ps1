param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 4007 Jarvis Video Backend Trial Runner Contract Operator Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-operator-review-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-operator-review-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-operator-review-wiring' -Phase 'Phase 4007' -Title 'Jarvis Video Backend Trial Runner Contract Operator Review Wiring'
