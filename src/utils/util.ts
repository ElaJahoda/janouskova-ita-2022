import { useState } from 'react'

export const uniqueId = () => Math.floor(Math.random() * 10_000)

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      console.error
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch {
      console.error
    }
  }
  return [storedValue, setValue] as const
}

export const shuffleArray = <T>(arr: T[]) => {
  return arr.sort(() => Math.random() - 0.5)
}

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(() => resolve(undefined), ms))

export const convertToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
