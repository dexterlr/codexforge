param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3615 Jarvis Shared Backend Adapter Contract Idempotency Hook Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-idempotency-hook-wiring.ps1' -Route 'jarvis-shared-adapter-contract-idempotency-hook-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Idempotency Hook Wiring' -RouteHref '/jarvis-shared-adapter-contract-idempotency-hook-wiring' -Phase '3615' -Title 'Jarvis Shared Backend Adapter Contract Idempotency Hook Wiring'
