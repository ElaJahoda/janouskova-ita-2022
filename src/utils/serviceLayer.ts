export const filterUrl = (value: string) => {
  return `${process.env.REACT_APP_URL}?search=${value}`
}
