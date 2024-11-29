import fastify from 'fastify'
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import { appRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

export const transporter = nodemailer.createTransport({
  host: env.NODE_ENV !== 'production' ? env.SMTP_HOST_DEVELOPMENT : env.SMTP_HOST_PRODUCTION,
  service: env.SMTP_SERVICE_NAME,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

export const MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Sistema de Monitoramento de Placas Solares',
    link: 'https://www.google.com.br/',
  },
});

app.register(appRoutes)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: 'Validation error.', issues: error.format() })
    }
  
    if (env.NODE_ENV !== 'production') {
      console.error(error)
    } else {
      // connect to an external tool for logs like datadog, sentry, ,etc
    }
  
    return reply.status(500).send({ message: 'Internal server error.' })
  })