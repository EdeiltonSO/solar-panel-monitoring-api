import { AuthenticateService } from '@/services/authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeAuthenticateService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const service = new AuthenticateService(prismaUsersRepository)

  return service
}