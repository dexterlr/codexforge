param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3602 Jarvis Shared Backend Adapter Contract Backend Only Mode Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-backend-only-mode-wiring.ps1' -Route 'jarvis-shared-adapter-contract-backend-only-mode-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Backend Only Mode Wiring' -RouteHref '/jarvis-shared-adapter-contract-backend-only-mode-wiring' -Phase '3602' -Title 'Jarvis Shared Backend Adapter Contract Backend Only Mode Wiring'
