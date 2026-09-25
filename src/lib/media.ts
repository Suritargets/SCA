export function isPdfUrl(url: string): boolean {
  return url.toLowerCase().split("?")[0].endsWith(".pdf");
}
