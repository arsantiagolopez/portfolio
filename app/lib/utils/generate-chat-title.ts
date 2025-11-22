const MAX_TITLE_LENGTH = 50;

export function generateChatTitle(text?: string): string {
  if (!text) {
    return "New conversation";
  }

  const truncated = text.slice(0, MAX_TITLE_LENGTH);
  const needsEllipsis = text.length > MAX_TITLE_LENGTH;

  return needsEllipsis ? `${truncated}...` : truncated;
}
