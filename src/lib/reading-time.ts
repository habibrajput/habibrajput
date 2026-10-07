/** Rough reading time for a post body, at ~200 words per minute. */
export function readingTime(content: string) {
  const words = content.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
