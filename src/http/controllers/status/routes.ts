import { verifyIfUserIsVerified } from '@/http/middlewares/verify-if-user-is-verified'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { addStatus } from './add-status'
import { getStatusByDeviceId } from './get-status-by-device-id'
import { getStatusByUserId } from './get-status-by-user-id'

export async function statusRoutes(app: FastifyInstance) {
  app.post('/status', addStatus)

  // authenticated and verified users
  app.get('/status/by-device-id/:id', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, getStatusByDeviceId)
  app.get('/status/by-user-id', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, getStatusByUserId)
}