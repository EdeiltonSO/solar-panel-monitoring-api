import { Prisma, Status } from '@prisma/client'

export interface StatusRepository {
    findById(id: string): Promise<Status | null>
    findManyByDeviceId(deviceId: string, date?: Date, page?: number): Promise<Status[] | null>
    findManyByUserId(userId: string, date?: Date, page?: number): Promise<Status[] | null>
    create(data: Prisma.StatusUncheckedCreateInput): Promise<Status>
}