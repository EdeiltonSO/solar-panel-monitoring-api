import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeToggleEnabledStatusDeviceService } from "@/services/factories/make-toggle-enabled-status-device-service";
import { DeviceAlreadyExistsError } from "@/services/errors/device-already-exists-error";

export async function toggleEnabledStatusDevice(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    id: z.string(),
  });
  
  const bodySchema = z.object({
    enabled: z.boolean(),
  });

  const { id } = paramSchema.parse(request.params);
  const { enabled } = bodySchema.parse(request.body);

  const user_id = request.user.sub

  try {
    const toggleEnabledStatusDeviceService = makeToggleEnabledStatusDeviceService()

    const deviceRequest = {
      id,
      enabled
    }

    const { device } = await toggleEnabledStatusDeviceService.execute({ user_id, device: deviceRequest })

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