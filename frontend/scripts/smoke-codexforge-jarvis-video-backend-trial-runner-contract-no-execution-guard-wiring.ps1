param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 4005 Jarvis Video Backend Trial Runner Contract No Execution Guard Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-no-execution-guard-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-no-execution-guard-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-no-execution-guard-wiring' -Phase 'Phase 4005' -Title 'Jarvis Video Backend Trial Runner Contract No Execution Guard Wiring'
