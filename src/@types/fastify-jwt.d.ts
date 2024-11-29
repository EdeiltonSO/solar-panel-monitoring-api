import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      id: string
      email: string
      validated_at: string | null
    }
  }
}