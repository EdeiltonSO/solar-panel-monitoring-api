import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      id: number
      validated_at: string | null
    }
  }
}