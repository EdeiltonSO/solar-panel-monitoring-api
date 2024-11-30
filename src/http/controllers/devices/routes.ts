import { verifyIfUserIsVerified } from '@/http/middlewares/verify-if-user-is-verified'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { addDevice } from './add-device'
import { updateDevice } from './update-device'
import { removeDevice } from './remove-device'
import { toggleEnabledStatusDevice } from './toggle-enabled-status-device'
import { getDevices } from './get-devices'

export async function devicesRoutes(app: FastifyInstance) {
  // authenticated and verified users
  app.get('/devices', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, getDevices)
  app.post('/devices/create', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, addDevice)
  app.put('/devices/:id/update', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, updateDevice)
  app.delete('/devices/:id', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, removeDevice)
  app.patch('/devices/:id/enabled', { onRequest: [verifyJWT, verifyIfUserIsVerified()] }, toggleEnabledStatusDevice)
}