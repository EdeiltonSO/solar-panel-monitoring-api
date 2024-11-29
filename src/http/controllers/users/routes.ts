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
import { changeUserPassword } from './change-password'
import { update } from './update'
import { remove } from './remove'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/me/:id/validate', validate)
  app.patch('/me/generate-maintenance-code', generateMaintenanceCode)
  app.patch('/me/is-maintenance-code-valid', isMaintenanceCodeValid)
  app.patch('/me/set-new-password', setNewUserPassword)
  app.patch('/me/change-password', { onRequest: [verifyJWT] }, changeUserPassword)

  // authenticated and verified users
  app.get('/me', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, profile)
  app.put('/me/update', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, update)
  app.delete('/me', { onRequest: [verifyJWT] }, remove)
}