import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      id: number
      verified_at: string | null
    }
  }
}