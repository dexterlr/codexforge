import type { VideoExportChecklist, VideoExportChecklistItem } from "./video-export-handoff-types";

const CHECKLIST: readonly { item: VideoExportChecklistItem; complete: boolean; plainEnglish: string }[] = [
  {
    item: "final candidate selected",
    complete: true,
    plainEnglish: "A latest final candidate preview record is selected.",
  },
  {
    item: "version history reviewed",
    complete: false,
    plainEnglish: "Render history still needs manual review.",
  },
  {
    item: "assets complete",
    complete: false,
    plainEnglish: "Some project assets are missing or blocked.",
  },
  {
    item: "export target chosen",
    complete: true,
    plainEnglish: "Internal review is the preview target.",
  },
  {
    item: "resolution known",
    complete: false,
    plainEnglish: "Resolution is unknown until a final export is approved.",
  },
  {
    item: "duration known",
    complete: false,
    plainEnglish: "Duration must be reviewed from a supplied final candidate.",
  },
  {
    item: "audio status known",
    complete: false,
    plainEnglish: "Audio status is a manual review item.",
  },
  {
    item: "license/source notes reviewed",
    complete: false,
    plainEnglish: "License and source notes must be checked before delivery.",
  },
  {
    item: "no secrets included",
    complete: true,
    plainEnglish: "The handoff packet does not include secrets or keys.",
  },
  {
    item: "no export executed",
    complete: true,
    plainEnglish: "This page prepares notes only; no export is executed.",
  },
];

export function buildVideoExportChecklist(): VideoExportChecklist {
  return {
    id: "video-export-checklist",
    items: CHECKLIST.map((item) => ({
      id: `video-export-checklist-${item.item.replaceAll(" ", "-")}`,
      ...item,
    })),
  };
}
