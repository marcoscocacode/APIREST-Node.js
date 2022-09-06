const Joi = require("joi");
const { ValidationError } = require("../errors");

const validate = ({
    body: bodySchema = Joi.any,
    params: paramsSchema = Joi.any,
    query: querySchema = Joi.any,
}) => (req, _res, next) => {
    const { body, params, query } = req
    const schema = Joi.object({
        body: bodySchema,
        params: paramsSchema,
        query: querySchema,
    })

    const {error} = schema.validate({ body, params, query }, { abortEarly: false })

    if (!error) {
        next()
        return
    }

    next(new ValidationError({ validations: error.details }))
}

module.exports = validate