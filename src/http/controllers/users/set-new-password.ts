import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSetNewUserPasswordService } from '@/services/factories/make-set-new-user-password-service';
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { PasswordsNotMatchError } from "@/services/errors/passwords-not-match-error";

export async function setNewUserPassword(request: FastifyRequest, reply: FastifyReply) {
  const setNewUserPasswordBodySchema = z.object({
    email: z.string().trim().email(),
    maintenance_code: z.string().regex(/^\d{6}$/),
    new_password: z.string().min(6),
    confirm_new_password: z.string().min(6),
  });

  const {
    email,
    maintenance_code,
    new_password,
    confirm_new_password
  } = setNewUserPasswordBodySchema.parse(request.body);

  try {
    const setNewUserPasswordService = makeSetNewUserPasswordService()

    await setNewUserPasswordService.execute({
      email,
      maintenanceCode: maintenance_code,
      newPassword: new_password,
      confirmNewPassword: confirm_new_password
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    if (error instanceof PasswordsNotMatchError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send()
}