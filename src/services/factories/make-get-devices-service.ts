import { GetDevicesService } from '@/services/get-devices'
import { PrismaDevicesRepository } from '@/repositories/prisma/prisma-devices-repository'

export function makeGetDevicesService() {
  const prismaDevicesRepository = new PrismaDevicesRepository()
  const service = new GetDevicesService(prismaDevicesRepository)

  return service
}