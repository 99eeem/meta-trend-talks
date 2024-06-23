export function extractFirst200Word(text: string): string {
  const regexH2 = /<h2/i; // Corrected comment to find <h2> tag
  let endIndex = text.search(regexH2); // Find the index of the first <h2> tag
  let isContinue = false;
  if (endIndex === -1) {
    return '';
  }
  // Adjust endIndex based on the presence of <h2> and the 200 characters limit
  if (endIndex > 200) {
    isContinue = true;
    endIndex = 200;
  }
  let content = text.substring(0, endIndex);
  // Combine regex operations for efficiency
  const regexToRemove = /<br\s*\/?>|<p>|<\/p>/gi;
  content = content.replace(regexToRemove, ''); // Remove <br>, <p>, and </p> tags in one go
  if (isContinue) {
    content += '...';
  }
  return content;
}
