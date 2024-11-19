import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UsersRepository } from '@/repositories/users-repository-interface'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'


interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterServiceResponse {
    user: User
  }

export class RegisterService {
    constructor(private usersRepository: UsersRepository) {}
  
    async execute({ name, email, password }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        })

        return { user }
    }
}
