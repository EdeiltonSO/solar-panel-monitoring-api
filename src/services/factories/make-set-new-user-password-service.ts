import { SetNewUserPasswordService } from '@/services/set-new-user-password'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeSetNewUserPasswordService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const service = new SetNewUserPasswordService(prismaUsersRepository)

  return service
}