"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { GpuJobProfile } from "../local-gpu-scheduler-types";

export function GpuJobProfilePanel({ profiles }: { profiles: GpuJobProfile[] }) {
  return (
    <PreviewFoundationCard title="GPU job profiles">
      {profiles.map((profile) => (
        <div key={profile.id}>
          <PreviewFoundationCopy>{profile.label}: {profile.plainEnglish}</PreviewFoundationCopy>
          <PreviewFoundationPillList items={[profile.resourcePosture, profile.estimatedTimePosture]} />
        </div>
      ))}
    </PreviewFoundationCard>
  );
}
