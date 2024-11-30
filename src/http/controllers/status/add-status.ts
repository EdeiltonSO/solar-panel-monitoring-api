import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeAddStatusService } from "@/services/factories/make-add-status-service";
import { DeviceNotFoundError } from "@/services/errors/device-not-found-error";
import { DeviceNotEnabledError } from "@/services/errors/device-not-enabled-error";

export async function addStatus(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    mac: z.string().trim().min(12).max(17),
    voltage: z.number(),
    current: z.number()
  });

  const {
    mac,
    voltage,
    current
  } = bodySchema.parse(request.body);

  try {
    const addStatusService = makeAddStatusService()

    const statusRequest = {
      device_mac: mac,
      status: {
        voltage,
        current
      }
    }

    await addStatusService.execute(statusRequest)

    return reply.status(201).send();

  } catch (error) {
    if (error instanceof DeviceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    else if (error instanceof DeviceNotEnabledError) {
      return reply.status(403).send({ message: error.message })
    }
    throw error
  }
}