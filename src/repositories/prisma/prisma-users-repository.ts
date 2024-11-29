import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository-interface'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
  
    return user
  }
  
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
  
    return user
  }
  
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const fieldsToUpdate: Prisma.UserUpdateInput = {
      ...data,
    }
  
    const notNullFields = Object.fromEntries(
      Object.entries(fieldsToUpdate).filter(([_, value]) => value !== undefined)
    ) as Prisma.UserUpdateInput;
  
    const user = await prisma.user.update({
      where: { id },
      data: notNullFields,
    });
  
    return user;
  }

  async validate(id: string) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        validated_at: new Date(),
        maintenance_code: null,
        maintenance_code_created_at: null    
      }
    })

    return { validated_at: user.validated_at }
  }

  async changePassword(id: string, newPasswordHash: string) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password_hash: newPasswordHash,
        maintenance_code: null,
        maintenance_code_created_at: null
      }
    })

    return user
  }

  async generateMaintenanceCode(email: string, maintenanceCode: string) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        maintenance_code: maintenanceCode,
        maintenance_code_created_at: new Date()
      }
    })
  }

  async remove(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }
}