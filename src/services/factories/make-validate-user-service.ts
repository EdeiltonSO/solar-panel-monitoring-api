import { ValidateUserService } from '@/services/validate-user'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeValidateUserService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const service = new ValidateUserService(prismaUsersRepository)

  return service
}