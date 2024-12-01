import { GetStatusByUserIdService } from '@/services/get-status-by-user-id'
import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { PrismaStatusRepository } from '@/repositories/prisma/prisma-status-repository'

export function makeGetStatusByUserIdService() {
  const prismaDevicesRepository = new PrismaDevicesRepository()
  const prismaStatusRepository = new PrismaStatusRepository()
  const service = new GetStatusByUserIdService(prismaDevicesRepository, prismaStatusRepository)

  return service
}