import cors from 'cors'
import express from 'express'
import fs from 'fs'

const app = express()
const port = 1234

app.use(cors())

app.get('/', (req, res) => {
  const dataString = fs.readFileSync(`${__dirname}/../data.json`, 'utf-8')
  const data = JSON.parse(dataString).users
  const search = req.query.search

  const keys = ['id', 'name']

  const filtered = (data: any[]) => {
    return data.filter(item => keys.some(key => item[key].toLowerCase().includes(search)))
  }

  res.send(filtered(data))
})

app.listen(port, () => {
  console.info(`Example app listening on port ${port}`)
})

export {}
