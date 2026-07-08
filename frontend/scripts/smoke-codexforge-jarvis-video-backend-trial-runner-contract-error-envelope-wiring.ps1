param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3983 Jarvis Video Backend Trial Runner Contract Error Envelope Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-error-envelope-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-error-envelope-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-error-envelope-wiring' -Phase 'Phase 3983' -Title 'Jarvis Video Backend Trial Runner Contract Error Envelope Wiring'
