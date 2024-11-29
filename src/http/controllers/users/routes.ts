import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyIfUserIsVerified } from '@/http/middlewares/verify-if-user-is-verified'
import { validate } from './validate'
import { isMaintenanceCodeValid } from './is-maintenance-code-valid'
import { generateMaintenanceCode } from './generate-maintenance-code'
import { setNewUserPassword } from './set-new-password'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/me/:id/validate', validate)
  app.patch('/me/generate-maintenance-code', generateMaintenanceCode)
  app.patch('/me/is-maintenance-code-valid', isMaintenanceCodeValid)
  app.patch('/me/set-new-password', setNewUserPassword)

  // authenticated and verified users
  app.get('/me', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, profile)
}