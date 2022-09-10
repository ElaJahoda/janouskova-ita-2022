import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express()
const port = 1234

app.use(cors())
app.use(bodyParser.json())

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Simple Blog API',
      description: 'My simple Blog API',
      version: '1.0.0',
      contact: {
        name: 'Eva J.',
        email: '3la.Jah0da@gmail.com',
        url: 'eva-janouskova.cz',
      },
      termsOfService:
        'https://gitlab.com/ita-2022-react/janouskova-ita-2022/-/blob/main/backend/src/index.ts',
    },
    host: 'localhost:1234',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
      Article: {
        required: ['title', 'content'],
        properties: {
          id: {
            type: 'number',
            description: 'The Auto-generated id of a post from title and id number',
          },
          url: {
            type: 'sting',
          },
          title: {
            type: 'string',
            description: 'title of article',
          },

          content: {
            type: 'string',
            descripton: 'content of post',
          },
        },
        example: {
          id: '123',
          url: 'ahoj-123',
          title: 'awesomeness',
          content: 'The most amazing article in the world...',
        },
      },
    },
  },
  apis: ['src/index.ts'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

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

/**
 * @swagger
 * /blog:
 *  get:
 *    tags:
 *       - Articles
 *    summary: Returns a list of articles
 *    description: use to request all blog articles
 *    responses:
 *      200:
 *         description: OK
 *         schema:
 *             type: 'array'
 *             items:
 *                 $ref: '#/definitions/Article'
 */
app.get('/blog', (req, res, next) => {
  try {
    const data = readData()
    res.send(data)
  } catch (err) {
    next(err)
  }
})

/**
 * @swagger
 * /blog/filter?search={url}:
 *  get:
 *    tags:
 *       - Articles
 *    summary: Filter blog articles
 *    description: use to request filter blog articles
 *    parameters:
 *         - in: path
 *           name: url
 *           description: value for filter
 *           required: false
 *           schema:
 *                type: 'string'
 *    responses:
 *      200:
 *         description: OK
 *         schema:
 *             type: 'array'
 *             items:
 *                 $ref: '#/definitions/Article'
 */
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

/**
 * @swagger
 * /blog/articles/{slug}:
 *  get:
 *    tags:
 *       - Article
 *    summary: Represents an article
 *    description: use to request blog article by params
 *    parameters:
 *         - in: path
 *           name: slug
 *           description: slug params of article
 *           required: true
 *           schema:
 *                type: 'string'
 *    responses:
 *      200:
 *         description: OK
 *         schema:
 *             items:
 *                 $ref: '#/definitions/Article'
 */
app.get('/blog/articles/:slug', (req, res, next) => {
  try {
    const data = readData()
    const filteredArticle = data.filter(item => item.url === req.params.slug)
    res.send(filteredArticle[0])
  } catch (err) {
    next(err)
  }
})

/**
 * @swagger
 * /blog:
 *  post:
 *    tags:
 *       - Article
 *    summary: Create a new article
 *    description: use to request new article
 *    parameters:
 *         - in: body
 *           name: body
 *           description: title  and content of the article
 *           required: true
 *           schema:
 *                type: 'object'
 *                properties:
 *                   title:
 *                        type: 'string'
 *                   content:
 *                        type: 'string'
 *    responses:
 *      200:
 *         description: OK
 *         schema:
 *             items:
 *                 $ref: '#/definitions/Article'
 */
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

/**
 * @swagger
 * /blog/articles/update/{slug}:
 *  post:
 *    tags:
 *       - Article
 *    summary: Update article by params
 *    description: use to request update article by slug params
 *    parameters:
 *         - in: path
 *           name: slug
 *           description: slug params of article
 *           required: true
 *           schema:
 *                type: 'string'
 *         - in: body
 *           name: body
 *           description: title  and content of the article
 *           required: true
 *           schema:
 *                type: 'object'
 *                properties:
 *                   title:
 *                        type: 'string'
 *                   content:
 *                        type: 'string'
 *    responses:
 *      200:
 *         description: OK
 *         schema:
 *             items:
 *                 $ref: '#/definitions/Article'
 */
app.post('/blog/articles/update/:slug', (req, res, next) => {
  try {
    const data = readData()
    const articles = data.map(article =>
      article.url === req.params.slug
        ? { ...article, title: req.body.title, content: req.body.content }
        : article
    )
    if (!data.some(article => article.url === req.params.slug)) {
      res.sendStatus(400)
    } else {
      writeData({ articles: articles })
      res.send(data)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * @swagger
 * /blog/articles/{slug}:
 *  delete:
 *      tags:
 *       - Article
 *      summary: Delete article by params
 *      description: use to request delete article by slug params
 *      parameters:
 *         - in: path
 *           name: slug
 *           description: slug params of article
 *           required: true
 *           schema:
 *                type: 'string'
 *      responses:
 *        200:
 *         description: OK
 *         schema:
 *             items:
 *                 $ref: '#/definitions/Article'
 */
app.delete('/blog/articles/:slug', (req, res, next) => {
  try {
    const data = readData()
    const articles = data.filter(article => article.url !== req.params.slug)
    writeData({ articles: articles })
    res.send(articles)
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
