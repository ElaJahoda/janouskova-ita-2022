export const uniqueId = (): number => {
  const number = Math.floor(Math.random() * 10000)
  return number
}
