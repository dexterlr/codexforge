import React from "react";

type WorkspaceSectionStackProps = {
  children: React.ReactNode;
};

export function WorkspaceSectionStack({ children }: WorkspaceSectionStackProps) {
  return <div style={sectionStackStyle}>{children}</div>;
}

const sectionStackStyle: React.CSSProperties = {
  display: "grid",
  gap: 14,
  marginTop: 16,
};
