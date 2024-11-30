import { verifyIfUserIsVerified } from '@/http/middlewares/verify-if-user-is-verified'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { addStatus } from './add-status'

export async function statusRoutes(app: FastifyInstance) {
  app.post('/status', addStatus)

  // authenticated and verified users
  // app.get('/status', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, getstatus)
  // app.put('/status/:id/update', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, updateDevice)
  // app.delete('/status/:id', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, removeDevice)
  // app.patch('/status/:id/enabled', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, toggleEnabledStatusDevice)
}