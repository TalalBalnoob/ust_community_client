export function timeAgo(dateString: string): string {
  // Parse the provided date string into a Date object
  const date = new Date(dateString.replace(' ', 'T')) // Replace space with 'T' for ISO format
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) {
    return `ثانية ${seconds}`
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `دقيقة ${minutes}`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `ساعات ${hours}`
  }

  const days = Math.floor(hours / 24)
  if (days < 7) {
    return `ايام ${days}`
  }

  const weeks = Math.floor(days / 7)
  if (weeks <= 4) {
    return `اسابيع ${weeks}`
  }

  const months = Math.floor(days / 30) // Approximation
  if (months < 12) {
    return 'اشهر ' + months
  }

  const years = Math.floor(days / 365) // Approximation
  return `سنوات ${years}`
}
