const { NotFoundError } = require('../../errors')
const { wait } = require('../../utils')

const InMemoryUsersRepository = () => {
    let idSequence = 1
    const users = {}

const insert = async (user) => {
    await wait(500)
    const id = idSequence++
    const data = { ...user, id }
    users[id] = data
    return data
}

const list = async () => {
    await wait(100)
    return Object.values(users)
}

const get = async (id) => {
    await wait(100)
    return users[id] ?? Promise.reject(new NotFoundError({ resourceName: 'user', resourceIdentifier: id }))
}

const update = async (user) => {
    await wait(500)
    users[user.id] = user
    return user
}

const del = async (id) => {
    await wait(500)
    delete users[id]
}

return {
    insert,
    list,
    get,
    update,
    del,
    }
}

module.exports = {
    InMemoryUsersRepository,
}