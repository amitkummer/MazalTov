// Ignores the year
export function getDaysUntilDate(date, now = new Date()) {
  const other = new Date(date)
  if (now > other) {
    other.setUTCFullYear(now.getUTCFullYear() + 1)
  }
  const day = 1000 * 60 * 60 * 24 // milliseconds in a day
  return Math.ceil((other - now) / day) % 365
}
