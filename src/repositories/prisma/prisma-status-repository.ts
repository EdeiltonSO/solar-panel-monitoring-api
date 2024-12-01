import { Prisma, Status } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { StatusRepository } from '../status-repository-interface'
import dayjs from 'dayjs'

export class PrismaStatusRepository implements StatusRepository {
  async findById(id: string) {
    const status = await prisma.status.findUnique({
      where: {
        id,
      },
    })
  
    return status
  }

  async findManyByDeviceId(deviceId: string, date: Date, page: number) {
    const startOfTheDay = dayjs(date ? date : new Date()).startOf('date')
    const endOfTheDay = dayjs(date ? date : new Date()).startOf('date')
    
    const status = await prisma.status.findMany({
      where: {
        device_id: deviceId,
        created_at: date ? {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        } : undefined,
      },
      take: page ? 50 : undefined,
      skip: page ? (page - 1) * 50 : undefined,
    })
  
    return status
  }

  async findManyByUserId(userId: string, date: Date, page: number) {
    const startOfTheDay = dayjs(date ? date : new Date()).startOf('date')
    const endOfTheDay = dayjs(date ? date : new Date()).startOf('date')

    const links = await prisma.link.findMany({
      where: {
        user_id: userId,
        created_at: date ? {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        } : undefined,
      },
      take: page ? 50 : undefined,
      skip: page ? (page - 1) * 50 : undefined,
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