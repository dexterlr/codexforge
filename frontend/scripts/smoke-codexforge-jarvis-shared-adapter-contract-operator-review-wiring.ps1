param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3624 Jarvis Shared Backend Adapter Contract Operator Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-operator-review-wiring.ps1' -Route 'jarvis-shared-adapter-contract-operator-review-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Operator Review Wiring' -RouteHref '/jarvis-shared-adapter-contract-operator-review-wiring' -Phase '3624' -Title 'Jarvis Shared Backend Adapter Contract Operator Review Wiring'
