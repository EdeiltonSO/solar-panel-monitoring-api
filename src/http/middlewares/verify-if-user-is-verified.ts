import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyIfUserIsVerified() {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { verified_at } = request.user

    if (!verified_at) {
      return reply.status(403).send({ message: 'Usuário não verificado.' })
    }
  }
}