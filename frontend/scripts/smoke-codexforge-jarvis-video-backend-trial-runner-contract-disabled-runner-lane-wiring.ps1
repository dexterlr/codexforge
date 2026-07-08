param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 4001 Jarvis Video Backend Trial Runner Contract Disabled Runner Lane Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-disabled-runner-lane-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-disabled-runner-lane-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-disabled-runner-lane-wiring' -Phase 'Phase 4001' -Title 'Jarvis Video Backend Trial Runner Contract Disabled Runner Lane Wiring'
