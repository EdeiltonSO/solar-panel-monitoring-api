import { DeleteUserService } from '@/services/delete-user'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeDeleteUserService() {
  const prismaUsersRepository = new PrismaUsersRepository()

  const service = new DeleteUserService(
    prismaUsersRepository,
  )

  return service
}