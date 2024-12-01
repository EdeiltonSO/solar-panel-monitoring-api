import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetStatusByUserIdService } from "@/services/factories/make-get-status-by-user-id-service";
import { DeviceNotFoundError } from "@/services/errors/device-not-found-error";

export async function getStatusByUserId(request: FastifyRequest, reply: FastifyReply) {
  const user_id = request.user.sub

  try {
    const getStatusByUserIdService = makeGetStatusByUserIdService()

    const data = await getStatusByUserIdService.execute({ user_id })

    return reply.status(200).send({ data });

  } catch (error) {
    if (error instanceof DeviceNotFoundError) {
      return reply.status(403).send({ message: error.message })
    }
    throw error
  }
}