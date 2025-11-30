export function showToast(message, type = "info") {
  const audio = document.getElementById(`sound-${type}`);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
  window.showToast?.(message, type);
}
