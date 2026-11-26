export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.NEXT_PHASE !== "phase-production-build") {
    const { startChatCapture } = await import("@/lib/codexforge/brain/learning/chat-capture.server");
    startChatCapture();
  }
}
