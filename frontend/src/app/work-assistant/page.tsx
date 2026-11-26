import type { Metadata } from "next";
import Link from "next/link";
import { WorkAssistant } from "./WorkAssistant";
import styles from "./WorkAssistant.module.css";

export const metadata: Metadata = {
  title: "Work Assistant",
  description: "Bring a question, task, or set of notes to Jarvis.",
};

export default async function WorkAssistantPage({
  searchParams,
}: {
  searchParams: Promise<{ conversation?: string | string[] }>;
}) {
  const { conversation } = await searchParams;
  const conversationId = Array.isArray(conversation) ? conversation[0] : conversation;
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <nav aria-label="Workspace navigation" className={styles.nav}>
          <Link href="/" aria-label="CodexForge home" className={styles.brand}>
            <span aria-hidden="true" className={styles.brandMark}>C</span>
            CodexForge
          </Link>
          <span className={styles.activeNav} aria-current="page">Work Assistant</span>
          <Link href="/jarvis" className={styles.chatLink}>Jarvis chat</Link>
        </nav>
      </header>
      <main className={styles.workspace}><WorkAssistant conversationId={conversationId ?? null} /></main>
    </div>
  );
}
