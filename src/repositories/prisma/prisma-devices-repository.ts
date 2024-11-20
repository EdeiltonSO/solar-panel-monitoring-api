import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { DevicesRepository } from '../devices-repository-interface'

export class PrismaDevicesRepository implements DevicesRepository {
  async findById(id: string) {
    const device = await prisma.device.findUnique({
      where: {
        id,
      },
    })
  
    return device
  }
  
  async findByMac(address: string) {
    const device = await prisma.device.findUnique({
      where: {
        mac: address,
      },
    })
  
    return device
  }

  async findManyByUserId(userId: string) {
    const links = await prisma.link.findMany({
      where: {
        user_id: userId,
      },
    })

    const deviceIds = links.map((link) => link.device_id);

    const devices = await prisma.device.findMany({
      where: {
        id: {
          in: deviceIds,
        },
      },
    });
  
    return devices
  }
  
  async create(data: Prisma.DeviceCreateInput) {
    const device = await prisma.device.create({
      data,
    })

    return device
  }

  async update(id: string, data: Prisma.DeviceUpdateInput) {
    const fieldsToUpdate: Prisma.DeviceUpdateInput = {
      ...data,
    }
  
    const notNullFields = Object.fromEntries(
      Object.entries(fieldsToUpdate).filter(([_, value]) => value !== undefined)
    ) as Prisma.DeviceUpdateInput;
  
    const device = await prisma.device.update({
      where: { id },
      data: notNullFields,
    });
  
    return device;
  }

  async remove(id: string) {
    await prisma.device.delete({
      where: {
        id,
      },
    })
  }
}