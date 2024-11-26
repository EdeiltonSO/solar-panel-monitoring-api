import { Prisma, Status } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { StatusRepository } from '../status-repository-interface'

export class PrismaStatusRepository implements StatusRepository {
  async findById(id: string) {
    const status = await prisma.status.findUnique({
      where: {
        id,
      },
    })
  
    return status
  }

  async findManyByDeviceId(deviceId: string, page: number) {
    const status = await prisma.status.findMany({
      where: {
        device_id: deviceId,
      },
      take: 50,
      skip: (page - 1) * 50,
    })
  
    return status
  }

  async findManyByUserId(userId: string, page: number) {
    const links = await prisma.link.findMany({
      where: {
        user_id: userId
      },
      take: 50,
      skip: (page - 1) * 50,
    })

    const deviceIds = links.map(link => link.device_id)

    const status = await prisma.status.findMany({
      where: {
        device_id: {
          in: deviceIds
        }
      }
    })

    return status
  }

  async create(data: Prisma.StatusUncheckedCreateInput) {
    const status = await prisma.status.create({
      data,
    })

    return status
  }
}