import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetStatusByDeviceIdService } from "@/services/factories/make-get-status-by-device-id-service";
import { DeviceNotFoundError } from "@/services/errors/device-not-found-error";
import { z } from "zod";

export async function getStatusByDeviceId(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    id: z.string(),
  });

  const { id } = paramSchema.parse(request.params);

  const user_id = request.user.sub

  try {
    const getStatusByDeviceIdService = makeGetStatusByDeviceIdService()

    const { status } = await getStatusByDeviceIdService.execute({ device_id: id, user_id })

    return reply.status(200).send({ status });

  } catch (error) {
    if (error instanceof DeviceNotFoundError) {
      return reply.status(403).send({ message: error.message })
    }
    throw error
  }
}