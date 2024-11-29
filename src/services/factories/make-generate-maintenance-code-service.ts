import { GenerateMaintenanceCodeService } from '@/services/generate-maintenance-code'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeGenerateMaintenanceCodeService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const service = new GenerateMaintenanceCodeService(prismaUsersRepository)

  return service
}