import { Link, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { LinksRepository } from '../links-repository-interface'

export class PrismaLinksRepository implements LinksRepository {
  async findById(id: string) {
    const link = await prisma.link.findUnique({
      where: {
        id,
      },
    })
  
    return link
  }
  
  async findManyByDeviceId(deviceId: string) {
    const links = await prisma.link.findMany({
      where: {
        device_id: deviceId,
      },
    })
  
    return links
  }

  async findManyByUserId(userId: string) {
    const links = await prisma.link.findMany({
      where: {
        user_id: userId,
      },
    })
  
    return links
  }

  async findLinkBetweenUserIdAndDeviceId(userId: string, deviceId: string): Promise<Link | null> {
    const link = await prisma.link.findFirst({
      where: {
        user_id: userId,
        device_id: deviceId
      },
    })
  
    return link
  }
  
  async create(data: Prisma.LinkUncheckedCreateInput) {
    const link = await prisma.link.create({
      data,
    })

    return link
  }

  async remove(id: string) {
    await prisma.link.delete({
      where: {
        id,
      },
    })
  }
}