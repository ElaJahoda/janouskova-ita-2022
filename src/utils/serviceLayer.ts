import { apiBlog } from '../urls'

export const serviceLayerFetch = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args)
  if (!response.ok) new Error('aplication error')
  return await response.json()
}

export const blogServices = {
  delete: async (slug: string) => {
    const response = await serviceLayerFetch(apiBlog.detail(slug), { method: 'DELETE' })
  },
  update: async (slug: string, body: {}) => {
    const response = await serviceLayerFetch(apiBlog.update(slug), {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(body),
    })
  },
  create: async (body: {}) => {
    const response = await serviceLayerFetch(apiBlog.blog, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(body),
    })
    return await response
  },
  getOne: async (
    slug: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setContent: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const response = await serviceLayerFetch(apiBlog.detail(slug))
    return setTitle(response.title), setContent(response.content)
  },
  read: async () => {
    const response = await serviceLayerFetch(apiBlog.blog)
    return await response
  },
  filter: async (inputValue: string) => {
    const response = await serviceLayerFetch(apiBlog.filter(inputValue))
    return await response
  },
}
