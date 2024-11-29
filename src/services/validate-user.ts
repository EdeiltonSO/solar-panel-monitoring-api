import { UsersRepository } from '@/repositories/users-repository-interface'
import { UserNotFoundError } from './errors/user-not-found-error'
import { InvalidMaintenanceCodeError } from './errors/invalid-maintenance-code-error'

interface ValidateUserServiceRequest {
  id: string,
  code: string,
}
interface ValidateUserServiceResponse {
  validated_at: Date | null,
}
export class ValidateUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    id, code
  }: ValidateUserServiceRequest): Promise<ValidateUserServiceResponse> {

    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new UserNotFoundError()
    }

    if (user.maintenance_code === code) {
      const validated_at = await this.usersRepository.validate(id)
      return validated_at;
    }
    else {
      throw new InvalidMaintenanceCodeError()
    }
  }
}