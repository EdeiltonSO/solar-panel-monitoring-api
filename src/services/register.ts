import { hash } from 'bcryptjs'
import { customAlphabet } from 'nanoid'
import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository-interface'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { sendEmail } from '@/utils/sendEmail'
import { verifyAccountEmailTemplate } from '@/utils/email-templates/verify-account'


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

        const nanoid = customAlphabet('1234567890', 6);
        const maintenance_code = nanoid()
        const maintenance_code_created_at = new Date()

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
            maintenance_code,
            maintenance_code_created_at
        })

        sendEmail(user, 'Seu código de verificação do Sistema de Monitoramento de Placas Solares', await verifyAccountEmailTemplate(user))

        return { user }
    }
}
