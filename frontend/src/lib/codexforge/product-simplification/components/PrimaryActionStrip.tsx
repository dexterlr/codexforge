"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { PrimaryAction } from "../product-simplification-types";

export function PrimaryActionStrip({ action, href }: { action: PrimaryAction; href: string }) {
  return (
    <div style={strip} data-codexforge-primary-action-strip="PrimaryActionStrip renders one primary action per key route safe-only focus scroll open copy prepare">
      <Link href={href} style={primaryLink}>
        {action.label}
      </Link>
      <span style={description}>{action.description}</span>
    </div>
  );
}

const strip: CSSProperties = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  minWidth: 0,
};

const primaryLink: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.44)",
  background: "linear-gradient(135deg, rgba(20,184,166,0.92), rgba(14,165,233,0.86))",
  borderRadius: 8,
  color: "#021014",
  fontSize: 13,
  fontWeight: 950,
  padding: "10px 12px",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

const description: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.45,
};
