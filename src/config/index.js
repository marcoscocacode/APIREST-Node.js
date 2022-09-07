const immutable = Object.freeze

const database = immutable ({
    client: 'mysql2',
    connection: immutable ({
        host:'127.0.0.1',
        port: 3306,
        user: 'staart',
        password: 'staart',
        database: 'users'
    }),
    migrations: immutable ({
        tableName: 'migrations',
    }),
})

module.exports = {
    database,
}