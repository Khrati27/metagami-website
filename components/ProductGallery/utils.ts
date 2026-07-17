export function nextImageIndex(
  current: number,
  total: number
) {
  return (current + 1) % total;
}

export function prevImageIndex(
  current: number,
  total: number
) {
  return (current - 1 + total) % total;
}