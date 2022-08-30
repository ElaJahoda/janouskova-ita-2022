import { blogArticleUrl, blogUpdateUrl, urlBlog, urls } from '../urls'

export const serviceLayerFetch = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args)
  if (!response.ok) new Error('aplication error')
  return await response.json()
}
export const blogServices = {
  delete: async (slug: string) => {
    const response = await fetch(blogArticleUrl(slug), { method: 'DELETE' })
    if (!response.ok) throw new Error('Error in database 1')
  },
  update: async (slug: string, body: {}) => {
    const response = await fetch(blogUpdateUrl(slug), {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error('Error in database')
  },
  setNew: async (body: {}) => {
    const response = await fetch(urlBlog, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error('Error in database')
    return await response.json()
  },
}
