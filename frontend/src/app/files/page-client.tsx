"use client";

import { FilesCommandCenter } from "@/lib/codexforge/files/components/files-command-center";
import type { CodexForgeFilesApiResponse } from "@/lib/codexforge/files/file-types";

type FilesPageClientProps = {
  initialData: CodexForgeFilesApiResponse;
};

export default function FilesPageClient({ initialData }: FilesPageClientProps) {
  return <FilesCommandCenter initialData={initialData} />;
}
