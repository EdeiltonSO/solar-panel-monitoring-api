import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { UserNotFoundError } from "@/services/errors/user-not-found-error";
import { makeUpdateUserService } from "@/services/factories/make-update-user-service";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string().trim().optional(),
  });

  const {
    name,
  } = updateBodySchema.parse(request.body);

  const id = request.user.sub

  let updatedUser
  try {
    const updateUserService = makeUpdateUserService()

    const data = {
      name,
    }

    const { user } = await updateUserService.execute({ id, data })
    updatedUser = user
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send({
    user: {
      ...updatedUser,
      password_hash: undefined,
    },
  });
}