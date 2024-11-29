import { verifyIfUserIsVerified } from '@/http/middlewares/verify-if-user-is-verified'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { addDevice } from './add-device'

export async function devicesRoutes(app: FastifyInstance) {
  // authenticated and verified users
  app.post('/devices/create', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, addDevice)
}