export function formatSeconds(seconds): string {
  function formatToString(secs): string {
    return secs.toString().padStart(2, '0');
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${formatToString(minutes)}:${formatToString(remainingSeconds)}`;
}
