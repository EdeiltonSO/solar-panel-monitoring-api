import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateDeviceService } from "@/services/factories/make-update-device-service";
import { DeviceAlreadyExistsError } from "@/services/errors/device-already-exists-error";

export async function updateDevice(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    id: z.string(),
  });
  
  const bodySchema = z.object({
    name: z.string().trim().min(1).max(50),
  });

  const { id } = paramSchema.parse(request.params);
  const { name } = bodySchema.parse(request.body);

  const user_id = request.user.sub

  try {
    const updateDeviceService = makeUpdateDeviceService()

    const deviceRequest = {
      id,
      name
    }

    const { device } = await updateDeviceService.execute({ user_id, device: deviceRequest })

    return reply.status(200).send({
      device
    });

  } catch (error) {
    if (error instanceof DeviceAlreadyExistsError) {
      return reply.status(403).send({ message: error.message })
    }
    throw error
  }
}