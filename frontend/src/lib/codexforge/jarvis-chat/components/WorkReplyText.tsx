const inlineMarkup = /(```[\s\S]*?(?:```|$)|`[^`\n]+`|\*\*[^*\n]+\*\*)/g;

export function WorkReplyText({ text }: { text: string }) {
  return (
    <p>
      {text.split(inlineMarkup).map((part, index) => {
        if (index % 2 === 0 || part.startsWith("```")) return part;
        if (part.startsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      })}
    </p>
  );
}
