import { render, screen } from '@testing-library/react'
import JsHistory from './JS-history/JsHistory'
import React from 'react'

test('renders learn react link', () => {
  render(<JsHistory />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
