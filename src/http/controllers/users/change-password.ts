import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeChangeUserPasswordService } from '@/services/factories/make-change-user-password-service';
import { PasswordsNotMatchError } from "@/services/errors/passwords-not-match-error";
import { InvalidPasswordError } from "@/services/errors/invalid-password-error";

export async function changeUserPassword(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    "current_password": z.string().min(6),
    "new_password": z.string().min(6),
    "confirm_new_password": z.string().min(6),
  });

  const {
    current_password,
    new_password,
    confirm_new_password
  } = bodySchema.parse(request.body);

  const id = request.user.sub

  let updatedUser

  try {
    const changeUserPasswordService = makeChangeUserPasswordService()

    const { user } = await changeUserPasswordService.execute({
      id,
      currentPassword: current_password,
      newPassword: new_password,
      confirmNewPassword: confirm_new_password
    })

    updatedUser = user
  } catch (error) {
    if (error instanceof PasswordsNotMatchError) {
      return reply.status(400).send({ message: error.message })
    }
    if (error instanceof InvalidPasswordError) {
      return reply.status(401).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send({
    user: {
      ...updatedUser,
      password_hash: undefined
    }
  });
}