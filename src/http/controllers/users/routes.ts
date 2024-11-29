import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyIfUserIsVerified } from '@/http/middlewares/verify-if-user-is-verified'
import { validate } from './validate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/me/:id/validate', validate)

  // authenticated and verified users
  app.get('/me', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, profile)
}