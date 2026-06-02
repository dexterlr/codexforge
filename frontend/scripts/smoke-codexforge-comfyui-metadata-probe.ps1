param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "ComfyUI Metadata Probe" `
  -ScriptFile "smoke-codexforge-comfyui-metadata-probe.ps1" `
  -Domain "src\lib\codexforge\comfyui-metadata-probe" `
  -Route "src\app\comfyui-metadata" `
  -MainPanel "ComfyUiMetadataProbePanel" `
  -CommandLabel "Go to ComfyUI Metadata" `
  -Modules @("comfyui-metadata-probe-types.ts","comfyui-metadata-target.ts","comfyui-metadata-request.ts","comfyui-metadata-result.ts","comfyui-metadata-safety.ts","comfyui-metadata-handoff.ts","comfyui-metadata-summary.ts","index.ts") `
  -Components @("ComfyUiMetadataProbePanel.tsx","ComfyUiMetadataTargetPanel.tsx","ComfyUiMetadataRequestPanel.tsx","ComfyUiMetadataResultPanel.tsx","ComfyUiMetadataSafetyPanel.tsx","ComfyUiMetadataHandoffPanel.tsx","ComfyUiMetadataSummaryPanel.tsx","ComfyUiMetadataSafetyStrip.tsx","ComfyUiMetadataEmptyState.tsx","index.ts") `
  -Exports @("buildComfyUiMetadataTarget","buildDefaultComfyUiMetadataTarget","buildComfyUiMetadataRequest","buildComfyUiMetadataResult","buildComfyUiMetadataSafety","buildComfyUiMetadataHandoff","buildComfyUiMetadataSummary","summarizeComfyUiMetadataProbe") `
  -PlainEnglish @("ComfyUI metadata","Review local ComfyUI readiness without sending prompts or workflows.","Review metadata plan","base URL status","local-only status","server reachable supplied/unknown","version supplied/unknown","system stats supplied/unknown","queue stats supplied/unknown","node list supplied/unknown","model list supplied/unknown","no prompt sent","no workflow submitted","no queue mutation","supplied","preview","future-approved-probe","Metadata probes do not send prompts","no ComfyUI queue submit","no job queue mutation") `
  -ExtraRoutes @("/comfyui-health/gate","/comfyui-health","/provider-tests","/comfyui-workflows/import","/comfyui-workflows/dry-run")
