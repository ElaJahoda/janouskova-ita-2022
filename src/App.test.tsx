import { render, screen } from '@testing-library/react'
import JSHistory from './JS-history/js-history'
import React from 'react'

test('renders learn react link', () => {
  render(<JSHistory />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
