import type { VideoDraftRecord } from "./video-draft-comparison-types";

export function buildVideoDraftRecord(input: Partial<VideoDraftRecord> = {}): VideoDraftRecord {
  return {
    id: input.id ?? "video-draft-record-a",
    label: input.label ?? "Future draft A",
    source: input.source ?? "future reviewed video artifact",
    playbackAllowed: false,
  };
}

export function buildDefaultVideoDraftRecords(): VideoDraftRecord[] {
  return [
    buildVideoDraftRecord({ id: "video-draft-record-a", label: "Future draft A" }),
    buildVideoDraftRecord({ id: "video-draft-record-b", label: "Future draft B" }),
  ];
}
