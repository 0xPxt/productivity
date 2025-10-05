/**
 * Formats seconds into HH:MM:SS format
 */
export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Calculates fill percentage based on elapsed time
 */
export function calculateFillPercentage(totalSeconds: number, remainingSeconds: number): number {
  if (totalSeconds === 0) {
    return 0;
  }
  const elapsed = totalSeconds - remainingSeconds;
  const progress = elapsed / totalSeconds;
  return progress * 100;
}
