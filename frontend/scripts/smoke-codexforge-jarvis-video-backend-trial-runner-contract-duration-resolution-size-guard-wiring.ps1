param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3994 Jarvis Video Backend Trial Runner Contract Duration Resolution Size Guard Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-duration-resolution-size-guard-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-duration-resolution-size-guard-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-duration-resolution-size-guard-wiring' -Phase 'Phase 3994' -Title 'Jarvis Video Backend Trial Runner Contract Duration Resolution Size Guard Wiring'
