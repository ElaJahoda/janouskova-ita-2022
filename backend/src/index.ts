import cors from 'cors'
import express from 'express'
import fs from 'fs'

const app = express()
const port = 1234

app.use(cors())

type Data = {
  id: string
  name: string
}

const formatValue = (value: string) => value.toLowerCase().trim().replace(/[y]/g, 'i')

app.get('/users', (req, res, next) => {
  try {
    const dataString = fs.readFileSync(`${__dirname}/../data.json`, 'utf-8')
    const data = JSON.parse(dataString).users

    res.send(
      data.filter((item: Data) =>
        formatValue(item.name).includes(formatValue(req.query.search!.toString()))
      )
    )
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
