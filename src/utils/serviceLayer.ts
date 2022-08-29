export const myCustomFetch = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args)
  if (!response.ok) new Error('aplication error')
  return await response.json()
}
