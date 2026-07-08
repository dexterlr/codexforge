param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3980 Jarvis Video Backend Trial Runner Contract Runner Interface Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-runner-interface-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-runner-interface-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-runner-interface-wiring' -Phase 'Phase 3980' -Title 'Jarvis Video Backend Trial Runner Contract Runner Interface Wiring'
