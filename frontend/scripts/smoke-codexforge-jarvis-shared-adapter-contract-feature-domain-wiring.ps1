param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3597 Jarvis Shared Backend Adapter Contract Feature Domain Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-feature-domain-wiring.ps1' -Route 'jarvis-shared-adapter-contract-feature-domain-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Feature Domain Wiring' -RouteHref '/jarvis-shared-adapter-contract-feature-domain-wiring' -Phase '3597' -Title 'Jarvis Shared Backend Adapter Contract Feature Domain Wiring'
