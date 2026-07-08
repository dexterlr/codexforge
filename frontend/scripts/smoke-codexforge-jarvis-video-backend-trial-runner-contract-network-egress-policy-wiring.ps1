param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-backend-trial-runner-contract-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke -SmokeName 'Phase 3990 Jarvis Video Backend Trial Runner Contract Network Egress Policy Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-backend-trial-runner-contract-network-egress-policy-wiring.ps1' -Route 'jarvis-video-backend-trial-runner-contract-network-egress-policy-wiring' -RouteHref '/jarvis-video-backend-trial-runner-contract-network-egress-policy-wiring' -Phase 'Phase 3990' -Title 'Jarvis Video Backend Trial Runner Contract Network Egress Policy Wiring'
