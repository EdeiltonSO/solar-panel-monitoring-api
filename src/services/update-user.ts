import { UsersRepository } from '@/repositories/users-repository-interface'
import { User } from '@prisma/client'
import { UserNotFoundError } from './errors/user-not-found-error'

interface UpdateUserServiceRequest {
  id: string,
  data: {
    name?: string
  }
}

interface UpdateUserServiceResponse {
  user: User
}

export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    id, data
  }: UpdateUserServiceRequest): Promise<UpdateUserServiceResponse> {

    const userToUpdate = await this.usersRepository.findById(id);

    if (!userToUpdate) {
      throw new UserNotFoundError();
    }

    const user = await this.usersRepository.update(id, data)

    return {
      user,
    }
  }
}