import { marked } from 'marked';

// Configure marked options if needed
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert line breaks to <br>
  // smartLists: true, // Removed as it is not a valid property
  //smartypants: true, // Enable smart quotes and other typographic enhancements
});

/**
 * Converts markdown content to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  return await marked.parse(markdown);
}

/**
 * Sanitizes the HTML to prevent XSS attacks
 * In a real application, you would use a proper sanitizer like DOMPurify
 */
export function sanitizeHtml(html: string): string {
  // This is a placeholder for a proper sanitization function
  // In production, use a proper sanitizer like DOMPurify
  return html;
}

/**
 * Process raw markdown content to safe HTML
 */
export async function processMarkdown(markdown: string): Promise<string> {
  const html = await markdownToHtml(markdown);
  return sanitizeHtml(html);
}