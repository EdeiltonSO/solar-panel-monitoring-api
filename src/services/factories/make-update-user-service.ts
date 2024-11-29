import { UpdateUserService } from '@/services/update-user'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeUpdateUserService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const service = new UpdateUserService(prismaUsersRepository)

  return service
}