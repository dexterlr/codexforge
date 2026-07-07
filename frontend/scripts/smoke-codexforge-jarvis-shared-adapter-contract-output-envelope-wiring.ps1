param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3604 Jarvis Shared Backend Adapter Contract Output Envelope Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-output-envelope-wiring.ps1' -Route 'jarvis-shared-adapter-contract-output-envelope-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Output Envelope Wiring' -RouteHref '/jarvis-shared-adapter-contract-output-envelope-wiring' -Phase '3604' -Title 'Jarvis Shared Backend Adapter Contract Output Envelope Wiring'
