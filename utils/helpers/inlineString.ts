export function inlineString(str: string): string {
    return str
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .join(' ');
}