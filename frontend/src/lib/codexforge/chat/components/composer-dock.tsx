import React from "react";
import { ChatComposer } from "@/lib/codexforge/chat/components/chat-composer";

type ComposerDockProps = React.ComponentPropsWithoutRef<typeof ChatComposer>;

export const ComposerDock = React.forwardRef<HTMLTextAreaElement, ComposerDockProps>(
  function ComposerDock(props, ref) {
    return (
      <div style={composerDockStyle}>
        <ChatComposer ref={ref} {...props} />
      </div>
    );
  }
);

ComposerDock.displayName = "ComposerDock";

const composerDockStyle: React.CSSProperties = {
  position: "sticky",
  bottom: 14,
  zIndex: 40,
  marginTop: 14,
  padding: 12,
  borderRadius: 24,
  border: "1px solid rgba(148,163,184,0.22)",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.92), rgba(2,6,23,0.88))",
  boxShadow: "0 18px 60px rgba(2,6,23,0.42)",
  backdropFilter: "blur(18px)",
};