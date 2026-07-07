param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3614 Jarvis Shared Backend Adapter Contract Lock Manager Hook Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-lock-manager-hook-wiring.ps1' -Route 'jarvis-shared-adapter-contract-lock-manager-hook-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Lock Manager Hook Wiring' -RouteHref '/jarvis-shared-adapter-contract-lock-manager-hook-wiring' -Phase '3614' -Title 'Jarvis Shared Backend Adapter Contract Lock Manager Hook Wiring'
