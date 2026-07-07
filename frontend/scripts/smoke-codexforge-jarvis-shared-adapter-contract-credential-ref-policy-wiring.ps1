param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3606 Jarvis Shared Backend Adapter Contract Credential Ref Policy Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-credential-ref-policy-wiring.ps1' -Route 'jarvis-shared-adapter-contract-credential-ref-policy-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Credential Ref Policy Wiring' -RouteHref '/jarvis-shared-adapter-contract-credential-ref-policy-wiring' -Phase '3606' -Title 'Jarvis Shared Backend Adapter Contract Credential Ref Policy Wiring'
