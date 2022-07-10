let notes = [
  {
    id: 1,
    content: 'me tengo que suscribir a midudev en youtube y prepago',
    date: '2001',
    important: true
  },
  {
    id: 2,
    content: 'me tengo que suscribir a midudev en milagro',
    date: '2002',
    important: true
  },
  {
    id: 3,
    content: 'me tengo que suscribir a midudev en youtube',
    date: '2003',
    important: false
  }
]

const express = require('express')
/* const logger = require('./loggerMiddleware') */
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
/* app.use(logger)
app.use((req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.body)
  console.log('funciona')
  console.log('----')
  next()
}) */

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((note) => note.id !== id)
  res.status(204).end()
})

app.get('/', (req, res) => {
  res.send('<h1>hello world</h1>')
})
app.get('/api/notes', (req, res, next) => {
  res.json(notes)
})

app.post('/api/notes', (req, res) => {
  const note = req.body
  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }
  const ids = notes.map((note) => note.id)

  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    import: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  notes = [...notes, newNote]
  res.status(201).json(newNote)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((el) => el.id === id)

  if (note) {
    res.send(note)
  } else {
    res.status(404).end()
  }
})

app.use((req, res) => {
  res.status(400).json({
    error: 'Not found'
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
