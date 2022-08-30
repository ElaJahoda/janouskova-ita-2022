import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import fs from 'fs'

const app = express()
const port = 1234

app.use(cors())
app.use(bodyParser.json())

type User = {
  id: string
  name: string
}

type Article = { id: number; url: string; title: string; content: string }

const formatValue = (value: string) => value.toLowerCase().trim().replace(/[y]/g, 'i')

const slugifiedTitle = (textToSlug: string, id: number | string) => {
  textToSlug
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${textToSlug}-${id}`
}
const generateID = () => {
  return Math.floor(Math.random() * 100_000_000)
}
const readData = () => {
  const dataString = fs.readFileSync(`${__dirname}/../dataArticles.json`, 'utf-8')
  return JSON.parse(dataString).articles as Article[]
}

const writeData = (dataToJSON: {}) => {
  fs.writeFileSync(
    `${__dirname}/../dataArticles.json`,
    JSON.stringify(dataToJSON, null, 2),
    'utf-8'
  )
}

app.get('/users', (req, res, next) => {
  try {
    const dataString = fs.readFileSync(`${__dirname}/../data.json`, 'utf-8')
    const data = JSON.parse(dataString).users as User[]

    res.send(
      data.filter(item =>
        formatValue(item.name).includes(formatValue(req.query.search?.toString() ?? ''))
      )
    )
  } catch (err) {
    next(err)
  }
})

app.get('/blog', (req, res, next) => {
  try {
    const data = readData()
    res.send(data)
  } catch (err) {
    next(err)
  }
})

app.get('/blog/filter', (req, res, next) => {
  try {
    const data = readData()
    res.send(
      data.filter(item =>
        formatValue(item.title).includes(formatValue(req.query.search?.toString() ?? ''))
      )
    )
  } catch (err) {
    next(err)
  }
})

app.get('/blog/articles/:slug', (req, res, next) => {
  try {
    const data = readData()
    const filteredArticle = data.filter(item => item.url === req.params.slug)
    res.send(filteredArticle[0])
  } catch (err) {
    next(err)
  }
})

app.post('/blog', (req, res) => {
  const id = generateID()
  const newArticle = {
    id: id,
    url: slugifiedTitle(req.body.title, id),
    title: req.body.title,
    content: req.body.content,
  }
  const data = readData()
  const articles = [newArticle, ...data]
  writeData({ articles: articles })
  res.send(newArticle)
})

app.post('/blog/articles/update/:slug', (req, res, next) => {
  try {
    const data = readData()
    const slug = req.params.slug
    const newArticle = req.body
    const articles = data.map(article =>
      article.url === slug
        ? { ...article, title: req.body.title, content: req.body.content }
        : article
    )
    if (!data.some(article => article.url === slug)) {
      res.sendStatus(400)
    } else {
      writeData({ articles: articles })
      res.send('Article updated')
    }
  } catch (err) {
    next(err)
  }
})

app.delete('/blog/articles/:slug', (req, res, next) => {
  try {
    const data = readData()
    const articles = data.filter(article => article.url !== req.params.slug)
    writeData({ articles: articles })
    res.send('Article deleted')
  } catch (err) {
    next(err)
  }
})

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err)
  res.status(422).json('oh noes!')
  res.json(err)
})

app.listen(port, () => {
  console.info(`Example app listening on port ${port}`)
})
