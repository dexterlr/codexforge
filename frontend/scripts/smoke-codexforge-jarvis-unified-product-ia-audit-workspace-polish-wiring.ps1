$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3925 Jarvis Unified Product IA Audit Workspace Polish Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-audit-workspace-polish-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Audit Workspace Polish Wiring' -RouteHref '/jarvis-unified-product-ia-audit-workspace-polish-wiring' -Phase 'Phase 3925' -Title 'Jarvis Unified Product IA Audit Workspace Polish Wiring'