param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3995 Jarvis Video Backend Trial Runner Contract Privacy Safety Gate Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-privacy-safety-gate-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-privacy-safety-gate-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-privacy-safety-gate-wiring' -Phase 'Phase 3995' -Title 'Jarvis Video Backend Trial Runner Contract Privacy Safety Gate Wiring'
