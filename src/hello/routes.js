const { Router } = require('express')

const router = Router()

// GET /hello
router.get('/', (req, res) => {
    res.status(200).send('Hello World!')
})

// GET /hello/:name
router.get('/:name', (req, res) => {
    const name = req.params.name
    res.status(200).send(`Hello ${name}!`)
})

module.exports = router