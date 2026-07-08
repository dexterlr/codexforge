param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3982 Jarvis Video Backend Trial Runner Contract Output Envelope Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-output-envelope-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-output-envelope-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-output-envelope-wiring' -Phase 'Phase 3982' -Title 'Jarvis Video Backend Trial Runner Contract Output Envelope Wiring'
