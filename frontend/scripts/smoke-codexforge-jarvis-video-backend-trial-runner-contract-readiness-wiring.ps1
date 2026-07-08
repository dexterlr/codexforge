param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 4008 Jarvis Video Backend Trial Runner Contract Readiness Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-readiness-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-readiness-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-readiness-wiring' -Phase 'Phase 4008' -Title 'Jarvis Video Backend Trial Runner Contract Readiness Wiring'
