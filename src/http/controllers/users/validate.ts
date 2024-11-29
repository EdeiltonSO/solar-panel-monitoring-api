import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeValidateUserService } from '@/services/factories/make-validate-user-service';
import { UserNotFoundError } from '@/services/errors/user-not-found-error';
import { InvalidMaintenanceCodeError } from '@/services/errors/invalid-maintenance-code-error';

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    id: z.string(),
  });

  const bodySchema = z.object({
    code: z.string().regex(/^\d{6}$/),
  });

  const { id } = paramSchema.parse(request.params);
  const { code } = bodySchema.parse(request.body);

  let validated_at = null
  try {
    const validateUserService = makeValidateUserService()

    validated_at = await validateUserService.execute({ id, code })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    if (error instanceof InvalidMaintenanceCodeError) {
      return reply.status(401).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send(validated_at);
}