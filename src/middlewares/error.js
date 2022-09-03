const errorHandler = (log = console.error) => (error, _req, res, _next) => {
    log(error)
    res.status(500).send({ message: error.message })
}

module.exports = errorHandler