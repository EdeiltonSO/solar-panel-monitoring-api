import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
    update(id: string, data: Prisma.UserUpdateInput): Promise<User>
    validate(id: string): Promise<{ verified_at: Date | null }>
    changePassword(id: string, newPasswordHash: string): Promise<User>
    generateMaintenanceCode(id: string, maintenanceCode: string): Promise<void>
    remove(id: string): Promise<void>
}