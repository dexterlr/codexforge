"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoExportDeliveryNote } from "../video-export-handoff-types";

export function VideoExportDeliveryNotePanel({ deliveryNote }: { deliveryNote: VideoExportDeliveryNote }) {
  return (
    <PreviewFoundationCard title="Delivery note">
      <PreviewFoundationCopy>{deliveryNote.audience}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{deliveryNote.note}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={["manual only", "copy export packet allowed", "future-approved export"]} />
    </PreviewFoundationCard>
  );
}
