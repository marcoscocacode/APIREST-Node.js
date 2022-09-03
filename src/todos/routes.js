const { Router } = require ('express')
const { TodosRepository } = require('./repository')
const logger = require('../middlewares/logger')

// Todos
const todosRepository = TodosRepository()

const notFound = {
    error: 'Not Found',
    message: 'Resource not found'
}

const router = Router()
router.use(logger())

// GET /todos/:id
router.get('/:id', async (req, res) => { // Can add a 'logger()' to select only one method
    const id = parseInt(req.params.id)
    const todo = await todosRepository.get(id)
    if (!todo) {
        res.status(404).send(notFound)
        return
    }
    res.status(200).send(todo)
})

// POST /todos
router.post('/', async (req, res) => {
    const todo = req.body
    const inserted = await todosRepository.insert(todo)
    res
        .status(201)
        .header("Location", `/todos/${inserted.id}`)
        .send(inserted)
})

// PUT /todos
router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const todo = {...req.body, id}
    const found = await todosRepository.get(id)
    if (!found) {
        res.status(404).send(notFound)
        return
    }
    const updated = await todosRepository.update(todo)
    res.status(200).send(updated)
})

// DEL /todos
router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const found = await todosRepository.get(id)
    if (!found) {
        res.status(404).send(notFound)
        return
    }
    await todosRepository.del(id)
    res.status(204).send()
})

// GET /todos
router.get("/", (_req, res) => {
    todosRepository
        .list()
        .then(todos => res.status(200).send({ todos }))
})

module.exports = router