export function randomIndex(length: number): number {
  return length > 0 ? Math.floor(Math.random() * length) : 0;
}