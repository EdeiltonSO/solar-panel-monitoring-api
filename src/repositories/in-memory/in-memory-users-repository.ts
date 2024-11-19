import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository-interface'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    return !user ? null : user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      verified_at: null,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}