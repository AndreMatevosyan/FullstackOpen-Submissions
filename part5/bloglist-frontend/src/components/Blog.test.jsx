import { render, screen } from '@testing-library/react'
import Blog from './Blog.jsx'

describe('display functionality', () => {
  test('displays only author and title by default', () => {
    const user = {
      username: 'amatevo',
      name: 'Andre Matevosyan'
    }
    const blog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 37,
      user: user
    }

    const { container } = render(<Blog blog={blog} user={user} />)
    const div = container.querySelector('.blogInfo')
    screen.getByText('Canonical string reduction Edsger W. Dijkstra')
    expect(div).not.toBeInTheDocument()
  })
})