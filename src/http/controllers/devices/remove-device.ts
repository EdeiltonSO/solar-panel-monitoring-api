import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeRemoveDeviceService } from "@/services/factories/make-remove-device-service";
import { DeviceNotFoundError } from "@/services/errors/device-not-found-error";

export async function removeDevice(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    id: z.string(),
  });
  
  const { id } = paramSchema.parse(request.params);

  const user_id = request.user.sub

  try {
    const removeDeviceService = makeRemoveDeviceService()

    await removeDeviceService.execute({ user_id, device_id: id })

    return reply.status(200).send();

  } catch (error) {
    if (error instanceof DeviceNotFoundError) {
      return reply.status(403).send({ message: error.message })
    }
    throw error
  }
}