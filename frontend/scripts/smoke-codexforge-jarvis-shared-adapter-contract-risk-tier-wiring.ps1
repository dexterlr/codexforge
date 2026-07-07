param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3598 Jarvis Shared Backend Adapter Contract Risk Tier Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-risk-tier-wiring.ps1' -Route 'jarvis-shared-adapter-contract-risk-tier-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Risk Tier Wiring' -RouteHref '/jarvis-shared-adapter-contract-risk-tier-wiring' -Phase '3598' -Title 'Jarvis Shared Backend Adapter Contract Risk Tier Wiring'
