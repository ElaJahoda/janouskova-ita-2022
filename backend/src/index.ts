import cors from 'cors'
import express from 'express'
import fs from 'fs'

const app = express()
const port = 1234

app.use(cors())

const formatValue = (value: string) => value.toLowerCase().trim().replace(/[y]/g, 'i')

app.get('/users', (req, res, next) => {
  console.info('nekdo vola server')
  try {
    const dataString = fs.readFileSync(`${__dirname}/../data.son`, 'utf-8')
    const data = JSON.parse(dataString).users

    const keys = ['id', 'name']

    const filtered = (data: any[]) => {
      return data.filter(item =>
        keys.some(key => formatValue(item[key]).includes(formatValue(req.query.search!.toString())))
      )
    }

    res.send(filtered(data))
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
