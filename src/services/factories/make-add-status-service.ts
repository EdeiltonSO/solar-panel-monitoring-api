import { AddStatusService } from '@/services/add-status'
import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { PrismaStatusRepository } from '@/repositories/prisma/prisma-status-repository'

export function makeAddStatusService() {
  const prismaDevicesRepository = new PrismaDevicesRepository()
  const prismaStatusRepository = new PrismaStatusRepository()
  const service = new AddStatusService(prismaDevicesRepository, prismaStatusRepository)

  return service
}