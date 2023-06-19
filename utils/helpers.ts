export function getFirstLetters(string: string) {
  const words = string.split(" ")

  const firstLetters = words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())

  return firstLetters.join("")
}
