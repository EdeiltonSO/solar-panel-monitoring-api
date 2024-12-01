import { Prisma, Link } from '@prisma/client'

export interface LinksRepository {
    findById(id: string): Promise<Link | null>
    findManyByDeviceId(deviceId: string): Promise<Link[] | null>
    findManyByUserId(userId: string): Promise<Link[] | null>
    findLinkBetweenUserIdAndDeviceId(userId: string, deviceId: string): Promise<Link | null>
    create(data: Prisma.LinkUncheckedCreateInput): Promise<Link>
    remove(id: string): Promise<void>
}