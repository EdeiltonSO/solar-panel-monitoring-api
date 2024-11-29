import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { makeRegisterService } from "@/services/factories/make-register-service";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = bodySchema.parse(request.body);

  try {
    const registerService = makeRegisterService();

    const { user } = await registerService.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send({
      user: {
        id: user.id,
        validated_at: user.validated_at
      }
    });

  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    return reply.status(500).send()
  }
}