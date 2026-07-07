param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3616 Jarvis Shared Backend Adapter Contract Replay Block Hook Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-replay-block-hook-wiring.ps1' -Route 'jarvis-shared-adapter-contract-replay-block-hook-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Replay Block Hook Wiring' -RouteHref '/jarvis-shared-adapter-contract-replay-block-hook-wiring' -Phase '3616' -Title 'Jarvis Shared Backend Adapter Contract Replay Block Hook Wiring'
