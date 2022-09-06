class DomainError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class NotFoundError extends DomainError {
    constructor({ resourceName, resourceIdentifier }) {
        super(`Resource ${resourceName} with identifier ${resourceIdentifier} not found.`)
        this.resourceName = resourceName
        this.resourceIdentifier = resourceIdentifier
    }
}

class ValidationError extends DomainError {
    constructor ({message = 'Invalid parameters', validations}) {
        super(message)
        this.validations = validations
    }
}


module.exports = {
    NotFoundError,
    ValidationError,
}