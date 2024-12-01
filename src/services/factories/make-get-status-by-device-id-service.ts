import { GetStatusByDeviceIdService } from '@/services/get-status-by-device-id'
import { PrismaLinksRepository } from '@/repositories/prisma/prisma-links-repository'
import { PrismaStatusRepository } from '@/repositories/prisma/prisma-status-repository'

export function makeGetStatusByDeviceIdService() {
  const prismaLinksRepository = new PrismaLinksRepository()
  const prismaStatusRepository = new PrismaStatusRepository()
  const service = new GetStatusByDeviceIdService(prismaLinksRepository, prismaStatusRepository)

  return service
}