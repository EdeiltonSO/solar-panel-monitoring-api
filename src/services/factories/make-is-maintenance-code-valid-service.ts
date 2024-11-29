import { IsMaintenanceCodeValidService } from '@/services/is-maintenance-code-valid'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeIsMaintenanceCodeValidService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const service = new IsMaintenanceCodeValidService(prismaUsersRepository)

  return service
}