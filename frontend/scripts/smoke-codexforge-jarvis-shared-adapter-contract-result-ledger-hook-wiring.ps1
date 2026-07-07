param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3611 Jarvis Shared Backend Adapter Contract Result Ledger Hook Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-result-ledger-hook-wiring.ps1' -Route 'jarvis-shared-adapter-contract-result-ledger-hook-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Result Ledger Hook Wiring' -RouteHref '/jarvis-shared-adapter-contract-result-ledger-hook-wiring' -Phase '3611' -Title 'Jarvis Shared Backend Adapter Contract Result Ledger Hook Wiring'
