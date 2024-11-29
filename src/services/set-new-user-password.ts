import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository-interface'
import { PasswordsNotMatchError } from './errors/passwords-not-match-error'
import { UserNotFoundError } from './errors/user-not-found-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SetNewUserPasswordServiceRequest {
  email: string
  maintenanceCode: string
  newPassword: string
  confirmNewPassword: string

}

interface SetNewUserPasswordServiceResponse {
  user: User
}

export class SetNewUserPasswordService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    email,
    maintenanceCode,
    newPassword,
    confirmNewPassword
  }: SetNewUserPasswordServiceRequest): Promise<SetNewUserPasswordServiceResponse> {
    if (newPassword !== confirmNewPassword) {
      throw new PasswordsNotMatchError()
    }

    const u = await this.usersRepository.findByEmail(email)
    if (!u) { throw new UserNotFoundError() }

    const isValidMaintenanceCode = u.maintenance_code === maintenanceCode
    if (!isValidMaintenanceCode) { throw new ResourceNotFoundError() }

    const password_hash = await hash(newPassword, 6)

    const user = await this.usersRepository.changePassword(
      u.id,
      password_hash,
    )

    return { user }
  }
}