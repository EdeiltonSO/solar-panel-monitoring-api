import { Prisma, Device } from '@prisma/client'

export interface DevicesRepository {
    findById(id: string): Promise<Device | null>
    findByMac(address: string): Promise<Device | null>
    findManyByUserId(userId: string): Promise<Device[] | null>
    create(data: Prisma.DeviceCreateInput): Promise<Device>
    update(id: string, data: Prisma.DeviceUpdateInput): Promise<Device>
    remove(id: string): Promise<void>
}