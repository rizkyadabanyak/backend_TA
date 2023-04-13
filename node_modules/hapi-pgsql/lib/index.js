'use strict'

const Pool = require('pg-pool')

exports.plugin = {
  async register(server, pluginOptions) {
    let connectConfig
    try {
      connectConfig = new URL(pluginOptions.database_url)
    } catch (err) {
      server.log(['hapi-pgsql', 'error'], err)
      throw new Error('Invalid connection Postgresql URL')
    }

    if (!connectConfig.hostname || !connectConfig.pathname) {
      throw new Error('Invalid connection Postgresql URL')
    }

    const config = {
      user: connectConfig.username,
      password: connectConfig.password,
      host: connectConfig.hostname,
      port: connectConfig.port,
      database: connectConfig.pathname.split('/')[1]
    }

    const pool = new Pool(config)
    const info = `${config.user}@${config.host}/${config.database}`

    server.log(['hapi-pgsql', 'info'], `hapi connection created for ${info}`)
    server.decorate('server', 'pgsql', pool)
    server.decorate('request', 'pgsql', pool)

    server.events.on('stop', () => {
      try {
        const { user, host, database } = pool.options
        const info = `${user}@${host}/${database}`
        server.log(
          ['hapi-pgsql', 'info'],
          `ending pgsql connection pool for ${info}`
        )
        pool.end()
      } catch (err) {
        /* $lab:coverage:off$ */
        /* istanbul ignore next */
        server.log(['hapi-pgsql', 'error'], err)
        /* $lab:coverage:on$ */
      }
    })
  },
  pkg: require('../package.json')
}
