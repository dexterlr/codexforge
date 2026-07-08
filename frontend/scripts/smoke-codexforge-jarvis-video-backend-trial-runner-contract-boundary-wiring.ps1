param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3978 Jarvis Video Backend Trial Runner Contract Boundary Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-boundary-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-boundary-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-boundary-wiring' -Phase 'Phase 3978' -Title 'Jarvis Video Backend Trial Runner Contract Boundary Wiring'
