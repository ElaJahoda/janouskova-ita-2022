import { Article } from '../BlogPost/Create/CreateBlogContext'
import { Articles } from '../BlogPost/List/BlogContextProvider'
import { apiBlog } from './urls'

export const serviceLayerFetch = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args)
  if (!response.ok) new Error('aplication error')
  return await response.json()
}

export const blogServices = {
  delete: async (slug: string) => {
    const response = (await serviceLayerFetch(apiBlog.detail(slug), {
      method: 'DELETE',
    })) as {}
  },
  update: async (slug: string, body: {}) => {
    const response = (await serviceLayerFetch(apiBlog.update(slug), {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(body),
    })) as Articles
  },
  create: async (body: {}) => {
    const response = (await serviceLayerFetch(apiBlog.blog, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(body),
    })) as Article
    return response
  },
  getOne: async (slug: string) => {
    const response = (await serviceLayerFetch(apiBlog.detail(slug))) as Article
    return response
  },
  read: async () => {
    const response = (await serviceLayerFetch(apiBlog.blog)) as Articles
    return response
  },
  filter: async (inputValue: string) => {
    const response = (await serviceLayerFetch(apiBlog.filter(inputValue))) as Articles
    return response
  },
}
