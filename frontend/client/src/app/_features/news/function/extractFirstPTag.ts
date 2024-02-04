export function extractFirstPTag(text: string): string {
  const endMark = '。';
  const endIndex = text.indexOf(endMark, 0);

  if (endIndex !== -1) {
    let content = text.substring(0, endIndex + 1);
    const regexP = /^<p>/i;
    if (regexP.test(content)) {
      const regexBr = /<br\s*\/?>/gi;
      const regexPStart = /<p>/gi;
      const regexPEnd = /<\/p>/gi;
      content = content.replace(regexBr, ''); // Remove <br> tags
      content = content.replace(regexPStart, ''); // Remove <p> tags
      content = content.replace(regexPEnd, ''); // Remove </p> tags
      return content;
    }
    return '';
  } else {
    return '';
  }
}
