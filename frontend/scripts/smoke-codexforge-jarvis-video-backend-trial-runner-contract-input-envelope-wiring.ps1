param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3981 Jarvis Video Backend Trial Runner Contract Input Envelope Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-input-envelope-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-input-envelope-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-input-envelope-wiring' -Phase 'Phase 3981' -Title 'Jarvis Video Backend Trial Runner Contract Input Envelope Wiring'
