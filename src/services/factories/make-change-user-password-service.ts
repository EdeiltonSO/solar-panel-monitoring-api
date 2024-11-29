import { ChangeUserPasswordService } from '@/services/change-user-password'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeChangeUserPasswordService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const service = new ChangeUserPasswordService(prismaUsersRepository)

  return service
}