const { NotFoundError, ValidationError } = require('../errors')

const validationsToCause = validations =>
    validations.map(({ message, context: { label } }) => ({ message, field: label }))

const responseMappers = {
    [NotFoundError.name]:  (error) => ({
        status: 404,
        body: {
            statusCode: 404,
            error: NotFoundError.name,
            message: error.message,
            cause: [],
        }
    }),
    [ValidationError.name]: () => ({
        status: 400,
        body: {
            statusCode: 400,
            error: ValidationError.name,
            message: error.message,
            cause: validationsToCause(error.validations) ?? ([]),
        }
    }),
    default: (error) => ({
        status: 500,
        body: {
            statusCode: 500,
            error: error.name ?? 'UnexpectedError',
            message: error.name,
            cause: []
        }
    }),
}


const errorHandler = (log = console.error) => (error, _req, res, _next) => {
    log(error)

    const mapper = responseMappers[error.name] ?? responseMappers.default
    const { status, body } = mapper(error)

    res.status(status).send(body)
}

module.exports = errorHandler