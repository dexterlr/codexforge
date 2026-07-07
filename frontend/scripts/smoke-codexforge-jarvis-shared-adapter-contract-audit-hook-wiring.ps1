param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3609 Jarvis Shared Backend Adapter Contract Audit Hook Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-audit-hook-wiring.ps1' -Route 'jarvis-shared-adapter-contract-audit-hook-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Audit Hook Wiring' -RouteHref '/jarvis-shared-adapter-contract-audit-hook-wiring' -Phase '3609' -Title 'Jarvis Shared Backend Adapter Contract Audit Hook Wiring'
