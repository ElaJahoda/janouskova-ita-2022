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

//filter articles
app.get('/blog', (req, res, next) => {
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

//all articles
app.get('/blog', (req, res, next) => {
  try {
    const data = readData()
    res.send(data)
  } catch (err) {
    next(err)
  }
})

//detail article
app.get('/blog/articles/:slug', (req, res, next) => {
  try {
    const data = readData()
    const filteredArticle = data.filter(item => item.url === req.params.slug)

    res.send(filteredArticle[0])
    console.info('ahoj')
  } catch (err) {
    next(err)
  }
})

//create article
app.post('/blog', (req, res) => {
  const newArticle = req.body
  const data = readData()
  const articles = [newArticle, ...data]
  writeData({ articles: articles })
  res.send(newArticle)
})

//update article
app.post('/blog/articles/update/:slug', (req, res, next) => {
  try {
    const data = readData()
    const slug = req.params.slug
    const newArticle = req.body
    const articles = data.map(article => (article.url === slug ? newArticle : article))
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

//delete article
app.delete('/blog/articles/:slug', (req, res, next) => {
  try {
    const data = readData()
    const articles = data.filter(article => article.url !== req.params.slug)
    writeData({ articles: articles })
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
