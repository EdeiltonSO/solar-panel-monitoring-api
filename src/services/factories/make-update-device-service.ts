import { UpdateDeviceService } from '@/services/update-device'
import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { PrismaLinksRepository } from '@/repositories/prisma/prisma-links-repository'

export function makeUpdateDeviceService() {
  const prismaDevicesRepository = new PrismaDevicesRepository()
  const prismaLinksRepository = new PrismaLinksRepository()
  const service = new UpdateDeviceService(prismaDevicesRepository, prismaLinksRepository)

  return service
}