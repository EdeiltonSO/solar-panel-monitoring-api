import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeAddDeviceService } from "@/services/factories/make-add-device-service";
import { DeviceAlreadyExistsError } from "@/services/errors/device-already-exists-error";

export async function addDevice(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string().trim().min(1).max(50),
    mac: z.string().trim().min(12).max(17),
  });

  const {
    name,
    mac
  } = bodySchema.parse(request.body);

  const user_id = request.user.sub

  try {
    const addDeviceService = makeAddDeviceService()

    const deviceRequest = {
      name,
      mac
    }

    const { device } = await addDeviceService.execute({ user_id, device: deviceRequest })

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