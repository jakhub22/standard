import nc from 'next-connect'

import { apiServer } from '@/config/api'
import getSession from '@/config/getSession'
import logger from '@/config/logger'

const authMiddleware = nc()
  .use((req, res, next) => {
    const { host, referer } = req.headers
    const domain = process.env.DOMAIN || host
    if (referer && referer?.indexOf(domain) !== -1) next()
    else {
      logger.warn(`CORS `, {
        message: `Host ${host} Referer ${referer} Domain ${domain}`,
      })
      res.redirect(307, '/404')
    }
  })
  .use(async (req, res, next) => {
    await getSession(req, res)
    next()
  })
  .use(async (req, res, next) => {
    if (!req?.session?.id_token) {
      return res.status(200).json({
        success: false,
        message: 'Таны холболтын хугацаа дууссан байна!',
      })
      // return next(new Error("oh no")) // handle error
    }

    apiServer['defaults']['headers'][
      'Authorization'
    ] = `Bearer ${req?.session?.id_token}`
    next() // otherwise continue
  })

const noAuthMiddleware = nc()
  .use((req, res, next) => {
    const { host, referer } = req.headers
    const domain = process.env.DOMAIN || host

    if (referer && referer?.indexOf(domain) !== -1) next()
    else {
      logger.warn(`CORS `, {
        message: `Host ${host} Referer ${referer} Domain ${domain}`,
      })
      res.send('Not allowed by CORS.')
    }
  })
  .use(async (req, res, next) => {
    await getSession(req, res)
    next()
  })

export { authMiddleware, noAuthMiddleware }
