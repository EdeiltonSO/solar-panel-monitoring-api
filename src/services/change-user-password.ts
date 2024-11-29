import { UsersRepository } from '@/repositories/users-repository-interface'
import { compare, hash } from 'bcryptjs'
import { PasswordsNotMatchError } from './errors/passwords-not-match-error'
import { InvalidPasswordError } from './errors/invalid-password-error'
import { User } from '@prisma/client'

interface ChangeUserPasswordServiceRequest {
  id: string
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

interface ChangeUserPasswordServiceResponse {
  user: User
}

export class ChangeUserPasswordService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    id,
    currentPassword,
    newPassword,
    confirmNewPassword
  }: ChangeUserPasswordServiceRequest): Promise<ChangeUserPasswordServiceResponse> {
    if (newPassword !== confirmNewPassword) {
      throw new PasswordsNotMatchError()
    }

    const u = await this.usersRepository.findById(
      id
    )

    const isValidPassword = await compare(currentPassword, u!.password_hash)

    if (!isValidPassword) {
      throw new InvalidPasswordError()
    }

    const password_hash = await hash(newPassword, 6)

    const user = await this.usersRepository.changePassword(
      id,
      password_hash,
    )

    return { user }
  }
}