import { Prisma, Status } from '@prisma/client'

export interface StatusRepository {
    findById(id: string): Promise<Status | null>
    findManyByDeviceId(deviceId: string, page: number): Promise<Status[] | null>
    findManyByUserId(userId: string, page: number): Promise<Status[] | null>
    create(data: Prisma.StatusUncheckedCreateInput): Promise<Status>
}