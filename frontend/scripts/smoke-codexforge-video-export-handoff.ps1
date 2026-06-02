param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Video Export Handoff" `
  -ScriptFile "smoke-codexforge-video-export-handoff.ps1" `
  -Domain "src\lib\codexforge\video-export-handoff" `
  -Route "src\app\video-export" `
  -MainPanel "VideoExportHandoffPanel" `
  -CommandLabel "Go to Video Export" `
  -Modules @("video-export-handoff-types.ts","video-export-package.ts","video-export-target.ts","video-export-checklist.ts","video-export-safety.ts","video-export-delivery-note.ts","video-export-handoff-summary.ts","index.ts") `
  -Components @("VideoExportHandoffPanel.tsx","VideoExportPackagePanel.tsx","VideoExportTargetPanel.tsx","VideoExportChecklistPanel.tsx","VideoExportSafetyPanel.tsx","VideoExportDeliveryNotePanel.tsx","VideoExportHandoffSummaryPanel.tsx","VideoExportSafetyStrip.tsx","VideoExportEmptyState.tsx","index.ts") `
  -Exports @("buildVideoExportPackage","buildDefaultVideoExportPackage","buildVideoExportTarget","buildVideoExportChecklist","buildVideoExportSafety","buildVideoExportDeliveryNote","buildVideoExportHandoffSummary","summarizeVideoExportHandoff") `
  -PlainEnglish @("Video export handoff","Prepare final video delivery notes before any export runs.","Review export handoff","local file","social clip","product demo","internal review","client review","archive package","cloud final later","manual delivery","final candidate selected","version history reviewed","assets complete","export target chosen","resolution known","duration known","audio status known","license/source notes reviewed","no secrets included","no export executed","No export button","No file write","No upload","Copy export packet allowed","manual/future-approved","no file write","no upload","no auto-generation","no fake generation success","no direct ComfyUI workflow run","no ComfyUI queue submit","no job queue mutation","no arbitrary file browsing","no delete artifact button","no real export","no silent persistence") `
  -ExtraRoutes @("/video-projects","/render-history","/video-final-render","/video-artifacts","/production")
