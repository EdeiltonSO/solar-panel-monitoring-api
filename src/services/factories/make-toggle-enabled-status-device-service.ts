import { ToggleEnabledStatusDeviceService } from '@/services/toggle-enaled-status-device'
import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'
import { PrismaLinksRepository } from '@/repositories/prisma/prisma-links-repository'

export function makeToggleEnabledStatusDeviceService() {
  const prismaDevicesRepository = new PrismaDevicesRepository()
  const prismaLinksRepository = new PrismaLinksRepository()
  const service = new ToggleEnabledStatusDeviceService(prismaDevicesRepository, prismaLinksRepository)

  return service
}