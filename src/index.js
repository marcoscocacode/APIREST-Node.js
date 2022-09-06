const express = require ('express')

const hello = require('./hello/routes')
const todos = require('./todos/routes')
const users = require('./users/routes')

const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/error')

const app = express()
const router = express.Router()

router.use(express.json())
router.use(logger()) // The orders matters
router.use('/hello', hello)
router.use('/todos', todos)
router.use('/users', users)

router.use(errorHandler())

app.use('./api', router)

app.listen(3000, '0.0.0.0', () => {
    console.log('Server started')
})
    .once('error', (error) => {
        console.error(error)
        process.exit(1)
    })