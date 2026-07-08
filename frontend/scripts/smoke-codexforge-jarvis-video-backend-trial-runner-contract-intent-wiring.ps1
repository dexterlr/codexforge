param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3979 Jarvis Video Backend Trial Runner Contract Intent Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-intent-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-intent-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-intent-wiring' -Phase 'Phase 3979' -Title 'Jarvis Video Backend Trial Runner Contract Intent Wiring'
