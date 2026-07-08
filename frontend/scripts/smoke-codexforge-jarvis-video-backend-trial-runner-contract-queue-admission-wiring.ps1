param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3985 Jarvis Video Backend Trial Runner Contract Queue Admission Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-queue-admission-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-queue-admission-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-queue-admission-wiring' -Phase 'Phase 3985' -Title 'Jarvis Video Backend Trial Runner Contract Queue Admission Wiring'
