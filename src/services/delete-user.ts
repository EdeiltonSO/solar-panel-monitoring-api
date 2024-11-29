import { UsersRepository } from '@/repositories/users-repository-interface'
import { UserNotFoundError } from './errors/user-not-found-error'

interface DeleteUserServiceRequest {
  email: string,
}

export class DeleteUserService {
  constructor(
    private usersRepository: UsersRepository,
  ) { }

  async execute({
    email,
  }: DeleteUserServiceRequest): Promise<void> {

    const user = await this.usersRepository.findByEmail(email)
    console.log(user)
    if (!user) {
      throw new UserNotFoundError()
    }

    await this.usersRepository.remove(user.id)
  }
}