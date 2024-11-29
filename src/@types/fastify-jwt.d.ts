import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      id: string
      email: string
      validated_at: string | null
    }
  }
}