import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeGenerateMaintenanceCodeService } from '@/services/factories/make-generate-maintenance-code-service';
import { UserNotFoundError } from "@/services/errors/user-not-found-error";
import { SendingEmailError } from "@/services/errors/sending-email-error";

export async function generateMaintenanceCode(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().trim().email(),
  });

  const {
    email
  } = bodySchema.parse(request.body);

  let waitingTime

  try {
    const generateMaintenanceCodeService = makeGenerateMaintenanceCodeService()

    const { waiting_time } = await generateMaintenanceCodeService.execute({
      email
    })

    waitingTime = waiting_time
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    if (error instanceof SendingEmailError) {
      return reply.status(503).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send({ waiting_time_in_ms: waitingTime ? waitingTime : null })
}