param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3989 Jarvis Video Backend Trial Runner Contract Credential Token Boundary Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-credential-token-boundary-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-credential-token-boundary-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-credential-token-boundary-wiring' -Phase 'Phase 3989' -Title 'Jarvis Video Backend Trial Runner Contract Credential Token Boundary Wiring'
