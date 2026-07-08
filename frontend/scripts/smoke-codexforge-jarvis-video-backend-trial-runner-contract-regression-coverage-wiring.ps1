param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 4006 Jarvis Video Backend Trial Runner Contract Regression Coverage Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-regression-coverage-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-regression-coverage-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-regression-coverage-wiring' -Phase 'Phase 4006' -Title 'Jarvis Video Backend Trial Runner Contract Regression Coverage Wiring'
