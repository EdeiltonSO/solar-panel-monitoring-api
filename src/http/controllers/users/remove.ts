import { FastifyRequest, FastifyReply } from "fastify";
import { makeDeleteUserService } from "@/services/factories/make-delete-user-service";
import { UserNotFoundError } from "@/services/errors/user-not-found-error";

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const email = request.user.email

  try {
    const removeUserService = makeDeleteUserService()

    await removeUserService.execute({
      email,
    })

  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send();
}