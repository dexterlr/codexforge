param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3613 Jarvis Shared Backend Adapter Contract Kill Switch Hook Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-kill-switch-hook-wiring.ps1' -Route 'jarvis-shared-adapter-contract-kill-switch-hook-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Kill Switch Hook Wiring' -RouteHref '/jarvis-shared-adapter-contract-kill-switch-hook-wiring' -Phase '3613' -Title 'Jarvis Shared Backend Adapter Contract Kill Switch Hook Wiring'
