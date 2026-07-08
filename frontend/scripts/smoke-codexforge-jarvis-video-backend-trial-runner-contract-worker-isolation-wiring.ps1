param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3986 Jarvis Video Backend Trial Runner Contract Worker Isolation Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-worker-isolation-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-worker-isolation-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-worker-isolation-wiring' -Phase 'Phase 3986' -Title 'Jarvis Video Backend Trial Runner Contract Worker Isolation Wiring'
