param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3607 Jarvis Shared Backend Adapter Contract Token Ref Policy Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-token-ref-policy-wiring.ps1' -Route 'jarvis-shared-adapter-contract-token-ref-policy-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Token Ref Policy Wiring' -RouteHref '/jarvis-shared-adapter-contract-token-ref-policy-wiring' -Phase '3607' -Title 'Jarvis Shared Backend Adapter Contract Token Ref Policy Wiring'
