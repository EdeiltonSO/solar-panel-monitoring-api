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

  async findManyByDeviceId(deviceId: string) {
    const status = await prisma.status.findMany({
      where: {
        device_id: deviceId,
      },
    })
  
    return status
  }

  async findManyByUserId(userId: string) {
    const links = await prisma.link.findMany({
      where: {
        user_id: userId
      }
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

  async create(data: Prisma.StatusCreateInput) {
    const status = await prisma.status.create({
      data,
    })

    return status
  }
}