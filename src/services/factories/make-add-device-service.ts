import { AddDeviceService } from '@/services/add-device'
import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { PrismaLinksRepository } from '@/repositories/prisma/prisma-links-repository'

export function makeAddDeviceService() {
  const prismaDevicesRepository = new PrismaDevicesRepository()
  const prismaLinksRepository = new PrismaLinksRepository()
  const service = new AddDeviceService(prismaDevicesRepository, prismaLinksRepository)

  return service
}