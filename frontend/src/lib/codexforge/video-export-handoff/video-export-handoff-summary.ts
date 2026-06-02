import type { VideoExportHandoffSummary } from "./video-export-handoff-types";
import { buildDefaultVideoExportPackage } from "./video-export-package";
import { buildVideoExportChecklist } from "./video-export-checklist";
import { buildVideoExportDeliveryNote } from "./video-export-delivery-note";
import { buildVideoExportSafety } from "./video-export-safety";
import { buildVideoExportTarget } from "./video-export-target";

export function buildVideoExportHandoffSummary(): VideoExportHandoffSummary {
  const exportPackage = buildDefaultVideoExportPackage();
  const target = buildVideoExportTarget();
  const checklist = buildVideoExportChecklist();
  const safety = buildVideoExportSafety();
  const deliveryNote = buildVideoExportDeliveryNote(target);

  return {
    package: exportPackage,
    target,
    checklist,
    safety,
    deliveryNote,
    summary: summarizeVideoExportHandoff({ package: exportPackage, target, checklist, safety, deliveryNote, summary: "" }),
  };
}

export function summarizeVideoExportHandoff(summary: VideoExportHandoffSummary): string {
  const completed = summary.checklist.items.filter((item) => item.complete).length;
  return `${summary.package.title} targets ${summary.target.kind}; ${completed} of ${summary.checklist.items.length} checklist item(s) are complete and no export executed.`;
}
