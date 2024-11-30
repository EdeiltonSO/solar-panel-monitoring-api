import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetDevicesService } from "@/services/factories/make-get-devices-service";
import { DeviceNotFoundError } from "@/services/errors/device-not-found-error";

export async function getDevices(request: FastifyRequest, reply: FastifyReply) {
  const user_id = request.user.sub

  try {
    const getDevicesService = makeGetDevicesService()

    const { devices } = await getDevicesService.execute({ user_id })

    return reply.status(200).send({ devices });

  } catch (error) {
    if (error instanceof DeviceNotFoundError) {
      return reply.status(403).send({ message: error.message })
    }
    throw error
  }
}