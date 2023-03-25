import RedisStoreFactory from 'connect-redis'
import Redis from 'ioredis'
import nextSession from 'next-session'
import { expressSession, promisifyStore } from 'next-session/lib/compat'

import logger from './logger'

const RedisStore = RedisStoreFactory(expressSession)

const getSession = nextSession({
  store: promisifyStore(
    new RedisStore({
      client: new Redis({
        port: 6379,
        host: process.env.REDIS_HOST || '172.20.6.163',
        // username: 'default',
        password: 'redisprod20',
      })
        .on('error', (error) =>
          logger.error(
            `Redis connection failed: ${process.env.REDIS_PORT} ${process.env.REDIS_HOST} `,
            {
              message: JSON.stringify(error),
            }
          )
        )
        .on('connect', () => logger.info(`Redis connection established.`)),
      prefix: 'M-NEW-EP:',
    })
  ),
  name: '_RequestVerification',
  cookie: {
    secure: true,
    maxAge: 60 * 60 * 8, // 1 hour
  },
})

export default getSession
