import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyIfUserIsVerified() {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { validated_at } = request.user

    if (!validated_at) {
      return reply.status(403).send({ message: 'Usuário não verificado.' })
    }
  }
}