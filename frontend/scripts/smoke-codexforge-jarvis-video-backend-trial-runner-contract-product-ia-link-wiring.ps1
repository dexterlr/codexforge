param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 4004 Jarvis Video Backend Trial Runner Contract Product IA Link Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-product-ia-link-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-product-ia-link-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-product-ia-link-wiring' -Phase 'Phase 4004' -Title 'Jarvis Video Backend Trial Runner Contract Product IA Link Wiring'
