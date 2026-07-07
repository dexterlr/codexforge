param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3621 Jarvis Shared Backend Adapter Contract Trading Manifest Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-trading-manifest-wiring.ps1' -Route 'jarvis-shared-adapter-contract-trading-manifest-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Trading Manifest Wiring' -RouteHref '/jarvis-shared-adapter-contract-trading-manifest-wiring' -Phase '3621' -Title 'Jarvis Shared Backend Adapter Contract Trading Manifest Wiring'
