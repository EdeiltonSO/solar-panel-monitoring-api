import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeIsMaintenanceCodeValidService } from '@/services/factories/make-is-maintenance-code-valid-service';
import { UserNotFoundError } from "@/services/errors/user-not-found-error";

export async function isMaintenanceCodeValid(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().trim().email(),
    code: z.string().regex(/^\d{6}$/),
  });

  const {
    email,
    code
  } = bodySchema.parse(request.body);

  let isValid = null
  try {
    const isMaintenanceCodeValidService = makeIsMaintenanceCodeValidService()

    isValid = await isMaintenanceCodeValidService.execute({
      email,
      code
    })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send(isValid)
}