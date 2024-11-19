import { RegisterService } from '@/services/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeRegisterService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const service = new RegisterService(prismaUsersRepository)

  return service
}