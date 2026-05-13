"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

export function FileOpenInBrainLink({ filePath }: { filePath: string }) {
  return (
    <Link
      data-codexforge-file-open-in-brain-link
      href="/brain"
      style={link}
      title={`Future brain focus path: ${filePath}`}
    >
      Open in brain view
    </Link>
  );
}

const link: CSSProperties = {
  border: "1px solid rgba(99,102,241,0.34)",
  background: "rgba(99,102,241,0.14)",
  borderRadius: 8,
  padding: "8px 10px",
  color: "white",
  textDecoration: "none",
  fontSize: 12,
  fontWeight: 900,
  display: "inline-flex",
  width: "fit-content",
};
