import { RemoveDeviceService } from '@/services/remove-device'
import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { PrismaLinksRepository } from '@/repositories/prisma/prisma-links-repository'

export function makeRemoveDeviceService() {
  const prismaDevicesRepository = new PrismaDevicesRepository()
  const prismaLinksRepository = new PrismaLinksRepository()
  const service = new RemoveDeviceService(prismaDevicesRepository, prismaLinksRepository)

  return service
}