import { UsersRepository } from '@/repositories/users-repository-interface'
import { UserNotFoundError } from './errors/user-not-found-error'

interface IsMaintenanceCodeValidServiceRequest {
  email: string
  code: string
}

interface IsMaintenanceCodeValidServiceResponse {
  is_valid: boolean
}

export class IsMaintenanceCodeValidService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    email,
    code
  }: IsMaintenanceCodeValidServiceRequest): Promise<IsMaintenanceCodeValidServiceResponse> {
    let user = await this.usersRepository.findByEmail(email)
    if (!user) { throw new UserNotFoundError() }

    if (user.maintenance_code === code) {
      return {
        is_valid: true
      }
    }

    return { is_valid: false }
  }
}