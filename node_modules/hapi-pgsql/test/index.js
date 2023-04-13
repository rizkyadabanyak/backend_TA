'use strict'
const Hapi = require('@hapi/hapi')
const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const lab = (exports.lab = Lab.script())

const getUrl = () => {
    return 'postgresql://username@localhost/test'
}

lab.experiment('#hapi-pgsql tests', () => {
    let server

    lab.beforeEach(async () => {
        server = Hapi.Server()
    })
    lab.test('should reject invalid options', async () => {
        try {
            await server.register({
                plugin: require('../lib'),
                options: {
                    database_urls: {}
                }
            })
        } catch (err) {
            expect(err).to.exist()
        }
    })

    lab.test('should reject invalid url without hostname', async () => {
        try {
            await server.register({
                plugin: require('../lib'),
                options: {
                    database_url: 'postgresql://'
                }
            })
        } catch (err) {
            expect(err).to.exist()
            expect(err.message).to.equal('Invalid connection Postgresql URL')
        }
    })

    lab.test('should reject invalid url without pathname', async () => {
        try {
            await server.register({
                plugin: require('../lib'),
                options: {
                    database_url: 'postgresql://localhost'
                }
            })
        } catch (err) {
            expect(err).to.exist()
            expect(err.message).to.equal('Invalid connection Postgresql URL')
        }
    })

    lab.test('should be able to register plugin with URL', async () => {
        await server
            .register({
                plugin: require('../lib'),
                options: {
                    database_url: getUrl()
                }
            })
            .then(async () => {
                expect(server.registrations['hapi-pgsql']).to.exist()
            })
    })

    lab.test('should log configuration upon successful connection', async () => {
        let logEntry
        server.events.once('log', entry => {
            logEntry = entry
        })

        await server.register({
            plugin: require('../lib'),
            options: {
                database_url: getUrl()
            }
        })

        expect(logEntry).to.equal(
            {
                channel: 'app',
                timestamp: logEntry.timestamp,
                tags: ['hapi-pgsql', 'info'],
                data: `hapi connection created for username@localhost/test`
            },
            { prototype: false }
        )
    })

    lab.test('should be able to find the plugin on exposed objects', async () => {
        await server.register({
            plugin: require('../lib'),
            options: {
                database_url: getUrl()
            }
        })

        server.route({
            method: 'GET',
            path: '/',
            handler: request => {
                const plugin = request.pgsql
                expect(plugin.query).to.exist()
                return '.'
            }
        })
        await server.inject({
            validate: false,
            method: 'GET',
            url: '/'
        })
    })

    lab.test(
        'should be able to find the plugin on decorated objects',
        async () => {
            await server.register({
                plugin: require('../lib'),
                options: {
                    database_url: getUrl(),
                }
            })

            server.route({
                method: 'GET',
                path: '/',
                handler: request => {
                    const plugin = request.pgsql
                    expect(plugin.connect).to.exist()
                    expect(plugin.end).to.exist()
                    expect(plugin.query).to.exist()
                    return null
                }
            })
            await server.inject({
                validate: false,
                method: 'GET',
                url: '/'
            })
            server.pgsql.end()
        }
    )

    lab.test('should shut down pool when server stops', async () => {
        let logEntry
        server.events.on('log', entry => {
            logEntry = entry
        })
        await server.register({
            plugin: require('../lib'),
            options: {
                database_url: getUrl()
            }
        })
        await server.stop()
        expect(logEntry).to.equal(
            {
                channel: 'app',
                timestamp: logEntry.timestamp,
                tags: ['hapi-pgsql', 'info'],
                data: 'ending pgsql connection pool for username@localhost/test'
            },
            { prototype: false }
        )
    })
})