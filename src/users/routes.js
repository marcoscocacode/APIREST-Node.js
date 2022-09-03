const { Router } = require('express')

const withAsyncErrorHandler = require('../middlewares/async-error')

const router = Router()

// CRUD: 
// Create:
const createUser = async (req, res) => {
    res.status(201).header('Location', '/users/?').send({})
}
router.post('users', withAsyncErrorHandler(createUser))

// Read:
router.get('/', withAsyncErrorHandler (async (res, req) => {
    res.status(200).send({ users: [] })
}))

router.get('/:id', withAsyncErrorHandler (async (res, req) => {
    res.status(200).send({  })
}))

// Update:
router.put('/:id', withAsyncErrorHandler (async (req, res) => {
    res.status(200).send({})
}))

// Delete:
router.delete('/:id', withAsyncErrorHandler (async (req, res) => {
    res.status(204).send()
}))

module.exports = router