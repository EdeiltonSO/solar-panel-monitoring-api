import { Prisma, Status } from '@prisma/client'

export interface StatusRepository {
    findById(id: string): Promise<Status | null>
    findManyByDeviceId(deviceId: string): Promise<Status[] | null>
    findManyByUserId(userId: string): Promise<Status[] | null>
    create(data: Prisma.StatusUncheckedCreateInput): Promise<Status>
}