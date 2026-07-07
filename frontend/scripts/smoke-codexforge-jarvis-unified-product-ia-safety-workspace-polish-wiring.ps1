$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3926 Jarvis Unified Product IA Safety Workspace Polish Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-safety-workspace-polish-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Safety Workspace Polish Wiring' -RouteHref '/jarvis-unified-product-ia-safety-workspace-polish-wiring' -Phase 'Phase 3926' -Title 'Jarvis Unified Product IA Safety Workspace Polish Wiring'